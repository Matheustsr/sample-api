import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true // to show a client side content (mongoose)
    }
});

HouseSchema.virtual('thumbnail_url').get(function(){

    return `http://localhost:3333/files/${this.thumbnail}`; // create a sample URL to get image
})

export default model('House', HouseSchema);