<?php

use App\Models\Settings\GeneralSettings;
use Illuminate\Support\Facades\Log;

if (! function_exists('main_path')) {
    function main_path()
    {
        return 'public/';
        // return 'assets/';
        return;
    }
}

if (!function_exists('buildTree')) {

    function buildTreedropdown($groups, $parentId = null, $level = 0)
    {

        $branch = [];
        foreach ($groups as $group) {

            if ($group->group_id == $parentId) {

                $group->level = $level;

                $branch[] = $group;

                $children = buildTreedropdown($groups, $group->id, $level + 1);

                foreach ($children as $child) {
                    $branch[] = $child;
                }
            }
        }
        return $branch;
    }
    function buildTreedeeply($groups, $parentId = 0, $level = 0)
    {
        $branch = [];

        foreach ($groups as $group) {

            if ($group->group_id == $parentId) {


                $group->level = $level;

                $children = buildTreedeeply($groups, $group->id, $level + 1);

                $group->tree_children  = $children;

                $branch[] = $group;
            }
        }

        return $branch;
    }
}
if (!function_exists('user_can')) {

    function user_can($module, $level = null)
    {
        $user = auth()->user();
        if ($user->is_admin) {
            return true;
        }
        if (!$user || !$user->modules) {
            return false;
        }

        $modules = json_decode($user->modules, true);

        $permission = $modules[$module]['p'] ?? 0;

        return $permission >= $level;
    }
}
if (!function_exists('authorize_user')) {

    function authorize_user($module, $level = null)
    {
        if (!user_can($module, $level)) {
            return response()->view('dashboard.block');
        }
    }
}
if (!function_exists('can_user')) {

    function can_user($module, $level = null)
    {
        return user_can($module, $level);
    }
}

if (!function_exists('setEnv')) {

    function setEnv($key, $value)
    {
        $path = base_path('.env');

        if (file_exists($path)) {
            file_put_contents($path, str_replace(
                $key . '=' . env($key),
                $key . '=' . $value,
                file_get_contents($path)
            ));
        }
    }
}
if (!function_exists('get_general_settings')) {

    function get_general_settings($key = null, $value = null)
    {
        $settings = GeneralSettings::first();
        if ($settings) {
            return $settings->$key ?? $value;
        }
        return $value;
    }
}

if (!function_exists('get_currency_symbol')) {

    function get_currency_symbol($currency_id)
    {
        $currency = \App\Models\Currency::find($currency_id);
        return $currency ? $currency->symbol : '';
    }
}
