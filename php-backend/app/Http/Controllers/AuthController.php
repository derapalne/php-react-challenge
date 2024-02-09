<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        try {
            // Create rules
            $rules = [
                'name' => 'required|string',
                'email' => 'required|string|unique:users',
                'password' => 'required|string',
                'confirm_password' => 'required|string',
            ];
            // Validate inputs
            $validator = Validator::make($request->input(), $rules);

            // Verify
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()->all(),
                ], 400);
            }

            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            // Respond
            return response()->json([
                'success' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken('API TOKEN')->plainTextToken,
                'user' => $user,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function login(Request $request)
    {
        try {
            // Create rules
            $rules = [
                'email' => 'required|string',
                'password' => 'required|string',
            ];
            // Validate inputs
            $validator = Validator::make($request->input(), $rules);

            // Verify
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Unauthorized',
                ], 401);
            }

            // Verify
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()->all(),
                ], 400);
            }

            // Retrieve user
            $user = User::where('email', '=', $request->email)->first();

            // Respond
            return response()->json([
                'success' => true,
                'message' => 'User Logged Successfully',
                'token' => $user->createToken('API TOKEN')->plainTextToken,
                'user' => $user,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    public function logout(User $user)
    {
        try {
            // Delete tokens
            $user->tokens()->delete();
            // Respond
            return response()->json([
                'success' => true,
                'message' => 'User Logged Out Successfully'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
