import mongoose from "mongoose"
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

/**
 * @roles
 *  0 : superadmin =  can add, delete, view, update
 **/

const UserSchema = new Schema({

  name: {
      firstName: String,
      middleName: String,
      lastName: String
  },

  email:{
    type: String
  },

  password:{
    type: String
  },

  role : {
    type : Number
  },

  date_created : {
    type : Date,
    default : function(){
      return Date.now();
    }
  }
})



UserSchema.pre('save',async function(next) {
  let user = this;
  if( !user.isModified('password')) return next();
  let hashedpassword  = await bcrypt.hash(user.password, 10);
  user.password = hashedpassword
  next();
});

UserSchema.methods.matchPasswords = async function (candidatePassword) {
  let isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}



const UserModel = module.exports = mongoose.model('User',UserSchema);