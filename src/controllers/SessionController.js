import User from '../models/User'

/*
index: listagem de sessoes
store: Criar uma sessao -- 
show: Quando queremos listar uma UNICA sessao -- 
update: quando queremos alterar alguma sessao
destroy: quando queremos deletar uma sessao

*/ 

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