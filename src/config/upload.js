import multer, { diskStorage } from 'multer';
import path from 'path';

export default{

    storage: multer.diskStorage({

        destination: path.resolve(__dirname, '..', '..', 'uploads'), // get the path of the file
        filename: (req, file, cb) =>{

            const ext = path.extname(file.originalname); // get ext original file name
            const name = path.basename(file.originalname, ext);// concat with extension

            cb(null, `${name}-${Date.now()}${ext}`)
        },
    })
};