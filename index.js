// import express from 'express'
const express = require("express");
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/todo', (req, res) => {
  res.send([ {id:1, title:'learn NodeJs-Express'}]);
})

app.listen(3000)