<template>
  <div class="card-deck">
    <div v-for="gif in gifs" :key="gif" class="card">
      <a class="card-img-top" href="#">
        <img :src="gif" :alt="gif" class="img-thumbnail">
      </a>
      <div class="card-footer">
        
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
</template>
