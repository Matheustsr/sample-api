import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController{

    async index(req, res){ // getting a house filtering by status
        const { status } = req.query;

        const houses = await House.find({ status }) // find by 'status' 

        return res.json(houses);
    }

    async store(req, res){ // creating a house 

        const schema = Yup.object().shape({ // for validation
            description: Yup.string().required(),
            price: Yup.number().required(),         
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({error: 'Falha ao validar!'})
        }

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description: description,
            price,
            location,
            status,
        });
        
         
    }

    async update(req, res){ //update a house

        const schema = Yup.object().shape({ // for validation
            description: Yup.string().required(),
            price: Yup.number().required(),         
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        const { filename } = req.file
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({error: 'Falha ao validar!'})
        }


        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(String(user._id) !== String(houses.user._id)){ //Check if user is owner of property 

            return res.status(401).json({ error: 'Não autorizado!'});
        }
        
        await House.updateOne({ _id: house_id }, { // getting by ID passing in params
                
            user: user_id,
            thumbnail: filename,
            description: description,
            price,
            location,
            status,
            });

        return res.send();
            
    }

    async destroy(req, res){ // delete a house

        const { house_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(String(user._id) !== String(houses.user._id)){ //Check if user is owner of property 
            return res.status(401).json({ error: 'Não autorizado!'});
        }

        await House.findByIdAndDelete({_id: house_id});
        
        return res.status(204).send();


    }
}

export default new HouseController();