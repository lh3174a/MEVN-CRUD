<template>
    <div>
        <h1>Quiz</h1>
    
        <div v-if="words.length < 5">
            <p>You need to enter at least five words to begin the test</p>
        </div>
        <div v-else>
            <vocab-quiz :words="words"></vocab-quiz>
        </div>
    </div>
</template>
  
<script>
    import { api } from '../helpers/helpers';
    import VocabQuiz from '../components/VocabQuiz.vue';
    
    export default {
        name: 'quiz',
        components: {
            'vocab-quiz': VocabQuiz
        },
        data() {
            return {
                words: []
            };
        },
        async mounted() {
            this.words = await api.getWords();
        }
    };
</script>