const { Product } = require('../models')
const { ProductImages } = require('../models')
const product_images_upload = require("../middleware/product_images_upload");

module.exports = {
    async index (req,res){
        try{
            const productImages = await ProductImages.findAll({ where: { productId: req.params.product_id }});

            if(productImages.length == 0){
                return res.status(204).send({ message: 'Produkt nemá pridelené žiadne fotografie.' });
            }

            res.status(200).send(productImages);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť všetky fotografie nastala chyba: ' + err });
        }
    },
    
    async getOneProductImage (req,res){
        try{
            const productImage = await ProductImages.findOne({ where: {productId: req.params.product_id, id: req.params.id}});

            if(!productImage){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne fotografie.' });
            }
            res.status(200).send(productImage);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť fotografiu nastala chyba: ' + err });
        }
    },
    
    async deleteProductImage (req, res) {
        try {
            const deleteProductImage = await ProductImages.destroy({
                where: ({ productId: req.params.product_id, id: req.params.id})
            })

            if(!deleteProductImage){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne fotografie.' });
            }
            res.status(200).send({
                message: "Fotografia bola úspešne odstránená."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť fotografiu nastala chyba: ' + err
            })
        }
    },

    async deleteProductImages (req, res) {
        try {
            const deleteProductImages = await ProductImages.destroy({
                where: { productId: req.params.product_id}
            })
        
            if(!deleteProductImages){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne fotografie.' });
            }
            res.status(200).send({
                message: "Fotografie boli úspešne odstránené."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť fotografie nastala chyba: ' + err
            })
        }
    },

    async post (req, res) {
        try {
            await product_images_upload(req, res);
            if (req.files.length <= 0) {
                return res.send(`Musíte vybrať súbor.`);
            }
            
            const thisProduct = await Product.findOne({ where: {id: req.params.product_id}});

            if (thisProduct == null) {
                res.status(400).send({ message: 'Produkt so zadaným ID sa nenašiel.'});
                return;
            }
    
            ProductImages.create({
                fileName: req.files[0].originalname,
                mimeType: req.files[0].mimetype,
                productId: req.params.product_id,
                path: req.files[0].path,
            })
            
            return res.send(`Fotografia bola úspešne odoslaná.`);

        } catch (error) {
            console.log(error);
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Príliš veľa súborov na odoslanie. Maximum je 1.");
            }
            return res.send(`Chyba pri snahe odoslať súbory: ${error}`);
        }
    },
}
