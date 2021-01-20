<template>
    <div>
        <v-card
            :max-width="width"
            class="mx-auto my-10"
        >
            <v-card-title>
                Login
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="enteredUser"
                        label="Username"
                        @keydown.enter.prevent=""
                        autofocus
                        @change="$v.enteredUser.$touch()"
                        @blur="$v.enteredUser.$touch()"
                        :error-messages="userErrors"
                    ></v-text-field>
                    <v-text-field
                        v-model="enteredPass"
                        label="Password"
                        type="password"
                        @keydown.enter.native="submitLoginInfo"
                        @change="$v.enteredPass.$touch()"
                        @blur="$v.enteredPass.$touch()"
                        :error-messages="passErrors"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    @click="toggleCreateUserDialog"
                >Create Account</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    @click="submitLoginInfo"
                    :loading="loading"
                >Login
                </v-btn>
            </v-card-actions>
        </v-card>
        <NewUser
            :display="createUserDialog"
            v-on:close-new-user="toggleCreateUserDialog"
        ></NewUser>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    import NewUser from "./NewUser";

    export default {
        name: "Login",
        components: {
            NewUser,
        },
        mixins: [validationMixin],
        validations: {
            enteredUser: { required, minLength: minLength(4) },
            enteredPass: { required, minLength: minLength(6), maxLength: maxLength(32) },
        },
        computed: {
            userErrors() {
                const errors = [];
                if (!this.$v.enteredUser.$dirty) return errors;
                !this.$v.enteredUser.minLength && errors.push('Username must be at least 4 characters');
                !this.$v.enteredUser.required && errors.push('Username is required');
                return errors
            },
            passErrors() {
                const errors = [];
                if (!this.$v.enteredPass.$dirty) return errors;
                !this.$v.enteredPass.minLength && errors.push('Password must be at least 6 characters');
                !this.$v.enteredPass.maxLength && errors.push('Password must be less than 32 characters');
                !this.$v.enteredPass.required && errors.push('Password is required');
                return errors
            },
            width() {
                if (['xs', 'sm'].indexOf(this.$vuetify.breakpoint.name) > -1) {
                    return '95%'
                } else {
                    return '50%'
                }
            }
        },
        data: () => ({
            enteredUser: null,
            enteredPass: null,
            createUserDialog: false,
            loading: false,
        }),
        methods: {
            async submitLoginInfo() {
                this.loading = true;
                try {
                    await this.$store.dispatch('getToken', {
                        username: this.enteredUser.toLowerCase(),
                        password: this.enteredPass
                    });
                    await this.getUserInfo();
                    this.loading = false;
                } catch (e) {
                    this.$store.commit('setSnackbarMessage', e.data.non_field_errors[0]);
                    this.$store.commit('setSnackbarColor', 'error');
                    this.$store.commit('toggleDisplaySnackbar');
                    this.loading = false;
                }

            },
            async getUserInfo() {
                try {
                    await this.$store.dispatch('getUserInfo', {
                        username: this.enteredUser.toLowerCase()
                    });
                } catch (e) {
                    this.$store.commit('setSnackbarMessage', 'Error getting user info');
                    this.$store.commit('setSnackbarColor', 'error');
                    this.$store.commit('toggleDisplaySnackbar');
                }
                this.$store.commit('toggleNavBar', true);
                await this.$router.push({ name: 'Home' })
            },
            toggleCreateUserDialog() {
                this.createUserDialog = !this.createUserDialog;
            },
        },
    }
</script>

<style scoped>

</style>