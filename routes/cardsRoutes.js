const express = require('express');
          const router = express.Router();
          const Card = require("../models/cardsModel");
          
          router.get('/', async function(req, res, next) {
              try { 
                  console.log("Get all cards");
                  let result = await Card.getAll();
                  res.status(result.status).send(result.result);
              } catch(err) {
                  console.log(err);
                  res.status(500).send(err);
              }
            })
            
            router.get('/:id', async function(req, res, next) {
                try { 
                    console.log("Get card with id "+req.params.id);
                    let result = await Card.getById(req.params.id);
                    res.status(result.status).send(result.result);
                } catch(err) {
                    console.log(err);
                    res.status(500).send(err);
                }
              }
            
            );

const { body, validationResult } = require('express-validator');
router.post("/", ...cardValidations ,
    async function (req, res, next) {
        try {
            console.log("Save card with name " + req.body.name);

            const valid = validationResult(req);
            if (!valid.isEmpty()) {
                return res.status(400).json(valid.array());
            }
            let result = await Card.save(req.body);
            res.status(result.status).send(result.result);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });

router.get('/filter', async function (req, res, next) {
    try {
        console.log("Filter cards");                        
        if (req.query.typeId) {
            let result = await Card.filterByType(req.query.typeId);
            res.status(result.status).send(result.result);
        } else if (req.query.descContains) {
            let result = await Card.filterByLoreOrDescription(req.query.descContains);
            res.status(result.status).send(result.result);
        } else {        
            res.status(400).send({ msg: "No filter provided" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.put("/", ...cardValidations ,
    async function (req, res, next) {
        try {
            console.log("Edit card with id " + req.body.id);
            const valid = validationResult(req);
            if (!valid.isEmpty()) {
                return res.status(400).json(valid.array());
            }
            let result = await Card.edit(req.body);
            res.status(result.status).send(result.result);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
          
module.exports = router;