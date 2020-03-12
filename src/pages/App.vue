<template>
	<Layout>
		<GmapMap :center="center" :zoom="12" class="map" :options="options">
			<gmap-custom-marker
				v-for="(hood, n) in hoods"
				:key="n"
				:marker="hood.point"
			>
				<v-tooltip top color="primary" :activate-on-click="false">
					<template v-slot:activator="{ on }">
						<button @click="setHood(hood)" v-on="on" class="marker">
							<div class="marker-dot"></div>
						</button>
					</template>
					<span>{{ hood.neighborhood }}</span>
				</v-tooltip>
			</gmap-custom-marker>
		</GmapMap>

		<div class="toggle">
			<v-btn-toggle
				rounded
				mandatory
				v-model="userType"
				class="elevation-3"
				v-if="!submitted"
			>
				<v-btn
					value="need_help"
					active-class="accent darken-1 white--text font-weight-bold"
					style="opacity: 1;"
					class="px-6 deep-purple lighten-5"
				>
					<v-icon left>{{ icons.mdiHandLeft }}</v-icon>
					I need help
				</v-btn>
				<v-btn
					value="can_help"
					active-class="accent darken-1 white--text font-weight-bold"
					style="opacity: 1;"
					class="px-6 deep-purple lighten-5"
				>
					<v-icon left>{{ icons.mdiHandHeart }}</v-icon>
					I can help
				</v-btn>
			</v-btn-toggle>
		</div>

		<v-container
			v-if="!submitted"
			style="min-width: 300px; max-width: 600px;"
			class="mb-12 mt-2"
		>
			<div class="title mb-4 text-center">
				<span v-if="selectedNeighborhood">
					Your Location:
					<b class="primary--text">
						{{ selectedNeighborhood }}, {{ selectedBurrough }}
					</b>
				</span>
				<span v-else>Select your neighborhood on the map.</span>
			</div>
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
					v-mask="'(###) ###-####'"
					hint="10-Digit, U.S. Phone Number"
					placeholder="(###) ###-####"
				/>
				<v-text-field
					label="Email Address"
					rounded
					outlined
					dense
					v-model="phone"
					:prepend-inner-icon="icons.mdiAt"
					:rules="[
						v => !!v || 'E-mail is required',
						v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
					]"
					required
				/>
				<v-card shaped outlined class="mb-6">
					<v-card-title class="primary--text">
						What happens next?
						<v-spacer />
						<v-icon color="primary">{{ icons.mdiInformationOutline }}</v-icon>
					</v-card-title>
					<v-card-text class="body">
						Once you match with another user, we will send you both an email to
						let you know. We will not share your information with any third
						party.
					</v-card-text>
				</v-card>
				<v-btn
					:disabled="!valid || selectedNeighborhood.length === 0"
					@click="submit"
					rounded
					color="accent"
					large
				>
					<v-icon left>{{ icons.mdiSend }}</v-icon> Submit
				</v-btn>
			</v-form>
		</v-container>

		<v-container v-if="submitted" class="d-flex justify-center mb-12 mt-6">
			<v-card shaped outlined style="min-width: 300px; max-width: 600px;">
				<v-img src="/message_sent.svg" contain class="ma-4" />
				<v-divider />
				<v-card-text>
					<p class="title">Thanks, we added you to our database!</p>
					We'll let you know as soon as you have a match.
				</v-card-text>
			</v-card>
		</v-container>
	</Layout>
</template>

<script>
	import { hoods } from "./hoods";
	import { mapStyles } from "./mapStyles";
	import GmapCustomMarker from "vue2-gmap-custom-marker";
	import {
		mdiSend,
		mdiAccount,
		mdiPhone,
		mdiAt,
		mdiInformationOutline,
		mdiHandLeft,
		mdiHandHeart
	} from "@mdi/js";
	export default {
		components: {
			"gmap-custom-marker": GmapCustomMarker
		},
		data: () => ({
			center: { lat: 40.782792, lng: -73.965881 },
			valid: false,
			hoods: hoods,
			selectedNeighborhood: "",
			selectedBurrough: "",
			name: "",
			phone: "",
			email: "",
			userType: "need_help",
			submitted: false,
			icons: {
				mdiSend,
				mdiAccount,
				mdiPhone,
				mdiAt,
				mdiInformationOutline,
				mdiHandLeft,
				mdiHandHeart
			},
			options: {
				streetViewControl: false,
				mapTypeControl: false,
				clickableIcons: false,
				maxZoom: 14,
				minZoom: 11,
				gestureHandling: "greedy",
				styles: mapStyles
			}
		}),
		methods: {
			setHood(hood) {
				this.selectedNeighborhood = hood.neighborhood;
				this.selectedBurrough = hood.burrough;
				this.center = hood.point;
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

				this.submitted = true;
			}
		}
	};
</script>

<style>
	.map {
		height: 500px;
		width: 100%;
		max-height: 50vh;
		border-bottom: 1px solid #ccc;
	}

	.toggle {
		position: relative;
		top: -24px;
		margin: 0 auto;
		text-align: center;
	}

	.white--text svg {
		fill: white;
	}

	.marker {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 24px;
		width: 24px;
		position: relative;
		left: 8px;
		top: 8px;
	}

	.marker-dot {
		height: 8px;
		width: 8px;
		background: var(--v-primary-base);
		border-radius: 50%;
	}

	.marker:focus {
		outline: none;
	}

	.marker:hover .marker-dot {
		transform: scale(1.5);
		transform-origin: center;
	}

	.marker:focus .marker-dot {
		transform: scale(2);
		transform-origin: center;
	}
</style>