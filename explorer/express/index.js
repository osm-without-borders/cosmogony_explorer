const express = require('express')
const path = require('path')
const app = express()

const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/vues`)

app.use(express.static(path.resolve(`${__dirname}/../src`)))
app.use(express.static(path.resolve(`${__dirname}/../dist`)))

app.get('/zone/:id', (req, res) => {
  res.render('index')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get((error, res, req, next) => {
  res.json(error)
})

app.listen(PORT, () => console.log(`Cosmogony listening on port ${PORT}`))
