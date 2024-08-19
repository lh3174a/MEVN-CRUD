<template>
    <div>
        <h1>Word List</h1>

        <div class="search-container">
            <form class="ui form" @submit.prevent="searchWord">
                <div class="field">
                    <div class="ui action input">
                        <input type="text" placeholder="Enter a word to search" v-model="searchQuery"/>
                        <button class="positive ui button" type="submit">Search</button>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="buttons-container">
            <button class="positive ui button" @click="showAllWords">Show All</button>
            <button class="purple ui button" @click="exportToCSV">Export</button>
        </div>

        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th style="text-align: center"><i class="clock icon"></i><br>Search History</br></th>
                    <th style="text-align: center"><i class="united kingdom flag"></i><br>English</br></th>
                    <th style="text-align: center"><i class="germany flag"></i><br>German</br></th>
                    <th style="text-align: center"><i class="france flag"></i><br>French</br></th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word, i) in paginatedWords" :key="i">
                    <td>{{ word.searchTime }}</td>
                    <td>{{ word.english }}</td>
                    <td>{{ word.german }}</td>
                    <td>{{ word.french }}</td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
                    </td>
                    <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                        <a :href="`/words/${word._id}`">Destroy</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="pagination-container">
            <button class="negative ui button" @click="previousPage" :disabled="defaultPage === 1">Previous</button>
            <span>Page {{ defaultPage }} of {{ totalPages }}</span>
            <button class="positive ui button" @click="nextPage" :disabled="defaultPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script>
    import { api } from '../helpers/helpers';

    export default {
        name: 'words',
        data() {
            return {
                words: [],
                searchQuery: '',
                filteredWords: [],
                defaultPage: 1,
                wordsPerPage: 5,
            }
        },
        computed: {
            totalPages() {
                return Math.ceil(this.filteredWords.length / this.wordsPerPage);
            },
            paginatedWords() {
                const start = (this.defaultPage - 1) * this.wordsPerPage;
                const end = start + this.wordsPerPage;
                return this.filteredWords.slice(start, end);
            },
        },
        methods: {
            async onDestroy(id) {
                const sure = window.confirm('Are you sure you want to delete this word?');
                if (!sure) return;
                await api.deleteWord(id);
                this.flash('Word deleted successfully!', 'success');
                this.words = this.words.filter(word => word._id !== id);
                this.filteredWords = this.filteredWords.filter(word => word._id !== id);
                if (this.defaultPage > this.totalPages) {
                    this.defaultPage = this.totalPages;
                }
            },
            previousPage() {
                if (this.defaultPage > 1) {
                    this.defaultPage--;
                }
            },
            nextPage() {
                if (this.defaultPage < this.totalPages) {
                    this.defaultPage++;
                }
            },
            showAllWords() {
                this.filteredWords = this.words;
                this.defaultPage = 1;
            },
            async searchWord() {
                if (!this.searchQuery.trim()) {
                    alert('Please enter a word to search!');
                    return;
                }

                const query = this.searchQuery.toLowerCase();
                const now = new Date().toLocaleString();

                const matchingWords = this.words.filter(word => 
                    word.english.toLowerCase() === query || 
                    word.german.toLowerCase() === query || 
                    word.french.toLowerCase() === query
                );

                if (matchingWords.length === 0) {
                    alert('No matches found!');
                } else {
                    matchingWords.forEach(word => {
                        word.searchTime = now;
                        this.updateSearchTime(word._id, now);
                    });
                    this.filteredWords = matchingWords;
                    this.defaultPage = 1;
                }
            },
            async updateSearchTime(id, searchTime) {
                try {
                    await api.updateWordSearchTime(id, searchTime);
                } catch (error) {
                    console.error('Error updating search time: ', error);
                }
            },
            exportToCSV() {
                const headers = ["Search Time", "English", "German", "French"];
                const rows = this.filteredWords.map(word => [
                    `"${word.searchTime}"`,
                    `"${word.english}"`,
                    `"${word.german}"`,
                    `"${word.french}"`
                ]);

                let csvContent = "data:text/csv;charset=utf-8," 
                    + headers.join(",") + "\n"
                    + rows.map(e => e.join(",")).join("\n");

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "vocab.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
        },
        async mounted() {
            this.words = await api.getWords();
            this.filteredWords = this.words.reverse();
        }
    };
</script>

<style scoped>
    .search-container {
        margin-bottom: -10px;
    }

    .search-container .ui.input {
        width: 100%;
    }

    .buttons-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
    }

    .buttons-container .ui.button {
        margin-right: 10px;
    }

    .pagination-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .pagination-container .ui.button {
        margin: 0 5px;
    }

    .column {
        width: 158px;
    }
</style>