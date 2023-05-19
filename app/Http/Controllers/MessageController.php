<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::all();
    }

    public function store(Request $request)
    {
        $message = Message::create([
            'body' => $request->body
        ]);

        broadcast(new MessageSent($message));

        return $message;
    }
}

