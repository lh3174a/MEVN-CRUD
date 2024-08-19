<template>
    <div id="app">
        <div class="ui inverted segment navbar">
            <div class="ui center aligned container">
                <div class="ui large secondary inverted pointing menu compact">
                    <router-link to="/words" exact class="item">
                        <i class="comments outline icon"></i> Words
                    </router-link>
                    <router-link to="/words/new" class="item">
                        <i class="plus circle icon"></i> Add New Words
                    </router-link>
                    <router-link to="/quiz" class="item">
                        <i class="graduation cap icon"></i> Quiz
                    </router-link>
                    <router-link to="/info" class="item">
                        <i class="info circle icon"></i> Info
                    </router-link>
                </div>
            </div>
        </div>

        <div class="ui text container">
            <flash-message class="myFlash"></flash-message>
            <div class="ui one column grid">
                <div class="column">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>

<style>
    #app > div.navbar {
        margin-bottom: 1.5em;
        border-radius: 0px;
    }
    .myFlash {
        width: 250px;
        margin: 10px;
        position: absolute;
        top: 50;
        right: 0;
    }
    input {
        width: 300px;
    }
    div.label {
        width: 150px;
    }
    div.input {
        margin-bottom: 10px;
    }
    button.ui.button {
        margin-top: 15px;
        display: block;
    }
</style>