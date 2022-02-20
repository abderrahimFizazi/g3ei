<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Category;
class Post extends Model
{
    use HasFactory;
    protected $table = "posts";
    protected $fillable = [
        'sub_category',
        'body',
        'name',
        'slug',
        'status',
        'description',
        "category_id",
        "popular",
        "image",
    ];
    protected $with = ['category'];
    public function category(){
        return $this->belongsTo(Category::class , 'category_id' , 'id');
    }
}
