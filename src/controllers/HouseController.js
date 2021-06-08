import House from '../models/House'

class HouseController{

    async index(req, res){
        return res.json({
            ok:true

        })
    }

    async store(req, res){
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
}

export default new HouseController();