const express = require("express")
const router = express.Router()
const signUp = require('../models/signupmodel')

router.post('/signup', (request, response) => {
    if (
        request.body.name !== null ||
        request.body.email !== null ||
        request.body.password !== null ||
        request.body.name !== undefined ||
        request.body.email !== undefined ||
        request.body.password !== undefined ||
        request.body.name !== "" ||
        request.body.email !== "" ||
        request.body.password !== ""
    ) {
        const signedUpUser = new signUp({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        })
        signedUpUser.save()
            .then(data => {
                response.json({
                    message: "User Added Successfully!",
                    data: data
                })
            })
            .catch(err => {
                response.json(err)
            })
    }
    else {
        response.send("Invalid Request")
    }
})

router.post('/login', (request, response) => {
    if (
        request.body.email !== null ||
        request.body.password !== null ||
        request.body.email !== undefined ||
        request.body.password !== undefined ||
        request.body.email !== "" ||
        request.body.password !== ""
    ) {
        let email = request.body.email
        let password = request.body.password
        signUp.findOne({ email: email })
            .then(data => {
                console.log(data)
                if(data == null){
                    response.json({
                        message: "Email doesn't exist",
                        data: data,
                        code: 0
                    })
                }
                else if(data.password !== password){
                    response.json({
                        message: "Invalid Credentials",
                        // data: data,
                        code: 0
                    })
                }
                else if(data.email == email && data.password == password){
                    response.json({
                        message: "Login Success",
                        data: data,
                        code: 0
                    })
                }
                // else if(data === null){
                //     response.json({
                //         message: "No User Found!",
                //         code: 1
                //     })
                // }
            })
            .catch(err => {
                response.json(err)
            })
    }
    else {
        response.send("Invalid Request")
    }
})

module.exports = router