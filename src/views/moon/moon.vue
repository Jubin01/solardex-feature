<template>
  <div class="moon">
    <h3></h3>

    <div class="space">
      <img v-if="body.image" id="bodyimage" :src=body.image @error="setAltImg" height="100" />
      <div>
        <h5>{{ body.englishName }}</h5>
      </div>
      <router-link :to="{ name: 'moon-details', params: { id: body.englishName,planetid:this.planetid,planetindex:this.$route.params.planetindex, i: i } }">Moon Details</router-link>
      <br />
      <br />
      <router-link :to="{ name: 'home', params: { i: this.$route.params.planetindex}}">Planet</router-link> 
      <br />
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

.space {
  text-align: center;
}
</style>

<script>
export default {
  name: 'Moon',
  data: () => ({
    i: 0,
    planetid:'',
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

      this.body = {};
      this.body = this.bodies
      .filter(body => body.bodyType === 'Moon' && body.aroundPlanet && body.aroundPlanet.planet === this.planetid)
        .sort((a, b) => a.sideralOrbit - b.sideralOrbit)[i];
        if (this.body === undefined) {
          this.i -= 1;
        }
        else{
          this.body.image = 'assets/spaceimages/' + this.body.id + '.png';
        }
    },
    setAltImg(event) {
      event.target.src = 'assets/noimage.png';
    }
  },
  async created() {
    if (this.$route.params.moonindex) {
      this.i = this.$route.params.moonindex;
    }
    if (this.$route.params.planetid) {
      this.planetid = this.$route.params.planetid;
    }
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
  }
};
</script>