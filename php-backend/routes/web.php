<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('products', ProductController::class)->only(['show', 'index']);
Route::apiResource('companies', CompanyController::class)->only(['show', 'index']);
Route::middleware('auth:sanctum')->apiResource('products', ProductController::class)->except(['show', 'index']);
Route::middleware('auth:sanctum')->apiResource('companies', CompanyController::class)->except(['show', 'index']);
