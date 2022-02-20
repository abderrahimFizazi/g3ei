<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\AuthController;
use \App\Http\Controllers\API\CategoryController;
use \App\Http\Controllers\API\PostController;
use \App\Http\Controllers\API\CommentController;
use \App\Http\Controllers\API\ModuleController;
use \App\Http\Controllers\API\DocController;


Route::post("login", [AuthController::class , 'login']);

Route::middleware(["auth:sanctum" , 'isAPIAdmin'])->group(function (){
    Route::get("chekingAuthentificated" , function (){ 
        return response()->json([
            'message' => 'You are in',
            'status' => 200
        ],200);
    });
    Route::get("get_all_users",[AuthController::class,"index"]);
    Route::post("add_user",[AuthController::class,"store"]);
    Route::delete("delete_user/{id}",[AuthController::class,"destroy"]);

    Route::post("add_category",[CategoryController::class,"store"]);
    Route::get("view_categories",[CategoryController::class,"index"]);
    Route::delete("delete_category/{id}",[CategoryController::class,"destroy"]);
    Route::get("edit_category/{id}",[CategoryController::class,"edit"]);
    Route::put("update_category/{id}",[CategoryController::class,"update"]);
    Route::post("add_post" , [PostController::class , "store"]);
    Route::get("view_posts" , [PostController::class , "index"]);
    Route::get("edit_post/{id}" , [PostController::class , "edit"]);
    Route::put("update_post/{id}" , [PostController::class , "update"]);
    Route::delete("delete_post/{id}" , [PostController::class , "destroy"]);
    Route::get("get_popular_posts" , [PostController::class , "indexpopular"]);
    Route::get("get_category_posts/{id}" , [PostController::class , "categoryPosts"]);
    Route::get("view_comments" , [CommentController::class , "index"]);
    Route::put("approve_comment_state/{id}" , [CommentController::class , "approve"]);
    Route::delete("delete_comment/{id}" , [CommentController::class , "destroy"]);
    
});
Route::middleware(["auth:sanctum" ])->group(function (){
    Route::get("checkdAuthentificatedDelegate" , function (){ 
        return response()->json([
            'message' => 'You are in',
            'status' => 200
        ],200);
    });
    Route::post("add_module" , [ModuleController::class , "store"]);
    Route::get("edit_module/{id}" , [ModuleController::class , "edit"]);
    Route::put("update_module/{id}" , [ModuleController::class , "update"]);
    Route::delete("delete_module/{id}" , [ModuleController::class , "destroy"]);
    Route::post("add_doc/{id}" , [DocController::class , "store"]);
    Route::get("edit_doc/{id}" , [DocController::class , "edit"]);
    Route::put("update_doc/{id}" , [DocController::class , "update"]);
    Route::delete("delete_doc/{id}" , [DocController::class , "destroy"]);
    Route::post("logout",[AuthController::class,"logout"]);

});
Route::get("view_modules" , [ModuleController::class , "index"]);
Route::get("get_semestre_modules/{id}" , [ModuleController::class , "getSemestreModules"]);
Route::get("view_docs" , [DocController::class , "index"]);
Route::get("get_module_docs/{id}" , [DocController::class , "getModuleDocs"]);


Route::post("add_comment/{id}" , [CommentController::class , "store"]);
Route::get("get_post_comments/{id}" , [CommentController::class , "getPostComments"]);
Route::put("like_comment/{id}" , [CommentController::class , "likeComment"]);
Route::put("remove_dislike/{id}" , [CommentController::class , "removeDislike"]);
Route::put("remove_like/{id}" , [CommentController::class , "removeLike"]);
Route::put("dislike_comment/{id}" , [CommentController::class , "dislikeComment"]);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

