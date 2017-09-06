const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/meuporg-js', function (err, db) {
  if (err) throw new Error('mongodb connection failed')
  console.log('Connected correctly to server')
  insertDocuments(db, () => {
    db.close()
  })
})

function insertDocuments (db, callback) {
  var collection = db.collection('users')
  collection.insertMany([{
    username: 'romain',
    password: 'azepoi',
    coords: {
      x: 100,
      y: 100
    }
  }], function (err, result) {
    if (err !== null) {
      console.log('error inserting documents')
      return
    }
    callback(result)
  })
}
