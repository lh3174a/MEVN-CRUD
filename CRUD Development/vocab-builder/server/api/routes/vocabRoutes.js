const vocabBuilder = require('../controllers/vocabController');
module.exports = app => {
    app
        .route('/words')
        .get(vocabBuilder.list_all_words)
        .post(vocabBuilder.create_a_word);
    app
        .route('/words/:wordId')
        .get(vocabBuilder.read_a_word)
        .put(vocabBuilder.update_a_word)
        .delete(vocabBuilder.delete_a_word);
    // define a route to update the search time of a specific word by its ID
    app
        .route('/words/:wordId/search-time')
        .put(vocabBuilder.update_search_time);
};