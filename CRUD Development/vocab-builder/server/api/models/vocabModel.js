const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            reqiured: 'German word cannot be blank'
        },
        // adding a field for the 3rd language
        french: {
            type: String,
            reqiured: 'French word cannot be blank'
        },
        // adding a searchTime field
        searchTime: {
            type: String,
            default: '',
        },
    },
    { collection: 'vocab 5.2' }
);

module.exports = mongoose.model('Vocab', VocabSchema);