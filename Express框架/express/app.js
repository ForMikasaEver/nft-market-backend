const express = require('express')
const app = express()

app.set('view engine', 'pug');
app.set('views', './views');
const requestUrlLogger = (req, res, next) => {
    console.log('url is : ', req.url);
    next();
}

app.use(requestUrlLogger)
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/home', (req, res) => {
    res.render('home', {
        title: 'Home',
        message: 'Hello there!'
    })
})

const products = [
    {
        "name":"Television",
        "price":2000,
        "brand":"Xiaomi"
    },
    {
        "name":"Laptop",
        "price":5000,
        "brand":"Lenovo"
    }
]

app.get('/products/:brand',(req,res) => {
    const brand = req.params.brand
    const filteredProducts = products.filter(products => products.brand === brand)
    res.send(filteredProducts)
})

app.post('/products', (req, res)=> {
    const name = req.body.name;
    const price = req.body.price;
    const brand = req.body.brand;

    products.push({name, price, brand});

    res.json({
        "message": "New product created",
        "data": products
    })
})

const port = 3000;
app.listen(port,() => {
    console.log(`Server is running on ${port}...`)
})