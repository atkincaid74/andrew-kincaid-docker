<template>
    <v-card
        :max-width="width"
        class="mx-auto my-2"
        raised
    >
        <v-card-title>
            Summary
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="items"
                :loading="loading"
                :dense="dense"
                disable-pagination
                hide-default-footer
            >
                <template
                    v-slot:item.andrew_win="{ item }"
                >
                    <v-chip
                        :color="getColor(item.andrew_win, item.steve_win)"
                        dark
                        :small="dense"
                    >{{ item.andrew_win }}
                    </v-chip>
                </template>
                <template
                    v-slot:item.steve_win="{ item }"
                >
                    <v-chip
                        :color="getColor(item.steve_win, item.andrew_win)"
                        dark
                        :small="dense"
                        class="ma-1"
                    >{{ item.steve_win }}
                    </v-chip>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "SummaryTable",
        data: () => ({
            headers: [
                {
                    text: 'Week',
                    align: 'center',
                    sortable: false,
                    value: 'week',
                },
                {
                    text: 'Andrew',
                    align: 'center',
                    sortable: false,
                    value: 'andrew_win',
                },
                {
                    text: 'Steve',
                    align: 'center',
                    sortable: false,
                    value: 'steve_win',
                },
            ],
            items: [],
            loading: true,
        }),
        beforeMount() {
            this.getSummary();
        },
        methods: {
            async getSummary() {
                this.loading = true;
                try {
                    const response = await this.$store.dispatch('getSCSummary');
                    this.items = JSON.parse(response.data);
                    this.loading = false;
                } catch(err) {
                    this.loading = false;
                }
            },
            getColor(player, other) {
                player = parseInt(player);
                other = parseInt(other);
                return player > other ? 'green' : player === other ? 'warning' : 'red'
            },
        },
        computed: {
            dense() {
                return this.$vuetify.breakpoint.name !== 'xs';
            },
            width() {
                return this.dense ? '600' : '95%'
            }
        },
    }
</script>

<style scoped>

</style>