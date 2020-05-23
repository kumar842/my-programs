const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => res.send('Hello world!!!'))

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

app.use(function (err, req, res, next) {
console.error(err.stack)
res.status(500).send('Something broke!')
})
app.listen(PORT, () => console.log(`app started at http://localhost:${PORT}`))