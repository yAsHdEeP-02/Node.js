const mongoose = require('mongoose')
const fs = require('fs');
const Tour = require('./tourModel');
const dotenv = require('dotenv')

dotenv.config({ path: './nodejs/config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log(con.connections);
    console.log('DB connection successful');
})

const tours = JSON.parse(fs.readFileSync('./nodejs/tours-simple.json', 'utf-8'));

const deleteTours = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data deleted successfully");
    }
    catch (err) {
        console.log(err);
    }
}

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully loaded");
    }
    catch (err) {
        console.log(err);
    }
}
// deleteTours();
// importData();
// process.exit();
console.log(process.argv);
