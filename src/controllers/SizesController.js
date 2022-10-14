const { Product } = require('../models')
const { Sizes } = require('../models')

module.exports = {
    async index (req,res){
        try{
            const sizes = await Sizes.findAll({ where: { productId: req.params.product_id }});

            if(sizes.length == 0){
                return res.status(204).send({ message: 'Produkt nemá pridelené žiadne veľkosti.' });
            }

            res.status(200).send(sizes);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť všetky veľkosti nastala chyba: ' + err });
        }
    },
    
    async getOneProductSize (req,res){
        try{
            const productSize = await Sizes.findOne({ where: {productId: req.params.product_id, id: req.params.id}});

            if(!productSize){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne veľkosti.' });
            }
            res.status(200).send(productSize);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť veľkosť nastala chyba: ' + err });
        }
    },
    
    async deleteProductSize (req, res) {
        try {
            const deleteProductSize = await Sizes.destroy({
                where: ({ productId: req.params.product_id, id: req.params.id})
            })

            if(!deleteProductSize){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne veľkosti.' });
            }
            res.status(200).send({
                message: "Veľkosť bola úspešne odstránená."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť veľkosť nastala chyba: ' + err
            })
        }
    },

    async deleteProductSizes (req, res) {
        try {
            const deleteProductSizes = await Sizes.destroy({
                where: { productId: req.params.product_id}
            })
        
            if(!deleteProductSizes){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne veľkosti.' });
            }
            res.status(200).send({
                message: "Veľkosti boli úspešne odstránené."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť veľkosti nastala chyba: ' + err
            })
        }
    },

    async post (req, res) {
        try {
            const thisProduct = await Product.findOne({ where: {id: req.params.product_id}});

            if (thisProduct == null) {
                return res.status(400).send({ message: 'Produkt so zadaným ID sa nenašiel.'});
            }

            const alreadyExist = await Sizes.findOne({ where: { size: req.body.size }});

            if(alreadyExist){
                return res.status(400).send({ error: `Veľkosť ${alreadyExist.size} pre tento produkt už existuje.` });
            }
    
            Sizes.create({
                size: req.body.size,
                price: req.body.price,
                productId: req.params.product_id
            })
            
            return res.send(`Veľkosť bola úspešne pridaná.`);

        } catch (err) {
            res.status(500).send({
                error: 'Pri snahe pridať veľkosť nastala chyba: ' + err
            })
        }
    },
}
