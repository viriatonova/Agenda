const Contato = require('../models/ContatoModel');

exports.index = async (req, resp) => {
    const contato = new Contato();
    const contatos = await contato.buscaContatos();
    resp.render('index', { contatos: contatos });
}

exports.editContato = async (req, resp) => {
    if (!req.params.id) return resp.render('404');

    const contato = new Contato(req.body);
    const user = await contato.buscaId(req.params.id);

    if (!user) return resp.render('404');

    resp.render('contato', {
        contato: user
    });
};
