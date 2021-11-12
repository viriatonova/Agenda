const mongoose = require('mongoose');
const validator = require('validator');

const RegisterSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        try {
            this.user = await RegisterModel.create(this.body);
        } catch (e) {
            console.log(e);
        }
    }

    valida() {
        this.cleanUp();

        // check email
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('unavailable e-mail');
        };

        // check senha
        if(this.body.password.length < 3 || this.body.length >= 50 ) {
            this.errors.push('password need be between 3 and 50 caracters');
        }

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
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Register;