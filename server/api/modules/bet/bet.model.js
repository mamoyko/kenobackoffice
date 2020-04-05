import mongoose from "mongoose"
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const BetSchema = new Schema({

draw: {
  hit_count : {
    type : Number,
  },
  
  reward : {
    type : Number,
  },
  
  keno_count : {
    type : Number,
  },
  
  keno_drawn: {
    type: [Number]
  },
  
  keno_played : {
    type: [Number]
  }
},

betAmount : {
  type : Number
},

winner: {
  type: Boolean
},

player : {
  type : ObjectId,
  ref : 'Player'
},

date_created : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

const BetModel = module.exports = mongoose.model('Bets',BetSchema);