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
    i: 0,
    body: {},
    bodies:[]
  }),
  methods: {
    onPrevClick() {
      if (this.i > 0) {
        this.callBody(this.i -= 1);
      }
    },
    onNextClick() {
      if (this.body !== undefined) {
        this.callBody(this.i += 1);
      }
    },
    callBody(i) {
      // const xhr = new XMLHttpRequest();
      // xhr.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies?data=id%2CenglishName&order=sideralOrbit%2Casc&page='+ i +'%2C1&filter%5B%5D=bodyType%2Ceq%2CMoon&filter%5B%5D=aroundPlanet%2Ceq%2C' + this.$route.params.id);
      // xhr.setRequestHeader("Authorization", "Bearer 671e9fe4-84b7-4324-8afe-9a5c2b6efe3b");
      // xhr.onload = () => {
      //   this.body = {};
      //   this.body = JSON.parse(xhr.responseText).bodies[0] ? JSON.parse(xhr.responseText).bodies[0] : undefined;
      //   if (this.body === undefined) {
      //     this.i -= 1;
      //   }
      //   else{
      //     this.body.image = 'assets/spaceimages/' + this.body.id + '.png';
      //   }
      // }
      // xhr.send();

      this.body = {};
      this.body = this.bodies
      .filter(body => body.bodyType === 'Moon' && body.aroundPlanet && body.aroundPlanet.planet === this.$route.params.id)
        .sort((a, b) => a.sideralOrbit - b.sideralOrbit)[i];
        if (this.body === undefined) {
          this.i -= 1;
        }
        else{
          this.body.image = 'assets/spaceimages/' + this.body.id + '.png';
        }
        console.log(this.body);

    },
    setAltImg(event) {
      event.target.src = 'assets/noimage.png';
    }
  },
  async created() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/solar-system.json', true);

    xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      this.bodies = data.bodies;
      this.callBody(this.i);
    }
  };

  xhr.send();

    // const response = await fetch('assets/solar-system.json');
    // const data = await response.json();
    // this.bodies = data.bodies;
    // this.callBody(0);
  }
};
</script>