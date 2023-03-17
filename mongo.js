const mongoose = require('mongoose')

let uri = 'mongodb://127.0.0.1/'
let db_name = 'demo'

async function main(){
    console.log('trying to connect to ' + db_name)
    await mongoose.connect(`${uri}${db_name}`)
    console.log('connected to local DB: '+db_name)
}
main()

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

const User = mongoose.model('User', PhoneSchema)
