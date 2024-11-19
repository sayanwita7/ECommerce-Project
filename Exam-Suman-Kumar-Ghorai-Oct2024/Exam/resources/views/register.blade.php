<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<form method="POST" action="/register" class="row g-3" enctype="multipart/form-data">
    @csrf
    <div class="col-md-6">
        <label for="name" class="form-label">Name</label>
        <input type="text" name="name" class="form-control" id="inputEmail4">
      </div>
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input type="email" name="email" class="form-control" id="inputEmail4">
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">Password</label>
      <input type="password" name="password" class="form-control" id="inputPassword4">
    </div>
    <div class="col-12">
        <label for="inputAddress2" class="form-label">Confirm Password</label>
        <input type="password" name="password_confirmation" class="form-control" id="inputAddress2" >
      </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">Location</label>
      <input type="text" name="location" class="form-control" id="inputAddress" >
    </div>
    
    
    
    <div class="col-12">
        <label for="photo" class="form-label">Photo</label>
        <input type="file" name="photo" class="form-control" id="photo" >
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Register</button>
    </div>
  </form>