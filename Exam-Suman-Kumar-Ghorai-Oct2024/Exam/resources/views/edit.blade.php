<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" 
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
<div class="container mt-5">
    <form method="POST" action="/update" class="row g-3" enctype="multipart/form-data">
        @csrf
        <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input type="text" name="name" class="form-control" id="name" value="{{ $user->name }}">
        </div>
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" name="email" class="form-control" id="inputEmail4" value="{{ $user->email }}">
        </div>
       
        <div class="col-12">
            <label for="inputAddress" class="form-label">Location</label>
            <input type="text" name="location" class="form-control" id="inputAddress" value="{{ $user->location }}">
        </div>
        <div class="col-12">
            <label for="photo" class="form-label">Photo</label>
            <input type="file" name="photo" class="form-control" id="photo">
            @if($user->photo)
                        <img src="{{ Storage::url($user->photo) }}" alt="User Photo" width="200" height="150">
                    @else
                        <p>No photo available</p>
                    @endif
        </div>
        <div class="col-12">
          <br>
          <br>
            <button type="submit" class="btn btn-primary">Update</button>
        </div>
    </form>
</div>
</body>
</html>
