const express = require('express')
const router = express.Router()

var GameModel = require('../models/GameModel')
var DeveloperModel = require('../models/DeveloperModel')

//Get all books
//URL: http://localhost:PORT/book/admin
router.get('/admin', async (req, res) => {
   let games = await GameModel.find({}).sort({ _id: -1 })
   res.render('game/admin', { games })
})

//URL: http://localhost:PORT/book/customer
router.get('/customer', async (req, res) => {
   let games = await GameModel.find({}).sort({ _id: -1 })
   res.render('game/customer', { games })
})

//Get book by id
//URL: http://localhost:PORT/book/detail/{id}
router.get('/detail/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   //return book data based on id
   let game = await GameModel.findById(id).populate('developer')
   console.log(game)
   //render view with book data
   res.render('game/detail', { game })
})

//Delete book by id
//URL: http://localhost:PORT/book/delete/{id}
router.get('/delete/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   try {
      //delete book based on id in url
      await GameModel.findByIdAndDelete(id)
      //show success message
      console.log('delete succeed !')
   } catch (err) {
      console.error(err)
      //res.send("Delete failed !")
   }
   //redirect to book list page
   res.redirect('/game/admin')
})

//URL: http://localhost:PORT/book/add
//render form "add book" for user to input
router.get('/add', async (req, res) => {
   let developers = await DeveloperModel.find({})
   res.render('game/add' , { developers })
})

//get input data from "add book" form & save to DB
router.post('/add', async (req, res) => {
   try {
      //get input data
      let game = req.body
      //save book to DB
      await GameModel.create(game)
      //show message to console
      console.log('Add book succeed !')
   } catch (err) {
      console.error (err)
   }

   //redirect to book list page
   res.redirect('/game/admin')
})

//URL: http://localhost:PORT/book/edit/{id}
//render form "edit"
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let game = await GameModel.findById(id)
   res.render('Game/edit', { game })
})

//process form "edit"
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let game = req.body
   try {
      await GameModel.findByIdAndUpdate(id, book)
      console.log('Edit game succeed !')
   } catch (err) {
      console.log("Edit game failed !")
      console.error(err)
   }
   res.redirect('/game/admin')
})

router.post('/search', async (req, res) => {
   let keyword = req.body.title
   let games = await GameModel.find({ title: new RegExp(keyword, "i")})
   res.render('game/admin', { games })
})

router.get('/sort/asc', async (req, res) => {
   let games = await GameModel.find().sort({ price: 1 })
   res.render('game/admin', { games })
})

router.get('/sort/desc', async (req, res) => {
   let games = await GameModel.find().sort({ price: -1 })
   res.render('game/admin', { games })
})

module.exports = router