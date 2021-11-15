const Register = require('../models/RegisterModel')


exports.index = (req, resp) => {
    if (req.session.user) return resp.redirect('/');
    return resp.render('login');
};

exports.handleLogin = (req, resp) => {
    resp.send('login works');
};

exports.login = async function (req, resp) {
    try {
        const login = new Register(req.body);
        await login.login();
    
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return resp.redirect('back');
            });
            return;
        }
        
        req.flash('success', 'Login successful');
        req.session.user = login.user;
        req.session.save(function() {
            return resp.redirect('back');
        });
    } catch (e) {
        console.log(e);
        return resp.render('404');
    }
};

exports.logout = function (req, resp) {
    req.session.destroy();
    resp.redirect('/');
}