const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default:'' },
    phone: { type: String, required: false, default:'' },
    email: { type: String, required: false, default:'' },
    description: { type: String, required: true },
    create: { type: Date, default: Date.now  }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor (body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async buscaId(id) {
        if (typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    }

    async buscaContatos() {
        const contatos = await ContatoModel.find().sort({create: -1});
        return contatos;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    valida() {
        this.cleanUp();

        // check email
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('unavailable e-mail');
        };
        if (!this.body.nome) this.errors.push('First name is necessary to create a contact');
        if (!this.body.email && !this.body.phone) {
            this.errors.push("It's necessary email or phone to create a contact")
        };

    }

    // turn all data to string
    cleanUp() {
        for (const key in this.body) {
           if (typeof this.body[key] !== 'string') {
               this.body[key] = '';
           }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            phone: this.body.phone,
            email: this.body.email,
            description: this.body.description
        }
    }

}

module.exports = Contato;