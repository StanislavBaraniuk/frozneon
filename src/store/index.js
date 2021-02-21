import Vue from 'vue'
import Vuex from 'vuex'
import packages from "@/store/packages";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        packages
    }
})