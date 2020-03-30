import UserModel from '../user/user.model';
import { decode } from '../../utils/jwt'

class MeController {
    
    _getMe = async (req,res,next) => {
        let authorization =  req.headers.authorization;
        let jwt = authorization.split('Bearer ')[1]
        let decodeData = await decode(jwt);
        let user = await UserModel.findOne({_id:decodeData._id});
        res.json(user)
    }

}


export default new MeController();