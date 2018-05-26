import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import { getRandomInt } from './../utils/index'

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if(err) 
    console.error(err)

  const db = client.db('immo-app')
  const app = express()

  app.use(express.static(__dirname + './../../public'))
  app.use(bodyParser.json())
  app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset='utf-8' />
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

    console.log(`Requesting property list price=${price}, type=${type}`)

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

  app.post('/property', (req, res) => {
    const {
      id
    } = req.body

    if(id == 'undefined') {
      res.status(500).end()
      return
    }

    console.log(`Requesting property data id=${id}`)

    db.collection('goods').findOne({id: id}, (err, data) => {
      res.setHeader('Content-Type', 'application/json')
      console.log(data)
      res.end(JSON.stringify(data))
    })
  })

  app.listen(8080);
})

/*
  const houses = [
    {type: 'house', title: 'Nice house by the lake'},
    {type: 'house', title: 'Mansion in the suburbs'},
    {type: 'house', title: 'Breath taking house in Manhattan'},
    {type: 'appartment', title: 'Sunny appartment'},
    {type: 'appartment', title: 'Big appartment located near the centre'},
    {type: 'appartment', title: 'Great duplex in the heart of the city'},
  ]
  const test = new Array(25)
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
    const rd = getRandomInt(0, 5)
    test[i] = {
      id: i,
      date: getRandomInt(0, 1527184736),
      imgSrc: 'https://picsum.photos/350/200/?random',
      title: houses[rd].title,
      type: houses[rd].type,
      price: getRandomInt(500, 5000),
      area: getRandomInt(50, 400),
      owner: names[getRandomInt(0, names.length - 1)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae lectus ac nibh elementum pulvinar.'
    }
  }

  db.collection('goods').insertMany(test, (err, result) => {
    console.log('Done')
    client.close();
  })
  */