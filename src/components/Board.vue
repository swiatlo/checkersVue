<template>
  <div>
    <!--
     <b-container fluid >
     <b-row v-for="a in arr()">
        <b-col  v-for="a in arr()" ><b-button></b-button></b-col>
    </b-row>
    </b-container>

    class="sqr"
      
-->


      <table>
        <tr v-for="n in chSize">
          <td v-for="m in chSize">
            <div v-if="makeCell(n,m) "><Cell :mynum=" makeNum(n,m)"></Cell></div>   
              
          </td>
        </tr>
      </table>    

    </div>
</template>

<script>
import Cell from './Cell.vue';

export default {
  name: 'Board',
  components: {Cell } ,
  data () {
    return {
      chSize: 8      
    }
  },
  methods:{
    makeCell(n,m) { return (n % 2) ^ (m % 2) },
    makeNum(n,m) {  return  Number((((n-1) *4) + (m )/ 2).toFixed(0) ) }
  }
}
</script>

<style scoped>
  td, tr {
    padding: 0px;
    margin: 0px;
  }

  table {
    height: 0px;
    width: 100%;
    padding-bottom: 100%;
    background-color: linen;
  }
  
  xtable {
    height: 80vmin;
    width: 80vmin;
    background-color: linen;
  }

</style>

