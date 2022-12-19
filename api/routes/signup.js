const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const youtube = require('../model/youtube')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'GET request' })
})

router.post('/', (req, res) => {
    youtube.find({email: req.body.email})
        .then(result => {
            if(result.length === 0){
                const saltRounds = 10
                bcrypt.hash(req.body.password, saltRounds)
                    .then(result => {
                        const newUser = new youtube({
                            _id: new mongoose.Types.ObjectId(),
                            fname: req.body.fname,
                            lname: req.body.lname,
                            email: req.body.email,
                            password: result
                        })
                    
                        newUser.save()
                            .then(result => res.status(201).json({message: 'Signup Successful', user: result}))
                            .catch(err => res.status(500).json({message: 'Server Error', error: err}))
                    })
                    .catch(err => res.status(500).json( {message: 'Server Encountered an Error', error: err} ))
            }
            else{
                res.status(400).json({message: 'User already exists'})
            }
        })
        .catch(err => res.status(500).json({message: 'Server encountered an error', error: err}))
})

module.exports = router;