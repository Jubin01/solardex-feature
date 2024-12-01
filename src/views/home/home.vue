<template>
  <div class="home">
    <h3></h3>

    <div class="space">
      <img v-if="body.image" id="bodyimage" :src=body.image height="100" />
      <!-- <h5>{{ value.name.charAt(0).toUpperCase() + value.name.slice(1) }}</h5> -->
      <div>
        <h5>{{ body.englishName }}</h5>
      </div>
      <!-- <span class="badge" v-for="(value, index) in body.types" :key="index">{{ value.type.name }}</span> -->
      <!-- <a v-on:click="onMoonClick" href="#" class="moon">Moons</a> -->
      <router-link v-if="body.moons" :to="{ name: 'moon', params: { id: body.id, i: i } }">Moon</router-link>
      <br />
      <a v-on:click="onPrevClick" href="#" class="previous">&laquo; Previous</a>
      <a v-on:click="onNextClick" href="#" class="next">Next &raquo;</a>
    </div>

  </div>
</template>
  
<style>
a {
  padding: 8px 16px;
  color: wheat;
}

.badge {
  background-color: red;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  margin: 0px 2px 0px 2px;
}

.space {
  text-align: center;
}
</style>

<script>
export default {
  name: 'Home',
  data: () => ({
    i: 1,
    body: {}
  }),
  methods: {
    onMoonClick() {

    },
    onPrevClick() {
      if (this.i > 1) {
        this.callBody(this.i -= 1);
      }
    },
    onNextClick() {
      if (this.i < 8) {
        this.callBody(this.i += 1);
      }
    },
    callBody(i) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.le-systeme-solaire.net/rest.php/bodies?data=id%2CisPlanet%2Cdensity%2Cgravity%2CenglishName%2Cmoons%2CsideralOrbit&order=sideralOrbit%2Casc&page= ' + i + ' %2C1&filter%5B%5D=isPlanet%2Ceq%2Ctrue');
      // xhr.open('GET', 'https://api.le-systeme-solaire.net/rest.php/bodies?order=sideralOrbit%2Casc&page= ' + i + ' %2C1&filter%5B%5D=isPlanet%2Ceq%2Ctrue');
      xhr.onload = () => {
        this.body = {};
        this.body = JSON.parse(xhr.responseText).bodies[0];
        this.body.image = 'assets/spaceimages/' + this.body.id + '.png';
      }
      xhr.send();
    }
  },
  created() {
    if (this.$route.params.i) {
      this.i = this.$route.params.i;
    }
    this.callBody(this.i);
  }
};
</script>