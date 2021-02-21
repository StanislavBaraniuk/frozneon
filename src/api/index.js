import _ from 'axios'

_.defaults.baseURL = "https://registry.npmjs.org/";
_.defaults.headers = {
    'Content-Type': 'text/plain'
};

export const packages = (() => {
    function search(text, size, from) {
        return _.get('-/v1/search', {
            params: {
                ...typeof text === 'string' ? {text} : {},
                ...!isNaN(size) ? {size} : {},
                ...!isNaN(from) ? {from} : {}
            }
        })
    }

    function one(name) {
        if (typeof name === 'string') return _.get(name)
    }

    return { search, one }
})()
