<template>
	<div>
		{{ data }}
	</div>
</template>

<script>
	import { hoods } from "./hoods";
	export default {
		computed: {
			data() {
				let data = [];
				hoods.forEach(hood => {
					let container = { point: { lat: "", lng: "" } };

					let point = hood[8]
						.replace("POINT (", "")
						.replace(")", "")
						.split(" ");

					container.point.lat = Number(point[1]);
					container.point.lng = Number(point[0]);
					container.neighborhood = hood[10];
					container.burrough = hood[16];
					data.push(container);
				});
				return data;
			}
		}
	};
</script>