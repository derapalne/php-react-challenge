<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::select('products.*', 'categories.name as category_name')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->latest()
            ->filter(request(['category', 'search', 'order']))
            ->paginate(12);
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'title' => 'required',
            'category' => 'required',
            'description' => 'required',
            'price' => 'required',
        ]);

        if ($request->hasFile('logo')) {
            $formFields['image_url'] = $request->file('image')->store('/images', 'public');
        }

        $category = DB::table('categories')->where('name', '=', $formFields['category'])->get();

        if (!$category) $category = Category::create(['name' => $formFields['category']]);

        $formFields['category_id'] = $category->id;
        $formFields['user_id'] = auth()->id();

        $product = Product::create($formFields);

        return response()->json([
            'success' => 'Product created successfully',
            'product' => $product
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $dbProduct = Product::select('products.*', 'categories.name as category_name')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('products.id', '=', $product->id)
            ->get();
        return response()->json($dbProduct);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $formFields = [];
        if ($request->title) $formFields['title'] = $request->title;
        if ($request->description) $formFields['description'] = $request->description;
        if ($request->price) $formFields['price'] = $request->price;
        if ($request->category_id) $formFields['category_id'] = $request->category_id;
        if ($request->hasFile('image')) {
            $formFields['image_url'] = $request->file('image')->store('/images', 'public');
        }

        $product->update($formFields);

        return response()->json([
            'success' => 'Product updated successfully',
            'product' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'success' => 'Product deleted Successfully',
            'product' => $product
        ]);
    }
}
