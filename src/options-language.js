import commodoreState from './commodore/states-database.js'

const $language = document.querySelector('.language select')
let languageCurrent = 'english'
const dictionary = {
    english: ["Technologies", "Contact", "Stats", "Hobbies", "Programmer", "LANGUAGE", "BACKGROUNDS", 'COMMODORE STYLE'],
    espaniol: ["Tecnologias", "Contacto", "Proficiencias", "Pasatiempos", "Programador", "LENGUAJE", "CICLO DE FONDOS", 'ESTILO COMMODORE']
}
export default function checkLanguage(index = false) {
    if (index) {
        return dictionary[languageCurrent][index]
    }
    return languageCurrent
}
$language.onchange = function () {
    if ($language.value !== languageCurrent) {
        languageCurrent = $language.value
    }
    if (commodoreState('onRuntime')) {
        commodoreState('cancelRuntime', true)
    }
    setLanguage()
}
function setLanguage() {
    document.querySelectorAll('.side-tag, .tarjeta #programmer, .lang-option, .background-option, .style-option').forEach((element, i) => {
        element.textContent = dictionary[languageCurrent][i]
    })
    document.querySelector('#diskette-hello').style.backgroundPosition = (() => {
        if (languageCurrent === 'english') {
            return '-110px 0px'
        } else {
            return '-219.83px 0px'
        }
    })()
}

