const router = require('express').Router();
const {Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categories = await Category.findAll({
            include: [{model: Product}]
        });
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const product = await Category.findByPk(req.params.id, {
            include: [{model: Product}]
        });
        product ? res.status(200).json(product) : res.status(404).json({message: "No product with that id."});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new category
    try {
        const new_category = await Category.create(req.body);
        return res.status(200).json(new_category);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    try {
        const updatedCategory = await Category.update({
            category_name: req.body.category_name
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: `Updated category ${req.params.id}. ${updatedCategory} rows updated.`
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
        const deletedCategory = await Category.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({message: `Deleted id ${req.params.id}. ${deletedCategory} rows updated.`});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
