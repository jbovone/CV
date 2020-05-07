import bluePrintTemplates from './figures.js'

export function updateScore($matrix, score) {
    const updated = score + ''
    staticPrint($matrix, updated, 0, 4 - updated.length)
}
export function updateLines(lines, $matrix) {
    lines++
    staticPrint($matrix, ` Lines! ${lines} `, 0)
    return lines
}
export function updateLevel(level, $matrix) {
    level++
    staticPrint($matrix, ` Level: ${level} `, 21)
    return level
}
function staticPrint(matrix, text, row, column = 6) {
    let index = 0
    for (let i = column; i < text.length + column; i++) {
        matrix[row][i].textContent = text[index]
        index++
    }
}
export function getItemId(item) {
    return item.getAttribute('id').match(/\d+/).pop()
}
export function coolDown(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delay);
    })
}
export function rotationCicle(figure) {
    let states = Object.keys(bluePrintTemplates[figure].matrix)
    return function* () {
        while (true) {
            for (let i = 0; i < states.length; i++) {
                yield states[i]
            }
        }
    }
}
export function calibrateRotation(initialRotation, rotation) {
    let nextRotation
    while (!Boolean(initialRotation === nextRotation)) {
        nextRotation = rotation.next().value
    }
    nextRotation = rotation.next().value
    return nextRotation
}
export function pickNew(object, order) {
    if (order) {
        return order
    }
    const random = (range) => { return Math.floor(Math.random() * range) }
    return Object.keys(object)[random(Object.keys(object).length)]
}
export function ensureNoStuckfaddingClass() {
    if (document.querySelectorAll('.fadding')[0]) {
        document.querySelectorAll('.fadding').forEach(element => element.classList.remove('fadding'))
    }

}
export function boardDisplacement(Yindex, $matrix) {
    for (let i = Yindex; i > 1; i--) {
        let isFilledRow = false
        for (let j = 6; j < 17; j++) {
            $matrix[i][j].className = $matrix[i - 1][j].className
            $matrix[i][j].style.backgroundColor = $matrix[i - 1][j].style.backgroundColor
            if ($matrix[i + 1][j].className.match(/collider|wall/)) {
                isFilledRow = true
            }
        }
        if (isFilledRow === false) {
            break
        }
    }
}
