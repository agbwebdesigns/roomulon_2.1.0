const express= require('express');
const Hero= require('../../model/models/hero');

const router= new express.Router();

router.post('/heroes',async(req,res) =>  {
    const hero= new Hero(req.body);  //creates a new user with incoming json data

    try  {
        await hero.save()  //if the promise of user.save() is fulfilled then the next line will run, otherwise catch will run
        res.status(201).send({hero});  //setting the success status and sending the user data
    } catch(e)  {
        res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
    }

})

router.post('/heroes/read/:_id',(req,res) =>  {
    Hero.findById(req.params._id,(err,hero) =>  {
        if (!err)  {
            res.status(201).send({hero});
        }else{
            res.send(err);
        }
    })
})

router.patch('/heroes/update/:_id',(req,res) =>  {
    console.log(req.body);
    const updates= Object.keys(req.body);  //returns the keys of the Object being searched, in this case the request body
    console.log(updates);
    console.log(req.body);
    const allowedUpdates= ['playerHP','gold','baddieKills','medpacksUsed','playerTarget','weaponBonus','inventory'];
    const isValidOperation= updates.every((update) =>  allowedUpdates.includes(update));  //this is a template used as a check to make sure the update is valid

    if (!isValidOperation)  {
        return res.status(400).send({error:'Invalid Updates!'});
    }

    Hero.findByIdAndUpdate(req.params._id,req.body,async(err,hero) =>  {
        if (!err)  {
            try{
                updates.forEach((update) =>  {  //updates is an array of strings, so each string is the parameter being passed through
                    hero[update]= req.body[update];  //this sets the value being updated in user equal to the new value that is passed in, updating this way is necessary so that middleware can be used
                })
                await hero.save();
                res.status(201).send({hero});
            }catch(e)  {
                res.status(400).send(e);  //setting the http status code to 400 in the event of a client error, must be before send
            }
        } else {
            res.send(err);
        }
    });
})

router.patch('/heroes/pushinv/:_id',(req,res) =>  {  //add an item to hero inventory
    console.log('started!');
    const test="test";
    Hero.findByIdAndUpdate(req.params._id,{
        $push:{
            inventory:req.body
        }},{new:true},async(err,hero) =>  {
        if (!err)  {
            console.log('data pushed!');
            await hero.save();
            res.status(201).send({hero});
        } else {
            res.send(err);
        }
    });
})

router.patch('/heroes/popinv/:_id',(req,res) =>  {  //remove an item from hero inventory
    console.log('started!');
    Hero.findByIdAndUpdate(req.params._id,{
        $pop:{
            inventory:1
        }},{new:true},async(err,hero) =>  {
        if (!err)  {
            console.log('data pushed!');
            await hero.save();
            res.status(201).send({hero});
        } else {
            res.send(err);
        }
    });
})

router.delete('/heroes/delete/:_id',(req,res) =>  {
    Hero.findByIdAndRemove(req.params._id,(err,hero) =>  {
        if (!err)  {
            res.status(201).send({warning:"The hero has been deleted!"});
        }else{
            res.send(err);
        }
    })
})

module.exports=router;