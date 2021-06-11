import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController{

    async index(req, res){ // list reserves

        const { user_id } = req.headers;

        const reserve =  await Reserve.find({ user: user_id }).populate('house');

    }
    async store(req, res){
        
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;


        
        const house = await House.findById(house_id);
        if(!house){
            return res.status(400).json({ error: 'Casa inexistente!'});
        }

        if(house.status !== true){
            return res.status(400).json({ error: 'Casa indisponivel!'});
        }

        const user = await User.findById(user_id);

        if(String(user._id) === String(house.user)){
            return res.status(401).json({ error: 'Reserva não permitida!'});
        }



        const reserve = await Reserve.create({

            user: user_id,
            house: house_id,
            date, 
        })

        await reserve.populate('house').populate('user').execPopulate(); // add more information to  reserve 

        return res.json(reserve);
    }

    async destroy(req, res){

        const { reserve_id } = req.body;

        await Reserve.findByIdAndDelete({ _id: reserve_id});
        
        return res.status(204).send();

    }

}

export default new ReserveController();