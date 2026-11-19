<?php

namespace App\Http\Controllers\crm;

use App\Http\Controllers\Controller; 
use App\Models\crm\GroupMaster;
use Illuminate\Http\Request; 


class GroupMasterController extends Controller
{
    public function list(Request $request)
    {
        $query = GroupMaster::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $group_masters = $query->get();
        } else {
            $group_masters = $query->paginate(10);
        }

        if ($request->ajax()) {
            return view('crm.group_master.table', compact('group_masters'))->render();
        }

        return view('crm.group_master.list', compact('group_masters'));
    }
    public function table(Request $request)
    {
        $query = GroupMaster::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $group_masters = $query->get();
        } else {
            $group_masters = $query->paginate(10);
        }

        return view('crm.group_master.table', compact('group_masters'))->render();
    }
    public function form(Request $request)
    {
        $id = $request->id ?? null;
        $group_master = $id ? GroupMaster::find($id) : null;
        $group_masters = GroupMaster::where('status', 'active')->get(); 
        return view('crm.group_master.form', compact('group_master', 'group_masters'  ))->render();
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:group_masters,code',
            'title' => 'required|string|max:255|unique:group_masters,title', 
            'parent_id' => 'nullable|exists:group_masters,id', 
        ]);

        $validated['status'] = $request->has('status') ? 'active' : 'inactive'; 
        GroupMaster::create($validated);

        return response()->json(['msg' => translate('Group Master created successfully')]);
    }
    public function edit($id)
    {
        $group_master = GroupMaster::findOrFail($id);
        return response()->json($group_master);
    }
    public function update(Request $request, $id)
    {
        $group_master = GroupMaster::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:group_masters,code,' . $id,
            'title' => 'required|string|max:255|unique:group_masters,title,' . $id, 
            'parent_id' => 'nullable|exists:group_masters,id',
           
        ]);

        $validated['status'] = $request->has('status') ? 'active' : 'inactive'; 

        $group_master->update($validated);

        return response()->json(['msg' => translate('Group Master updated successfully')]);
    }
    public function delete($id)
    {
        $group_master = GroupMaster::findOrFail($id);
        GroupMaster::where('parent_id', $id)->delete();

        $group_master->delete();
        return response()->json([
            'msg' => translate('Group Master deleted successfully'),
            'status' => 200
        ]);
    }
    public function search_form(Request $request)
    {
        return view('crm.group_master.search');
    }


    public function search_results(Request $request)
    {
        $query = GroupMaster::query();
        if ($request->title) {
            $query->where("title", 'like', "%" . $request->title . "%");
        }
        if ($request->code) {
            $query->where("code", 'like', "%" . $request->code . "%");
        }
        $group_masters = $query->paginate(10);
        return view('crm.group_master.table', compact('group_masters'))->render();
    }
}
