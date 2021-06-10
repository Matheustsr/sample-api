import House from '../models/House'

class HouseController{

    async index(req, res){ // getting a house filtering by status
        const { status } = req.query;

        const houses = await House.find({ status }) // find by 'status' 

        return res.json(houses);
    }

    async store(req, res){ // creating a house 
        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description: description,
            price,
            location,
            status,
        });
        
        return res.json(house);
    }

    async update(req, res){ //update a house

        const { location } = req.query;
        const { newLocation } = req.headers;
        const houses = await House.find({ location });

        const house = await House.updateOne({
            houses: newLocation,
        });
        return res.json(house);
            
    }

    async delete(req, res){ // delete a house

        const { location } = req.query;
        const housess = await House.find({ location });

        const houses = await House.deleteOne({ location }) // delete by 'location' 

        console.log('deletou')


    }
}

export default new HouseController();