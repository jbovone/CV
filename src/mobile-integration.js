import { setNewParagraph, setNewCharacter } from './commodore/DOM-mutators.js'

const $keyboardBtn = document.querySelector('.keyboard-button')
const $keyboardModal = document.querySelector('#keyboard-modal')
$keyboardBtn.onclick = function () {
    $keyboardModal.classList.remove('hidden')
    $keyboardBtn.classList.add('hidden')
}
export default function keyboardMobile(set = false) {
    const row1 = "1234567890".split("").concat(['\n '])
    const row2 = "qwertyuiop".split("").concat(['RESTORE'])
    const row3 = "asdfghjklñ".split("").concat(['RETURN'])
    const row4 = "zxcvbnm.,".split("").concat(['SHIFT']).concat(['CTRL'])
    const row5 = ['pad', "  ", 'RUN']
    const grid = [row1, row2, row3, row4, row5]

    const rowS1 = `!"#$%&/()=`.split("").concat(['\n '])
    const rowS2 = "-_{}-^/-+*".split("").concat(['RESTORE'])
    const rowS3 = "¬|¿?[]ç´:@".split("").concat(['RETURN'])
    const rowS4 = "ªº¨`'¡¿.,".split("").concat(['SHIFT']).concat(['CTRL'])
    const rowS5 = ['pad', "  "]
    const gridShift = [rowS1, rowS2, rowS3, rowS4, rowS5]

    if (set) {
        setKeyBoard()
        return
    } else {
        return keyboardShiftLayout
    }
    function setKeyBoard() {
        function* specials() {
            const special = ["c64logo", "restore", "return", "special", "special CTRL", 'pad', "space", "run"]
            for (let i = 0; i < special.length; i++) {
                yield special[i]
            }
        }
        const specialKeys = specials()
        let rows = 0
        while (rows < 5) {
            setNewParagraph('keyboard', null, 'keyboard-row')
            for (let i = 0; i < grid[rows].length; i++) {
                if (grid[rows][i].length > 1) {
                    setNewCharacter(grid[rows][i].toUpperCase(), `key ${specialKeys.next().value}`)
                } else {
                    setNewCharacter(grid[rows][i].toUpperCase(), 'key')
                }
            }
            document.querySelector('.active').style.margin = `0 ${rows * 2}%`
            rows++
        }
    }
    function keyboardShiftLayout(shift = true) {
        const gridDefault = grid
        const gridSHIFT = gridShift
        if (shift) {
            convert(gridSHIFT)
        } else {
            convert(gridDefault)
        }
        function convert(grid) {
            const $keys = document.querySelectorAll('.key')
            let rows = 0
            let j = 0
            while (rows < grid.length) {
                for (let i = 0; i < grid[rows].length; i++) {
                    $keys[j].innerText = grid[rows][i].toUpperCase()
                    j++
                }
                rows++
            }
        }
    }
}
