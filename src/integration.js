import state from "./commodore/states-database.js"

export function propoporcionalLinebreaksFix() {
    const $tetris = document.querySelectorAll('.board')
    if (!$tetris[0]) {
        return
    }
    if (state('commodoreStyle')) {
        $tetris.forEach(element => element.textContent = '    ')
    } else {
        $tetris.forEach(element => element.textContent = ' ')
    }
}
