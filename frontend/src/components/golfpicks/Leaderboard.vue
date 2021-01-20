<template>
  <v-card
      :max-width="width"
      class="mx-auto mt-2"
  >
    <v-card-title>
      <div class="mt-3">Leader - {{ status }}</div>
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
          :loading="loading"
          @click:row="handleClick"
          :items-per-page="-1"
          dense
      ></v-data-table>
    </v-card-text>
    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
import {mdiMagnify} from '@mdi/js';

export default {
  name: "Leaderboard",
  data: () => ({
    rawData: null,
    search: '',
    searchIcon: mdiMagnify,
    loading: false,
    status: '',
  }),
  computed: {
    width() {
      return '95%';
    },
    headers() {
      if (this.rawData) {
        return Object.keys(this.rawData[0]).map(key => ({text: key, align: 'left', value: key}));
      } else {
        return []
      }
    },
    items() {
      if (this.rawData) {
        return Object.values(this.rawData);
      } else {
        return []
      }
    }
  },
  beforeMount() {
    this.getLeaderboard();
    this.getStatus();
  },
  methods: {
    async getLeaderboard() {
      this.loading = true;
      const response = await this.$store.dispatch('getLeaderboard');
      this.rawData = JSON.parse(response.data);
      this.loading = false;
    },
    async getStatus() {
      const response = await this.$store.dispatch('getStatus');
      this.status = response.data;
      this.loading = false;
    },
    handleClick(value) {
      const name_route = value.name.replace(' ', '_')
      this.$router.push(`/golf/details/${name_route}`)
    }
  }
}
</script>

<style scoped>

</style>