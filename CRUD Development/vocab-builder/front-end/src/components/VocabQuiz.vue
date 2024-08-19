<template>
    <div>
        <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

        <form action="#" @submit.prevent="onSubmit">
            
            <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i>English
            </div>
                <input type="text" readonly :disabled="testOver" :value="currWord.english"/> 
            </div>
            
            <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i>German
            </div>
                <input type="text" placeholder="Enter word..." v-model="german" :disabled="testOver" autocomplete="off"/>
            </div>

            <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="france flag"></i>French
            </div>
                <input type="text" placeholder="Enter word..." v-model="french" :disabled="testOver" autocomplete="off"/>
            </div>

            <div class="buttons-container">
                <button class="positive ui button" :disabled="testOver">Submit</button>
                <button class="negative ui button" @click="restartQuiz" :disabled="!testOver">Restart</button>
            </div>
        </form>
        
        <p :class="['results', resultClass]">
            <span v-html="result"></span>
        </p>
    </div>
</template>
  
<script>
    export default {
        name: 'vocab-quiz',
        props: {
            words: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                randWords: [...this.words.sort(() => 0.5 - Math.random())],
                incorrectGuesses: [],
                result: '',
                resultClass: '',
                german: '',
                french: '',
                score: 0,
                testOver: false
            };
        },
        computed: {
            currWord: function() {
                return this.randWords.length ? this.randWords[0] : '';
            }
        },
        methods: {
            onSubmit: function() {
                if (this.german === this.currWord.german && this.french === this.currWord.french) {
                    this.flash('Correct!', 'success', { timeout: 1000 });
                    this.score += 1;
                }
                else {
                    this.flash('Wrong!', 'error', { timeout: 1000 });
                    this.incorrectGuesses.push(this.currWord.english);
                }
        
                this.german = '';
                this.french = '';
                this.randWords.shift();
        
                if (this.randWords.length === 0) {
                    this.testOver = true;
                    this.displayResults();
                }
            },
            displayResults: function() {
                if (this.incorrectGuesses.length === 0) {
                    this.result = 'You got everything correct. Well done!';
                    this.resultClass = 'success';
                }
                else {
                    const incorrect = this.incorrectGuesses.join(', ');
                    this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
                    this.resultClass = 'error';
                }
            },
            restartQuiz: function() {
                this.randWords = [...this.words.sort(() => 0.5 - Math.random())];
                this.incorrectGuesses = [];
                this.result = '';
                this.resultClass = '';
                this.german = '';
                this.french = '';
                this.score = 0;
                this.testOver = false;
            }
        }
    };
</script>
  
<style scoped>
    .results {
        margin: 25px auto;
        padding: 15px;
        border-radius: 5px;
    }
    
    .error {
        border: 1px solid #ebccd1;
        color: #a94442;
        background-color: #f2dede;
    }
    
    .success {
        border: 1px solid #d6e9c6;
        color: #3c763d;
        background-color: #dff0d8;
    }

    .buttons-container {
        display: flex;
        justify-content: flex-start;
        margin-top: -10px;
    }

    .buttons-container button {
        margin-right: 10px;
    }
</style>