<?php

namespace App\Http\Controllers;

use App\Models\Company;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::active()->orderBy('name')->pluck('name');
        return response()->json($companies);
    }
}
