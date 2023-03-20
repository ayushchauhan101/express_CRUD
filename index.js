const express = require('express')
const app = express();

const Phone = require('./myMongoDB')

// custom error handler middleware
function errorHandler(error, request, response, next){  
    console.log(error.message)
    if(error.name === 'CastError'){
      return response.status(400).send({error: 'please check the id and its format'})
    }
    else if(error.name === 'ValidationError'){
      res.status(400).json({error: error.message})
    }

  next(error())
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('homepage')
    console.log('homepage running...')
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${Phone.length} people \n${new Date()}`)
  console.log('info is running...')
})

app.get('/api/persons', (req, res) => {
    Phone.find({}).then(x => {
      res.json(x)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Phone.findById(req.params.id)
      .then(person => {
        if(person){
          res.json(person)
          console.log(person)
        }
        else{
          res.status(404).json({error:'cannot find the person'})
        }
      })
      .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Phone.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(200).end()
      })
      .catch(error => next(error))
})

app.get('/api/persons/number/:number', (req, res, next) => {
    Phone.find({number: req.params.number})
      .then(result => {
        if(result.length > 0){
          res.json(result)
          console.log(result)
        }
        else{
          res.status(404).json({error:'cannot find the person'})
        }
      })
      .catch(err => next(err))
})

app.put('/api/person/:id', (req, res, next) => {

    const {name, number} = req.body

    Phone.findByIdAndUpdate(req.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
      .then(updatedPerson => {
        res.json(updatedPerson)
      })
      .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const received_data = req.body

    const new_entry = new Phone({
      name: received_data.name,
      number: received_data.number
    })

    new_entry.save()
      .then(savedPerson => {
        res.json(savedPerson)
      })
      .catch(err => next(err))
})

function unkownEndpoint(req, res){
  res.status(404).send({error: 'unkown address or endpoint'})
  console.log(req.body)
}

app.use(unkownEndpoint)
app.use(errorHandler)

app.listen(8000, console.log('running on port 8000'))