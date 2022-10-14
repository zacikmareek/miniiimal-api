const { Product } = require('../models')
const { Applications } = require('../models')
const application_upload = require("../middleware/application_upload");

module.exports = {
    async index (req,res){
        try{
            const applications = await Applications.findAll({ where: { productId: req.params.product_id }});

            if(applications.length == 0){
                return res.status(204).send({ message: 'Produkt nemá pridelené žiadne aplikácie.' });
            }

            res.status(200).send(applications);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť všetky aplikácie nastala chyba: ' + err });
        }
    },
    
    async getOneProductApplication (req,res){
        try{
            const productApplication = await Applications.findOne({ where: {productId: req.params.product_id, id: req.params.id}});

            if(!productApplication){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne aplikácie.' });
            }
            res.status(200).send(productApplication);
        }
        catch (err) {
            res.status(500).send({ error: 'Pri snahe zobraziť aplikáciu nastala chyba: ' + err });
        }
    },
    
    async deleteProductApplication (req, res) {
        try {
            const deleteProductApplication = await Applications.destroy({
                where: ({ productId: req.params.product_id, id: req.params.id})
            })

            if(!deleteProductApplication){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelenú žiadnu aplikáciu.' });
            }
            res.status(200).send({
                message: "Aplikácia bola úspešne odstránená."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť aplikáciu nastala chyba: ' + err
            })
        }
    },

    async deleteProductApplications (req, res) {
        try {
            const deleteProductApplications = await Applications.destroy({
                where: { productId: req.params.product_id}
            })
        
            if(!deleteProductApplications){
                return res.status(204).send({ message: 'Produkt neexistuje alebo nemá pridelené žiadne aplikácie.' });
            }
            res.status(200).send({
                message: "Aplikácie boli úspešne odstránené."
            })
        }
        catch (err) {
            res.status(500).send({
                error: 'Pri snahe odstrániť aplikácie nastala chyba: ' + err
            })
        }
    },

    async post (req, res) {
        try {
            await application_upload(req, res);
            if (req.files.length <= 0) {
                return res.send(`Musíte vybrať súbor.`);
            }
            
            const thisProduct = await Product.findOne({ where: {id: req.params.product_id}});

            if (thisProduct == null) {
                return res.status(400).send({ message: 'Produkt so zadaným ID sa nenašiel.'});
            }

            const applicationName = await Applications.findOne({ where: {application: req.body.application}});

            if(applicationName){
                return res.status(400).send({ error: `Aplikácia s názvom ${req.body.application} už existuje.` })
            }
    
            Applications.create({
                application: req.body.application,
                fileName: req.files[0].originalname,
                mimeType: req.files[0].mimetype,
                productId: req.params.product_id,
                path: req.files[0].path,
            })
            
            return res.send(`Aplikácia bola úspešne vytvorená.`);

        } catch (error) {
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Príliš veľa súborov na odoslanie. Maximum je 1.");
            }
            return res.send(`Chyba pri snahe odoslať súbory: ${error}`);
        }
    },
}
