<template>
  <v-container fluid>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        hide-default-footer
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        :loading="loading"
        :mobile-breakpoint="900"
        @click:row="selectTableItem"
    >
      <template v-slot:footer>
        <div class="text-center" v-if="pagination.last_page > 0">
          <v-pagination
              :value="pagination.current_page"
              class="my-4"
              :length="pagination.last_page"
              :server-items-length="pagination.last_page"
              @input="changePage"
              total-visible="12"
          ></v-pagination>
        </div>
      </template>
      <template v-slot:item.version="{ value }">
        {{value}}
      </template>
      <template v-slot:item.keywords="{ value }">
        <v-chip
            v-for="(item, i) in value"
            :key="i"
            class="ma-2"
        >
          {{ item }}
        </v-chip>
      </template>
      <template v-slot:item.publisher="{ value }">
        <div>
          <p class="mb-1">{{ value.username }}</p>
          <p class="mb-1">{{ value.email }}</p>
        </div>
      </template>
      <template v-slot:item.links="{ value }">
        <v-row
            class="pa-5"
            align="center"
            justify="space-around"
        >
          <v-btn class="ma-1" x-small v-if="'npm' in value" :href="value.npm" target="_blank">
            NPM
          </v-btn>
          <v-btn class="ma-1" x-small v-if="'homepage' in value" :href="value.homepage" target="_blank">
            HOME PAGE
          </v-btn>
          <v-btn class="ma-1" x-small v-if="'repository' in value" :href="value.repository" target="_blank">
            REPOSITORY
          </v-btn>
          <v-btn class="ma-1" x-small v-if="'bugs' in value" :href="value.bugs" target="_blank">
            BUGS
          </v-btn>
        </v-row>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td class="pa-3" :colspan="headers.length" v-if="item.keywords">
          <v-chip
              v-for="(keyword, i) in item.keywords"
              :key="i"
              class="ma-2"
          >
            {{ keyword }}
          </v-chip>
        </td>
        <td class="pa-3" :colspan="headers.length"  v-else>
          <p class="mb-0">No data available</p>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Table",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    totalItemsLength: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pagination() {
      return {
        last_page: Math.round(this.$props.totalItemsLength / 10),
        current_page: this.$props.page,
        total: this.$props.totalItemsLength
      }
    }
  },
  data: function () {
    return {
      headers: [
        { text: 'Name', value: 'name', width: '85px' },
        { text: 'Scope', value: 'scope', width: '85px' },
        { text: 'Version', value: 'version', width: '85px' },
        { text: 'Description', value: 'description', width: '85px' },
        { text: 'Publisher', value: 'publisher', width: '85px' },
        { text: 'Links', value: 'links', width: '85px' },
        { text: 'Keywords', value: 'data-table-expand', align: 'center', sortable: false, width: '85px' },
      ],
      expanded: [],
      singleExpand: true,
    }
  },
  methods: {
    changePage(page) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      this.$emit('change-page', page)
    },
    selectTableItem(data) {
      this.$emit('select-item', data)
    }
  }
}
</script>

<style scoped>

</style>