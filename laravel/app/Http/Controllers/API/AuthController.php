<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use \App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required|min:8|max:191'
        ]);
        if($validator->fails()){
            return response()->json([
                "validation_errors" => $validator->messages(),
                "status" => 401
            ]);
        }
        else {
            $user = User::where('email', $request->email)->first();

         if (! $user || !($request->password=== $user->password)) {
             return response()->json([
                 "status" => 403,
                 "message" => "invalid Credenstials"
             ]);
        }
        else{
            if($user->role_as){
            
               $token =  $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
               $role = 'admin';

            }else{

                $token =  $user->createToken($user->email.'_Token',[''])->plainTextToken;
                $role = 'delegate';
            }
        }
             return response()->json([
                'status' => 200,
                'username' =>$user->name,
                'token'=>$token,
                'role'=>$role,
                'message' => 'Login successfully'
            ]);

        }
    }
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => 200,
            "message" => "Logout Successfully"

        ]);
    }
    protected function index(){
        $user =  User::select('id' ,'name', 'email' )->get();
        return response()->json([
            "status" => 200,
            "user" => $user
        ]);
    }
    protected function store(Request $request){
        $validator = Validator::make($request->all(),[
            "email" => "required| max:191 | email",
            "name" => "required| max:191 ",
            "password" => "required| max:191|min:8"

        ]);
        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages(),
            ]);
        }
        else{
        $user = new user ; 
        $user->name = $request->input("name");
        $user->email = $request->input("email");
        $user->password = $request->input("password");
        $user->save();
        return response()->json([
            "status" => 200,
            "message" => "user Added successfully"
        ]);
    }
    }
    protected function destroy($id){
        $user = user::find($id);
        if($user){
            $user->delete();
            return response()->json([
                "message" => "user Deleted successfully",
                "status" => 200
            ]);
        }
        else{
           return response()->json([
               "message" => "user Not found",
               "status" => 404
           ]);
        }
    }
}
