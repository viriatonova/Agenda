exports.index = (req, resp) => {
    resp.render('login');
};

exports.handleLogin = (req, resp) => {
    resp.send('login works');
};
