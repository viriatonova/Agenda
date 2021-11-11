exports.paginaInicial = (req, resp) => {
    resp.render('index');
}

exports.handlePost = (req, resp) => {
    resp.send(req.body);
    return;
}
