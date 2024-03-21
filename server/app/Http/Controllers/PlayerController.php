<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlayerController extends Controller
{
    public function index()
    {
        return response()->json(Player::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'birthday' => 'required',
            'play' => 'required',
            'club' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'called' => 'required',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');
        $clubPath = $request->file('club')->store('images', 'public');

        $player = new Player([
            'name' => $request->input('name'),
            'image' => $imagePath,
            'birthday' => $request->input('birthday'),
            'play' => $request->input('play'),
            'club' => $clubPath,
            'called' => $request->input('called'),
        ]);

        $player->save();

        return response()->json([
            'message' => 'Player created successfully',
        ]);
    }

    public function show(Player $player)
    {
        return response()->json([
            'player' => $player,
        ]);
    }

    public function update(Request $request, Player $player)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'birthday' => 'required',
            'play' => 'required',
            'club' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'called' => 'required',
        ]);

        $player->update($request->except('image'));

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image s'il y en a une
            Storage::disk('public')->delete($player->image);

            // Enregistrer la nouvelle image
            $imagePath = $request->file('image')->store('images', 'public');
            $player->image = $imagePath;
            $player->save();
        }

        if ($request->hasFile('club')) {
            // Supprimer l'ancienne image de club s'il y en a une
            Storage::disk('public')->delete($player->club);

            // Enregistrer la nouvelle image de club
            $clubPath = $request->file('club')->store('images', 'public');
            $player->club = $clubPath;
            $player->save();
        }

        return response()->json([
            'message' => 'Player updated successfully',
        ]);
    }

    public function destroy(Player $player)
    {
        // Supprimer l'image de joueur et d'image de club
        Storage::disk('public')->delete($player->image);
        Storage::disk('public')->delete($player->club);

        $player->delete();

        return response()->json([
            'message' => 'Player deleted successfully',
        ]);
    }
}