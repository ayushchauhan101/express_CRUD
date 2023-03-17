const express = require('express')
const morgan = require('morgan')

const app = express();
app.use(express.json())

// app.use(morgan('tiny'))

// creating a custom token named body to log reuest body
morgan.token('body', (req, res) => JSON.stringify(req.body));

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

function generateId(){
  let newId =  persons.length > 0 ? Math.max(...persons.map(x => x.id)) : 0
  return newId + 1
}
// console.log(`the maximum id number is ${generateId()}`)


app.get('/', (req, res) => {
    res.send('homepage')
    console.log('homepage running...')
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people \n${new Date()}`)
  console.log('info is running...')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// get an entry
app.get('/api/persons/:id', (req, res) => {
    let my_id = Number(req.params.id)

    let result = persons.find(person => person.id === my_id)
    
    if(result){
        res.json(result)
    }else{
        res.sendStatus(404).end()
    }
    console.log('get persons by id number is running...')
})

// delete an entry
app.delete('/api/persons/:id', (req, res) => {
    let my_id = Number(req.params.id)
    
    // creating a shallow copy with entries that dosent match my_id
    persons = persons.filter(person => person.id !== my_id)

    res.sendStatus(204).end()

    console.log('delete entry is running...')
})

// create an entry
// app.post('/api/persons', morgan('tiny') ,(req, res) => {
app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :body') ,(req, res) => {
    const received_data = req.body

    // error if empty
    if(!received_data.name || !received_data.number){
      res.status(400).json({error: 'phone or number missing'})
    }

    // don't save same values again
    else if(persons.map(x => x.name).includes(received_data.name) || persons.map(x => x.number).includes(received_data.number))
    {
      console.log('name or number already in use, choose another')
      res.status(400).json({error: 'phone or number already in use'})
    }

    else{
      let new_entry = {
        id: generateId(),
        name: received_data.name,
        number: received_data.number,
      }

      persons = persons.concat(new_entry)
      res.json(persons)
      console.log(new_entry)
    }

    console.log('new entry is added...')
})


app.listen(8000, console.log('running on port 8000'))