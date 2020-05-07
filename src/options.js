import checkLanguage from './options-language.js'
import state from './commodore/states-database.js'
import { checkOverflowY } from './commodore/DOM-mutators.js'
import { propoporcionalLinebreaksFix } from './integration.js'

document.querySelector('#options-button').onclick = function () {
    document.querySelector('.modal-options').style.display = 'grid'
    document.querySelector('#options-button').classList.add('options-active')

}
document.querySelector('#options-close').onclick = function () {
    document.querySelector('.modal-options').style.display = 'none'
    document.querySelector('#options-button').classList.remove('options-active')
}
function* background() {
    const $content = document.querySelector('.content')
    while (true) {
        yield $content.classList.contains('light-theme') ? $content.classList.remove('light-theme') : $content.classList.add('light-theme')
        yield $content.style.backgroundImage = 'none'
        yield $content.style.backgroundImage = `url("./img/background.svg")`
        yield $content.style.backgroundImage = `url("./img/background2.svg")`
        yield $content.style.backgroundImage = `url("./img/background.svg"), url("./img/background2.svg")`
    }
}
const backgroundCicle = background()
document.querySelector('#background-cicle').onclick = function () {
    backgroundCicle.next().value
}
const $commodoreStyle = document.querySelector('#commodore-option')
$commodoreStyle.onclick = function () {
    const $commodore = document.querySelector('.commodore')
    if ($commodore.classList.contains('old-style')) {
        $commodoreStyle.querySelector('.choice').textContent = applyByLanguage('Modern Style', 'Estilo Moderno')
        $commodore.classList.replace('old-style', 'modern-style')
        state('commodoreStyle', true)
        propoporcionalLinebreaksFix()
        checkOverflowY()
    } else {
        $commodoreStyle.querySelector('.choice').textContent = applyByLanguage('Commodore Classic', 'Commodore Clasico')
        $commodore.classList.replace('modern-style', 'old-style')
        checkOverflowY()
        state('commodoreStyle', false)
        propoporcionalLinebreaksFix()
    }
    function applyByLanguage(english, espaniol) {
        const lang = checkLanguage()
        if (lang === 'english') {
            return english
        }
        else {
            return espaniol
        }
    }
}
