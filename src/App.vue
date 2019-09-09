<template>
<!-- eslint-disable -->
  <div class = "container" id="app">
    <br>
    <Board/>
    <MovesPanel/>
<!--
    <b-container class="bv-example-row">
    <b-row>
      <b-col><MovesPanel/></b-col>
      <b-col cols="10" ><Board/></b-col>    
    </b-row>
    
</b-container>
    -->  
      
  </div>
</template>

<script>
import MovesPanel from './components/MovesPanel'
import Board from './components/Board'
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)


export default {
  name: 'App',
  components: {
    Board,
    MovesPanel
  }
}
</script>

<style scoped>

.container {    
		height: 80vw;
    width: 80vh;
	}
</style>
