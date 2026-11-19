<?php

$logourl = asset(main_path() . 'logo.png');

$logo_height = 80;
$logo_width = '';

$logo_height = 80;
$logo_width = '';
$user_id = 1;
$lang = \App\Models\BusinessSetting::where('type', 'language')->first();
$local = session()->has('locale') ? session('locale') : 'en';
$current_lang = null;

foreach (json_decode($lang['value'], true) as $data) {
    if ($data['code'] == $local) {
        $current_lang = $data;
        break;
    }
}
if (!$current_lang) {
    $current_lang = json_decode($lang['value'], true)[0];
}
?>
<div class="navbar-custom">
    <ul class="list-unstyled topnav-menu float-right mb-0">
        <li
            style="
			display: flex;
			align-items: center;
			line-height: 70px;
			text-align: center;
			max-height: 70px;
			color: aliceblue;
			text-transform: capitalize;
		">
            <?php if (@config('app.name')) {
                echo 'Welcome ' . config('app.name');
            } ?></li>

        <li class="dropdown notification-list">
            <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img src="<?php echo asset(main_path() . 'images/avatar-1.jpg'); ?>" alt="user-image" class="rounded-circle">
                <span class="d-none d-sm-inline-block ml-1 font-weight-medium">{{ auth()->user()->name }}</span>
                <i class="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                <div class="dropdown-header noti-title">
                    <h6 class="text-overflow text-white m-0">{{ translate('welcome') }} {{ auth()->user()->name }}</h6>
                </div>

                <a href="#" class="dropdown-item notify-item open-pass-modal">
                    <i class="mdi mdi-lock-outline"></i>
                    <span>{{ translate('Change Password') }}</span>
                </a>



                <div class="dropdown-divider"></div>
                <a href="{{ route('logout') }}" class="dropdown-item notify-item">
                    <i class="mdi mdi-logout-variant"></i>
                    <span>{{ translate('Logout') }}</span>
                </a>
            </div>
        </li>
        <li class="dropdown notification-list">

            <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                href="#" role="button" title="Settings" aria-haspopup="false" aria-expanded="false" >
                <img class="{{ Session::get('direction') === 'rtl' ? 'ml-2' : 'mr-2' }}"
                    src="{{ asset(main_path() . 'images/flags/' . $current_lang['code'] . '.png') }}"
                    alt="{{ $current_lang['name'] }}" style="width:18px; height:18px; object-fit:cover;" />
            </a>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown " style="width:300px">
                <div class="dropdown-header noti-title">
                    @foreach (json_decode($lang['value'], true) as $data)
                        @if ($data['code'] == $local)
                            <img class="{{ Session::get('locale') === 'ar' ? 'ml-2' : 'mr-2' }}" width="20"
                                src="{{ asset(main_path() . 'images/flags/' . $data['code'] . '.png') }}"
                                alt="Eng">
                            {{ $data['name'] }}
                        @endif
                    @endforeach
                </div>
                @foreach (json_decode($lang['value'], true) as $key => $data)
                    @if ($data['status'] == 1)
                        <a class="dropdown-item pb-1" href="{{ route('lang', $data['code']) }}">
                            <img class="{{ Session::get('locale') === 'ar' ? 'ml-2' : 'mr-2' }}" width="20"
                                src="{{ asset(main_path() . 'images/flags/' . $data['code'] . '.png') }}"
                                alt="{{ $data['name'] }}" />
                            <span class="text-capitalize">{{ $data['name'] }}</span>
                        </a>
                    @endif
                @endforeach
            </div>
        </li>
        {{-- <li class="dropdown notification-list">
            <a class="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"
                href="#" role="button" title="Settings" aria-haspopup="false" aria-expanded="false">
                <i class="mdi mdi-settings-outline noti-icon"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown " style="width:300px">
                <div class="dropdown-header noti-title">
                    <h6 class="text-overflow text-white m-0">Settings</h6>
                </div>

                <a href="" class="dropdown-item notify-item">
                    <i class="mdi mdi-settings-outline"></i>
                    <span>Organization Profile</span>
                </a>

                <a href="" class="dropdown-item notify-item">
                    <i class="mdi mdi-account-outline"></i>
                    <span>Users & Roles</span>
                </a>

                <a href="" class="dropdown-item notify-item">
                    <i class="mdi mdi-file-outline"></i>
                    <span>Outlet Master</span>
                </a>

                <a href="" class="dropdown-item notify-item">
                    <i class="mdi mdi-square-outline"></i>
                    <span>Store Master</span>
                </a>

                <a href="" class="dropdown-item notify-item">
                    <i class="mdi mdi-settings-outline"></i>
                    <span>Other Settings</span>
                </a>

                <div class="dropdown-divider"></div>

                <a href="#" class="dropdown-item notify-item" onclick="erp_change_password_form(this)"
                    data-userid="<?= $user_id ?>">
                    <i class="mdi mdi-lock-outline"></i>
                    <span>Change Password</span>
                </a>

                <a href="" class="dropdown-item notify-item">
                    <i class="mdi mdi-logout-variant"></i>
                    <span>Logout</span>
                </a>
            </div>
        </li> --}}
    </ul>

    <div class="logo-box">
        <a href="" class="logo text-center logo-dark">
            <span class="logo-lg">
                <img src="<?php echo $logourl; ?>" alt=""
                    style="margin-top:5px;height: <?php echo $logo_height; ?>px; width:<?php echo $logo_width; ?>%">
            </span>
            <span class="logo-sm">
                <img src="<?php echo $logourl; ?>" alt="" height="24" width="100%">
            </span>
        </a>

    </div>

    <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
            <button class="button-menu-mobile waves-effect waves-light" id="expandmenu">
                <i class="mdi mdi-menu"></i>
            </button>
        </li>

        <li class="d-none d-sm-block">
            <form class="app-search">
                <div class="app-search-box">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search..." style="width:3pc">
                        <div class="input-group-append">
                            <button class="btn" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </li>


    </ul>
</div>
<script>
    $(document).on('click', '.open-pass-modal', function(e) {
        e.preventDefault();
        $('#change_pass_Modal').modal('show');
    });
</script>
