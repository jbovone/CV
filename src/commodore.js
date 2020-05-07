import state from './commodore/states-database.js'
import processCommand from './commodore/command-process.js'
import kernalV2 from './commodore/text-process.js'
import pokeFunctions from './commodore/color-functions.js'
import { setNewParagraph, eraseCharacter, dumpPrompt, checkOverflowY } from './commodore/DOM-mutators.js'
import keyboardMobile from './mobile-integration.js'



window.onresize = function () {
    checkOverflowY()
}
export default function commodore(autoloaders) {
    const c64 = {
        display: 'display',
        prompt: 'prompt'
    }
    init()
    autoloaders(kernalV2, processCommand, state, dumpPrompt, setNewParagraph)
    window.addEventListener('keyup', function (e) {
        if (state('requestedKeys')) {
            state('keys', e)
        }
    })
    window.onkeydown = function (e) {
        commodoreInputsManager(e)
    }
    async function commodoreInputsManager(e) {
        if (state('onRuntime')) {
            if (e.key === 'Escape' && !state('cancelRuntimeOveride')) {
                return state('cancelRuntime', true)
            }
            if (state('requestedKeys')) {
                state('keys', e)
            }
            if (e.key !== 'F5') {
                e.preventDefault()
            }
            return
        }
        switch (e.code) {
            case 'Space':
                kernalV2(' ', c64.prompt)
                e.preventDefault()
                break;
            case 'Backspace':
                eraseCharacter(c64.prompt)
                break;
            case 'Enter':
                await processCommand(dumpPrompt())
                setNewParagraph(`${c64.prompt}`)
                break;
            case 'ArrowDown':
                e.preventDefault()
                kernalV2('\n', c64.prompt)
                break;
            case 'ArrowUp':
                e.preventDefault()
                eraseCharacter()
                break;
            case 'ArrowRight':
                e.preventDefault()
                kernalV2(' ', c64.prompt)
                break;
            case 'ArrowLeft':
                e.preventDefault()
                eraseCharacter()
                break;
            default:
                if (/^[0-9]|q$/i.test(e.key) && e.ctrlKey === true) {
                    e.preventDefault()
                    pokeFunctions(e.key)
                } else if (/^.$/.test(e.key)) {
                    await kernalV2(e.key.toUpperCase(), c64.prompt)
                }
                break;
        }
    }
    function init() {
        document.querySelector('.commodore').style.display = 'flex'
        keyboardMobile(true)
        state('colorPoked', '7')
        setNewParagraph(c64.prompt)
    }
    //**********************mobile*************************//
    const SHIFT = keyboardMobile(false)
    let CTRLState = false
    let shiftState = false
    let touchStroke = []
    document.querySelector('.keyboard').addEventListener('touchstart', touchStartManager)
    function touchStartManager(e) {
        const key = e.target
        styleKeystroke(key)
        const event = {
            preventDefault() { }
        }
        if (key.innerText === 'RETURN') {
            event.code = 'Enter'
        } else if (key.classList.contains('space')) {
            event.code = 'Space'
        } else if (key.innerText === 'RESTORE') {
            event.code = 'Backspace'
        } else if (key.innerText === 'RUN') {
            event.key = 'Escape'
        } else {
            event.code = key.innerText
            event.key = key.innerText
            if (CTRLState) {
                styleKeystroke(document.querySelectorAll('.special')[1])
                event.ctrlKey = true
                CTRLState = false
            }
        }
        if (key.innerText === 'CTRL') {
            CTRLState = true
        } else if (key.innerText === 'SHIFT') {
            shiftState ? SHIFT(false) : SHIFT(true)
            shiftState = !shiftState
        } else if (key.classList.contains('c64logo')) {
            document.querySelector('#keyboard-modal').classList.add('hidden')
            document.querySelector('.keyboard-button').classList.remove('hidden')
        } else {
            commodoreInputsManager(event)
            let cooldown = 3
            touchStroke.push(
                setInterval(() => {
                    cooldown ? cooldown-- : commodoreInputsManager(event)
                }, 40)
            )
        }
        function styleKeystroke(key) {
            if (key.innerText === 'CTRL') {
                CTRLState ? setColor(false) : setColor(true)
            } else if (key.innerText === 'SHIFT') {
                shiftState ? setColor(false) : setColor(true)
            } else {
                setColor(true)
                setTimeout(() => {
                    setColor(false)
                }, 200);
            }
            function setColor(set = true) {
                if (set) {
                    key.style.color = pokeFunctions(state('colorPoked'), null, true)
                } else {
                    key.style.color = ''
                }
            }
        }
    }
    document.querySelector('.keyboard').addEventListener('touchend', () => {
        window.clearInterval(touchStroke.shift())
    })



    document.querySelector('.pad').addEventListener('touchstart', () => {
        document.querySelector('.keyboard').classList.add('hidden')
        document.querySelector('#pad-modal').classList.remove('hidden')
    })
    document.querySelectorAll('.pad-direction').forEach(element => {
        element.addEventListener('touchstart', () => {
            const key = String('Arrow' + element.className.match(/\w*/)[0].replace('Pad', '').replace(/\w/, element.className[0].toUpperCase()))
            const event = {
                code: key,
                key: key,
                type: 'keydown',
                preventDefault() { },
            }
            commodoreInputsManager(event)
            stylePadStroke(element)
        })
        element.addEventListener('touchend', () => {
            const key = String('Arrow' + element.className.match(/\w*/)[0].replace('Pad', '').replace(/\w/, element.className[0].toUpperCase()))
            const event = {
                code: key,
                key: key,
                type: 'keyup',
                preventDefault() { },
            }
            commodoreInputsManager(event)
            stylePadStroke(element)
        })
    })
    function stylePadStroke(element) {
        element.classList.toggle('cross-active')
    }
    document.querySelector('.close').addEventListener('touchstart', () => {
        document.querySelector('#pad-modal').classList.add('hidden')
        document.querySelector('#keyboard-modal').classList.remove('hidden')
    })
}
