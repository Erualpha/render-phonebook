const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please add password: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const adddName = process.argv[3]
const addNumber = process.argv[4]

const url = `mongodb+srv://erualpha:${password}@cluster0.y71nfoe.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const newPerson = new Person({
  name: adddName,
  number: addNumber,
})

if (process.argv.length > 4) {
    newPerson.save().then(result => {
        console.log(`added ${adddName} number ${addNumber} to phonebook`)
    mongoose.connection.close()
    })
}

if (process.argv.length < 4) {
    Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(newPerson => {
        console.log(`${newPerson.name} ${newPerson.number}`)
    })
    mongoose.connection.close()
})
}