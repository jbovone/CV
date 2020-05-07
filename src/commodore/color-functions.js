import state from './states-database.js'

const colorPallette = {
    1: '#000000',
    2: '#ececec',
    3: '#9d5c40',
    4: '#83b7c9',
    5: '#ac639d',
    6: '#67b178',
    7: '#8977ce',
    8: '#c9d882',
}
const backgroundDefault = '#5c46ad'
//const styleElement = document.head.appendChild(document.createElement("style"));

export default function
    pokeFunctions(number, override = null, hex = false) {
    const target = override || state('characterNumber')

    const $character = document.querySelector(`#C${target}`)
    if (number > '0' && number < '9') {
        // styleElement.innerHTML = `.prompt .cursor::after {
        //     background-color: ${colorPallette[number]} !important;
        // }`
        $character.style.color = `${colorPallette[number]}`
        state('colorPoked', number)
    }
    if (number === '9' || state('onColorInvertion') === true) {
        $character.style.backgroundColor = colorPallette[state('colorPoked')]
        $character.style.color = `${backgroundDefault}`
        state('onColorInvertion', true)
    }
    if (number === '0') {
        $character.style.backgroundColor = ''
        $character.style.color = colorPallette[state('colorPoked')]
        state('onColorInvertion', false)
    }
    if (hex) {
        return colorPallette[number]
    }
    if (number === 'rainbow') {
        return function* rainbow(exclude = 0) {
            const rainbow = Object.keys(colorPallette)
            while (true) {
                for (let i = 3; i <= rainbow.length - exclude; i++) {
                    pokeFunctions([i] + '');
                    yield colorPallette[i]
                }
            }
        }
    }
}
