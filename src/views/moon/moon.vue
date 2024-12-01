<template>
  <div class="moon">
    <h3></h3>

    <div class="space">
      <img v-if="body.image" id="bodyimage" :src=body.image @error="setAltImg" height="100" />
      <div>
        <h5>{{ body.englishName }}</h5>
      </div>
      <router-link :to="{ name: 'home', params: { i: this.$route.params.i}}">Planet</router-link> 
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

/* .badge {
  background-color: red;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  margin: 0px 2px 0px 2px;
} */

.space {
  text-align: center;
}
</style>

<script>
export default {
  name: 'Moon',
  data: () => ({
    i: 1,
    body: {}
  }),
  methods: {
    onPrevClick() {
      if (this.i > 1) {
        this.callBody(this.i -= 1);
      }
    },
    onNextClick() {
      if (this.body !== undefined) {
        this.callBody(this.i += 1);
      }
    },
    callBody(i) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.le-systeme-solaire.net/rest.php/bodies?data=id%2CenglishName&order=sideralOrbit%2Casc&page=' + i + '%2C1&filter%5B%5D=bodyType%2Ceq%2CMoon&filter%5B%5D=aroundPlanet%2Ceq%2C' + this.$route.params.id);
      xhr.onload = () => {
        this.body = {};
        this.body = JSON.parse(xhr.responseText).bodies[0] ? JSON.parse(xhr.responseText).bodies[0] : undefined;
        if (this.body === undefined) {
          this.i -= 1;
        }
        else{
          this.body.image = 'assets/spaceimages/' + this.body.id + '.png';
        }
      }
      xhr.send();
    },
    setAltImg(event) {
      event.target.src = 'assets/noimage.png';
    }
  },
  created() {
    this.callBody(1);
  }
};
</script>