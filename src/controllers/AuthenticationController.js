const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {response} = require("express");

function jwtSignUser (user) {
    const ONE_HOUR = 60 * 60;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_HOUR
    });
};

module.exports = {
    async register (req, res) {
        try {
            const alreadyRegistered = await User.findOne({ where: { email: req.body.email } });
            if(alreadyRegistered){
                return res.status(400).send({
                    error: 'Email sa už používa, zvoľte si prosím iné.'
                });
            }
            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
            });
            const userJson = user.toJSON();
            res.status(201).send({
                message: 'Registrácia prebehla úspešne, môžete sa prihlásiť.',
                details: userJson
            });
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe zaregistrovať sa nastala chyba: ' + err
            })
        }
    },
    async login (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if(!user){
                return res.status(400).send({
                    error: 'Nesprávne prihlasovacie údaje!'
                });
            };

            const validPassword = await user.comparePassword(req.body.password, user.password);
            if(!validPassword){
                return res.status(403).send({
                    error: "Nesprávne prihlasovacie údaje!"
                });
            };
            const userJson = user.toJSON();
            delete userJson.password;
            res.cookie('auth_token', jwtSignUser(userJson), {
               maxAge: 3600,
               httpOnly: false,
               secure: false,
               SameSite: null,
            });
            res.status(200).send({
                id: response.id,
                details: userJson,
                message: 'Prihlásenie prebehlo úspešne.',
                auth_token: jwtSignUser(userJson)
            });
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe prihlásiť sa nastala chyba: ' + err
            })
        }
    },
    async logout(req, res){
        try {
            res.clearCookie('auth_token');
            res.status(200).send({
                message: 'Odhlásenie prebehlo úspešne.'
            });
        }
        catch (err){
            console.log(err);
            res.status(500).send({
                error: 'Pri snahe odhlásiť sa nastala chyba: ' + err
            })
        }
    }
};