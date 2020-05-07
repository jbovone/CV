let register = {
    'characterNumber': 0,
    'language': 'english',
    'onRuntime': false,
    'cancelRuntime': false,
    'cancelRuntimeOveride': false,
    'onColorInvertion': false,
    'colorPoked': '',
    'requestedKeys': null,
    'keys': [],
    'commodoreStyle': false,
}

export default function state(property, state = null) {
    if (Object.keys(register).includes(property)) {
        if (state === null) {
            return register[property]
        }
        if (property === 'keys') {
            if (state === false) {
                return register.keys = []
            } else {
                return register.keys.push(state)
            }
        }
        if (typeof state === 'boolean' || typeof state === 'string') {
            register[property] = state
        } else if (typeof state === 'number') {
            register[property] += state
        }
        return register[property]
    }
    console.error('Invalid State', property)
}
