<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::select('products.*', 'companies.name as company_name', 'companies.logo_url as company_logo_url')
            ->join('companies', 'products.company_id', '=', 'companies.id')
            ->latest()
            ->filter(request(['company', 'search']))
            ->paginate(6);
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'title' => 'required',
            'company_id' => 'required',
            'description' => 'required',
            'price' => 'required',
        ]);

        if ($request->hasFile('logo')) {
            $formFields['image_url'] = $request->file('image')->store('/images', 'public');
        }

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
        $dbProduct = Product::select('products.*', 'companies.name as company_name', 'companies.logo_url as company_logo_url')
            ->join('companies', 'products.company_id', '=', 'companies.id')
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
        if ($request->company_id) $formFields['company_id'] = $request->company_id;
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
