<?php

namespace App\Http\Controllers\crm;

use App\Http\Controllers\Controller;
use App\Models\crm\Customer;
use App\Models\crm\GroupMaster;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function list(Request $request)
    {
        $query = Customer::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $customers = $query->get();
        } else {
            $customers = $query->paginate(10);
        }

        if ($request->ajax()) {
            return view('crm.customer.table', compact('customers'))->render();
        }

        return view('crm.customer.list', compact('customers'));
    }
    public function table(Request $request)
    {
        $query = Customer::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $customers = $query->get();
        } else {
            $customers = $query->paginate(10);
        }

        return view('crm.customer.table', compact('customers'))->render();
    }
    public function form(Request $request)
    {
        $id = $request->id ?? null;
        $type_status = null;
        $customer = $id ? Customer::find($id) : null;
        $customers = Customer::where('status', 'active')->get();
        $groups = GroupMaster::where('status', 'active')->select('id', 'title')->get();
        return view('crm.customer.form', compact('customer', 'customers', 'groups', 'type_status'))->render();
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' =>   'required|string|max:255|unique:customers,code',
            'f_name' => 'required_if:type,individual|nullable|string|max:255',
            'company_name' => 'required_if:type,company|nullable|string|max:255',
            'l_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:customers,email',
            'phone' => 'nullable|string|max:255|unique:customers,phone',
            'address' => 'nullable|string',
            'type' => 'required|in:individual,company',
            'mobile' => 'nullable|string|max:255',
            'tax_no' => 'nullable|string|max:255',
            'opening_balance' => 'nullable|numeric',
            'address_line_1' => 'nullable|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:255',
            'landmark' => 'nullable|string|max:255',
            'street_name' => 'nullable|string|max:255',
            'building_number' => 'nullable|string|max:255',
            'additional_number' => 'nullable|string|max:255',
            'group_id' => 'nullable|exists:group_masters,id',
        ]);

        $validated['status'] = $request->has('status') ? 'active' : 'inactive';
        Customer::create($validated);

        return response()->json(['msg' => translate('Customer created successfully')]);
    }
    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'code' =>   'required|string|max:255|unique:customers,code,' . $id,
            'f_name' => 'required_if:type,individual|nullable|string|max:255',
            'company_name' => 'required_if:type,company|nullable|string|max:255',
            'l_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:customers,email,' . $id,
            'phone' => 'nullable|string|max:255|unique:customers,phone,' . $id,
            'address' => 'nullable|string',
            'type' => 'required|in:individual,company',
            'mobile' => 'nullable|string|max:255',
            'tax_no' => 'nullable|string|max:255',
            'opening_balance' => 'nullable|numeric',
            'address_line_1' => 'nullable|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:255',
            'landmark' => 'nullable|string|max:255',
            'street_name' => 'nullable|string|max:255',
            'building_number' => 'nullable|string|max:255',
            'additional_number' => 'nullable|string|max:255',
            'group_id' => 'nullable|exists:group_masters,id',
        ]);

        $validated['status'] = $request->has('status') ? 'active' : 'inactive';

        $customer->update($validated);

        return response()->json(['msg' => translate('Customer updated successfully')]);
    }
    public function delete($id)
    {
        $customer = Customer::findOrFail($id);
        Customer::where('parent_id', $id)->delete();

        $customer->delete();
        return response()->json([
            'msg' => translate('Customer deleted successfully'),
            'status' => 200
        ]);
    }
    public function search_form(Request $request)
    {
        return view('crm.customer.search');
    }


    public function search_results(Request $request)
    {
        $query = Customer::query();
        if ($request->f_name) {
            $query->where("f_name", 'like', "%" . $request->f_name . "%");
        }
        if ($request->f_name) {
            $query->where("company_name", 'like', "%" . $request->f_name . "%");
        }
        if ($request->code) {
            $query->where("code", 'like', "%" . $request->code . "%");
        }
        if ($request->phone) {
            $query->where("phone", 'like', "%" . $request->phone . "%");
        }
        $customers = $query->paginate(10);
        return view('crm.customer.table', compact('customers'))->render();
    }
}
