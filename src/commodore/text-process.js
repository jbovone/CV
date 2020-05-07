import state from './states-database.js'
import pokeFunctions from './color-functions.js'
import dumpByKernalDictionary from './meta-dictionary.js'
import { setNewCharacter, setNewParagraph, checkOverflowY, overflowX } from './DOM-mutators.js'

export default async function kernalV2(archive = '', output = 'display', overrideValidation = null) {
    const v2Defaults = setKernalDefaults(output)
    let kernalV2Register = {
        paragraphCount: 0,
        delay: v2Defaults.delay,
        lineBreakDelay: v2Defaults.lbDelay,
    }
    let paragraphDataSets = checkDataSets()
    checkStyling()
    await printText()

    async function printText() {
        for (let i = 0; i < archive.length; i++) {
            let actualDelay = kernalV2Register.delay
            document.querySelector('.cursor').innerText += await setDelay()
            setNewCharacter()
            if (state('cancelRuntime')) {
                i = archive.length - 1
            }
            function setDelay() {
                if (archive[i] === "\n") {
                    kernalV2Register.paragraphCount++
                    kernalV2Register.paragraphCount
                    setNewParagraph(output)
                    actualDelay = kernalV2Register.lineBreakDelay
                    checkStyling()
                } else if (archive[i] === " ") {
                    wordFits(i)
                }
                return new Promise(resolve => setTimeout(() => {
                    resolve(archive[i])
                }, actualDelay))
            }
            checkOverflowY()
        }
    }
    function wordFits(i) {
        if (archive[i + 1] === ' ' || overflowX(" ")) {
            return
        } else if (overflowX(" " + archive.substring(i).match(/\S+/) + " ")) {
            setNewParagraph('display')
        }
    }
    function checkDataSets() {
        if (/\^\$meta/.test(archive)) {
            const archiveMeta = archive.split('^$meta/')[0]
            archive = archive.split('^$meta/')[1]
            const dataSets = dumpByKernalDictionary(archiveMeta)
            return dataSets
        }
    }
    function checkStyling() {
        let globalDataset = null
        if (paragraphDataSets) {
            let CUSTOM_STYLE = false
            paragraphDataSets.forEach(dataSet => {
                if (dataSet.toParagraph === kernalV2Register.paragraphCount) {
                    executeDataSets(dataSet)
                    CUSTOM_STYLE = true
                } else if (dataSet.isGlobal) {
                    globalDataset = dataSet
                }
            })
            if (!CUSTOM_STYLE) {
                deafaultStytling()
            }
            if (globalDataset && !CUSTOM_STYLE) {
                executeDataSets(globalDataset)
            }

        }
        function deafaultStytling() {
            pokeFunctions('0')
            pokeFunctions('7')
            kernalV2Register.delay = v2Defaults.delay
            kernalV2Register.lbDelay = v2Defaults.lbDelay
        }
    }
    function executeDataSets(dataSet) {
        if (dataSet.colorPokedSelection) {
            pokeFunctions(dataSet.colorPokedSelection)
        }
        if (dataSet.backgroundInverse) {
            pokeFunctions('9')
        }
        if (dataSet.caracterDelay !== undefined) {
            kernalV2Register.delay = dataSet.caracterDelay
        }
        if (dataSet.lineBreakDelay !== undefined) {
            kernalV2Register.lineBreakDelay = dataSet.lineBreakDelay
        }
        if (dataSet.system) {
            state('cancelRuntimeOveride', true)
        }
    }
    function setKernalDefaults(output) {
        const defaults = {}
        defaults.container = document.querySelector('.commodore')
        if (output === 'prompt') {
            defaults.delay = 0
            defaults.lbDelay = 0
        } else {
            defaults.delay = 40
            defaults.lbDelay = 40
        }
        return defaults
    }
    state('cancelRuntime', false)
    state('cancelRuntimeOveride', false)
    return new Promise(resolve => {
        resolve()
    })
}
