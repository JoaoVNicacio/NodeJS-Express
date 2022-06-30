// Requerimento do Express e body-parser:
const express = require('express')
const bodyParser = require('body-parser')

// Requerimento do userRoute:
const userRoute = require('./routes/userRoute')

// Preparando app, porta padrão do localhost e bodyParse do conteúdo para urlencoded:
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))

// Passando o Express para o userRoute:
userRoute(app)

app.get('/', (req, res) => res.send('Hello world from Express!'))
app.listen(port, () => console.log('API running in the port: 3000'))