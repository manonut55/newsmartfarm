<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      :right="right"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile href="/" >
            <v-list-tile-action>
              <v-icon x-large color="indigo">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>หน้าหลัก</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <router-link to= "DataTable" class="btnlink">
          <v-list-tile href="/" >
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          </router-link>
        <router-link to= "FertilityData" class="btnlink">
          <v-list-tile @click="" >
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>ค่าNPK<br>FertilityData</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
             </router-link>
          <v-list-group
            v-model="item.active"
            v-for="item in items"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            
          </v-list-group>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="grey darken-4"
    >
    <v-toolbar-title  class="title white--text pl-2 pt-1.5" v-text="title" ></v-toolbar-title>
          <v-spacer></v-spacer>
      <v-toolbar-side-icon 
      @click.stop="drawer = !drawer"
      class="title amber--text "></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SmartFarm',
      items: [
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
              { ring: 'FertilityGraph' },
              { ring: 'FertilityGraph' },
              { ring: 'FertilityGraph' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="css">
  .media{
    height: 100%;
    margin: 0;
    }
  .btnlink {
  text-decoration: none;
    }
/* v-content{
   background-image: url('w3css.gif');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center ; 
} */
</style>