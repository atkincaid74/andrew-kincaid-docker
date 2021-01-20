<template>
    <v-card
        :max-width="width"
        class="mx-auto mt-2"
    >
        <v-card-title>
            <div class="mt-3">Leaderboard</div>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                :append-icon="searchIcon"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                dense
            ></v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-alert
                type="info"
                class="mx-auto"
            >Test Data</v-alert>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { mdiMagnify } from '@mdi/js';

    export default {
        name: "Leaderboard",
        data: () => ({
            headers: [
                {text: 'Rank', align: 'center', value: 'rank'},
                {text: 'Name', align: 'center', value: 'name'},
                {text: 'Total Points', align: 'center', value: 'total_points'},
            ],
            items: [
                {rank: 1, name: 'Andrew Kincaid', total_points: 120},
                {rank: 2, name: 'Big Brian', total_points: 119},
                {rank: 3, name: 'Lil Hank', total_points: 115},
                {rank: 4, name: 'Stevie D', total_points: 110},
                {rank: 5, name: 'Wayne\'s World', total_points: 50},
            ],
            search: '',
            searchIcon: mdiMagnify,
        }),
        computed: {
            width() {
                return this.$vuetify.breakpoint.name === 'xs' ? '95%' : '500'
            },
        },
    }
</script>

<style scoped>

</style>