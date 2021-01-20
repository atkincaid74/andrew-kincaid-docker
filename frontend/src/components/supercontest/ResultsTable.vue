<template>
    <v-card
        max-width="95%"
        class="mx-auto my-3"
        raised
    >
        <v-card-title>
            <v-container>
                <v-row>Game by Game Results</v-row>
                <v-row>
                    <v-btn
                        color="info"
                        @click="updateGames"
                        :loading="loading"
                        class="mt-3"
                    >Update Games
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        :append-icon="searchIcon"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :loading="loading"
                :dense="dense"
            >
                <template
                    v-slot:item.andrewsPick="{ item }"
                >
                    <v-chip
                        :color="getColor(item.andrewsPick, item.winner)"
                        dark
                        :small="dense"
                        class="ma-1"
                    >{{ item.andrewsPick }}
                    </v-chip>
                </template>
                <template
                    v-slot:item.stevesPick="{ item }"
                >
                    <v-chip
                        :color="getColor(item.stevesPick, item.winner)"
                        dark
                        :small="dense"
                        class="ma-1"
                    >{{ item.stevesPick }}
                    </v-chip>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mdiMagnify } from '@mdi/js';

    export default {
        name: "ResultsTable",
        data: () => ({
            headers: [],
            items: [],
            search: '',
            searchIcon: mdiMagnify,
            loading: true,
        }),
        beforeMount() {
            this.getResults();
        },
        methods: {
            async getResults() {
                this.loading = true;
                try {
                    const response = await this.$store.dispatch('getResults', {});
                    const a = JSON.parse(response.data);
                    this.headers = Object.keys(a[0]).map(x => { return {
                        text: x,
                        align: 'center',
                        value: this.camelize(x),
                    } });
                    this.items = a.map(
                        x => {
                            let key, keys = Object.keys(x);
                            let n = keys.length;
                            let newObj = {};
                            while (n--) {
                                key = keys[n];
                                newObj[this.camelize(key)] = x[key]
                            }
                            return newObj
                        }
                    );
                    this.loading = false;
                } catch(err) {
                    this.loading = false;
                }

            },
            getColor(pick, winner) {
                return pick === winner ? 'green' : 'red'
            },
            async updateGames() {
                this.loading = true;
                try {
                    await this.$store.dispatch('updateGames');
                } catch (e) {
                    this.loading = false;
                }
                await this.getResults();
                this.loading = false;
            },
        },
        computed: {
            dense() {
                return this.$vuetify.breakpoint.name !== 'xs';
            }
        },
    }
</script>

<style scoped>

</style>