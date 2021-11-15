const Contato = require('../models/ContatoModel');

exports.index = (req, resp) => {
    resp.render('contato', {
        contato: {}
    });
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
        req.session.save(() => resp.redirect('/'));
        // req.session.save(() => resp.redirect(`/contato/${contato.contato._id}`));
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

exports.edit = async (req, resp) => {
    try {
        if (!req.params.id) return resp.render('404');
    
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => resp.redirect('back'));
            return;
        }
    
        req.flash('success', 'success edit');
        req.session.save(() => resp.redirect(`/contato/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        resp.render('404');
    }
}

exports.delete = async (req, resp) => {
    if (!req.params.id) return resp.render('404');

    const contato = new Contato(req.body);
    const userContato = await contato.delete(req.params.id);

    if (!userContato) return resp.render('404');

    req.flash('success', 'success to delete contact');
    req.session.save(() => resp.redirect('back'));
    return;
};


