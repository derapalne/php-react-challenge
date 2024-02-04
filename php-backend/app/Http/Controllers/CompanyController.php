<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Company::latest()->paginate(6);
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name' => 'required',
        ]);

        if ($request->hasFile('logo')) {
            $formFields['logo_url'] = $request->file('logo')->store('/logos', 'public');
        }

        $company = Company::create($formFields);

        return response()->json([
            'success' => 'Company created successfully',
            'company' => $company
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return response()->json($company);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $formFields = [];
        if ($request->name) $formFields['title'] = $request->title;
        if ($request->hasFile('logo')) {
            $formFields['logo_url'] = $request->file('logo')->store('/logos', 'public');
        }

        $company->update($formFields);

        return response()->json([
            'success' => 'Company updated successfully',
            'company' => $company
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();
        return response()->json([
            'success' => 'Company deleted Successfully',
            'company' => $company
        ]);
    }
}
