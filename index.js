const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyParser.json())

morgan.token('data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const amount = persons.length
    const date = new Date()
    response.send(
        `
    <div>phonebook has info for ${amount} people</div>
    <div>${date}</div>
    `
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 10000)

    const person = request.body
    person.id = id

    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'must include name and number'
        })
    }

    if (persons.find(p => p.name.toLowerCase() === person.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})