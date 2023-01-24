const express= require('express');
// const { captureRejectionSymbol } = require('jsdom/lib/jsdom/virtual-console');
const Rooms= require('../../model/models/rooms.js');

const router= new express.Router();

router.post('/room/create',async(req,res) =>  {
    const room= new Rooms();  //creates a new user with incoming json data

    try  {
        await room.save()  //if the promise of user.save() is fulfilled then the next line will run, otherwise catch will run
        res.status(201).send({room});  //setting the success status and sending the user data
    } catch(e)  {
        res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
    }

})

router.post('/room/read/:_id',(req,res) =>  {
    Rooms.findById(req.params._id,(err,room) =>  {
        if (!err)  {
            res.status(201).send({room});
        }else{
            res.send(err);
        }
    })
})

router.patch('/room/update/:_id',(req,res) =>  {
    const updates= Object.keys(req.body);  //returns the keys of the Object being searched, in this case the request body
    console.log(updates);
    console.log(req.body);
    const allowedUpdates= ['north','south','east','west'];
    const isValidOperation= updates.every((update) =>  allowedUpdates.includes(update));  //this is a template used as a check to make sure the update is valid

    if (!isValidOperation)  {
        return res.status(400).send({error:'Invalid Updates!'});
    }

    Rooms.findByIdAndUpdate(req.params._id,req.body,async(err,room) =>  {
        if (!err)  {
            try  {
                updates.forEach((update) =>  {  //updates is an array of strings, so each string is the parameter being passed through
                    room.roomConnectionsArray[update]= req.body[update];  //this sets the value being updated in user equal to the new value that is passed in, updating this way is necessary so that middleware can be used
                })
                await room.save();        
                res.send({room});  //if the user is found
            }catch(e)  {
                res.status(400).send(e);  //if invalid information is passed
            }
        } else {
            res.send(err);
        }
        
    });
})

router.patch('/room/updatemapposition/:_id',(req,res) =>  {
    console.log('started!');
    Rooms.findByIdAndUpdate(req.params._id,{
        $push:{
            mapPosition:req.body
        }},{new:true},async(err,room) =>  {
        if (!err)  {
            console.log('data pushed!');
            console.log('Rooms updated!');
            try {
                await room.updateMany();
                await room.save();
                res.status(201).send({room});
            } catch(e) {
                res.send({e:"updateMany failed!"});
            }
        } else {
            console.log("error!")
            res.send(err);
        }
    });
})

module.exports=router;