<?php

namespace App\Http\Controllers\User_Roles;

use App\Http\Controllers\Controller;
use App\Models\User_Roles\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function list(Request $request)
    {
        if (!user_can('users', 2)) {
            return view('theme.block');
        }
        $query = User::orderBy('created_at', 'desc');

        if ($request->show_all) {
            $users = $query->get();
        } else {
            $users = $query->paginate(10);
        }

        if ($request->ajax()) {
            return view('user_roles.users.table', compact('users'))->render();
        }

        return view('user_roles.users.list', compact('users'));
    }
    public function table(Request $request)
    {
        if (!user_can('users', 2)) {
            return view('theme.block');
        }
        $query = User::query();

        if ($request->show_all) {
            $users = $query->get();
        } else {
            $users = $query->paginate(10);
        }

        return view('user_roles.users.table', compact('users'));
    }

    public function store(Request $request)
    {
        if (!user_can('users', 3)) {
            return view('theme.block');
        }
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'name'          => 'required',
            'role_id' => 'required|exists:roles,id',
            'mobile'    => 'nullable|unique:users,mobile'
        ]);
        $role = Role::findOrFail($request->role_id);
        User::create([
            'name'          => $request->name,
            'username'      => $request->username,
            'role_id'       => $request->role_id,
            'email'         => $request->email,
            'mobile'        => $request->mobile,
            'password'      => Hash::make($request->password),
            'pwd'           => $request->password,
            'modules'       => $role->modules,
            'status'        => $request->status ? 'active' : 'inactive',
        ]);
        return response()->json(['msg' => translate('User created successfully')]);
    }
    public function edit($id)
    {
        if (!user_can('users', 4)) {
            return view('theme.block');
        }
        $user = User::findOrFail($id);
        return response()->json($user);
    }


    public function update(Request $request, $id)
    {
        if (!user_can('users', 4)) {
            return view('theme.block');
        }
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $id,
            'name'          => 'required',
            'role_id' => 'required|exists:roles,id',
            'mobile'    => 'nullable|unique:users,mobile,' . $id
        ]);

        $user = User::findOrFail($id);
        $role = Role::findOrFail($request->role_id);
        $user->update([
            'name'          => $request->name,
            'username'      => $request->username,
            'role_id'       => $request->role_id,
            'email'         => $request->email,
            'mobile'        => $request->mobile,
            'modules'       => $role->modules,
            'status'        => $request->status ? 'active' : 'inactive',
        ]);

        return response()->json(['msg' => translate('User updated successfully')]);
    }


    public function delete($id)
    {
        if (!user_can('users', 5)) {
            return view('theme.block');
        }
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'msg' => translate('User deleted successfully'),
            'status' => 200
        ]);
    }


    public function form(Request $request)
    {
        if (!user_can('users', 3)) {
            return view('theme.block');
        }
        $id = $request->id ?? null;
        $user = $id ? User::find($id) : null;
        $roles = Role::select('id', 'name')->get();
        return view('user_roles.users.form', compact('id', 'user', 'roles'));
    }


    public function search_form(Request $request)
    {
        if (!user_can('users', 2)) {
            return view('theme.block');
        }
        return view('user_roles.users.search');
    }


    public function search_results(Request $request)
    {
        if (!user_can('users', 2)) {
            return view('theme.block');
        }
        $query = User::query();
        if ($request->name) {
            $query->where("name", 'like', "%" . $request->name . "%");
        }

        $users = $query->paginate(10);
        return view('user_roles.users.table', compact('users'))->render();
    }

    public function change_pass(Request $request)
    {
        $request->validate([
            'pwd'       => 'required'
        ]);
        $user = auth()->user();
        $user->update([
            'pwd'           => $request->pwd,
            'password'           => Hash::make($request->pwd),
        ]);
        return response()->json(['msg' => translate('Password updated successfully')]);
    }
}
