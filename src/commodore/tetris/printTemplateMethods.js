import { coolDown, getItemId } from './partials.js'
import pokeFunctions from '../color-functions.js'

export function isTerminalColliding(i, j, $matrix) {
    if ($matrix[i][j].classList.contains("collider")) {
        return true
    }
}
export function isYColliding(i, j, $matrix) {
    if (/collider/.test($matrix[i + 1][j].className) || /wall/.test($matrix[i + 1][j].className)) {
        console.log('positionY invalidation')
        return false
    }
    return true
}
export function onFreeze(i, j, $matrix) {
    if (/collider/.test($matrix[i][j].className) || /wall/.test($matrix[i][j].className)) {
        return false
    }
    return true
}
export function isXColliding(i, j, $matrix) {
    if (/collider/.test($matrix[i][j].className) || /wall/.test($matrix[i][j].className)) {
        return false
    }
    return true
}
export async function fading(i, j, $matrix) {
    $matrix[i][j].classList.add('fadding');
    await coolDown(40)
    $matrix[i][j].classList.remove('fadding');
    return true
}
export async function printFigure(i, j, $matrix, color) {
    $matrix[i][j].classList.add('figure')
    pokeFunctions(color, getItemId($matrix[i][j]))
    pokeFunctions('9', getItemId($matrix[i][j]))
}
