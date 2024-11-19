<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <form action="/loginaction" method="POST">
    @csrf
    <div class="form-group">
        <label for="email">Email address</label>
        <!-- Removed whitespace in the name attribute -->
        <input type="email" name="email" class="form-control" placeholder="Enter email">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input name="password" type="password" class="form-control" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  