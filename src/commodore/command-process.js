import { indexSpanish, index as indexEnglish } from '../myFloppyDisk.js'
import checkLanguage from '../options-language.js'
import mathFunction from './math-dependency.js'
import kernalV2 from './text-process.js'
import state from './states-database.js'
import { resetStyling } from './DOM-mutators.js'

let index = indexEnglish
const errors = {
    command: '\n?SYNTAX ERROR.',
    file: '\n?FILE NOT FOUND  ERROR\n',
    noName: '\n?MISSING FILE NAME ERROR',
    empty: '?OUT OF DATA ERROR',
}
const responses = {
    seaching: `\nSEARCHING FOR `,
    loading: `\nLOADING\n`,
    run: 'READY.\nRUN\n\n',
    ready: '\nREADY.\n',
    list: 'READY.\nLIST\n'
}
const systemMeta = 'SY=1DE=15LD=0^$meta/'
const systemMetaB = 'SY=1DE=55LD=0^$meta/'
export default async function processCommand(prompt) {
    state('onRuntime', true)
    const validationData = evaluateCommand(prompt)
    if (validationData.isCommand === true && validationData.error === '') {
        await executePrompt(prompt, validationData.commandType)
        console.log('OFFSET-CODE-TIER-II')
        await kernalV2(systemMetaB + responses.ready)
    } else {
        await kernalV2(systemMeta + '\n' + validationData.error + responses.ready)
    }
    state('onRuntime', false)
}
function evaluateCommand(input = '') {
    const validationData = {
        isCommand: false,
        commandType: '',
        error: '',
    }
    if (input === '') {
        validationData.error = errors.empty
        return validationData
    }
    if (/^LOAD".*",8$/.test(input)) {
        if (input.split('"')[1] === '') {
            validationData.error = errors.noName
            return validationData
        }
        validationData.commandType = 'LOADER'
        validationData.isCommand = true
        return validationData
    }
    if (/^(PRINT)/.test(input)) {
        const mathCommand = input.split('PRINT')[1]
        if (!(/[a-z\d\*+-\/ ]/i.test(mathCommand)) || (/[\/*+.]{2}|[-]{2}|^[\/\*\.]|[\/*.+-]$|(\d+\.){2,}/.test(mathCommand))) {
            validationData.error = errors.command
            return validationData
        } else {
            validationData.commandType = 'MATH'
            validationData.mathCommand = mathCommand
            validationData.isCommand = true
            return validationData
        }

    }
    if (validationData.isCommand === false && validationData.error === '') {
        validationData.error = errors.command
        return validationData
    }
}
async function executePrompt(input = '', type = '') {
    switch (type) {
        case 'LOADER':
            const command = input.split('"')[1].toLowerCase()
            let MATCH = await searchingForCommand(command)
            if (MATCH) {
                await kernalV2(`NN=1LD=${Math.ceil(Math.random() * 3000)}^$meta/` + responses.loading)
                if (command === '$') {
                    await kernalV2(systemMetaB + responses.list)
                } else {
                    await kernalV2(systemMetaB + responses.run)
                }
                setLanguage()
                if (typeof index[command] === 'function') {
                    await index[command]()
                    return new Promise(resolve => {
                        resolve(resetStyling())
                    })
                }
                await kernalV2(index[command])
                return new Promise(resolve => {
                    resolve(resetStyling())
                })
            } else {
                return await kernalV2(systemMeta + errors.file)
            }
            async function searchingForCommand(command) {
                await kernalV2(systemMetaB + '\n' + responses.seaching + command.toUpperCase())
                return new Promise(resolve => {
                    resolve(
                        Object.keys(index).includes(command)
                    )
                })
            }
            function setLanguage() {
                const actualLanguage = checkLanguage()
                if (actualLanguage === 'english') {
                    index = indexEnglish
                } else if (actualLanguage === 'espaniol') {
                    index = indexSpanish
                }
            }
        case 'MATH':
            const response = mathFunction(validationData.mathCommand)
            await kernalV2('\n' + response)
            break;
    }
}
