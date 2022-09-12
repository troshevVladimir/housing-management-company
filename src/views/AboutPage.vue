<template>
  <h1 class="houses-page__page-title">{{$route.params.title}}</h1>
  <div id="map" style="width: 600px; height: 400px"></div>
</template>

<script>
export default {
	name: 'about',
	mounted() {
		this.ymap()
	},
	methods: {
		ymap() {
			ymaps.ready(init)
			function init() {
				var myMap = new ymaps.Map('map', {
					center: [61.075447, 50.085236],
					// from 0 (the entire world) to 19.
					zoom: 17,
				})

				var placemark = new ymaps.Placemark(
					[61.075447, 50.085236],
					{
						balloonContent:
							'<strong>Здание офиса</strong><br/><span>Советская 40</span>',
						iconContent: 'Офис',
					},
					{
						preset: 'islands#yellowStretchyIcon',
						balloonCloseButton: true,
					}
				)
				myMap.geoObjects.add(placemark)
			}
		},
	},
	computed: {
		// apiKey() {
		// 	return '79edb67c-16f5-4dca-8e2d-03e6aa4beebe'
		// },
	},
}
</script>

<style lang="scss"></style>
