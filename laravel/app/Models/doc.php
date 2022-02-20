<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Module;
class doc extends Model
{
    use HasFactory;
    protected $table = "docs";
    protected $fillable = [
        'module_id',
        'type',
        'link',
    ];
    protected $with = ['module'];
    public function module(){
        return $this->belongsTo(Module::class , 'module_id' , 'id');
    }
}
