const router = require('express').Router()
const Subscriber = require('../models/subscriber.js')


// Get All
router.get('/', async (req, res) => {
     try{
         subscribers = await Subscriber.find()
         res.json(subscribers)
     } catch(err){
         res.status(500).json({message: err.message})
     }
    
})

// Get One
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

//New Subscriber
router.post('/', async (req, res)=> {
    const newSubscriber = new Subscriber({
        name: req.body.name,
        subscribedTo: req.body.subscribedTo
    })

    try{
        let sub = await newSubscriber.save()
        res.status(201).send(sub)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update Subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null)
    {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedTo != null)
    {
        res.subscriber.subscribedTo = req.body.subscribedTo
    }

    try{
        await res.subscriber.save()
        res.json(res.subscriber)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Delete Subscriber
router.delete('/:id', getSubscriber,  async (req, res) => {
    try{
        await res.subscriber.remove()
        res.json({message: "Subscriber Removed Successfully"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getSubscriber (req, res, next) {
    let subscriber
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: "Cannot Find Subscriber"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber
    next()
}



module.exports = router