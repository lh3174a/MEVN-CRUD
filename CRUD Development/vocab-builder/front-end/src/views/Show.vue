<template>
    <div>
        <h1>Show Word</h1>
        
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i>English
            </div>
            <input type="text" readonly :value="word.english"/>
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i>German
            </div>
            <input type="text" readonly :value="word.german"/>
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="france flag"></i>French
            </div>
            <input type="text" readonly :value="word.french"/>
        </div>
        <div class="actions">
        <div class="buttons-container">
            <button class="positive ui button" @click="editWord">Edit word</button>
            <button class="negative ui button" @click="back">Back</button>
        </div>
        </div>
    </div>
</template>
  
<script>
    import { api } from '../helpers/helpers';

    export default {
        name: 'show',
        data() {
            return {
                word: ''
            };
        },
        async mounted() {
            this.word = await api.getWord(this.$route.params.id)
        },
        methods: {
            editWord() {
                this.$router.push({ name: 'edit', params: { id: this.$route.params.id } });
            },
            
            back() {
                this.$router.push({ name: 'words' });
            },
        }
    };
</script>
  
<style scoped>
    .actions a {
        display: block;
        text-decoration: underline;
        margin: 20px 10px;
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