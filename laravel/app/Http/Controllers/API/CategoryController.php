<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    protected function index(){
        $category =  Category::all();
        return response()->json([
            "status" => 200,
            "category" => $category
        ]);
    }
    protected function store(Request $request){
        $validator = Validator::make($request->all(),[
            "slug" => "required| max:191 | unique:categories,slug",
            "name" => "required| max:191 | unique:categories,name"
        ]);
        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages(),
            ]);
        }
        else{
        $category = new Category ; 
        $category->name = $request->input("name");
        $category->slug = $request->input("slug");
        $category->description = $request->input("description");
        $category->status = $request->input("status") == true ? "1" : "0" ;
        $category->save();
        return response()->json([
            "status" => 200,
            "message" => "Category Added successfully"
        ]);
    }
    }
    protected function edit($id){
        $category = Category::find($id);
        if($category){
            return response()->json([
                "status" => 200,
                "category" => $category
            ]); 
        }
        else {
            return response()->json([
                "status" => 422,
                "message" => "No Category ID found"
            ]);
        }
    }
    protected function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            "slug" => "required| max:191 ",
            "name" => "required| max:191 "
        ]);
        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages(),
            ]);
        }
        else{
        $category =  Category::find($id) ; 
        if($category){
        $category->name = $request->input("name");
        $category->slug = $request->input("slug");
        $category->description = $request->input("description");
        $category->status = $request->input("status");
        $category->save();
        return response()->json([
            "status" => 200,
            "message" => "Category Updated successfully"
        ]);
        } 
        else {
        return response()->json([
        "status" => 422,
        "message" => "No Category ID found"
    ]);
}
        }
}
 protected function destroy($id){
     $category = Category::find($id);
     if($category){
         $category->delete();
         return response()->json([
             "message" => "Category Deleted successfully",
             "status" => 200
         ]);
     }
     else{
        return response()->json([
            "message" => "Category Not found",
            "status" => 404
        ]);
     }
 }
 protected function allcategory(){
     $category = Category::where("status" , "1")->get();
     if($category ){
            return response()->json([
            "category" => $category,
            "status" => 200
        ]);
     }
 }
}
