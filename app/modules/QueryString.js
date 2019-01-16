const queryString = require('query-string')


class QueryString {
    static parse(qs) {
        // parse a query string to a state
        const parts = queryString.parse(qs)

        for (let part in parts) {
            if (parts[part].startsWith('(') && parts[part].endsWith(')')) {
                parts[part] = QueryString.parseItem(QueryString.parseArray(parts[part]))
            } else {
                parts[part] = QueryString.parseItem(parts[part])
            }
        }

        return parts
    }

    static save(state) {
        // stringify a state into a query string

        for (let category in state) {
            
        }

        // underscores are replaced with %5F
        // spaces are replaced with underscores
        // brackets `()` are replaced with %28 and %29 respectively
        // commas are replaced with %2C
    }

    static parseArray(array) {
        return JSON.parse(array
            .replace(/\(/g, '[')
            .replace(/\)/g, ']')
            .replace(/[a-z\=A-Z0-9]+/g, '"$&"'))
    }

    static parseItem(item) {
        if (item.constructor === Array) {
            return item.map(QueryString.parseItem)
        }

        if (item.includes('=')) {
            const parts = item.split('=')
            return { [parts[0]]: QueryString.parseItem(parts[1]) }
        }

        item = item.split('_').join(' ')

        return decodeURIComponent(item)
    }
}

// console.log(JSON.stringify(QueryString.parse("number=458943&string=a_random_string_has_appeared&array=(1,3,5,6)&mdarray=((1,2,3),(1,2,3),(gre,gre,awe))&obj=((a=2,b=2,c=3),(d=4,e=5,f=6))"), null, 4))

module.exports = QueryString