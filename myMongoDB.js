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

// there are two same object ids but using only .id instead of ._id
PhoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = Phone
