import mongoose from "mongoose"
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const BetSchema = new Schema({

player : {
    type : ObjectId,
    ref : 'Player'
},

betTable : [String],

tableResults: [String],

betAmount: Number,

WinAmount: Number,

LoseAmount: Number,

active:{
  type: Boolean,
  default: true
},

date_created : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

const BetModel = module.exports = mongoose.model('Bets',BetSchema);