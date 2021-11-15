const Contato = require('../models/ContatoModel');

exports.middlewareGlobal = (req, resp, next) => {
    resp.locals.errors = req.flash('errors');
    resp.locals.success = req.flash('success');
    resp.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, resp, next) => {
    if(err) {
        console.log(err);
        return resp.render('404')
    };
    
    next();
}

exports.csrfMiddleware = (req, resp, next) => {
    resp.locals._csrf = req.csrfToken()
    next();
}

exports.loginRequired = (req, resp, next) => {
    if (!req.session.user) {
        req.flash('errors', 'You must login to continue');
        req.session.save(() => resp.redirect('/'));
        return;
    }
    next();
}
