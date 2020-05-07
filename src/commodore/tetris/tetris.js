
import state from '../states-database.js'
import bluePrintTemplates from './figures.js'
import pokeFunctions from '../color-functions.js'
import kernalV2 from '../text-process.js'
import { setContainer, freezeFigures, resetState } from './DOM-mutators-tetris.js'
import { coolDown, updateLines, updateLevel, pickNew, rotationCicle, boardDisplacement, calibrateRotation, ensureNoStuckfaddingClass, updateScore } from './partials.js'
import { fading, isTerminalColliding, isXColliding, isYColliding, onFreeze, printFigure } from './printTemplateMethods.js'


export default async function tetris() {
    await styleLoading()
    const $matrix = setContainer()
    const box = {}
    const indexOfMiddleX = Math.ceil($matrix[0].length / 2)
    let delay = 30; let tick = 0; let threshold = 7; let offsetY = 1; let offsetX = 0;
    let levelProgress = 0; let score = 0; let lines = -1; let level = -1
    let inputs = {
        left: {
            code: 'ArrowLeft',
            state: false,
        },
        right: {
            code: 'ArrowRight',
            state: false,
        },
        dump: {
            code: 'ArrowDown',
            state: false,
        },
        rotate: {
            code: 'ArrowUp',
            state: false,
        },
    }
    await gameStart()
    async function gameStart() {
        state('requestedKeys', true)
        level = updateLevel(level, $matrix)
        lines = updateLines(lines, $matrix)
        await gameEngine()
        state('cancelRuntime', false)
        state('requestedKeys', false)
    }
    async function gameEngine() {
        let gameOver = false
        while (!gameOver) {
            const newFigure = pickNew(bluePrintTemplates)
            const initialRotation = pickNew(bluePrintTemplates[newFigure].matrix)
            let rotation = rotationCicle(newFigure)()
            let nextRotation = calibrateRotation(initialRotation, rotation)
            setActive(newFigure, initialRotation)
            gameOver = printTemplate(isTerminalColliding, $matrix)
            let validity = true
            delay = 40 - levelProgress
            threshold = 8 - level
            while (validity) {
                await coolDown(delay)
                resetState()
                printTemplate(printFigure, $matrix, box.color)
                await coolDown(delay)
                fetchInputs()
                const itRotates = handleActions(nextRotation)
                if (itRotates) {
                    nextRotation = rotation.next().value
                }
                tick++
                if (tick >= threshold) {
                    const canGoDown = printTemplate(isYColliding, $matrix)
                    if (!canGoDown) {
                        printTemplate(fading, $matrix)
                        if (tick >= threshold * 4) {
                            validity = canGoDown
                        }
                    } else {
                        offsetY++
                        tick = 0
                    }
                }
                if (state('cancelRuntime')) {
                    break
                }
            }
            checkForLines()
            score += 1
            updateScore($matrix, score)
            await coolDown(delay)
            freezeFigures()
            offsetY = 1
            tick = 0
            offsetX = 0
            ensureNoStuckfaddingClass()
            if (state('cancelRuntime')) {
                break
            }
        }
        return new Promise(resolve => {
            resolve(console.log('END-PROGRAM'))
        })
    }
    function fetchInputs() {
        const key = state('keys')
        Object.entries(inputs).forEach(tagKey => {
            key.forEach(keyEvent => {
                if (tagKey[1].code === keyEvent.code) {
                    if (keyEvent.type === 'keydown') {
                        tagKey[1].state = true
                    } else {
                        tagKey[1].state = false
                    }
                }
            })
        })
        if (state('keys')[0]) {
        }
        state('keys', false) //the state handler will set this as [] not as false. 
    }
    function handleActions(nextRotation) {
        if (inputs.dump.state === true) {
            threshold = 1
            delay = 0
        }
        if (inputs.right.state === true) {
            if (xCollider(1)) {
                offsetX++
            }
        } else if (inputs.left.state === true) {
            if (xCollider(-1)) {
                offsetX--
            }
        }
        function xCollider(vector) {
            offsetX += vector
            const valid = printTemplate(isXColliding, $matrix)
            offsetX -= vector
            return valid
        }
        if (inputs.rotate.state === true) {
            const storage = [box.active, box.Yclosure]
            box.active = box.figure[nextRotation]
            box.Yclosure = box.active.right.length
            if (!printTemplate(onFreeze, $matrix) || !xCollider(0)) {
                box.active = storage[0]
                box.Yclosure = storage[1]
                return false
            }
            inputs.rotate.state = false
            return true
        }
    }
    function printTemplate(callback, $matrix, color) {
        const closureY = offsetY + box.Yclosure
        let valid = true
        let k = 0
        for (let i = offsetY; i < closureY; i++) {
            const positionX = indexOfMiddleX - box.active.left[k] + offsetX
            const closureX = indexOfMiddleX + box.active.right[k] + offsetX
            k++
            for (let j = positionX; j < closureX; j++) {
                valid = callback(i, j, $matrix, color)
                if (!valid) {
                    return false
                }
            }
        }
        return valid
    }
    async function checkForLines() {
        box.Yindex = []
        let linesChecked = 0
        printTemplate(indexYretrieve, $matrix)
        box.Yindex.map(row => {
            if (!$matrix[row].find(element => element.className.match(/^board$/))) {
                lines = updateLines(lines, $matrix)
                levelProgress++
                linesChecked++
                boardDisplacement(row, $matrix)
                checkDifficulty()
            }
        })
        if (linesChecked) {
            const lineScore = 10
            score += lineScore * linesChecked * linesChecked
        }
        function indexYretrieve(i) {
            if (!box.Yindex.includes(i)) {
                box.Yindex.push(i)
            }
            return true
        }
    }
    function checkDifficulty() {
        if (lines % 20 === 0) {
            level = updateLevel(level, $matrix)
            delay = 40
            levelProgress = 0
        }
    }
    function setActive(figure = null, rotation = 'o12clock') {
        box.active = bluePrintTemplates[figure].matrix[rotation]
        box.Yclosure = box.active.right.length
        box.figure = bluePrintTemplates[figure].matrix
        box.color = bluePrintTemplates[figure].color
        return bluePrintTemplates[figure]
    }
    async function styleLoading() {
        const colorDial = pokeFunctions('rainbow')()
        const characters = "*·$%&/&/()¨Tç¨-DFGHJTY"
        let counter = 0
        const random = (range) => { return Math.floor(Math.random() * range) }
        await kernalV2(`      ....`)
        async function showOldFashinedLoadingCrap() {
            while (counter < 70 + random(20)) {
                document.querySelector('.commodore').style.borderColor = `${colorDial.next().value}`
                document.querySelector('.cursor').textContent = characters[random(characters.length)]
                counter++
                await coolDown(60)
            }
            await coolDown(2000)
            document.querySelector('.commodore').style.borderColor = pokeFunctions('7', false, true)
        }

        return await showOldFashinedLoadingCrap()
    }
    return new Promise(resolve => resolve())
}
