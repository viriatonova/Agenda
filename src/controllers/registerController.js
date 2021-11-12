const Register = require('../models/RegisterModel')

exports.index = (req, resp) => {
    resp.render('register');
};

exports.handleRegister = async function (req, resp) {
    try {
        const register = new Register(req.body);
        await register.register();
    
        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function() {
                return resp.redirect('back');
            });
            return;
        }
        req.flash('success', 'success to create user');
        req.session.save(function() {
            return resp.redirect('back');
        });
    } catch (e) {
        console.log(e);
        return resp.render('404');
    }
};