const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
    candidaturaId: {
        type: Number,
        required: true
    },
    mensagens: [{
        usuarioId: {
            type: Number,
            required: true
        },
        usuarioNome: {
            type: String,
            required: true
        },
        conteudo: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    participantes: [{
        type: Number,
        required: true
    }]
});

module.exports = mongoose.model('Mensagem', MensagemSchema);
