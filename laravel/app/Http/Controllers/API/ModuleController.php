<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Module;
use Illuminate\Support\Facades\Validator;

class ModuleController extends Controller
{
    protected function store(Request $request){
            $validator = Validator::make($request->all(),[
                "name" => "required| max:191 ",
                "prof" => "required| max:191",
                "semestre" => "required",
            ]);
            if($validator->fails()){
                return response()->json([
                    "status" => 400,
                    "errors" => $validator->messages(),
                ]);
            }
            else{
            $module = new Module; 
            $module->name = $request->input("name");
            $module->prof = $request->input("prof");
            $module->semestre = $request->input("semestre");
            $module->description = $request->input("description");
            $module->save();
            return response()->json([
                "status" => 200,
                "message" => "module Added successfully"
            ]);
        }
        }    
    protected function index(){
        $module = Module::all();
        return response()->json([
            "status" => 200,
            "module" => $module
        ]); 
    }
    protected function edit($id){
        $module = Module::find($id);
        if($module){
            return response()->Json([
                "status" => 200,
                "module" => $module
            ]);
        }
            else{
                return response()->Json([
                    "status" => 404,
                    "message" => "module not found"
                ]);
            }
    }
protected function update(Request $request,$id){
    $module =  Module::find($id) ; 
    if($module){
        $validator = Validator::make($request->all(),[
            "name" => "required| max:191 ",
            "prof" => "required| max:191 ",
            "semestre" => "required| | max:191",
        ]);
        if($validator->fails()){
            return response()->json([
                "status" => 400,
                "errors" => $validator->messages(),
            ]);
        }
        if($module){
            $module->name = $request->input("name");
            $module->prof = $request->input("prof");
            $module->semestre = $request->input("semestre");
            $module->description = $request->input("description");
            $module->update();
    return response()->json([
        "status" => 200,
        "message" => "module Updated successfully"
    ]);
}
    }
       else{
        return response()->Json([
            "status" => 404,
            "message" => "module not found"
        ]);
       }


}

    protected function destroy($id){
                $module = module::find($id);
                if($module){
                    $module->delete();
                    return response()->json([
                        "status" => 200,
                        "message" => "module Deleted Successfully"
                    ]);
                }
                else{
                    return response()->json([
                        "status" => 404,
                        "message" => "module Not found"
                    ]); 
                }
            }
    protected function getSemestreModules($id){
        $module = module::where("semestre" , $id)->get();
            return response()->json([
                "status" => 200,
                "message" => $module
            ]);
        }
}
