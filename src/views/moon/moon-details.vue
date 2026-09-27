<template>
  <div class="planet-details">
    <h3></h3>
    <div class="space">
      <div>
        <h5>{{bodydetails.extract}}</h5>
      </div>
      <router-link :to="{ name: 'moon', params: { planetid :this.$route.params.planetid,planetindex :this.$route.params.planetindex, moonindex: this.$route.params.i}}">Moon</router-link> 
      <br />
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
  name: 'MoonDetails',
  data: () => ({
    i: 0 ,
    bodydetails: {},
  }),
  methods: {

    async callBodyDetails() {
     const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://en.wikipedia.org/api/rest_v1/page/summary/'+this.$route.params.id);
      
      xhr.onload = () => {
       this.bodydetails = {};
       this.bodydetails = JSON.parse(xhr.responseText);
     }
      xhr.send();
    }
  },
  async created() {
      this.callBodyDetails();
  }
};
</script>