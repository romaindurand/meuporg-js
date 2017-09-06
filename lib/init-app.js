const MongoClient = require('mongodb').MongoClient
const express = require('express')
const utils = require('./utils')

module.exports = (app) => {
  MongoClient.connect('mongodb://localhost:27017/meuporg-js', (err, db) => {
    if (err) throw new Error('mongodb connection failed')
    console.log('Connected correctly to mongodb')
    app.set('dbUsers', db.collection('users'))
  })
  app.app = app
  app.set('onlineUsers', [])
  app.use(express.static('client'))
  app.use(require('body-parser').urlencoded({ extended: false }))
  Object.assign(app, utils)
}
