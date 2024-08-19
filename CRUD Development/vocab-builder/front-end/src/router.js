import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Quiz from './views/Quiz.vue';
import Info from './components/Info.vue';

Vue.use(Router);

export default new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/words'
        },
        {
            path: '/words',
            name: 'words',
            component: Words
        },
        {
            path: '/words/new',
            name: 'new-word',
            component: New
        },
        {
            path: '/words/:id',
            name: 'show',
            component: Show
        },
        {
            path: '/words/:id/edit',
            name: 'edit',
            component: Edit
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: Quiz
        },
        {
            path: '/info',
            name: 'info',
            component: Info
        },
    ]
});