<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('posts');
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string("slug");
            $table->string("name");
            $table->longText("description")->nullable();
            $table->tinyInteger("status")->nullable();
            $table->tinyInteger("popular")->nullable();
            $table->string("sub_category")->nullable();
            $table->longText("body");
            $table->string("image")->nullable();
            $table->integer("category_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('_posts_');
    }
}
