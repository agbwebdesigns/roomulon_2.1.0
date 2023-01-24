const express= require('express');
const BigRat= require('../../models/bigrat');

const router= new express.Router();

router.post('/br/create',async(req,res) =>  {
    const bigrat= new BigRat();  //creates a new user with incoming json data

    try  {
        await bigrat.save()  //if the promise of user.save() is fulfilled then the next line will run, otherwise catch will run
        res.status(201).send({bigrat});  //setting the success status and sending the user data
    } catch(e)  {
        res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
    }

})

router.post('/br/read/:_id',(req,res) =>  {
    BigRat.findById(req.params._id,(err,br) =>  {
        if (!err)  {
            res.status(201).send({br});
        }else{
            res.send(err);
        }
    })
})

router.patch('/br/update/:_id',(req,res) =>  {
    console.log(req.body);
    const updates= Object.keys(req.body);  //returns the keys of the Object being searched, in this case the request body
    console.log(updates);
    console.log(req.body);
    const allowedUpdates= ['playerHP','playerTarget'];
    const isValidOperation= updates.every((update) =>  allowedUpdates.includes(update));  //this is a template used as a check to make sure the update is valid

    if (!isValidOperation)  {
        return res.status(400).send({error:'Invalid Updates!'});
    }

    BigRat.findByIdAndUpdate(req.params._id,req.body,async(err,br) =>  {
        if (!err)  {
            try{
                updates.forEach((update) =>  {  //updates is an array of strings, so each string is the parameter being passed through
                    br[update]= req.body[update];  //this sets the value being updated in user equal to the new value that is passed in, updating this way is necessary so that middleware can be used
                })
                await br.save();
                res.status(201).send({br});
            }catch(e)  {
                res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
            }
        } else {
            res.send(err);
        }
        
    });
})

router.delete('/br/delete/:_id',(req,res) =>  {
    BigRat.findByIdAndRemove(req.params._id,(err,br) =>  {
        if (!err)  {
            res.status(201).send({warning:"The hero has been deleted!"});
        }else{
            res.send(err);
        }
    })
})

module.exports=router;