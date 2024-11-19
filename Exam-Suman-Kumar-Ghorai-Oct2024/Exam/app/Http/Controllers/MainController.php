<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Session;

class MainController extends Controller
{
    //
    function register(Request $req)
    {
        try {
            $existingUser = DB::table('users')->where('email', $req->email)->first();

            if ($existingUser) {
                return response()->json(['message' => 'Email already registered. Please use another email.'], 409);
            }
           
            $req->validate([
                'name' => 'required|string',
                "email" => "required|email",
                "password" => "required|confirmed",
                "location" => "required|string",
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
               
            ]);

            //photo upload
            $photoPath = null;
            if ($req->hasFile('photo')) {
                $photoPath = $req->file('photo')->store('photos', 'public');
            }

        

            $result = DB::table('users')->insert([
                "name" => $req->name,
                "email" => $req->email,
                "password" => $req->password,
                "location"=>$req->location,
                'photo' => $photoPath,  
               
            ]);


            if ($result) {
               
                return response()->json(['message' => 'New user created successfully,PLEASE LOGIN'], 201);
               
            } else {
                return response()->json(['message' => 'User registration failed. Please try again.'], 500);
            }

        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred during registration. Please try again later.'.$e->getMessage()], 500);
        }
    }


    function login(Request $req)
    {
        try {
            // Fetch email input from request
            $email = $req->input('email');
            $password = $req->input('password');
            // dd($email);
            // dd($password);
    
        
            $user = DB::table('users')->where('email', $email)->first();
    
            
            if (!$user) {
                return response()->json(['message' => 'Invalid credentials. Please check your email and try again.'], 404);
            }
    
            
            if (!$password== $user->password) {
                return response()->json(['message' => 'Invalid credentials. Please check your password and try again.'], 401);
            }
    
            
            session([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
    
            // return response()->json(['message' => 'Login successful', 'user' => $user], 200);
            return view('display',["user"=>$user]);
    
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred during login. Please try again later.'], 500);
        }
    }
    

function logout(Request $req)
{
    $req->session()->flush();
    // return view("login");
    return response()->json(['message' => 'User logged-Out successfully'], 201); 
}

function show(Request $req){
    $id=Session::get('user_id');
    $user = DB::table('users')->where('id', $user_id)->first();
    return view('edit',["users"=>$user]);


}

function edit($id){
    $user = DB::table('users')->where('id', $id)->first();
    // dd($user);
    return view('edit',["user"=>$user]);


}


public function update(Request $req,)
{
    $id=Session::get('user_id');
    $updateData = [];
    if ($req->has('name')) {
        $updateData['name'] = $req->input('name');
    }

    if ($req->has('email')) {
        $updateData['email'] = $req->input('email');
    }

    // 

    if ($req->has('location')) {
        $updateData['location'] = $req->input('location');
    }

    if ($req->hasFile('photo')) {
        $photoPath = $req->file('photo')->store('photos', 'public');
        $updateData['photo'] = $photoPath;
    }

    DB::table('users')
        ->where('id', $id)
        ->update($updateData);
        
    $user=DB::table('users')->where('id',$id)->first();

    return view('display',["user"=>$user])->with('success', 'User details updated successfully.');
    // return response()->json(['message' => 'User details updated successfully'], 201);
}

function changePassword(Request $req){
    
    $id=Session::get('user_id');
    $user=DB::table('users')->where('id',$id)->first();

    $updateData = [];
    if ($req->has('password')) {

        $req->validate([
            "password" => "required|confirmed"
        ]);

        $updateData['password'] = $req->input('password');
    }
    DB::table('users')
    ->where('id', $id)
    ->update($updateData);
    

    return view('display',["user"=>$user]);
    // return response()->json(["message"=>"Password changed succesfully"],201);

}



}
