const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const axios = require('axios')
const path = require('path')
const port = 8080

let users = [
    {
        id : 1,
        name : 'abc',
        gender : 'male',
        email : 'email@email.com',
        status : 'Active'
    }
]
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', './layouts/layout')
app.get('/public-api/users', async (req, res) => {
    const users = getUsers()
    console.log(typeof(users))
    res.render('users', { users })
})

app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
})

app.use((req, res, next) => {
    res.status(404).send('Not found dude!')
})
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})

const getUsers = (page_num=1) => {
    axios.get(`https://gorest.co.in/public/v2/users?per_page=20&page=${page_num}`)
      .then(response => {
        const users = response.data.data;
        console.log(users);
      })
      .catch(error => {
        console.error(error);
      });
  };
  