const { Product } = require('../models');
const {response} = require("express");
const slugify = require('slugify');

module.exports = {
    async index (req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).send({
                products: products
            });
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe zobraziť všetky produkty nastala chyba: ' + err
            })
        }
    },
    async getProductByID (req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send({
                products: product
            });
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe zobraziť produkt nastala chyba: ' + err
            })
        }
    },
    async post (req, res) {
        try {
            const alreadyExists = await Product.findOne({ where: {
                name: req.body.name, slug: slugify(req.body.name)
            }});
            if(alreadyExists){
                return res.status(400).send({
                    error: 'Product s týmto názvom už existuje, zvoľte prosím iný názov.'
                });
            };

            const newProduct = await Product.create({
                name: req.body.name,
                slug: slugify(req.body.name),
                price: req.body.price,
            });

            res.status(201).send({
                message: 'Produkt bol úspešne pridaný.'
            });
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe pridať produkt nastala chyba: ' + err
            })
        }
    },
    async put (req, res) {
        try {
            const dontExists = await Product.findOne({ where: {
                id: req.params.id
            },
        });
            if(!dontExists){
                return res.status(400).send({
                    error: 'Product s týmto ID sa nenašiel.'
                });
            };

            const updateProduct = await Product.update({
                name: req.body.name,
                slug: slugify(req.body.name),
                price: req.body.price,
            },
            { returning: true, where: {id: req.params.id} });

            res.status(200).send({
                message: 'Produkt bol úspešne aktualizovaný.'
            });
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe aktualizovať produkt nastala chyba: ' + err
            })
        }
    },
    async delete (req, res) {
        try {
            const deleteProduct = await Product.destroy({
                where: {
                    id: req.params.id,
                }
            })

            if(!deleteProduct){
                return res.status(404).send({
                    error: 'Product s týmto ID sa nenašiel.'
                })
            }
            res.status(200).send({
                message: 'Produkt bol úspešne odtránený.'
            })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Pri snahe odstrániť produkt nastala chyba: ' + err
            })
        }
    }

};