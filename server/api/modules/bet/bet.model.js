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

transaction_id: {
  type: String
},

active: {
  type: Boolean,
  default: true
},

balance: {
  type: Number,
  default:0
},

points:{
  type: Number,
  default:0
},

date_created : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

const BetModel = module.exports = mongoose.model('Bets',BetSchema);