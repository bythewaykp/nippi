let mongoose = require('./mongoose')

const URI = "mongodb+srv://kphere:KPmongoDB@nippi.ezvsgxc.mongodb.net/test"
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, config);

let a = async ()=>{
    
    
    const Kitten = mongoose.model('Kitten2', new mongoose.Schema({
        all: String
    }));
    const kitte =  await Kitten.find()
    console.log(kitte)
}
a()

// const silence = new Kitten({ all: 'Silence3' });
// await silence.save()
// console.log(silence.all);

