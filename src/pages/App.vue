<template>
  <Layout>
    <GmapMap
      :center="{lat: 40.782792, lng: -73.965881}"
      :zoom="12"
      style="height: 500px; width: 100%; max-height: 50vh;"
    >
      <GmapMarker
        v-for="hood, n in hoods"
        :key="n"
        :position="getPoint(hood)"
        :clickable="true"
        :draggable="true"
        @click="selectedNeighborhood = hood[10], selectedBurrough = hood[16]"
      />
    </GmapMap>
    <div style="margin-top: -36px; margin: -24px auto 0; text-align: center;">
      <v-btn-toggle rounded mandatory v-model="userType">
        <v-btn
          value="need_help"
          active-class="accent darken-1 white--text font-weight-bold"
          style="opacity: 1;"
        >I need help!</v-btn>
        <v-btn
          value="can_help"
          active-class="accent darken-1 white--text font-weight-bold"
          style="opacity: 1;"
        >I can help!</v-btn>
      </v-btn-toggle>
    </div>
    <div class="location my-lg-lg">
      <span
        v-if="selectedNeighborhood"
      >Your Location: {{selectedNeighborhood}}, {{selectedBurrough}}</span>
      <span v-else>Select your neighborhood on the map.</span>
    </div>
    <v-container style="width: 80%; min-width: 300px; max-width: 600px;" class="mb-12">
      <v-form ref="form" v-model="valid">
        <v-text-field
          label="Your Name"
          rounded
          outlined
          dense
          v-model="name"
          :prepend-inner-icon="icons.mdiAccount"
          required
        />
        <v-text-field
          label="Phone Number"
          rounded
          outlined
          dense
          v-model="email"
          :prepend-inner-icon="icons.mdiPhone"
          required
          type="tel"
        />
        <v-text-field
          label="Email Address"
          rounded
          outlined
          dense
          v-model="phone"
          :prepend-inner-icon="icons.mdiAt"
          :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
          required
        />
        <v-btn
          @click="submit"
          rounded
          :disabled="(!valid || selectedNeighborhood.length === 0)"
          color="success"
        >
          <v-icon left>{{icons.mdiSend}}</v-icon>Submit
        </v-btn>
      </v-form>
    </v-container>
  </Layout>
</template>

<script>
import { hoods } from "./hoods";
import { mdiSend, mdiAccount, mdiPhone, mdiAt } from "@mdi/js";
export default {
  data: () => ({
    valid: false,
    hoods: hoods,
    selectedNeighborhood: "",
    selectedBurrough: "",
    name: "",
    phone: "",
    email: "",
    userType: "need_help",
    icons: {
      mdiSend,
      mdiAccount,
      mdiPhone,
      mdiAt
    }
  }),
  methods: {
    getPoint(hood) {
      let point = hood[8]
        .replace("POINT (", "")
        .replace(")", "")
        .split(" ");
      let lat = Number(point[1]);
      let lng = Number(point[0]);
      return { lat: lat, lng: lng };
    },
    submit() {
      var Airtable = require("airtable");

      Airtable.configure({
        endpointUrl: "https://api.airtable.com",
        apiKey: "keyvHBngaQwDiZUOn"
      });

      var base = Airtable.base("appN9V7RRYCOdIcRe");

      base(this.userType == "need_help" ? "Needs Help" : "Can Help").create(
        [
          {
            fields: {
              Name: this.name,
              Email: this.email,
              Phone: this.phone,
              Neighborhood: this.selectedNeighborhood,
              Burrough: this.selectedBurrough
            }
          }
        ],
        function(err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function(record) {
            console.log(record.getId());
          });
        }
      );
    }
  }
};
</script>

<style>
.location {
  text-align: center;
  min-height: 3em;
  line-height: 3em;
}
</style>