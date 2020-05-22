const Article = require('../modles/article');

exports.get_new_article_form = (req, res) => {
    res.render('articles/new', { article: new Article(), error: ''});
};

exports.post_new_article = (req, res, next) => {
    const newArticle = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    newArticle
        .save()
        .then(article => {
            res.redirect(`/articles/${article.slug}`);
        })
        .catch(e => {
            console.log(e);
            res.render('articles/new', { article: newArticle, error: e});
        });
};

exports.get_one_article = (req, res) => {
    Article.findOne({ slug: req.params.slug})
        .exec()
        .then(article => {
            if(article === null) {
                res.redirect('/');
            }
            res.render('articles/show', {article});
        })
        .catch();
};

exports.get_edit_article_form = (req, res) => {
    Article.findById(req.params.id)
        .exec()
        .then(article => {
            res.render('articles/edit', { article: article, error: ''});
        })
        .catch();
};

exports.update_article = (req, res, next) => {
    const updateArticle = {
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    }
    Article.findByIdAndUpdate(req.params.id, {$set: updateArticle})
        .exec()
        .then(article => {
            res.redirect(`/articles/${article.slug}`);
        })
        .catch(e => {
            res.render(`articles/edit`, { article: updateArticle, error: e});
        });
};

exports.delete_article = (req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .exec()
        .then(result => {
            res.redirect('/');
        })
        .catch();
};