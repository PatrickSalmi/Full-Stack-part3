const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log('Provide the password to see phonebook or password, name and number to add new person')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Patricks:${password}@cluster0.nwm6iul.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      const person = new Person({
        name: name,
        number: number,
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))

} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('phonebook:')

      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
    })

}


