<template>
    <div>
        <v-card
            max-width="500"
            class="mx-auto mt-2"
        >
            <v-card-title>Add Email/ Mark Email Paid</v-card-title>
            <v-card-text>
                <v-text-field
                    label="Email"
                    v-model="email"
                    @change="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="emailErrors"
                    @keyup.enter="$v.$invalid ? '' : submitEmail()"
                    validate-on-blur
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-switch
                    label="Paid"
                    v-model="paid"
                ></v-switch>
                <v-spacer></v-spacer>
                <v-switch
                    label="SC"
                    v-model="superContest"
                ></v-switch>
                <v-spacer></v-spacer>
                <v-switch
                    label="P6"
                    v-model="pickSix"
                ></v-switch>
                <v-spacer></v-spacer>
                <v-btn
                    @click="submitEmail"
                    :loading="loading"
                    :disabled="$v.$invalid"
                >Submit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import { required, email } from "vuelidate/src/validators";

    export default {
        name: "AdminPage",
        data: () => ({
            email: null,
            loading: false,
            paid: false,
            superContest: true,
            pickSix: true,
        }),
        mixins: [validationMixin],
        validations: {
            email: { required, email }
        },
        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.email && errors.push('Invalid email');
                return errors
            },
        },
        methods: {
            async submitEmail() {
                try {
                    await this.$store.dispatch('submitValidEmail', {
                        email: this.email,
                        paid: this.paid,
                        superContest: this.superContest,
                        pickSix: this.pickSix,
                    });
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
        },
    }
</script>

<style scoped>

</style>