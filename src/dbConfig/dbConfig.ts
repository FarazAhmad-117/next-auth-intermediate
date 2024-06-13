import mongoose from 'mongoose';


export default async function connectDb(){
    try {
        const con = await mongoose.connect(process.env.MONGO_URI!)
        const connection = con.connection;

        connection.on('connected',()=>{
            console.log('MongoDb Connected');
        })
            
        connection.on('error',(err)=>{
            console.log('MongoDb Connection error',err);
            process.exit(1);
        })

    } catch (error) {
        console.log('Error connecting DataBase ',error);
    }
}