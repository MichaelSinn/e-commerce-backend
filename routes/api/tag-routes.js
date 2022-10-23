const router = require('express').Router();
const {Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tag_data = await Tag.findAll({
            include: [{model: Product}]
        });
        res.status(200).json(tag_data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tag = await Tag.findByPk(req.params.id, {
            include: [{model: Product}]
        });
        tag ? res.status(200).json(tag) : res.status(404).json({message: "No such tag with that id."});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const newTag = await Tag.create(req.body);
        res.status(200).json(newTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const updatedRows = await Tag.update({
            tag_name: req.body.tag_name
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(`Updated tag ${req.params.id}. ${updatedRows} rows updated.`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
        const deletedRows = await Tag.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(`Delete tag ${req.params.id}. ${deletedRows} rows affected.`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
