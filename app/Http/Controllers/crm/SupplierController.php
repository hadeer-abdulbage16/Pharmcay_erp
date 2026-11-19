<?php

namespace App\Http\Controllers\crm;

use App\Http\Controllers\Controller;
use App\Models\crm\GroupMaster;
use App\Models\crm\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function list(Request $request)
    {
        $query = Supplier::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $suppliers = $query->get();
        } else {
            $suppliers = $query->paginate(10);
        }

        if ($request->ajax()) {
            return view('crm.supplier.table', compact('suppliers'))->render();
        }

        return view('crm.supplier.list', compact('suppliers'));
    }
    public function table(Request $request)
    {
        $query = Supplier::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $suppliers = $query->get();
        } else {
            $suppliers = $query->paginate(10);
        }

        return view('crm.supplier.table', compact('suppliers'))->render();
    }
    public function form(Request $request)
    {
        $id = $request->id ?? null;
        $type_status = null;
        $supplier = $id ? Supplier::find($id) : null;
        $suppliers = Supplier::where('status', 'active')->get();
        $groups = GroupMaster::where('status', 'active')->select('id', 'title')->get();
        return view('crm.supplier.form', compact('supplier', 'suppliers', 'groups', 'type_status'))->render();
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' =>   'required|string|max:255|unique:suppliers,code',
            'f_name' => 'required_if:type,individual|nullable|string|max:255',
            'company_name' => 'required_if:type,company|nullable|string|max:255',
            'l_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:suppliers,email',
            'phone' => 'nullable|string|max:255|unique:suppliers,phone',
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
        Supplier::create($validated);

        return response()->json(['msg' => translate('Supplier created successfully')]);
    }
    public function edit($id)
    {
        $supplier = Supplier::findOrFail($id);
        return response()->json($supplier);
    }
    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        $validated = $request->validate([
            'code' =>   'required|string|max:255|unique:suppliers,code,' . $id,
            'f_name' => 'required_if:type,individual|nullable|string|max:255',
            'company_name' => 'required_if:type,company|nullable|string|max:255',
            'l_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:suppliers,email,' . $id,
            'phone' => 'nullable|string|max:255|unique:suppliers,phone,' . $id,
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

        $supplier->update($validated);

        return response()->json(['msg' => translate('Supplier updated successfully')]);
    }
    public function delete($id)
    {
        $supplier = Supplier::findOrFail($id);
        Supplier::where('parent_id', $id)->delete();

        $supplier->delete();
        return response()->json([
            'msg' => translate('Supplier deleted successfully'),
            'status' => 200
        ]);
    }
    public function search_form(Request $request)
    {
        return view('crm.supplier.search');
    }


    public function search_results(Request $request)
    {
        $query = Supplier::query();
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
        $suppliers = $query->paginate(10);
        return view('crm.supplier.table', compact('suppliers'))->render();
    }

    public function search(Request $request)
    {
        $query = $request->get('query');

        $suppliers = Supplier::where('f_name', 'like', "%{$query}%")
            ->orWhere('code', 'like', "%{$query}%")
            ->orWhere('l_name', 'like', "%{$query}%")
            ->orWhere('company_name', 'like', "%{$query}%")
            ->limit(20)
            ->get();

        $data = []; 
        foreach ($suppliers as $supplier) {
            $data[] = [
                'label' => $supplier->f_name . ' ' . $supplier->l_name . ' (' . $supplier->code . ')',
                'id'    => $supplier->id,
                'email' => $supplier->email,
                'phone' => $supplier->phone,
            ];
        }

        return response()->json($data);
    }
}
