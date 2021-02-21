<template>
  <v-footer app>
    <v-row>
      <v-col
          class="text-center"
          md="6"
          cols="12"
      >
        <v-avatar>
          <img
              src="https://avatars.githubusercontent.com/u/30075183?s=460&u=cd4d1f38c7557da8bd8d57a07032c9b69523503f&v=4"
              alt="Stanislav Baraniuk"
          >
        </v-avatar>
        <strong class="ml-5 author">Stanislav Baraniuk</strong>
      </v-col>
      <v-col
          class="text-center"
          md="6"
          cols="12"
      >
        <v-avatar
            color="orange"
        >
          <strong>
            <a
                class="text-decoration-none white--text"
                href="https://github.com/StanislavBaranuk"
                target="_blank"
            >
              Git
            </a>
          </strong>
        </v-avatar>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped lang="scss">
  .author {
    @media all and (max-width: 500px){
      & {
        font-size: 10px;
      }
    }
  }
</style>