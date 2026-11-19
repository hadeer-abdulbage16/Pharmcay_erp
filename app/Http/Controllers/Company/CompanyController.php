<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    //
    public function list(Request $request)
    {
        $query = Company::OrderBy('created_at', 'desc');

        if ($request->show_all) {
            $companies = $query->get();
        } else {
            $companies = $query->paginate(10);
        }
        if ($request->ajax()) {
            return view('company.company.table', compact('companies'));
        }

        return view('company.company.list', compact('companies'));
    }

    public function table(Request $request)
    {
        $query = Company::OrderBy('created_at', 'desc');

        if ($request->show_all) {
            $companies = $query->get();
        } else {
            $companies = $query->paginate(10);
        }
        return view('company.company.table', compact('companies'));
    }
    public function store(Request $request)
    {
        $validate = $request->validate([
            'code' => 'required|string|max:255|unique:companies,code',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'tax_register' => 'nullable|string|max:255',

        ]);
        Company::Create([
            'code' => $request->code,
            'name' => $request->name,
            'address' => $request->address,
            'email' => $request->email,
            'tax_register' => $request->tax_register,
        ]);


        return response()->json(['msg' => "Company Saved successfuly"]);
    }

    public function edit(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        return response()->json(['company' => $company]); 
    }

    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'code' => 'required|string|max:255|unique:companies,code,' . $id,
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'tax_register' => 'nullable|string|max:255',

        ]);
        $company = Company::findOrFail($id);
        $company->update([
            'code' => $request->code,
            'name' => $request->name,
            'address' => $request->address,
            'email' => $request->email,
            'tax_register' => $request->tax_register,
        ]);
    }
    public function delete(Request $request)
    {
        $company = Company::findOrFail($request->id);
        $company->delete();
        return response()->json(['msg' => "Company Deleted successfuly"]);
    }

    public function form(Request $request)
    {
        $id =  $request->id ?? null;
        $company = $id ? Company::findOrFail($id) : null;
        return view('company.company.form', compact('company'));
    }

    public function search_form()
    {
        return view('company.company.search');
    }


    public function search_results(Request $requset)
    {
        $query = Company::query();

        if ($requset->name) {
            $query->where('name', 'like', '%' . $requset->name . '%');
        }
        if ($requset->code) {
            $query->where('code', 'like', '%' . $requset->code . '%');
        }

        if ($requset->tax_register) {
            $query->where('tax_register', 'like', '%' . $requset->tax_register . '%');
        }
        $companies = $query->paginate(10);
        return view('company.company.table', compact('companies'));
    }
}
