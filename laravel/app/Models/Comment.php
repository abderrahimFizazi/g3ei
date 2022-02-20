<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Post;

class Comment extends Model
{
    use HasFactory;
    protected $table = "comments";
    protected $fillable = [
        'name',
        'body',
        'email',
        'post_id',
        'status',
        'likes_nbr',
        "dislike_nbr",
    ];
    protected $with = ['post'];
    public function post(){
        return $this->belongsTo(Post::class , 'post_id' , 'id');
    }
}
