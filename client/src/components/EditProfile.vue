<template>
  <div class="container">
    <h1>Edit Profile</h1>
  	<hr>
	<div class="row">
      <!-- left column -->
      <div class="col-md-3">
        <div class="text-center">
          <img :src="imageURL" class="avatar img-circle" alt="avatar">
          <h6>Upload a different photo...</h6>
          
          <div class="custom-file">
                      <input @change="selectFile" type="file" class="custom-file-input" id="customFile">
                      <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
        </div>
      </div>
      
      <!-- edit form column -->
      <div class="col-md-9 personal-info">
        <!-- <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div> -->
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="Jane" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="janesemail@gmail.com" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Password:</label>
            <div class="col-md-8">
              <input class="form-control" type="password" value="11111122333" required>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-8">
              <input @click="updateProfile" type="button" class="btn btn-primary" value="Save Changes">
              <span></span>
              <input type="reset" class="btn btn-default" value="Cancel">
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
</template>
<script>
import axios from '../axios.js'
export default {
  data(){
    return {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      imageURL: localStorage.getItem('imageURL'),
      image: ''
    }
  },
  methods: {
    selectFile() {
      if(event.target.files[0])
        this.image = event.target.files[0];
    },
    updateProfile() {
      let formData = new FormData()
        formData.append('name',this.name)
        formData.append('email',this.email)
        formData.append('password',this.password)
        formData.append('imageURL',this.image)
      axios({
        method: "put",
        url: `/user`,
        data: formData
      })
        .then(({ data }) => {
      this.password = "";          
          Swal.fire({
            type: "success",
            title: "Registered!",
            showConfirmButton: false,
            timer: 2000
          });
        })
        .catch(({ response }) => {
      this.password = "";
          Swal.fire("Error", response.data.message, "error");
        });
    },
  }
}
</script>
