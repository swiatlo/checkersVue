<template>             
        <b-button block squared class="cellbutton" :class="{'moveDone': isClicked(mynum) }" @click="cellClicked" >            
            <div class="overlay" style="margin-left:5%">{{mynum}}</div>
                   
            <div :class="[circleC, isEmpty(mynum) ? playerNoneCL : isWhite(mynum ) ? player1CL : player2CL]"></div>
            
            <template v-if="!isEmpty(mynum) & isKing(mynum)">
                <div class="overlay crossV"></div>
                <div class="overlay crossH"></div>
            </template>                                
        </b-button>       

        <!--circleC
</transition>  

:key="'cell' + mynum"
        name="fade" mode="out-in"

          <div v-if="!isPiece(mynum)" class="circle"></div>     
                                   
"isPiece(mynum)"
                    <div :class="[circleC, !isPiece(mynum)? noClass : isWhite(mynum) ? player1CL : player2CL]"></div>                                      
            <transition name="fade">
            </transition>
            
 :duration="1000"
        <template></template>
            </transition>
        <div v-else class="circle">  </div>
        
        -->
</template>


<script>
import { mapGetters } from 'vuex'

export default {    
    name: 'Cell',
    props: {mynum: Number},
    data(){
        return {
            //cellButton: 'cellbutton',
            circleC: 'circle',
            player1CL: 'player1', 
            player2CL: 'player2',
            playerNoneCL: 'playerNoneCL',
            noClass: ''
        }

    },
     computed: {
        ...mapGetters(['isKing','isEmpty','isWhite','isClicked' ])
        
   
    },
    methods:{
        cellClicked(){    
            this.$store.commit('cellClick', this.mynum);  
        }

    }
}
</script>

<style scoped>

    :root {
        --bkg-color: rgb(136, 127, 127);        
    }

    .cellbutton {        
        position: relative;
        background-color: rgb(136, 127, 127);/*var(--bkg-color);*/
        width: 100%;
        height: 0%;
        padding: 0%;
        margin: 0px;         
    }

    .moveDone {     
        outline: 3px dotted darkseagreen;
    }

    .moveDone:focus {     
        outline: 3px dotted darkseagreen;
    }

    .overlay {        
        position: absolute;
        display: block;        
        background-color: rgb(136, 127, 127); 
        z-index: 2;          
        border-radius: 30%;
        color: rgb(156, 157, 157);         
        font-size: 2.2vmin 
    }    

    .crossV {
        left: 35%;
        top: 47%;
        width: 30%;
        height: 6%;
    }

    .crossH {
        left: 47%;
        top: 35%;
        width: 6%;
        height: 30%;
    }

    .sqr {       
        display: block;       
        width: 100%;
        height: 0%;  
        margin: 0%;
        padding: 0%;
    }


    .circle {  
        width: 50%;
        height: 50%;         
        border-radius: 50%;
        margin: 25%;
        padding: 25%;
    }

    .player1 {
        background-color: skyblue;
        transition: 1s;  
        /*transition-property: background-color;*/
    }

    .player2 {
        background-color: khaki;
      /*  transition-property: background-color;*/
        transition: 1s;  
        
    }

    .playerNoneCL {
        background-color: rgb(136, 127, 127); 
        transition: 1s;           
        /*transition-property: background-color;        */
        visibility: hidden;
        
     }
    
</style>


