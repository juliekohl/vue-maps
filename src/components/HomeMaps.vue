<template>
  <div>
    <h1>{{currPosName}}</h1>
    <p>Latitude: {{ currPos.lat.toFixed(2) }}, Longitude: {{ currPos.lng.toFixed(2) }}</p>

    <GMapAutocomplete
        class="search"
        placeholder="Search"
        @place_changed="setPlace"
    ></GMapAutocomplete>

    <div class="markers">
      <strong>Markers: </strong>
      <span v-for="(name, index) in markersNames" :key="index">{{ name }}</span>
    </div>

    <GMapMap
        class="map"
        :center="center"
        :zoom="zoom"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>
    <p>by Juliana Cochenski</p>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {useGeolocation} from "@/useGeolocation";
import {computed} from "vue";

const { coords } = useGeolocation();
const defaultPosName = 'Praça do Japão';
const defaultPos = {
  lat: -25.4459277,
  lng: -49.287317,
};

const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude
}));

let currPosName = ref(defaultPosName);

let zoom = ref(15);

let center = reactive({
  lat: defaultPos.lat,
  lng: defaultPos.lng,
});

let markersNames = ref([defaultPosName]);

let markers = reactive([
  {
    position: {
      lat: defaultPos.lat,
      lng: defaultPos.lng,
    },
  },
]);

function setPlace(place) {
  const position = {
    lat: place.geometry.viewport.yb.lo,
    lng: place.geometry.viewport.Qa.lo,
  };

  currPosName.value = place.name;

  zoom.value = 5;

  center.lat = position.lat;
  center.lng = position.lng;

  markers.push({ position });
  markersNames.value.push(`, ${place.name}`);
}
</script>

<style scoped>
.map {
  width: 100vw;
  height: calc(100vh - 280px);
}
.search {
  width: 50vw;
  padding: 10px 20px;
}
.markers {
  margin: 20px 0;
}
</style>
