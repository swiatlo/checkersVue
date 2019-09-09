<template>
    <div>      
      <br>  
      <div v-if="isGameOver"><strong>Game Over</strong></div>
      <template v-else>
        <div v-if="isWaiting">
            Computer's turn... <b-spinner type="grow" small label="Computer's turn..."></b-spinner>
        </div>
        <div v-else>Your move {{ moves }} </div>
      </template>
      <br>
      
      
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button @click="startGame(); ">Start a Game</b-button> 
            <b-button @click="compStartGame();">Computer Starts a Game</b-button>      
            <b-button variant="outline-secondary"  href="#"  v-b-toggle.accordion-1 >Rules</b-button>
            <b-button variant="outline-secondary"  href="#" v-b-toggle.accordion-2 >Tech</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            <b-card-text>A move consists of moving a piece one square diagonally to an adjacent unoccupied dark square. 
                Uncrowned pieces can move diagonally forward only; kings can move in any diagonal direction. 
                <strong>A jump</strong> consists of moving a piece that is diagonally adjacent an opponent's piece, to an empty square immediately beyond it in the same direction. 
                (Thus "jumping over" the opponent's piece.) Jumping is always <strong>mandatory</strong>. 
                Men can jump diagonally forward only; kings can jump in any diagonal direction. 
                A jumped piece is considered "captured" and removed from the game. Any piece, king or man, can jump a king.                  
                If after one jump, another piece is immediately eligible to be jumped it must be jumped.
                If more than one jump sequence is available, the player can <strong>choose </strong>which sequence of <strong>jumps</strong> to make.
                If a man moves into the last kings row on the opponent's side of the board, it is crowned as a king and gains the ability to move both forward and backward. 
                If a man jumps into the kings row, the current move terminates; the piece is crowned as a king but cannot jump back out as in a multi-jump, until another move.
                </b-card-text>

            </b-card-body>
        </b-collapse>

        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
                <b-card-text>
                    <strong>Front end</strong>: Vue.js, bootstrap. Hosted on GoDaddy server
                    <br>
                    <strong>Back end</strong>: AI program in Python, Django REST framework. Hosted on Amazon Elastic Compute Cloud (AWS-EC2)
                </b-card-text>
            </b-card-body>
        </b-collapse>

      </b-card>

      
    </div>
</template>

<!--

this.$forceUpdate(false);
--->
<script>
import { mapGetters } from 'vuex'

export default {    
    name: 'MovesPanel',
    data(){
        return {
          //  rules: 'dupa jasiu'
        }

    },
    computed: {
        ...mapGetters(['isGameOver', 'isWaiting' ]),
        moves(){ return this.$store.state.lastClick},        
    },
    methods:{
        startGame(){
            this.$store.commit('startFresh');              
        },
        compStartGame(){
            this.$store.commit('computerStartFresh');
        }
    }
}
</script>