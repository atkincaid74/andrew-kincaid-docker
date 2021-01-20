<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col cols="10">
                    <v-data-table
                        :headers="headers"
                        :items="users"
                        disable-pagination
                        hide-default-footer
                    ></v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "UserHomepage",
        computed: {
            ...mapState({
                username: state => state.username,
                userFirstName: state => state.userFirstName,
                userLastName: state => state.userLastName,
                userPaid: state => state.userPaid,
            }),
            users() {
                return [
                    {
                        user: this.username,
                        first: this.userFirstName,
                        last: this.userLastName,
                        paid: this.userPaid ? 'Yes' : 'No',
                    },
                ];
            }
        },
        data: () => ({
            headers: [
                {text: 'Username', value: 'user'},
                {text: 'First Name', value: 'first'},
                {text: 'Last Name', value: 'last'},
                {text: 'Paid', value: 'paid'},
            ],
        }),
    }
</script>

<style scoped>

</style>