<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
class PostController extends Controller
{
    protected function store(Request $request){
        $validator = Validator::make($request->all(),[
            "slug" => "required| max:191 | unique:categories,slug",
            "name" => "required| max:191 | unique:categories,name",
            "category_id" => "required| | max:191",
            'image' => 'required| image| mimes:jpeg,png,jpg',
        ]);
        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages(),
            ]);
        }
        else{
        $post = new Post ; 
        $post->name = $request->input("name");
        $post->body = $request->input("body");
        $post->slug = $request->input("slug");
        $post->description = $request->input("description");
        $post->status = $request->input("status") ;
        $post->popular = $request->input("popular") ;
        $post->category_id= $request->input("category_id");
        $post->sub_category = $request->input("sub_category");
        if($request->hasFile("image")){
            $file = $request->file("image");
            $extention = $file->getClientOriginalExtension();
            $filename = time() .'.' . $extention;
            $file->move("uploads/post/" , $filename);
            $post->image = 'uploads/post/' . $filename;
        }
        $post->save();
        return response()->json([
            "status" => 200,
            "message" => "post Added successfully"
        ]);
    }
    }
    protected function index(){
        $post = Post::all();
        return response()->json([
            "status" => 200,
            "post" => $post
        ]); 
    }
    protected function categoryPosts($id){
        $category = Category::find($id);
        if($category){
        $post = Post::where('category_id' , $id)->get();
        if($post){
            return response()->json([
                "status" => 200,
                "post" => $post,
                "category_name" => $category->name
            ]); 
        }
        else{
            return response()->json([
                "status" => 422,
                "message" => "No post found for this category ",
                "category_name" => $category->name
            ]); 
        }
     }
     else{
        return response()->json([
            "status" => 404,
            "message" => "Category not found"
        ]);
     }
    }
    protected function edit($id){
        $post = Post::find($id);
        if($post){
            $category = Category::where('id' , $post->category_id)->first();
            return response()->Json([
                "status" => 200,
                "post" => $post,
                "category"=> $category
            ]);
        }
            else{
                return response()->Json([
                    "status" => 422,
                    "message" => "post not found"
                ]);
            }
    }
        protected function update(Request $request,$id){
            $post =  Post::find($id) ; 
            if($post){
            $validator = Validator::make($request->all(),[
                "slug" => "required| max:191 | unique:categories,slug",
                "name" => "required| max:191 | unique:categories,name",
                "category_id" => "required| | max:191",
            ]);
            if($validator->fails()){
                return response()->json([
                    "status" => 400,
                    "errors" => $validator->messages(),
                ]);
            }
            if($post){
                if($request->body){
                    $post->body = $request->input("body");
                }
                $post->name = $request->input("name");
                $post->slug = $request->input("slug");
                $post->description = $request->input("description");
                $post->status = $request->input("status") ;
                $post->popular = $request->input("popular") ;
                $post->category_id= $request->input("category_id");
                $post->sub_category = $request->input("sub_category");
        $post->update();
        return response()->json([
            "status" => 200,
            "message" => "post Updated successfully"
        ]);
    }
}
else{
    return response()->json([
        "status" => 404,
        "message" => "post Not found"
    ]); 
}
}
    protected function destroy($id){
        $post = Post::find($id);
        if($post){
            $post->delete();
            return response()->json([
                "status" => 200,
                "message" => "post Deleted Successfully"
            ]);
        }
        else{
            return response()->json([
                "status" => 404,
                "message" => "post Not found"
            ]); 
        }
    }
    protected  function indexpopular(){
       $post =  Post::select('id' ,'name', 'slug' )->where('popular', 1)->get();
       return response()->json([
        "status" => 200,
        "post" => $post
    ]); 
    }
            
}