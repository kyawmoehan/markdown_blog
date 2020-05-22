const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./modles/article');
const app = new express();
const PORT = process.env.PORT || 3000;

const articlesRoutes = require('./routes/articles');

// connect mongodb
mongoose.connect('mongodb://localhost/blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// view engine
app.set('view engine', 'ejs');

// handle form request
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride('_method'));

// home route
app.get('/', (req, res) => {
    Article.find({})
        .sort({ createdAt: 'desc' })
        .exec()
        .then(articles => {
            res.render('articles/index', { articles});
        })
        .catch();
});

// article routes
app.use('/articles', articlesRoutes);

// server port
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server running on port ${PORT}`);
});