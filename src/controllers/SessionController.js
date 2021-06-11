import User from '../models/User'
import * as Yup from 'yup';


class SessionController{

   async store(req, res){

    const schema = Yup.object().shape({ // for validation
        email: Yup.string().email().required(),
    });
        const { email }  = req.body;

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({error: 'Falha ao validar!'})
        }
        
        //search in database
        let user = await User.findOne({ email });

        if(!user){
         user = await User.create({ email });
        }

        return res.json(user)
        
    }


}


export default new SessionController();