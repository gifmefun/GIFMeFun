<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light align-items-center"
  >
    <a class="navbar-brand" href="#">
      <img
        src="../assets/navbar-brand.jpg"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt="Navbar brand"
      >
      GIF ME FUN
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link btn btn-info" href="#">My GIFs</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="http://ssref.net/scripts/image_resize.cgi?min=200&url=https://d2cwpp38twqe55.cloudfront.net/req/201905091/images/players/mingya01.jpg"
              alt="Yao Ming"
              class="img-thumbnail"
              style="border-radius: 50%; height: 50px;"
            >
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">My GIFs</a>
            <a class="dropdown-item" href="#">Edit Profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.nav-link {
  /* height: 50px; */
}
</style>
