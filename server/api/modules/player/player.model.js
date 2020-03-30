import mongoose from "mongoose"
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({

  name: {
      firstName: String,
      middleName: String,
      lastName: String
  },

  email:{
      type: String
  },

  username:{
        type: String
  },
  password:{
        type: String,
        default: 'admin123'
  },

  balance: {
      type : Number,
      default: 0
  },

  currency: {
    type : String,
    default:'USD'
  },

  active: {
    type: Boolean,
    default: true
  },

  address: {
    street: {type: String},
    unitNo: {type: String},
    city: {type: String},
    province: {type: String},
    country: {type: String},
    postalCode: {type: String}
  },

  phone : {
    type: String
  },

  affiliate: {
    type: String
  },

 provider: {
      providerName: String,
      providerLogo: String
  },

  date_created : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})

PlayerSchema.pre('save',async function(next) {
  let user = this;
  if( !user.isModified('password')) return next();
  let hashedpassword  = await bcrypt.hash(user.password, 10);
  user.password = hashedpassword
  next();
});

PlayerSchema.methods.matchPasswords = async function (candidatePassword) {
  let isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

const PlayerModel = module.exports = mongoose.model('Player',PlayerSchema);