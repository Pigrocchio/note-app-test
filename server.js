const express = require('express')
const bodyParser = require('body-parser')
require('dotenv')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        message: 
        'Welcome to note taking app list'
    })
})

app.use('/api/user', require)

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
