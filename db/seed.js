var Restaurant = require('../models/restaurant.js');
exports.seedRestaurants = function seedRestaurants(){
    Restaurant.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Restaurant.create({
                "name": "Portos",
                "address": "123 Dank St.",
                "neighborhood": "Echo Park",
                "menu": [
                    {
                        "item": "Cheese Rolls",
                        "price": "$1.00",
                        "available": true
                    }
                ]
            }),
            Restaurant.create({
                "neighborhood": "East Los",
                "address": "456 Dankity-Dank St.",
                "name": "Night + Market",
                "__v": 0,
                "menu": [
                    {
                        "item": "Mango Sticky Rice",
                        "price": "$3.00",
                        "available": true
                    }
                ]
            }),
            Restaurant.create({
                "_id": "56a41990f9e28b7e1a1235c6",
                "neighborhood": "DTLA",
                "address": "789 Broadway St.",
                "name": "McDonalds",
                "__v": 0,
                "menu": [
                    {
                        "item": "McFlurry",
                        "price": "$2.00",
                        "available": true,
                        "_id": "56a41990f9e28b7e1a1235c8"
                    },
                    {
                        "item": "Apple Pie",
                        "price": "$1.00",
                        "available": false,
                        "_id": "56a41990f9e28b7e1a1235c7"
                    }
                ]
            })
        }
    })
}

