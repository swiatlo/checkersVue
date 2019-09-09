import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const cBLACK = 'b';
const cWHITE = 'w';
const cNONE = ' ';
let initStore = NaN;
let checkStore = {
    state:{
        //lastClickCell: 0,
        canProcessMove:false,
        lastClick: [0],
        moves: [[[],[21, 17]],
                [[],[22, 17]],
                [[],[22, 18]],
                [[],[23, 18]],                
                [[],[23, 19]],                
                [[],[24, 19]], 
                [[],[24, 20]]                
                ],
        board: [cBLACK, cBLACK, cBLACK, cBLACK, 
                cBLACK, cBLACK, cBLACK, cBLACK, 
                cBLACK, cBLACK, cBLACK, cBLACK,
                cNONE, cNONE, cNONE, cNONE,
                cNONE, cNONE, cNONE, cNONE,

                cWHITE, cWHITE, cWHITE, cWHITE,  //.toUpperCase()
                cWHITE, cWHITE, cWHITE, cWHITE, 
                cWHITE, cWHITE, cWHITE, cWHITE
                //cNONE, cNONE, cNONE, cNONE,
                //cNONE, cNONE, cNONE, cNONE
 
//cNONE, cNONE, cNONE, cNONE,                cNONE, cNONE, cNONE, cNONE,
                ],
        lockBoard: false,

    },
    getters:{
        isKing: (state) => (i)=> { return state.board[i-1] === state.board[i-1].toUpperCase() },
        isEmpty: (state) => (i) => { return state.board[i-1] === cNONE;  },
        isWhite: (state) => (i) => { return state.board[i-1].toLowerCase() === cWHITE },
        isClicked: (state) => (i) => { return state.lastClick.includes(i)},
        isGameOver: (state) => { return state.moves.length == 0 },  // state.moves == []; 
        isWaiting: (state) => { return state.lockBoard }
    },
    mutations:{
        
        transitBoard(state){
            for (let index =1; index <= state.lastClick.length; index++) {
                let bigN = state.lastClick[index] > state.lastClick[index-1] ?  state.lastClick[index] :   state.lastClick[index-1];
                let smallN = state.lastClick[index] < state.lastClick[index-1] ?  state.lastClick[index] :   state.lastClick[index-1];
                if ((bigN - smallN ) === 9 ){
                    state.board[ smallN +5 ] = cNONE;
                } 
                else if ((bigN - smallN ) === 7 )
                {
                    state.board[ smallN +4 ] = cNONE;
                }
               // const element = array[index];
                
            }
            state.board[state.lastClick.pop()-1] = state.board[ state.lastClick[0] -1]; 
            state.board[state.lastClick[0]-1] = cNONE;                           
            state.lastClick=[];    
        },        
        startFresh(state){
            store.state.board = JSON.parse(JSON.stringify(initStore.board));
            store.state.moves = JSON.parse(JSON.stringify(initStore.moves));
        },
        computerStartFresh(state){
            this.commit('startFresh');            
            this.dispatch('sendMyMove', store.state.board);            
        },
        cellClick(state, i) {
            if (state.lockBoard)
                return false;
            if (!state.moves.some(elementM => {
                //console.log(elementM);
                let element = elementM[1] //moves array
                //console.log(element);
                if (element[0] === i ) {            
                    state.lastClick = [i];
                    return true;
                } else
                {                   
                    let lastClickLen = state.lastClick.length;         
                    let clickValid = true;
                    for (let step = 0; step <lastClickLen; step++) {
                        clickValid = clickValid & ( element[step] === state.lastClick[step] );
                    }
                    clickValid = clickValid &  ( element[lastClickLen] === i );
                    if (clickValid) {
                        state.lastClick.push( i );
                        if (element.length === (lastClickLen +1) )
                            {                            
                                //this.commit('transitBoard');
                                if (elementM[0].length ===0){
                                    elementM[0] = state.board 
                                    elementM[0][ state.lastClick[0]-1 ] = cNONE
                                    elementM[0][ state.lastClick[1]-1 ] = cWHITE
                                }
                                this.dispatch('sendMyMove', elementM[0] );
                            }
                        return true;
                    }           
                }                
                return false;
            }) )
            {
                state.lastClick=[];
            } 
        }
    },
    actions:{
        sendMyMove(context, payload){
            //context.commit('mutationName')
            //st = this
            store.state.lockBoard = true;                                                
            store.state.board = payload
            axios.get('http://ec2-35-176-108-247.eu-west-2.compute.amazonaws.com/xxx/board/'+payload.join('')+'/?format=json')            
            .then(response => {
              if (response.data === 'game over'){
                store.state.moves = []
              }
              else{
                store.state.board = response.data.position
                store.state.moves = response.data.nextboards 
              }

              store.state.moves.forEach(element => {
                element[1].forEach((v,idx)=> element[1][idx] = v+1 )                  
              });              
              store.state.lockBoard = false;
              store.state.lastClick=[];    
            })
            .catch(e => {
              //this.errors.push(e)
              console.log( e )
            })

      
        }

    }

};

export const store = new Vuex.Store( checkStore) ;
initStore = JSON.parse(JSON.stringify(store.state)); 

//class CheckStore extends Vuex.Store();

