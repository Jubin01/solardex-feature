<template>
  <footer class="footer">
    <h6 class="credits">Made with <img alt="Vue logo" src="assets/logo.png" height="10" /> with ❤️. <br/>
      Images from https://www.pngwing.com/
    </h6>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 30px;
  width: 100%;

  opacity: 0.5;
}

.credits {
  text-align: center;
}
</style>