const mongoose = require('mongoose')

let uri = 'mongodb://127.0.0.1/'
let db_name = 'demo'

// connection string
async function main(){
    console.log('trying to connect to ' + db_name)
    await mongoose.connect(`${uri}${db_name}`)
    console.log('connected to local DB: '+db_name)
}
main()

// Schema declaration
const PhoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    number: {
        type: Number,
        required: true,
    },
})

// model declaration
const Phone = mongoose.model('Phone', PhoneSchema)

let new_entry =
[{ 
    "name": "Arto Hellas", 
    "number": "040123456"
},
{ 
    "name": "Ada Lovelace", 
    "number": "39445323523"
},
{ 
    "name": "Dan Abramov", 
    "number": "1243234345"
},
{ 
    "name": "Mary Poppendieck", 
    "number": "39236423122"
}]

// modelname.insertMany(arr, function(error, docs) {});

async function saveEntry(){
try{
        await Phone.insertMany(new_entry)
        console.log(new_entry)
    }catch(err){
        console.log(err)
    }
    
}

saveEntry()
