import state from './states-database.js'
import pokeFunctions from './color-functions.js'

export function setNewParagraph(node, text = '', classname = 'paragraph') {
    const $newParagraph = document.createElement(`div`)
    const $lastActive = document.querySelector('.active')
    if ($lastActive) {
        $lastActive.classList.remove('active')
    }
    $newParagraph.className = `${classname} active`
    document.querySelector(`.${node}`).appendChild($newParagraph)
    setNewCharacter(text)
}
export function setNewCharacter(text = null, classname = "cursor") {
    const $lastCharacter = document.querySelector('.cursor')
    if ($lastCharacter) {
        $lastCharacter.classList.remove('cursor')
    }
    const $character = document.createElement(`span`)
    if (text) {
        $character.innerText = text
    }
    state('characterNumber', +1)
    $character.id = `C${state('characterNumber')}`
    $character.className = `${classname}`
    document.querySelector('.active').appendChild($character)
    if (state('colorPoked')) {
        pokeFunctions(state('colorPoked'))
    }
    return $character
}
export function eraseCharacter() {
    const $characters = document.querySelectorAll('.prompt div span')
    if (!isLastCharacter()) {
        $characters[$characters.length - 2].remove()
    } else if (isLastCharacter() && !isLastParagraph()) {
        const $allParagraphs = document.querySelectorAll('.prompt .paragraph')
        $allParagraphs[$allParagraphs.length - 1].remove()
        $allParagraphs[$allParagraphs.length - 2].classList.add('active')
        const $characters = document.querySelectorAll('.paragraph.active > span')
        $characters[0] ? $characters[$characters.length - 1].classList.add('cursor') : setNewCharacter()
        if ($characters[$characters.length - 1].querySelector('br')) {
            $characters[$characters.length - 1].querySelector('br').remove()
        }
    } else {
        $characters[0].textContent = ''
    }
    function isLastCharacter() {
        return !Boolean(document.querySelectorAll('.paragraph.active > span')[1])
    }
    function isLastParagraph() {
        return !Boolean(document.querySelectorAll('.prompt .paragraph')[1])
    }
}
export function dumpPrompt() {
    let actualPrompt = ''
    document.querySelectorAll(`.prompt div`).forEach(element => {
        actualPrompt += element.textContent
        document.querySelector('.display').appendChild(element)
    })
    return actualPrompt
}
export function resetContainer(container = 'display') {
    document.querySelectorAll(`.${container} div, p`).forEach(element => {
        element.remove()
    })
    setNewParagraph(container)
    resetStyling()
}
export function resetStyling() {
    pokeFunctions('0')
    pokeFunctions('7')
    state('colorPoked', '7')
    state('onColorInvertion', false)
}
export function checkOverflowY(container = document.querySelector('.commodore'), override = null, validationOnly = false) {
    if (validationOnly) {
        return overFlowY(container)
    }
    if (overFlowY(container)) {
        if (override) {
            override()
        } else {
            const valid = removeOffsetItems()
            if (valid === false) {
                return
            }
        }
        if (overFlowY(container)) {
            checkOverflowY(container)
        }
    }
    function overFlowY(container) {
        return Boolean(container.scrollHeight > container.clientHeight)
    }
    function removeOffsetItems() {
        const $items = document.querySelectorAll(`p, .display div, .prompt div`)
        if (!$items[0]) {
            setNewParagraph('display')
            setNewParagraph('prompt')
            console.error('reset exception at flowY validation')
            return false
        } else {
            $items[0].remove()
        }
        if (!document.querySelectorAll(`p, .display div, .prompt div`)[0]) {
            setNewParagraph('display')
            setNewParagraph('prompt')
        }
    }
}
export function overflowX(content) {
    setContainer()
    const valid = overflow()
    restoreContainer()
    return valid

    function setContainer() {
        document.querySelector('.active').style.display = 'inline'
        document.querySelector('.cursor').innerText = `${content}`
    }
    function restoreContainer() {
        document.querySelector('.active').style.display = 'flex'
        document.querySelector('.cursor').textContent = ''
    }
    function overflow() {
        return Boolean(document.querySelector('.active').scrollWidth > document.querySelector('.commodore').clientWidth)
    }
}
export function getMaxLineLenght() {
    let fill = ''
    while (!overflowX(fill)) {
        fill += " "
    }
    return fill.length
}
