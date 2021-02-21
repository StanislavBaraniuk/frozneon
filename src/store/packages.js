import { packages } from '@/api'

const state  = {
    packages: {
        objects: [],
        total: 0
    },
    selectedPackage: {},
    tableLoading: false
}

const getters = {
    packages(state) {
        return state.packages.objects
    },
    packagesTotalCount(state) {
        return state.packages.total
    },
    selectedPackage(state) {
        return state.selectedPackage
    },
    tableLoading(state) {
        return state.tableLoading
    }
}

const mutations = {
    setPackages(state, value) {
        state.packages.objects = value?.objects?.map((item) => {
            return {
                name: item.package.name,
                scope: item.package.scope,
                version: item.package.version,
                description: item.package.description,
                keywords: item.package.keywords,
                publisher: item.package.publisher,
                links: item.package.links,
            }
        });
        state.packages.total = value?.total;
    },
    setSelectedPackage(state, value) {
        state.selectedPackage = value
    },
    setTableLoading(state, value) {
        state.tableLoading = value
    }
}

const actions = {
    searchPackages({commit}, {text, page = 0}) {
        commit('setTableLoading', true);
        return packages.search(text, 10, 10 * page).then(r => {
            commit('setPackages', r.data)
            commit('setTableLoading', false);
        })
    },
    selectPackage({commit}, name) {
        commit('setTableLoading', true);
        return packages.one(name).then(r => {
            commit('setSelectedPackage', r.data)
            commit('setTableLoading', false);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
}