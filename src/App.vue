<template>
  <v-app app>
    <Header @search="changeSearch"/>
    <v-main>
      <Table
          :items="packages"
          :totalItemsLength="packagesTotalCount"
          :page="page"
          :loading="tableLoading"
          @change-page="changePage"
          @select-item="updateSelectedPackageInfo"
      />
      <Modal :show.sync="modal"/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Table from "@/components/Table";
import {mapGetters} from 'vuex'
import Modal from "@/components/Modal";

export default {
  name: 'App',
  components: {Modal, Footer, Table, Header},
  computed: {
    ...mapGetters('packages', ['packages', 'selectedPackage', 'packagesTotalCount', 'tableLoading'])
  },
  data: () => ({
    page: 1,
    search: '',
    modal: false
  }),
  methods: {
    updatePackagesKit() {
      this.$store.dispatch('packages/searchPackages', {text: this.search, page: this.page - 1})
    },
    updateSelectedPackageInfo(data) {
      this.$store.dispatch('packages/selectPackage', data.name).then(() => this.modal = true)
    },
    changeSearch(text) {
      this.search = text;
      this.page = 1;
      this.updatePackagesKit();
    },
    changePage(page) {
      this.page = page;
      this.updatePackagesKit();
    }
  }
}
</script>

<style>
</style>
