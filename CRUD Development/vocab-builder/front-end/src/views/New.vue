<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>

<script>
    import WordForm from '../components/WordForm.vue';
    import { api } from '../helpers/helpers';

    export default {
        name: 'new-word',
        components: {
            'word-form': WordForm
        },
        methods: {
            createOrUpdate: async function(word) {
                try { 
                    const existingWords = await api.getWords();
                    const duplicate = existingWords.find(existingWord => 
                        existingWord.english === word.english || 
                        existingWord.german === word.german || 
                        existingWord.french === word.french
                    );

                    if (duplicate) {
                        alert('This word is exists!');
                        return;
                    } else {
                        const res = await api.createWord(word);
                        this.flash('Word successfully created!', 'success');
                        this.$router.push(`/words/${res._id}`);
                    }
                } catch (error) {
                    console.error('An error occurred: ', error);
                    this.flash('An error occurred while creating the word!', 'error')
                }
            },
        }
    };
</script>