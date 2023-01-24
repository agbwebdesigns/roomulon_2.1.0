const express= require('express');
const BlueSlime= require('../../models/blueslime');

const router= new express.Router();

router.post('/bs/create',async(req,res) =>  {
    const blueslime= new BlueSlime();  //creates a new user with incoming json data

    try  {
        await blueslime.save()  //if the promise of user.save() is fulfilled then the next line will run, otherwise catch will run
        res.status(201).send({blueslime});  //setting the success status and sending the user data
    } catch(e)  {
        res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
    }

})

router.post('/bs/read/:_id',(req,res) =>  {
    BlueSlime.findById(req.params._id,(err,bs) =>  {
        if (!err)  {
            res.status(201).send({bs});
        }else{
            res.send(err);
        }
    })
})

router.patch('/bs/update/:_id',(req,res) =>  {
    console.log(req.body);
    const updates= Object.keys(req.body);  //returns the keys of the Object being searched, in this case the request body
    console.log(updates);
    console.log(req.body);
    const allowedUpdates= ['playerHP','playerTarget'];
    const isValidOperation= updates.every((update) =>  allowedUpdates.includes(update));  //this is a template used as a check to make sure the update is valid

    if (!isValidOperation)  {
        return res.status(400).send({error:'Invalid Updates!'});
    }

    BlueSlime.findByIdAndUpdate(req.params._id,req.body,async(err,bs) =>  {
        if (!err)  {
            try{
                updates.forEach((update) =>  {  //updates is an array of strings, so each string is the parameter being passed through
                    bs[update]= req.body[update];  //this sets the value being updated in user equal to the new value that is passed in, updating this way is necessary so that middleware can be used
                })
                await bs.save();
                res.status(201).send({bs});
            }catch(e)  {
                res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
            }
        } else {
            res.send(err);
        }
        
    });
})

router.delete('/bs/delete/:_id',(req,res) =>  {
    BlueSlime.findByIdAndRemove(req.params._id,(err,bs) =>  {
        if (!err)  {
            res.status(201).send({warning:"A Blue Slime has been deleted!"});
        }else{
            res.send(err);
        }
    })
})

module.exports=router;