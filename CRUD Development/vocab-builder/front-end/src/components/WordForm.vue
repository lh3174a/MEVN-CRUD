<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out all fields!</p>
        
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i>English
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.english" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i>German
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.german" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="france flag"></i>French
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.french" />
        </div>
        
        <div class="buttons-container">
            <button class="positive ui button">Submit</button>
            <button type="button" class="negative ui button" @click="cancel">Cancel</button>
        </div>
    </form>
</template>
   
<script>
    export default {
        name: 'word-form',
        props: {
            word: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        english: '',
                        german: '',
                        french: '',
                    };
                }
            }
        },
        data() {
            return {
                errorsPresent: false
            };
        },
        methods: {
            onSubmit: function() {
                if (this.word.english === '' || this.word.german === '' || this.word.french === '') {
                    this.errorsPresent = true;
                }
                else {
                    this.$emit('createOrUpdate', this.word);
                }
            },
            cancel() {
                window.history.back();
            },
        }
    };
</script>
   
<style scoped>
    .error {
        color: red;
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