export default function mathFunction(input) {
    let math = ''
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== ' ') {
            math += input[i]
        }
    }
    if (/[a-z]/i.test(math)) {
        return kernalV2(0, c64Outputs.display)
    }
    while (/([\+-]?\d+)(\.\d+)?[\*\/]([\+-]?\d+)(\.\d+)?/.test(math)) {
        math = math.replace(/([\+-]?\d+)(\.\d+)?[\*\/]([\+-]?\d+)(\.\d+)?/, (match) => {
            if (match.split('*')[1]) {
                return Number(match.split('*')[0]) * Number(match.split('*')[1])
            }
            if (match.split('/')[1]) {
                return Number(match.split('/')[0]) / Number(match.split('/')[1])
            }
        })
    }
    math = math.match(/([\+-]?[\d]+)([\.][\d]+)?/g).reduce((acc, arg) => {
        return Number(acc) + Number(arg)
    })
    return math + ''
}
