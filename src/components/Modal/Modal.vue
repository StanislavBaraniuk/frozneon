<template>
  <v-dialog
      :value="show"
      width="500"
      @click:outside="$emit('update:show', false)"
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Package: {{ 'name' in selectedPackage ? selectedPackage.name : '' }}
      </v-card-title>

      <v-card-text>
        <h5>Author</h5>
        <span>Name: </span><p>{{ 'author' in selectedPackage ? selectedPackage.author.name : ''}}</p>
        <span>Email: </span><p>{{ 'author' in selectedPackage ? selectedPackage.author.email : ''}}</p>

        <h5>Description</h5>
        <pre>{{ 'description' in selectedPackage ? selectedPackage.description : '' }}</pre>

        <h5>Dist tags</h5>
        <div class="flex" v-if="'dist-tags' in selectedPackage">
          <v-chip v-for="(item, key) in selectedPackage['dist-tags']" :key="key">
            <p class="ma-0">{{key}} {{item}}</p>
          </v-chip>
        </div>

        <h5>Keywords</h5>
        <div class="flex" v-if="'keywords' in selectedPackage">
          <v-chip class="ma-2" v-for="(item, key) in selectedPackage.keywords" :key="key">
            <p class="ma-0">{{item}}</p>
          </v-chip>
        </div>

        <h5>Maintainers</h5>
        <div class="flex" v-if="'maintainers' in selectedPackage">
          <v-card class="ma-2" v-for="(item, key) in selectedPackage.maintainers" :key="key">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-text>{{item.email}}</v-card-text>
          </v-card>
        </div>

        <h5>License</h5>
        <p>{{ 'license' in selectedPackage ? selectedPackage.license : '' }}</p>

        <h5>Readme</h5>
        <div ref="readme"></div>

        <h5>Time</h5>
        <div class="flex"  v-if="'time' in selectedPackage">
          <v-chip v-for="(item, key) in selectedPackage['time']" :key="key">
            <p class="ma-0">{{key}} {{item}}</p>
          </v-chip>
        </div>

        <v-row
            class="pa-5"
            align="center"
            justify="space-around"
        >
          <v-btn class="ma-1" x-small v-if="'homepage' in selectedPackage" :href="selectedPackage.homepage" target="_blank">
            HOME PAGE
          </v-btn>
          <v-btn class="ma-1" x-small v-if="'repository' in selectedPackage" :href="selectedPackage.repository.url" target="_blank">
            REPOSITORY {{selectedPackage.repository.type}}
          </v-btn>
          <v-btn class="ma-1" x-small v-if="'bugs' in selectedPackage" :href="selectedPackage.bugs.url" target="_blank">
            BUGS
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import {markdown} from 'markdown';
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('packages', ['selectedPackage'])
  },
  watch: {
    'selectedPackage': {
      deep: true,
      handler: function (v) {
        const refs = this.$refs,
              markdownToHtml = this.markdownToHtml;
        setTimeout(() => {if (refs['readme']) refs['readme'].innerHTML = markdownToHtml(v.readme)}, 0)
      }
    }
  },
  methods: {
    markdownToHtml(mdContent) {
      return markdown.toHTML(mdContent);
    }
  },
}
</script>

<style scoped lang="scss">
  .frame {
    height: 100%;
    width: 100%;
    border: none;
  }
</style>