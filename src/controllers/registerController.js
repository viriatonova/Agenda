exports.index = (req, resp) => {
    resp.render('register');
};

exports.handleRegister = (req, resp) => {
    resp.send('register confirmed');
};