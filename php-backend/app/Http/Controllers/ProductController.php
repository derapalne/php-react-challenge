<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::select('products.*', 'categories.name as category_name')
                ->join('categories', 'products.category_id', '=', 'categories.id')
                ->filter(request(['category', 'search', 'order']))
                ->latest()
                ->paginate(12);
            return response()->json($products);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Establish rules
            $rules = [
                'title' => 'required',
                'category' => 'required',
                'description' => 'required',
                'price' => 'required',
            ];
            //Validate them
            $validator = Validator::make($request->input(), $rules);

            // Verify
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => $validator->errors()->all(),
                ], 400);
            }

            // Create formFields object
            $formFields = [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category' => $request->input('category'),
            ];

            // Verify image
            if ($request->hasFile('image')) {
                $formFields['image_url'] = $request->file('image')->store('/images', 'public');
            } else {
                return response()->json([
                    'success' => false,
                    'error' => ['The image field is required'],
                ], 400);
            }

            // Search for category and throw error if not exists
            $category = DB::table('categories')->where('name', '=', $formFields['category'])->first();

            if (!$category) return response()->json([
                'success' => false,
                'error' => ['Please enter a valid category'],
            ], 400);

            // Add category and user id
            $formFields['category_id'] = $category->id;
            $formFields['user_id'] = auth()->id();

            // Create product
            $product = Product::create($formFields);

            return response()->json([
                'success' => 'Product created successfully',
                'product' => $product
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            $dbProduct = Product::select('products.*', 'categories.name as category_name')
                ->join('categories', 'products.category_id', '=', 'categories.id')
                ->where('products.id', '=', $product->id)
                ->first();
            return response()->json($dbProduct);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        try {
            $formFields = [];
            if ($request->input('title')) $formFields['title'] = $request->title;
            if ($request->input('description')) $formFields['description'] = $request->description;
            if ($request->input('price')) $formFields['price'] = $request->price;
            if ($request->input('category_id')) $formFields['category_id'] = $request->category_id;
            if ($request->hasFile('image')) {
                $formFields['image_url'] = $request->file('image')->store('/images', 'public');
            }

            $product->update($formFields);

            return response()->json([
                'success' => 'Product updated successfully',
                'product' => $product
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return response()->json([
                'success' => 'Product deleted Successfully',
                'product' => $product
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }
}
