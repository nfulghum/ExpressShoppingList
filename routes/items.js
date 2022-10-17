const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")


// GET the list of items
router.get("/items", (req, res, next) => {
    return res.json({ items })

})

// POST to the list of items in JSON format
router.post("/items", (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("Name and Price are required", 400);
        const newItem = { name: req.body.name, price: req.body.price }
        items.push(newItem)
        return res.status(201).json({ added: newItem })
    } catch (e) {
        next(e)
    }
})

// GET single item name and price
router.get("/items/:name", (req, res, next) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        return res.json({ item: foundItem })
    } catch (e) {
        next(e)
    }
})

// PATCH should modify a single items name/price
router.patch("/items/:name", (req, res, next) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404)
        }
        foundItem.name = req.body.name
        return res.json({ item: foundItem })
    } catch (e) {
        next(e)
    }
})

// DELETE should delete a specific item from an array
router.delete("/items/:name", (req, res, next) => {
    try {
        const foundItem = items.findIndex(item => item.name === req.params.name)
        if (foundItem === -1) {
            throw new ExpressError("Item not found", 404)
        }
        items.splice(foundItem, 1)
        return res.json({ message: "Deleted" })
    } catch (e) {
        next(e)
    }
})

module.exports = router;