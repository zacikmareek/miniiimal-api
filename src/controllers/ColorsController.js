const { Product } = require('../models')
const { Colors } = require('../models')
const colors_upload = require("../middleware/colors_upload");

module.exports = {
    async index (req,res){
        try{
            const colors = await Colors.findAll({ where: { productId: req.params.product_id }});

            if(colors.length == 0){
                return res.status(204).send({ message: 'Produkt nemá pridelené žiadne farby.' });
            }

            res.status(200).send(colors);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť všetky farby nastala chyba: ' + err });
        }
    },
    
    async getOneProductColor (req,res){
        try{
            const productColor = await Colors.findOne({ where: {productId: req.params.product_id, id: req.params.id}});

            if(!productColor){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne farby.' });
            }
            res.status(200).send(productColor);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť farbu nastala chyba: ' + err });
        }
    },
    
    async deleteProductColor (req, res) {
        try {
            const deleteProductColor = await Colors.destroy({
                where: ({ productId: req.params.product_id, id: req.params.id})
            })

            if(!deleteProductColor){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelenú žiadnu farbu.' });
            }
            res.status(200).send({
                message: "Farba bola úspešne odstránená."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť farbu nastala chyba: ' + err
            })
        }
    },

    async deleteProductColors (req, res) {
        try {
            const deleteProductColors = await Colors.destroy({
                where: { productId: req.params.product_id}
            })
        
            if(!deleteProductColors){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne farby.' });
            }
            res.status(200).send({
                message: "Farby boli úspešne odstránené."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť farby nastala chyba: ' + err
            })
        }
    },

    async post (req, res) {
        try {
            await colors_upload(req, res);
            if (req.files.length <= 0) {
                return res.send(`Musíte vybrať súbor.`);
            }
            
            const thisProduct = await Product.findOne({ where: {id: req.params.product_id}});

            if (thisProduct == null) {
                return res.status(400).send({ message: 'Produkt so zadaným ID sa nenašiel.'});
            }

            const colorName = await Colors.findOne({ where: {color: req.body.color}});

            if (colorName) {
                return res.status(400).send({ error: `Farba s názvom ${req.body.color} už existuje.` })
            }
    
            Colors.create({
                color: req.body.color,
                fileName: req.files[0].originalname,
                mimeType: req.files[0].mimetype,
                productId: req.params.product_id,
                path: req.files[0].path,
            })
            
            return res.send(`Farba bola úspešne vytvorená.`);

        } catch (error) {
            console.log(error);
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Príliš veľa súborov na odoslanie. Maximum je 1.");
            }
            return res.send(`Chyba pri snahe odoslať súbory: ${error}`);
        }
    },
}
