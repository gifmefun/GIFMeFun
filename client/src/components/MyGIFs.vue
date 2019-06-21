<template>
    <div class="card">
      <a class="card-img-top" href="#">
        <img :src="gif" :alt="gif" class="img-thumbnail">
      </a>
      <div class="card-footer">
        <button
          @click="window.open(`https://www.facebook.com/sharer.php?u=https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg`)"
          class="btn btn-primary"
        >
          <i class="fab fa-facebook-square align-middle" style="font-size:25px; "></i>
          <span class="align-middle">Share on Facebook</span>
        </button>
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
</template>
<script>
export default {
  props: ['gif'],
  data(){
    return {

    }
  }
}
</script>
