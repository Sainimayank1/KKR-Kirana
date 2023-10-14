import mongoose from "mongoose"


function connectDatabase()
{
    mongoose.connect(process.env.LINK,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ).then(()=>
    {
        console.log("Connect to database");
    }).catch((err)=>
    {
        console.log("Can't connect to database :"+err);
    })
}
    
    
export default connectDatabase;