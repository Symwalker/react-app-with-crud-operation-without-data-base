import express from 'express'
import path from "path"
import cors from "cors"
const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

app.use('/', express.static(path.join(process.cwd(), "web", "build")));

let products = []; //we will use database intead of state data
app.post('/product', (req, res) => {
  const body = req.body
  console.log(body.name);
  if (body.name && body.email && body.number) {
    products.push({
      id: new Date().getTime(),
      name: body.name,
      email: body.email,
      number: body.number
    })

    res.status(200).send({
      message: "product added succesfully"
    })
    // console.log(products);
    return
  }
  res.status(400).send({
    message: "required parameters are missing"
  })

})
app.get('/products', (req, res) => {
  res.status(200).send({
    message: "products succesfully found",
    data: products
  })
})
app.get('/product/:id', (req, res) => {
  const id = req.params.id
  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      res.status(200).send({
        message: "product found",
        data: products[i]
      })
      isFound = true
      break;
    }
  }
  if (!isFound) {
    res.status(400).send({
      message: "product not found",
    })
    return;
  }
})

app.delete('/product/:id', (req, res) => {
  const id = req.params.id
  console.log(id);
  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(id)) {
      products.splice(i, 1)
      res.send({
        message: "product deleted succesfully",
        data:products
      })
      // console.log(products);
      isFound = true
      break;
    }
  }
  if (!isFound) {
    res.status(400).send({
      message: "delete fail: product not found",
    })
    return;
  }
})
app.put('/product/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  let isFound = false;

  if (!body.name || !body.email || !body.number) {
    res.status(400).send({
      message: "required parameters are missing"
    })
    return
  }
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(id)) {
      products[i].name = body.name
      products[i].email = body.email
      products[i].number = body.number
      res.status(200).send({
        message: "product edit succesfully",
        data:products
      })

      console.log(products);
      isFound = true
      break;
    }
  }

  if (!isFound) {
    res.status(400).send({
      message: "edit fail: product not found",
    })
    return;
  }
})
app.get('/weather', (req, res) => {
  console.log(req.query.city);
  res.send({
    message:"working"
  })
})
app.use('*', express.static(path.join(process.cwd(), "web", "build")))
// app.use har trha ke method me chalta he 
// console.log(path.dirname(__filename));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})