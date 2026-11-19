<div class="page-title-right">
    <div style="width: auto;float: right;">
        <li class="dropdown notification-list dropdown d-lg-inline-block ml-2">
            <a class="btaction" data-toggle="dropdown" href="#" role="button"
               style="width: auto; float: right; font-size: 13px; border: 1px solid #d0d1d4;
               background-color: #e0e7e8; padding: 6px 11px; margin-right: 7px;
               margin-top: 7px; color: #000; border-radius: 4px;">

                {{ translate('Other Menus') }}
                <i class="icon-arrow-down-circle"></i>
            </a>

            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                @foreach($menus as $menu)
                    <a href="{{ route($menu['route']) }}" class="dropdown-item notify-item">
                        <i class="ti-list"></i> {{ translate($menu['label']) }}
                    </a>
                @endforeach
            </div>
        </li>
    </div>
</div>