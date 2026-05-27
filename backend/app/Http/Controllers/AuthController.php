<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request): JsonResponse {
        $credentials = $request->only(['email', 'password']);
        if( !$token = JWTAuth::attempt($credentials)){
            return response()->json([
                'message' => 'Invalid credentials'
            ]);
        }

        return response()->json([
            'status' => True,
            'user' => auth('api')->user(),
            'token' => $token
        ]);
    }

    public function logout() {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me() {
        return response()->json(auth('api')->user());
    }
}
