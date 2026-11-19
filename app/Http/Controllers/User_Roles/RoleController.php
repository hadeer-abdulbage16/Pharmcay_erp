<?php

namespace App\Http\Controllers\User_Roles;

use App\Http\Controllers\Controller;
use App\Models\User_Roles\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function list(Request $request)
    {
        if (!user_can('roles', 2)) {
            return view('theme.block');
        }
        $query = Role::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $roles = $query->get();
        } else {
            $roles = $query->paginate(10);
        }

        if ($request->ajax()) {
            return view('user_roles.roles.table', compact('roles'))->render();
        }

        return view('user_roles.roles.list', compact('roles'));
    }





    public function table(Request $request)
    {
        $query = Role::query();

        if ($request->show_all) {
            $roles = $query->get();
        } else {
            $roles = $query->paginate(10);
        }

        return view('user_roles.roles.table', compact('roles'));
    }

    public function store(Request $request)
    {
        if (!user_can('roles', 3)) {
            return view('theme.block');
        }
        $request->validate([
            'name'          => 'required|unique:roles,name'
        ]);

        Role::create([
            'name'      => $request->name,
            'description'      => $request->description,
            'retail_pos'      => $request->retail_pos,
            'modules' => json_encode($request->roles)
        ]);
        return response()->json(['msg' => translate('Role created successfully')]);
    }
    public function edit($id)
    {
           if (!user_can('roles', 4)) {
            return view('theme.block');
        }
        $role = Role::findOrFail($id);
        return response()->json($role);
    }


    public function update(Request $request, $id)
    {
           if (!user_can('roles', 4)) {
            return view('theme.block');
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
        ]);

        $role = Role::findOrFail($id);

        $role->update([
            'name'      => $request->name,
            'description'      => $request->description,
            'retail_pos'      => $request->retail_pos,
            'modules' => json_encode($request->roles)
        ]);
        User::where('role_id', $id)->update([
            'modules' => $role->modules
        ]);
        return response()->json(['msg' => translate('Role updated successfully')]);
    }


    public function delete($id)
    {
           if (!user_can('roles', 5)) {
            return view('theme.block');
        }
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'msg' => translate('Role deleted successfully'),
            'status' => 200
        ]);
    }


    public function form(Request $request)
    {
           if (!user_can('roles', 3)) {
            return view('theme.block');
        }
        $id = $request->id ?? null;
        $role = $id ? Role::find($id) : null;
        $roles = $role ? json_decode($role->modules, true) : [];
        return view('user_roles.roles.form', compact('role', 'id', 'roles'));
    }


    public function search_form(Request $request)
    {
           if (!user_can('roles', 2)) {
            return view('theme.block');
        }
        return view('user_roles.roles.search');
    }


    public function search_results(Request $request)
    {
           if (!user_can('roles', 2)) {
            return view('theme.block');
        }
        $query = Role::query();
        if ($request->name) {
            $query->where("name", 'like', "%" . $request->name . "%");
        }

        $roles = $query->paginate(10);
        return view('user_roles.roles.table', compact('roles'))->render();
    }
}
