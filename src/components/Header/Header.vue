<template>
  <v-app-bar
      app
      color="#fcb69f"
      src="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:img="{ props }">
      <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      ></v-img>
    </template>
    <v-container>
      <v-spacer/>
      <v-text-field
          hide-details
          v-model="search"
          solo
          label="Type to search"
          clearable
          prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer/>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    search: ''
  }),
  watch: {
    search: function (v) {
      this.$emit('search', v)
    }
  }
}
</script>

<style scoped>

</style>