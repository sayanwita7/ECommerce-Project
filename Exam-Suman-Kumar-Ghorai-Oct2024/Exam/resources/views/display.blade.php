<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Details</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
<div class="container mt-5">
    <h2>User Details</h2>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Photo</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>{{ $user->location }}</td>
                <td>
                    @if($user->photo)
                        <img src="{{ Storage::url($user->photo) }}" alt="User Photo" width="250" height="250">
                    @else
                        <p>No photo available</p>
                    @endif
                </td>
                
                <td>
                    <a href="{{ url('/edit-user/' . $user->id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <a href="{{ url('/change-password/' . $user->id) }}" class="btn btn-info btn-sm">Change Password</a>
                    <a href="/logout" class="btn btn-danger btn-sm">Logout</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</body>
</html>
