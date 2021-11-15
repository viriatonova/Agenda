const Contato = require('../models/ContatoModel');

exports.index = async (req, resp) => {
    const contato = new Contato();
    const contatos = await contato.buscaContatos();
    resp.render('index', { contatos: contatos });
}
