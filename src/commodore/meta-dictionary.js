export default function dumpByKernalDictionary(meta = '') {
    let dataSets = meta.split('&').map(dataSet => {
        let dictionary = {}
        dataSet.match(/[A-Z]{2}=\d+/g).forEach(instruction => {
            const values = instruction.split('=')
            switch (values[0]) {
                case 'NN': return dictionary.toParagraph = Number(values[1])
                case 'CP': return dictionary.colorPokedSelection = `${values[1]}`
                case 'BI': return dictionary.backgroundInverse = Boolean(values[1])
                case 'DE': return dictionary.caracterDelay = Number(values[1])
                case 'LD': return dictionary.lineBreakDelay = Number(values[1])
                case 'SY': return dictionary.system = Boolean(values[1])
            }
        })
        if (!dictionary.toParagraph) {
            dictionary.isGlobal = true
        }
        return dictionary
    })
    return dataSets
}
