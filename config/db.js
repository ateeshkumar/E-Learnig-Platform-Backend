const mongoose = require('mongoose');
const connctDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect to mongoose database");
    } catch (error) {
        console.log(error);
    }
}
module.exports = connctDb