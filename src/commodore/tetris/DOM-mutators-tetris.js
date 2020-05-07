import { setNewCharacter, setNewParagraph, resetContainer, checkOverflowY } from '../DOM-mutators.js'
import pokeFunctions from '../color-functions.js'
import { getItemId } from './partials.js'
import state from '../states-database.js'

export function setContainer() {
    resetContainer('display')
    const $matrix = fillBox()
    return $matrix
}
function fillBox() {
    let maxRows = 21
    let rowNumber = 0
    const columnNumber = 22
    let $matrix = []
    const tetrisTextGen = textTetris()
    while (rowNumber <= maxRows) {
        const $row = []
        for (let i = 0; i < columnNumber; i++) {
            state('commodoreStyle') ? setNewCharacter('    ') : setNewCharacter(' ')
            $row[i] = document.querySelector('.cursor')
            if (i > 5 && i <= 15 && rowNumber > 0 && rowNumber <= 20) {
                $row[i].className = 'board'
            } else {
                $row[i].className = 'wall'
                $row[i].textContent = tetrisTextGen.next().value
            }
        }
        if (checkOverflowY(undefined, undefined, true)) {
            resetContainer('display')
            maxRows--
        }
        setNewParagraph('display')

        $matrix[rowNumber] = $row
        rowNumber++
    }
    document.querySelectorAll('.paragraph').forEach((element, i) => {
        element.style.display = 'block'
        element.style.margin = '0 auto'
        element.classList.add(`row${i}`)
    })
    return $matrix
}
export function freezeFigures() {
    document.querySelectorAll('.figure').forEach(element => {
        element.classList.add('collider')
        element.classList.remove('figure')
    })
}
export function resetState() {
    document.querySelectorAll('.figure').forEach((element) => {
        element.classList.remove('figure')
        pokeFunctions('7', getItemId(element))
        pokeFunctions('0', getItemId(element))
    })
}
function* textTetris() {
    const tetris = ["T", "E", "T", "R", "I", "S"]
    yield "0"
    yield "0"
    yield "0"
    yield "0"
    const rainbow = pokeFunctions('rainbow')(1)
    while (true) {
        for (let i = 0; i < tetris.length; i++) {
            rainbow.next().value
            yield tetris[i];
        }
    }
}
