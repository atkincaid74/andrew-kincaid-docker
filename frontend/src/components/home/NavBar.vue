<template>
    <v-navigation-drawer
        app
        v-model="navBarVisible"
    >
        <v-list
            dense
            nav
            class="py-0"
        >
            <v-list-item
                class="mt-2"
                two-line
                v-if="username !== null"
                @click="goToUserHomepage"
            >
                <v-list-item-avatar>
                    <UserIcon></UserIcon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ fullName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item
                v-if="username === null"
                @click="goToLogin"
            >
                <v-list-item-icon>
                    <UserIcon></UserIcon>
                </v-list-item-icon>
                <v-list-item-title>
                    Sign In
                </v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
                @click="goHome"
                class="my-1"
            >
                <v-list-item-icon>
                    <v-icon>{{ HomeIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    Home
                </v-list-item-title>
            </v-list-item>

            <v-list-item
                @click="goGolf"
                class="my-1"
            >
              <v-list-item-icon>
                <v-icon>{{ GolfIcon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Golf
              </v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="privileges.indexOf('admin') > -1"
                @click="goToAdmin"
                class="my-1"
            >
                <v-list-item-icon>
                    <v-icon>{{ AdminIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    Admin Tools
                </v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="privileges.indexOf('supercontest') > -1"
                @click="goToSuperContest"
                class="my-1"
            >
                <v-list-item-icon>
                    <v-icon>{{ SCIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    The Real Super-Contest
                </v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="privileges.indexOf('picksix') > -1"
                @click="goToPickSix"
                class="my-1"
            >
                <v-list-item-icon>
                    <v-icon>{{ FootballIcon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    Pick 6
                </v-list-item-title>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import UserIcon from "./UserIcon";
    import { mdiCashMultiple, mdiHome, mdiFootball, mdiMushroom, mdiGolf } from '@mdi/js';

    export default {
        name: "NavBar",
        data: () => ({
            SCIcon: mdiCashMultiple,
            HomeIcon: mdiHome,
            FootballIcon: mdiFootball,
            AdminIcon: mdiMushroom,
            GolfIcon: mdiGolf,
        }),
        components: {
            UserIcon,
        },
        computed: {
            ...mapState({
                // navBarVisible: state => state.navBarVisible,
                username: state => state.username,
                userFirstName: state => state.userFirstName,
                userLastName: state => state.userLastName,
                privileges: state => state.privileges,
            }),
            ...mapGetters({
                getNavBar: 'getNavBar',
            }),
            fullName () {
                return this.userFirstName + ' ' + this.userLastName
            },
            navBarVisible: {
                get() { return this.getNavBar },
                set(value) { this.$store.commit('toggleNavBar', value) }
            },
        },
        methods: {
            goHome() {
                this.$router.push({name: 'Home'});
                this.toggleNavBar()
            },
            goGolf() {
                this.$router.push({name: 'GolfPicksHome'});
                this.toggleNavBar()
            },
            goToLogin() {
                this.$router.push({name: 'Login'});
                this.toggleNavBar()
            },
            goToAdmin() {
                this.$router.push({name: 'AdminHome'});
                this.toggleNavBar()
            },
            goToUserHomepage() {
                this.$router.push({name: 'UserHome'});
                this.toggleNavBar()
            },
            goToSuperContest() {
                this.$router.push({name: 'SuperContestHome'});
                this.toggleNavBar()
            },
            goToPickSix() {
                this.$router.push({name: 'PickSixHome'});
                this.toggleNavBar()
            },
            toggleNavBar() {
                this.$store.commit('toggleNavBar', !this.navBarVisible)
            }
        },
    }
</script>

<style scoped>

</style>