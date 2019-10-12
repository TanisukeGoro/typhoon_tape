<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item href="https://twitter.com/okita_kamegoro">
          <v-list-item-avatar>
            <v-img :src="twitterIcon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>作者Twitter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="font-weight-black white--text"
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019 Okita Kamegoro</span>
    </v-footer>
  </v-app>
</template>

<script>
import twitterIcon from '~/assets/images/twitter_icon.jpg'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      twitterIcon,
      items: [
        {
          icon: 'mdi-apps',
          title: '作者Twitter',
          to: 'https://twitter.com/okita_kamegoro'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '養生テープじぇねれーたー'
    }
  }
}
</script>
