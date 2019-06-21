<template>
  <div id="get-started">
    <!--Modal: Login / Register Form-->
    <div class="text-center" style="font-family: 'Bungee Shade', cursive;">
      <h1>Let's have some fun, shall we?</h1>
      <a
        href="#"
        class="btn btn-lg btn-default btn-rounded my-3"
        data-toggle="modal"
        data-target="#modalLRForm"
        style="font-family: 'Eater', cursive;"
      >GIF ME NOW</a>
    </div>
    <!--Modal: Login / Register Form-->
    <div
      class="modal fade"
      id="modalLRForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog cascading-modal" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Modal cascading tabs-->
          <div class="modal-c-tabs">
            <!-- Nav tabs -->
            <ul id="authTab" class="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#panel7" role="tab">
                  <i class="fas fa-user mr-1"></i>
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#panel8" role="tab">
                  <i class="fas fa-user-plus mr-1"></i>
                  Register
                </a>
              </li>
            </ul>

            <!-- Tab panels -->
            <div class="tab-content">
              <!--Panel 7-->
              <div class="tab-pane fade in show active" id="panel7" role="tabpanel">
                <!--Body-->
                <div class="modal-body mb-1">
                  <form @submit.prevent="login">
                    <div class="md-form form-sm mb-5">
                      <i class="fas fa-envelope prefix"></i>
                      <input
                        v-model="inputLogin.email"
                        type="email"
                        id="modalLRInput10"
                        class="form-control form-control-sm validate"
                      >
                      <label data-error="wrong" data-success="right" for="modalLRInput10">Your email</label>
                    </div>
                    <div class="md-form form-sm mb-4">
                      <i class="fas fa-lock prefix"></i>
                      <input
                        v-model="inputLogin.password"
                        type="password"
                        id="modalLRInput11"
                        class="form-control form-control-sm validate"
                      >
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput11"
                      >Your password</label>
                    </div>
                    <div class="row justify-content-around align-items-center mt-2">
                      <button class="btn btn-info">
                        Log in
                        <i class="fas fa-sign-in ml-1"></i>
                      </button>
                      <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                  </form>
                </div>
                <!--Footer-->
                <div class="modal-footer">
                  <div class="options text-center text-md-right mt-1">
                    <p>
                      Not a member?
                      <a
                        onclick="$('#authTab li:last-child a').tab('show')"
                        href="#"
                        class="blue-text"
                      >Sign Up</a>
                    </p>
                    <!-- <p>
                          Forgot
                          <a href="#" class="blue-text">Password?</a>
                    </p>-->
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-info waves-effect ml-auto"
                    data-dismiss="modal"
                  >Close</button>
                </div>
              </div>
              <!--/.Panel 7-->

              <!--Panel 8-->
              <div class="tab-pane fade" id="panel8" role="tabpanel">
                <!--Body-->
                <div class="modal-body">
                  <form @submit.prevent="register">
                    <div class="md-form form-sm mb-5">
                      <i class="fas fa-user prefix grey-text"></i>
                      <input
                        v-model="inputRegister.name"
                        type="text"
                        id="form3"
                        class="form-control validate"
                      >
                      <label data-error="wrong" data-success="right" for="form3">Your name</label>
                    </div>
                    <div class="md-form form-sm mb-5">
                      <i class="fas fa-envelope prefix"></i>
                      <input
                        v-model="inputRegister.email"
                        type="email"
                        id="modalLRInput12"
                        class="form-control form-control-sm validate"
                      >
                      <label data-error="wrong" data-success="right" for="modalLRInput12">Your email</label>
                    </div>
                    <div class="md-form form-sm mb-5">
                      <i class="fas fa-lock prefix"></i>
                      <input
                        v-model="inputRegister.password"
                        type="password"
                        id="modalLRInput13"
                        class="form-control form-control-sm validate"
                      >
                      <label
                        data-error="wrong"
                        data-success="right"
                        for="modalLRInput13"
                      >Your password</label>
                    </div>
                    <div class="custom-file">
                      <input
                        @change="selectFile"
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                      >
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                    <div class="text-center form-sm mt-2">
                      <button class="btn btn-info">
                        Sign up
                        <i class="fas fa-sign-in ml-1"></i>
                      </button>
                    </div>
                  </form>
                </div>
                <!--Footer-->
                <div class="modal-footer">
                  <div class="options text-right">
                    <p class="pt-1">
                      Already have an account?
                      <a
                        onclick="$('#authTab li:first-child a').tab('show')"
                        href="#"
                        class="blue-text"
                      >Log In</a>
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-info waves-effect ml-auto"
                    data-dismiss="modal"
                  >Close</button>
                </div>
              </div>
              <!--/.Panel 8-->
            </div>
          </div>
        </div>
        <!--/.Content-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios.js";
export default {
  data() {
    return {
      inputLogin: {
        email: "",
        password: ""
      },
      inputRegister: {
        name: "",
        email: "",
        password: "",
        image: ""
      }
    };
  },
  methods: {
    emptyOnSuccess() {
      this.inputLogin.email = "";
      this.inputLogin.password = "";
      this.inputRegister.name = "";
      this.inputRegister.email = "";
      this.inputRegister.password = "";
      this.inputRegister.image = "";
    },
    emptyOnFail() {
      this.inputLogin.password = "";
      this.inputRegister.password = "";
    },
    selectFile() {
      this.inputRegister.image = event.target.files[0];
    },
    register() {
      axios({
        method: "post",
        url: `/auth/register`,
        data: this.inputRegister
      })
        .then(({ data }) => {
          this.emptyOnSuccess();
          Swal.fire({
            type: "success",
            title: "Registered!",
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch(({ response }) => {
          this.emptyOnFail();
          Swal.fire("Error", response.data.message, "error");
        });
    },
    login() {
      axios({
        method: "post",
        url: `/auth/login`,
        data: this.inputLogin
      })
        .then(({ data }) => {
          this.emptyOnSuccess();
          console.log(data);
          $('#modalLRForm').modal('hide')
          this.$emit('loginSuccess',data.user)
          Swal.fire({
            type: "success",
            title: "Logged In!",
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch(({ response }) => {
          this.emptyOnFail();
          Swal.fire("Error", response.data.message, "error");
        });
    }
  }
};
</script>

<style scoped>
#get-started {
  background: rgba(171, 205, 239, 0.8);
}
</style>
