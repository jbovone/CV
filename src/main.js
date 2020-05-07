import commodore from './commodore.js'
import statsEngine from './stats.js'
import state from './commodore/states-database.js'
import './mobile-integration.js'
import './options.js'
import '../styles/styles.scss'

window.addEventListener('load', execTimmers);

function* theather() {
    yield callStackStats()
    yield presentCommodore()
    yield startCommodore()
    yield fixCard()
}
async function execTimmers() {
    const start = theather()
    const timersList = [200, 2000, 900, 900]
    for (let i = 0; i < timersList.length; i++) {
        await timers(i)
    }
    function timers(i) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(start.next().value)
            }, timersList[i])
        })
    }
}
function startCommodore() {
    document.querySelector('.commodore').classList.remove('commodore-on')
    if (document.querySelector('main').clientWidth > 800) {
        document.querySelector('.content').style.minHeight = '97vh'
    }
    document.querySelector('.content').style.transition = '0s'
    commodore(autoLoaders)
}
function presentCommodore() {
    const $commodore = document.querySelector('.commodore')
    if (document.querySelector('main').clientWidth < 800) {
        $commodore.classList.add('modern-style')
        state('commodoreStyle', true)
    } else {
        $commodore.classList.add('old-style')
    }
    $commodore.style.display = 'block'
}
function fixCard() {
    document.querySelector('.tarjeta').classList.replace('tarjeta-init', 'tarjeta-fixed')
}
function callStackStats() {
    const calls = {
        'javascript': 6,
        'css-3': 6,
        'html': 8,
        'react': 3
    }
    Object.entries(calls).forEach(stat => statsEngine(stat[0], stat[1]))
}
function autoLoaders(imputAccess, commandAccess, state, dump, setparagraph) {
    document.querySelectorAll('.diskette-icon').forEach(diskette => {
        diskette.onclick = async function () {
            if (state('onRuntime')) {
                return
            } else {
                await imputAccess(`LOAD"${diskette.id.split('-')[1].toUpperCase()}",8`, 'prompt')
                await commandAccess(dump())
                setparagraph('prompt')
            }
        }
    })
}
