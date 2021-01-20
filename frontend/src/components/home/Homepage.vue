<template>
    <v-card
        class="mx-auto my-2"
        max-width="95%"
    >
        <v-img
            class="align-end"
            height="300px"
            :src="require('../../assets/dino.jpg')"
        >
            <v-card-title>Andrew Kincaid</v-card-title>
        </v-img>
        <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium aliquid commodi dicta dolorem error facilis harum illum,
            labore magnam molestiae nam nisi nobis perspiciatis quae rerum sequi totam voluptatem voluptatibus!
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                :href="githubLink"
                target="_blank"
            >github</v-btn>
            <v-spacer></v-spacer>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn
                        text
                        href="mailto:atkincaid74@gmail.com"
                        v-on="on"
                    >email
                    </v-btn>
                </template>
                <span>atkincaid74@gmail.com</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn
                text
                :href="`${publicPath}AndrewKincaidResume.pdf`"
                target="_blank"
            >resume
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Homepage",
        data: () => ({
            githubLink: 'https://github.com/atkincaid74/andrew-kincaid-frontend',
            publicPath: process.env.BASE_URL
        }),
        methods: {
            logResume() {
                if (this.$route.path === '/resume') {
                    this.$store.dispatch('logResumeHit');
                }
            }
        },
        mounted() {
            this.logResume();
        }
    }
</script>

<style scoped>

</style>