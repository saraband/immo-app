import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  const db = client.db('immo-app')
  const app = express()

  // HTTP
  app.use(express.static(__dirname + './../../public'))
  app.use(bodyParser.json())
  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset='utf-8' />
          <link rel='stylesheet' href='style.css' />
          <link rel='stylesheet' href='bootstrap.min.css' />
        </head>
        <body>
          <div id='root'></div>
          <script src='/bundle.js'></script>
        </body>
      </html>
    `)
  })

  app.post('/list', (req, res) => {
    const {
      price,
      type
    } = req.body

    if(!price || !type) {
      res.status(500).end()
      return
    }

    console.log(req.body)

    let query = {
      $and: [
        {price: {$gt: price.from}},
        {price: {$lt: price.to}},
      ]
    }

    if(type !== 'all')
      query.$and.type = type

    db.collection('goods').find(query).toArray((err, results) => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    })
  })

  app.listen(8080);
})

/*
  const test = new Array(100)
  let id = 0
  const names = [
    'Lesia Mazzola',
    'Leonard Mendosa',
    'Vanetta Galvan',
    'Tera Neugebauer',
    'Mildred Dumond',
    'Telma Ferreri',
    'John Nobriga',
    'Keira Teachout',
    'Gino Livermore',
    'Alfredia Hardie',
    'Misha Cosio',
    'Ana Erb',
    'Mariel Gravitt',
    'Garret Ostrom',
    'Lea Baskins',
    'Helaine Traynor',
    'Lela Montemayor',
    'Janee Alejo',
    'Scotty Kimberly',
    'Sudie Dan'
  ]

  for(let i = 0; i < test.length; ++i) {
    test[i] = {
      id: i,
      date: getRandomInt(0, 1527184736),
      imgSrc: 'https://picsum.photos/200/300/?random',
      name: '',
      price: getRandomInt(500, 5000),
      area: getRandomInt(50, 400),
      name: names[getRandomInt(0, names.length - 1)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae lectus ac nibh elementum pulvinar.'
    }
  }

  db.collection('goods').insertMany(test, (err, result) => {
    console.log('yup')
    client.close();
  })
  */