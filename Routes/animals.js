const express = require('express');
const router = express.Router();
const pool = require('../database/client');
const Joi = require('joi');

const schema = Joi.object({
    animalsname: Joi.string().min(1).required(),
    animalsage: Joi.string().required(),
    breedname:Joi.string(),
    basecolour: Joi.string()
}).unknown(true); 

router.get('/',async (req, res) => {
    console.log("el GET de los animales");
    let animals;

    const {animalId} = req.query;
    const {owner} = req.query;

    if(animalId && owner){
        (await pool).query("UPDATE animals SET owner_id = $1 WHERE id = $2", [owner, animalId], (err, qres) => {
            if(err){
                res.status(400).send(err);
            }
        });
    }
    (await pool).query("select a.id , a.animalsname , a.breedname , a.speciesname , a.animalsage , a.basecolour , u.fullname from animals a, users u where a.owner_id = u.id;", (err, qres) => {
        //console.log(qres.rows);
        if(err){
            res.status(400).send(err);
        }else{
            animals = qres.rows;
            res.render('animalsList', { animals });
        }
        
    });
});

router.get('/:id', async(req, res) => {
    console.log("el GET del animal");
    const {url} = req.query;
    const {adopt} = req.query;
    let selectedAnimal;

    (await pool).query("select a.id , a.animalsname , a.breedname , a.speciesname , a.animalsage , a.basecolour , u.fullname from animals a, users u where a.owner_id = u.id;",
    (err, qres) => {
        let animalsArr = qres.rows;
        for(let i = 0; i < animalsArr.length; i++){
            if(animalsArr[i].id == req.params.id){
                selectedAnimal = animalsArr[i];
            }
        }
        if(adopt){
            res.render('adoptfinal', {selectedAnimal});
        }else{
            res.render('animalInfo', {selectedAnimal});
        }
    });
});

router.post('/', async (req, res) => {
    console.log("el POST de animals");
    const joiRes = schema.validate(req.body);
    if(joiRes.error){
        return res.status(400).send(joiRes.error.details[0].message);
    }
    let newAnimal = req.body;
    ;(await pool).query(`INSERT INTO animals (id, animalsname, breedname, speciesname, animalsage, basecolour, owner_id)
    values ($1, $2, $3, $4, $5, $6, $7)`, [newAnimal.id, newAnimal.animalsname, newAnimal.breedname, newAnimal.speciesname, newAnimal.animalsage, newAnimal.basecolour, newAnimal.owner_id],
    (err, qres) => {
        if(err){
            console.log(err);
            console.log('aaaaaaaaaa malooooo');
        }else{
            console.log('aaaaaaaaa buenoooooo');
        }

        //console.log(qres);
    });
    res.status(200).send(newAnimal);
});

router.put('/:id', async (req, res) => {
    console.log("el PUT de animals");
    let idAnimal = req.params.id;
    const joiRes = schema.validate(req.body);
    if(joiRes.error){
        return res.status(400).send(joiRes.error.details[0].message);
    }
    let updateAnimal = req.body;
    //console.log(idAnimal, updateAnimal);
    (await pool).query(`UPDATE animals SET animalsname = $1,
                        breedname = $2,
                        speciesname = $3,
                        animalsage = $4,
                        basecolour = $5,
                        owner_id = $6
                        WHERE id = $7;`,[
                            updateAnimal.animalsname,
                            updateAnimal.breedname,
                            updateAnimal.speciesname,
                            updateAnimal.animalsage,
                            updateAnimal.basecolour,
                            updateAnimal.owner_id,
                            idAnimal
                        ],
    (err, qres) => {
       if(err){
           res.status(400).send('Animals PUT just died');
       }else{
            console.log(qres);
            res.status(200).send('It worked omg');
       }
    });
});

router.delete('/:id', async (req, res) => {
    console.log("el DELETE de animals");
    let idAnimal = req.params.id;
    let eliminatedAnimal;
    (await pool).query('SELECT * FROM animals WHERE id = $1;', [idAnimal], (err, qres) => {
        if(err){
            console.log('Cannot find the animal');
            res.status(404).send('The animal u are looking for doesnt exits');
        }else{
            eliminatedAnimal = qres.rows[0];
        }
    });
    (await pool).query(`DELETE FROM animals WHERE id = $1`, [idAnimal], (err, qres) =>{
        if(err){
            console.log('It is stil alive');
            res.status(400).send('It is still alive');
        }else{
            console.log(qres);
            res.status(200).send(eliminatedAnimal);
        }
    });
});


module.exports = router;