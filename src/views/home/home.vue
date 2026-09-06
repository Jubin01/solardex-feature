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
    i: 0 ,
    body: {},
    bodies:[]
  }),
  methods: {
    onMoonClick() {

    },
    onPrevClick() {
      if (this.i > 0) {
        this.callBody(this.i -= 1);
      }
    },
    onNextClick() {
      if (this.i < 7) {
        this.callBody(this.i += 1);
      }
    },
    async callBody(i) {
   //   const xhr = new XMLHttpRequest();
     // xhr.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies?data=id%2CisPlanet%2Cdensity%2Cgravity%2CenglishName%2Cmoons%2CsideralOrbit&order=sideralOrbit%2Casc&page='+ i +'%2C1&filter%5B%5D=isPlanet%2Ceq%2Ctrue');
      // xhr.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies?order=sideralOrbit%2Casc&page= ' + i + ' %2C1&filter%5B%5D=isPlanet%2Ceq%2Ctrue');
      
      //xhr.setRequestHeader("Authorization", "Bearer 671e9fe4-84b7-4324-8afe-9a5c2b6efe3b");

      //xhr.onload = () => {
       // this.body = {};
       // this.body = JSON.parse(xhr.responseText).bodies[0];
       // this.body.image = 'assets/spaceimages/' + this.body.id + '.png';
     // }

      //xhr.send();
    //  this.body = {};
    //  this.body = 'assets/solar-system.json';
     // console.log(this.body );

    // const response = await fetch('assets/solar-system.json');
    
    this.body = {};
    this.body = this.bodies
    .filter(body => body.isPlanet)
    .sort((a, b) => a.sideralOrbit - b.sideralOrbit)[i];
    this.body.image = 'assets/spaceimages/' + this.body.id + '.png';

    }
  },
  async created() {
    if (this.$route.params.i) {
      this.i = this.$route.params.i;
    }
    const response = await fetch('assets/solar-system.json');
    const data = await response.json();
    this.bodies = data.bodies;
    this.callBody(this.i);
  }
};
</script>