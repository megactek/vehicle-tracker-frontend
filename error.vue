<template>
  <div class="error container">
    <div class="error-content">
      <h1>404</h1>
      <p>Sorry we couldn't find this page</p>
      <h3>
        But don't worry you will find what you are looking for after logging in.
      </h3>
      <nuxt-link to="/login" class="btn btn-primary"
        >Back to login page</nuxt-link
      >
    </div>
    <div class="error-image">
      <img src="/404.svg" alt="error" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.error {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
}

@media (max-width: 500px) {
  .error {
    grid-template-columns: 1fr;
  }

  .error-content {
    text-align: center;
  }

  .error-image img {
    display: none;
  }
}
</style>
