<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Category::latest()->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Establish rules
            $rules = [
                'name' => 'required',
            ];
            // Validate them
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
                'name' => $request->input('name'),
            ];

            // Create category
            $category = Category::create($formFields);

            return response()->json([
                'success' => 'Category created successfully',
                'category' => $category
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $formFields = [];
        if ($request->name) $formFields['name'] = $request->name;


        $category->update($formFields);

        return response()->json([
            'success' => 'Category updated successfully',
            'category' => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'success' => 'Category deleted Successfully',
            'category' => $category
        ]);
    }
}
