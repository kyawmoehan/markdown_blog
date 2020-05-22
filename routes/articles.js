const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/articles');

// create new article
router.get('/new', ArticleController.get_new_article_form);
router.post('/', ArticleController.post_new_article);

// show individual article
router.get('/:slug', ArticleController.get_one_article);

// edit article
router.get('/edit/:id', ArticleController.get_edit_article_form);
router.put('/:id', ArticleController.update_article);

// delete article
router.delete('/:id', ArticleController.delete_article);

module.exports = router;
