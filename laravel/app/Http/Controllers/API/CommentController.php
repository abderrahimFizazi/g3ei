<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    protected function store(Request $request , $id){
        $post = Post::find($id);
        if($post){
            $validator = Validator::make($request->all(),[
                "name" => "required| max:191 ",
                "email" => "required| max:191|email",
                "body" => "required|",
            ]);
            if($validator->fails()){
                return response()->json([
                    "status" => 400,
                    "errors" => $validator->messages(),
                ]);
            }
            else{
            $comment = new Comment; 
            $comment->name = $request->input("name");
            $comment->post_id = $id;
            $comment->body = $request->input("body");
            $comment->email = $request->input("email");
            $comment->status = 0;
            $comment->likes_nbr = 0;
            $comment->dislike_nbr = 0;
            $comment->status = 0;

            $comment->save();
            return response()->json([
                "status" => 200,
                "message" => "Comment Added successfully"
            ]);
        }
        }
        else{
            return response()->json([
                "status" => 404,
                "message" => "Post Not Found"
            ]);
        }

    }
    protected function index(){
        $comment = Comment::all();
        return response()->json([
            "status" => 200,
            "comment" => $comment
        ]); 
    }
    protected function getPostComments($id){
        $comment =  Comment::where([
            ['post_id' , '=' , $id],
            ['status','=', 1]
           ])->get();
        return response()->json([
            "status" => 200,
            "comment" => $comment
        ]); 
    }
    protected function approve(Request $request,$id){
            $comment =  comment::find($id) ; 
            if($comment){
                if($request->status){
                    $comment->status = 1;
                }
                $comment->update();
                return response()->json([
                    "status" => 200,
                    "message" => "comment state Updated successfully"
                ]);
             }
             else{
                return response()->json([
                    "status" => 404,
                    "message" => "comment Not Found"
                ]);
             }
            }
    protected function destroy($id){
                $comment = Comment::find($id);
                if($comment){
                    $comment->delete();
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
    protected function likeComment($id){
        $comment = Comment::find($id);
        if($comment){
            $comment->increment('likes_nbr');
            $comment->update;
            return response()->json([
                "status" => 200,
                "message" => "Comment liked successfully"
            ]);
        }
        else{
        return response()->json([
            "status" => 404,
            "message" => "Comment Not found"
        ]); 
    }
    }
    protected function dislikeComment($id){
        $comment = Comment::find($id);
        if($comment){
            $comment->increment('dislike_nbr');
            $comment->update;
            return response()->json([
                "status" => 200,
                "message" => "Comment disliked successfully"
            ]);
        }
        else{
        return response()->json([
            "status" => 404,
            "message" => "Comment Not found"
        ]); 
    }
    }
    protected function removeDislike($id){
        $comment = Comment::find($id);
        if($comment){
            $comment->decrement('dislike_nbr');
            $comment->update;
            return response()->json([
                "status" => 200,
                "message" => "dislike remove successfully"
            ]);
        }
        else{
        return response()->json([
            "status" => 404,
            "message" => "Comment Not found"
        ]); 
    }
    }
    protected function removeLike($id){
        $comment = Comment::find($id);
        if($comment){
            $comment->decrement('likes_nbr');
            $comment->update;
            return response()->json([
                "status" => 200,
                "message" => "like remove successfully"
            ]);
        }
        else{
        return response()->json([
            "status" => 404,
            "message" => "Comment Not found"
        ]); 
    }
    }
    
}
