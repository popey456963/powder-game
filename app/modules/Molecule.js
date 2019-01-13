const moleculesById = {
    1: require('../molecules/Particle'),
    2: require('../molecules/Empty'),

    100: require('../molecules/Block'),
    101: require('../molecules/Concrete'),
    102: require('../molecules/Indestructible'),

    200: require('../molecules/Powder'),
    201: require('../molecules/Sand'),
    202: require('../molecules/Snow'),
    204: require('../molecules/Salt'),
    205: require('../molecules/Sage'),
    206: require('../molecules/Soil'),

    300: require('../molecules/Liquid'),
    301: require('../molecules/Oil'),
    302: require('../molecules/Water'),

    400: require('../molecules/Explosive')
}

const moleculesByName = Object.keys(moleculesById).reduce((p, v) => ({
    ...p,
    [moleculesById[v].name]: moleculesById[v]
}), {})

const namesById = Object.keys(moleculesById).reduce((p, v) => ({
    ...p,
    [v]: moleculesById[v].name
}), {})

const idsByName = Object.keys(moleculesById).reduce((p, v) => ({
    ...p,
    [moleculesById[v].name]: v
}), {})

class Molecule {
    static fromId(id) {
        return moleculesById[id]
    }

    static fromName(name) {
        return moleculesByName[name]
    }

    static nameFromId(id) {
        return namesById[id]
    }

    static idFromName(name) {
        return idsByName[name]
    }

    static nameFromClass(_Molecule) {
        return _Molecule.name
    }

    static idFromClass(_Molecule) {
        return Molecule.idFromName(_Molecule.name)
    }
}

for (let name in moleculesByName) {
    Molecule[name] = moleculesByName[name]
}

module.exports = Molecule
