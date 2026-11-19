<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login()
    {
        return view('login');
    }

    public function authenticate(Request $request)
    {
        // Validate the request data
        $credentials = $request->validate([
            'username' => ['required' ],
            'pwd' => ['required'],
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['pwd']]) || Auth::attempt(['email' => $credentials['username'], 'password' => $credentials['pwd']])) {
            // Authentication passed, redirect to dashboard or intended page
            return to_route('dashboard')->with('msg', 'You are logged in!');
        }

        // Authentication failed, redirect back with an error message
        return back()->with([
            'error_msg' => 'The provided credentials do not match our records.',
        ]);
    }
}
