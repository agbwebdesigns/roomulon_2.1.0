const express= require('express');
const Game= require('../../model/models/game.js');

const router= new express.Router();

router.post('/game', async (req,res) =>  {
    const game= new Game(req.body);

    try  {
        await game.save()  //if the promise of user.save() is fulfilled then the next line will run, otherwise catch will run
        res.status(201).send({game});  //setting the success status and sending the user data
    } catch(e)  {
        res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
    }
})

router.patch('/game/update/:_id',(req,res) =>  {
    console.log(req.body);
    const updates= Object.keys(req.body);  //returns the keys of the Object being searched, in this case the request body
    console.log(updates);
    console.log(req.body);
    const allowedUpdates= ['lastDirection','a','b','y','combatOnOff','keyRoom','currentRoom','roomPosition'];
    const isValidOperation= updates.every((update) =>  allowedUpdates.includes(update));  //this is a template used as a check to make sure the update is valid

    if (!isValidOperation)  {
        return res.status(400).send({error:'Invalid Updates!'});
    }

    Game.findByIdAndUpdate(req.params._id,req.body,async(err,game) =>  {
        if (!err)  {
            try{
                updates.forEach((update) =>  {  //updates is an array of strings, so each string is the parameter being passed through
                    game[update]= req.body[update];  //this sets the value being updated in user equal to the new value that is passed in, updating this way is necessary so that middleware can be used
                })
                await game.save();
                res.status(201).send({game});
            }catch(e)  {
                res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
            }
        } else {
            res.send(err);
        }
    });
})

module.exports=router;