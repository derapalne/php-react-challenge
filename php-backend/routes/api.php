<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['cors'])->group(function () {
    Route::post('test', function () {
        return 'Authenticated';
    })->middleware('auth:sanctum');

    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/signup', [AuthController::class, 'create']);
    Route::middleware('auth:sanctum')->post('auth/logout', [AuthController::class, 'logout']);

    Route::middleware('auth:sanctum')->apiResource('products', ProductController::class)->except(['show', 'index']);
    Route::middleware('auth:sanctum')->apiResource('categories', CategoryController::class)->except(['show', 'index']);
});

Route::apiResource('products', ProductController::class)->only(['show', 'index']);
Route::apiResource('categories', CategoryController::class)->only(['show', 'index']);
