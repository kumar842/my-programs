const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

const PORT = process.env.PORT || 3000
const app = express()

//logger middleware
//app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello world!!!....')
  //res.render .. templates.. pug, handle bars, ejs
  //res.json
  //res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//set a static folder
//app.use(express.static(path.join(__dirname, 'public')))

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//memebers API routes
app.use('/api/members', require('./routes/api/members'))

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(PORT, () => console.log(`app started at http://localhost:${PORT}`))