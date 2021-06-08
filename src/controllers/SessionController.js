import User from '../models/User'

class SessionController{

   async store(req, res){
        
        const { email }  = req.body;
        
        //search in database
        let user = await User.findOne({ email });

        if(!user){
         user = await User.create({ email });
        }

        return res.json(user)
        
    }
}


export default new SessionController();