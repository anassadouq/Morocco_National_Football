<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PlayerController extends Controller {

    public function index()
    {
        return response(Player::all());
    }

    public function store(Request $request)
    {
        return response(Player::create($request->all()));
    }

    public function show(Player $player){
        return response()->json([
            'player' => $player
        ]);
    }
 
    public function update(Request $request, Player $player){
        $request->validate([
            'name'=>'required',
            'birthday'=>'required',
            'play'=>'required',
            'club'=>'required',
            'called'=>'required',
        ]);
        $player->fill($request->post())->update();
        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    public function destroy(Player $player)
    {
        return response($player->delete());
    }
}