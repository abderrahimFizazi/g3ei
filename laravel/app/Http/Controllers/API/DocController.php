<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doc;
use App\Models\Module;

use Illuminate\Support\Facades\Validator;

class DocController extends Controller
{
    protected function store(Request $request , $id){
        $module = Module::select("name")->where("id" , $id)->first();
        if($module){
            $doc = new Doc;
            $validator = Validator::make($request->all(),[
                'file' => 'max:51200 | required|mimes:pdf,word,jpg,png,jpeg,doc,docx,ppt', 
                'type' => 'required'

            ]);
            if($validator->fails()){
                return response()->json([
                    "status" => 400,
                    "errors" => $validator->messages(),
                ]);
            }
            else{ 
            $doc->type = $request->input("type");
            $doc->module_id = $id;
            $doc->name = $request->input("name");
            if($request->hasFile("file")){
                $file = $request->file("file");
                $extention = $file->getClientOriginalExtension();
                $filename = time() .'.' . $extention;
                $file->move("docs/" . $module->name . "/" . $doc->type . "/", $filename);
                $doc->file = "docs/" . $module->name . "/" . $doc->type . "/". $filename;
            }
            $doc->save();
            return response()->json([
                "status" => 200,
                "message" => "doc Added successfully"
            ]);
        }
    }
        else{
            return response()->json([
                "status" => 422,
                "message" => "Module not Found"
            ]);
        }
    }    
protected function index(){
    $doc = doc::all();
    return response()->json([
        "status" => 200,
        "doc" => $doc
    ]); 
}

protected function destroy($id){
            $doc = doc::find($id);
            if($doc){
                $doc->delete();
                return response()->json([
                    "status" => 200,
                    "message" => "doc Deleted Successfully"
                ]);
            }
            else{
                return response()->json([
                    "status" => 404,
                    "message" => "doc Not found"
                ]); 
            }
        }
protected function getModuleDocs($id){
    $doc = doc::where("module_id" , $id)->get();
    $module = Module::select("name" , "id")->where("id" , $id)->first();
        return response()->json([
            "status" => 200,
            "message" => $doc,
            "module" =>  $module
        ]);
    }
}
