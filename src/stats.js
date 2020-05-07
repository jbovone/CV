export default async function createStatBar(tecnhology, skillpoints) {
    const MAX_STAT = 10
    const $tagName = document.createElement('span')
    $tagName.innerText = tecnhology
    $tagName.id = tecnhology
    document.querySelector('.skills-container').appendChild($tagName)
    let myStatBar = []

    for (let i = 0; i < MAX_STAT; i++) {
        const $value = document.createElement('div')
        document.querySelector('.skills-container').appendChild($value)
        $value.className = 'value'
        myStatBar[i] = $value
    }
    await setActive(skillpoints, myStatBar)
    async function setActive(skillpoints, myStatBar) {
        for (let i = 0; i < skillpoints; i++) {
            await delay()
            if (window.navigator.userAgent.match(/Firefox/)) {
                myStatBar[i].classList.add(`${tecnhology}`)
            } else {
                myStatBar[i].classList.add(`${tecnhology}`, 'active-stat')
            }

        }
    }
    function delay(item) {
        return new Promise(resolve => { setTimeout(() => { resolve(item) }, 100) })
    }
}
