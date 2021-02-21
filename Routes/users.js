const express = require('express');
const router = express.Router();
const pool = require('../database/client');
const Joi = require('joi');

const schema = Joi.object({
    fullname: Joi.string().min(1).required(),
    age: Joi.number().min(0).required()
});

router.get('/', async (req, res) => {
    console.log("Users Get");
    (await pool).query('SELECT * FROM users', (err, qres) => {
        if(err){
            console.log('Usuarios Muertos', err);
            res.status(400).send('Cannot get Users');
        }else{
            res.status(200).send(qres.rows);
        }
    });
});

router.post('/', async (req, res) => {
    console.log("Users POST");
    const joiRes = schema.validate(req.body);
    if(joiRes.error){
        return res.status(400).send(joiRes.error.details[0].message);
    }
    let newUser = req.body;
    (await pool).query(`INSERT INTO users (id, fullname, age) values ($1, $2, $3)`, [newUser.id, newUser.fullname, newUser.age],
    (err, qres) => {
        if(err){
            res.status(400).send('Cannot insert new user', err);
        }else{
            res.status(200).send('User inserted');
        }
    })
});

router.put('/:id', async (req, res) => {
    console.log("Users PUT");
    const joiRes = schema.validate(req.body);
    if(joiRes.error){
        return res.status(400).send(joiRes.error.details[0].message);
    }
    let idUser = req.params.id;
    let updateUser = req.body;
    (await pool).query(`UPDATE users SET fullname = $1, age = $2 WHERE id = $3`,[updateUser.fullname, updateUser.age, idUser],
    (err, qres) => {
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(updateUser);
        }
    })
});

router.delete('/:id', async (req, res) => {
    console.log("Users Delete");
    let idUser = req.params.id;
    let deletedUser;
    (await pool).query(`SELECT * FROM users WHERE id = $1`, [idUser], (err, qres) =>{
        if(err){
            res.status(404).send('User not found');
        }else{
            deletedUser = qres.rows[0];
        }
    });
    (await pool).query(`UPDATE animals SET owner_id = 0 WHERE owner_id = $1`, [idUser], (err, qres) => {
        if(err){
            console.log(err);
            res.status(400).send('Error');
        }
    });
    (await pool).query(`DELETE FROM users WHERE id = $1`, [idUser], (err, qres) => {
        if(err){
            res.status(400).send('Error deleting user');
        }else{
            res.status(200).send(deletedUser);
        }
    })
});

module.exports = router;