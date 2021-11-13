const Contato = require('../models/ContatoModel');

exports.index = (req, resp) => {
    resp.render('contato');
};


exports.register = async (req, resp) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
    
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => resp.redirect('back'));
            return;
        }
    
        req.flash('success', 'success register');
        req.session.save(() => resp.redirect(`/contato/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        return resp.render('404');
    }
};

exports.editContato = async (req, resp) => {
    if (!req.params.id) return resp.render('404');

    const contato = new Contato(req.body);
    const user = await contato.buscaId(req.params.id);

    if (!user) return resp.render('404');

    resp.render('contato', {
        contato: user
    });
};