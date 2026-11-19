@extends('theme.main')
@section('css')
    <style>
        :root {
            --c1: #0177cd;
        }

        .switch,
        .switcher {
            display: block;
            position: relative;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            inline-size: 36px;
            block-size: 18px;
            margin-bottom: 0;
        }

        .switch .slider,
        .switch_control,
        .switcher .slider,
        .switcher_control {
            position: absolute;
            inset-block-start: 0;
            inset-inline-start: 0;
            inline-size: 36px;
            block-size: 18px;
            transition: background-color 0.15s ease-in;
            background-color: #ced7dd;
            border-radius: 50px;
        }

        .switch .slider::after,
        .switch_control::after,
        .switcher .slider::after,
        .switcher_control::after {
            content: "";
            position: absolute;
            inset-block-start: 1px;
            inset-inline-start: 1px;
            inline-size: 16px;
            block-size: 16px;
            transition: left 0.15s ease-in;
            background-color: #fff;
            border-radius: 100%;
        }

        .switch .status,
        .switch_input,
        .switcher .status,
        .switcher_input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        .switch .status:checked~.slider,
        .switch_input:checked~.switcher_control,
        .switcher .status:checked~.slider,
        .switcher_input:checked~.switcher_control {
            background-color: var(--c1);
        }

        .switch .status:checked~.slider:after,
        .switch_input:checked~.switcher_control:after,
        .switcher .status:checked~.slider:after,
        .switcher_input:checked~.switcher_control:after {
            inset-inline-start: 19px;
        }

        .show-status-text .switcher_control::before {
            content: attr(data-offtitle);
            margin-inline-start: -40px;
            color: #9e9e9e;
            font-weight: 700;
        }

        .show-status-text .switcher_input:checked+.switcher_control::before {
            content: attr(data-ontitle);
            color: var(--c1);
        }

        .payment-status-text .switcher_control::before {
            content: attr(data-unpaid);
            margin-inline-start: -70px;
            color: #9e9e9e;
            font-weight: 700;
            position: relative;
            inset-block-start: -1px;
        }

        .payment-status-text .switcher_input:checked+.switcher_control::before {
            content: attr(data-paid);
            color: var(--c1);
            margin-inline-start: -55px;
            position: relative;
            inset-block-start: -1px;
        }
    </style>
@endsection
@section('title', translate('Language'))

@section('content')


    <div class="content">
        <div class="container-fluid">

            <div class="page-title-box">
                <div class="row">
                    <div class="col-md-12">
                        <div class="alert alert-danger mb-3" role="alert">
                            {{ translate('changing_some_settings_will_take_time_to_show_effect_please_clear_session_or_wait_for_60_minutes_else_browse_from_incognito_mode') }}
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h4 class="page-title ml-2">{{ translate('language_table') }}</h4>
                    </div>
                    <div class="col-md-9">
                        <div class="page-title-right">
                            <div class="titlemenu">
                                <a class="btn btn-primary" data-toggle="modal" data-target="#lang-modal">
                                    <i class="icon-plus"></i>
                                    {{ translate('Add New Language') }}</a>



                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-xl-12">
                        <div class="card-box ajax-wrapper" id="bins_table_wrapper" data-wrapper="bins_table_wrapper">
                            <table class="table table-bordered" id="bins_table"  >
                                <thead>
                                    <tr>
                                        <th style="width:60px">{{ translate('SL.No.') }}</th>
                                        <th>{{ translate('Name') }}</th>
                                        <th>{{ translate('Code') }}</th>
                                        <th>{{ translate('Status') }}</th>
                                        <th>{{ translate('Default Status') }}</th>
                                        <th class="text-right action-col">{{ translate('Action') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php($language = App\Models\BusinessSetting::where('type', 'language')->first())
                                    @foreach (json_decode($language['value'], true) as $key => $data)
                                        <tr>
                                            <td>{{ $loop->iteration }}</td>
                                            <td>{{ $data['name'] }}(
                                                {{ isset($data['direction']) ? $data['direction'] : 'ltr' }}
                                                ) </td>
                                            <td>{{ $data['code'] }}</td>
                                            <td>
                                                @if (array_key_exists('default', $data) && $data['default'] == true)
                                                    <label class="switcher mx-auto"
                                                        onclick="default_language_status_alert()">
                                                        <input type="checkbox" class="switcher_input" checked disabled>
                                                        <span class="switcher_control"></span>
                                                    </label>
                                                @else
                                                    <form action="{{ route('system_setup.language.update-status') }}"
                                                        method="GET" id="language_id_{{ $data['id'] }}_form"
                                                        class="language_id_form">
                                                        @csrf
                                                        <input type="hidden" name="code" value="{{ $data['code'] }}">
                                                        <label class="switcher mx-auto">
                                                            <input type="checkbox" class="switcher_input"
                                                                {{ $data['status'] == 1 ? 'checked' : '' }}
                                                                id="language_id_{{ $data['id'] }}" name="status"
                                                                class="toggle-switch-input"
                                                                data-code="{{ $data['code'] }}"
                                                                data-id="{{ $data['id'] }}"
                                                                onclick="change_status(this)"  data-route="{{ route('system_setup.language.update-status', [$data['code']]) }}">
                                                            <span class="switcher_control"></span>
                                                        </label>
                                                    </form>
                                                @endif
                                            </td>
                                            <td>
                                                @if (array_key_exists('default', $data) && $data['default'] == true)
                                                    <label class="switcher mx-auto"
                                                        onclick="default_language_status_alert()">
                                                        <input type="checkbox" class="switcher_input" checked disabled>
                                                        <span class="switcher_control"></span>
                                                    </label>
                                                @elseif(array_key_exists('default', $data) && $data['default'] == false)
                                                    <form
                                                        action="{{ route('system_setup.language.update-default-status', ['code' => $data['code']]) }}"
                                                        method="GET" id="language_default_id_{{ $data['id'] }}_form"
                                                        class="language_default_id_form">
                                                        @csrf
                                                        <input type="hidden" name="code" value="{{ $data['code'] }}">
                                                        <label class="switcher mx-auto">
                                                            <input type="checkbox" class="switcher_input"
                                                                id="language_default_id_{{ $data['id'] }}" name="default"
                                                                class="toggle-switch-input" data-code="{{ $data['code'] }}"
                                                                data-id="{{ $data['id'] }}"
                                                                onclick="change_status(this)"  data-route="{{ route('system_setup.language.update-default-status', [$data['code']]) }}">
                                                            <span class="switcher_control"></span>
                                                        </label>
                                                    </form>
                                                @endif
                                            </td>
                                            <td class="right">
                                                <div class="dropdown notification-list dropdown">
                                                    <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                                        aria-haspopup="false"
                                                        aria-expanded="false">{{ translate('Action') }}
                                                        <i class="icon-arrow-down-circle"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                                        <a class="dropdown-item" data-toggle="modal"
                                                            data-target="#lang-modal-update-{{ $data['code'] }}">{{ translate('update') }}</a>
                                                        @if ($data['default'] == true)
                                                            <a class="dropdown-item" href="javascript:"
                                                                onclick="default_language_delete_alert()">{{ translate('delete') }}</a>
                                                        @else
                                                            <a class="dropdown-item delete" onclick="erp_delete(this)"  data-route="{{ route('system_setup.language.delete', [$data['code']]) }}"
                                                                >{{ translate('delete') }}</a>
                                                        @endif 
                                                        <a class="dropdown-item" 
                                                            href="{{ route('system_setup.language.translate', [$data['code']]) }}">{{ translate('translate') }}</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div class="modal fade" id="lang-modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg  " role="document">
                <div class="modal-content">
                    <div class="modal-body" style="padding-top:0px">
                        <div class="row mt-3">
                            <div class="col-md-10">
                                <h3 id="modal_title" class="m-0">{{ translate('Add New Language') }}</h3>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="close model_close_btn" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                            </div>


                            <form action="{{ route('system_setup.language.add-new') }}" method="post"
                                style="text-align: {{ Session::get('locale') === 'rtl' ? 'right' : 'left' }};">
                                @csrf
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="recipient-name"
                                                    class="col-form-label">{{ translate('language') }}
                                                </label>
                                                <input type="text" class="form-control" id="recipient-name"
                                                    name="name">
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="message-text"
                                                    class="col-form-label">{{ translate('country_code') }}</label>
                                                <select class="form-control country-var-select  " name="code">
                                                    @foreach (\Illuminate\Support\Facades\File::files(base_path('public/images/flags')) as $path)
                                                        @if (pathinfo($path)['filename'] != 'en')
                                                            <option value="{{ pathinfo($path)['filename'] }}"
                                                                title="{{ asset(main_path() . 'images/flags/' . pathinfo($path)['filename'] . '.png') }}">
                                                                {{ strtoupper(pathinfo($path)['filename']) }}
                                                            </option>
                                                        @endif
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label class="col-form-label">{{ translate('direction') }} :</label>
                                                <select class="form-control" name="direction">
                                                    <option value="ltr">{{ translate('LTR') }}</option>
                                                    <option value="rtl">{{ translate('RTL') }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-dismiss="modal">{{ translate('close') }}</button>
                                    <button type="submit" class="btn btn-primary">{{ translate('save') }} <i
                                            class="fa fa-plus"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @foreach (json_decode($language['value'], true) as $key => $data)
            <div class="modal fade" id="lang-modal-update-{{ $data['code'] }}" tabindex="-1" role="dialog"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ translate('new_language') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form action="{{ route('system_setup.language.update') }}" method="post">
                            @csrf
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="recipient-name"
                                                class="col-form-label">{{ translate('language') }} </label>
                                            <input type="text" class="form-control" value="{{ $data['name'] }}"
                                                name="name">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="message-text"
                                                class="col-form-label">{{ translate('country_code') }}</label>
                                            <select class="form-control country-var-select  " name="code">
                                                @foreach (\Illuminate\Support\Facades\File::files(base_path('public/images/flags')) as $path)
                                                    <option value="{{ pathinfo($path)['filename'] }}"
                                                        {{ $data['code'] == pathinfo($path)['filename'] ? 'selected' : '' }}
                                                        title="{{ asset(main_path() . 'images/flags/' . pathinfo($path)['filename'] . '.png') }}">
                                                        {{ strtoupper(pathinfo($path)['filename']) }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label class="col-form-label">{{ translate('direction') }} :</label>
                                            <select class="form-control" name="direction">
                                                <option value="ltr"
                                                    {{ isset($data['direction']) ? ($data['direction'] == 'ltr' ? 'selected' : '') : '' }}>
                                                    LTR
                                                </option>
                                                <option value="rtl"
                                                    {{ isset($data['direction']) ? ($data['direction'] == 'rtl' ? 'selected' : '') : '' }}>
                                                    RTL
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary"
                                    data-dismiss="modal">{{ translate('close') }}</button>
                                <button type="submit" class="btn btn-primary">{{ translate('update') }} <i
                                        class="fa fa-plus"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@endsection

@section('scripts')
    <!-- Page level plugins -->
    <script src="{{ asset(main_path() . 'js/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/datatables/dataTables.bootstrap4.min.js') }}"></script>

    <!-- Page level custom scripts -->
    <script>
        // Call the dataTables jQuery plugin
        $(document).ready(function() {
            $('#dataTable').DataTable();
        });

        $('.language_id_form').on('submit', function(event) {
            event.preventDefault();

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            $.ajax({
                url: "{{ route('system_setup.language.update-status') }}",
                method: 'GET',
                data: $(this).serialize(),
                success: function(data) {
                    toastr.success('{{ translate('status_updated_successfully') }}');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            });
        });
        
    </script>

    <script>
        $(document).ready(function() {
            // color select select2
            $('.country-var-select').select2({
                width: '100%',
                templateResult: codeSelect,
                templateSelection: codeSelect,
                escapeMarkup: function(m) {
                    return m;
                }
            });

            function codeSelect(state) {
                var code = state.title;
                if (!code) return state.text;
                return "<img class='image-preview' src='" + code + "'>" + state.text;
            }
        });
    </script>

    <script>
        $(document).ready(function() {
            $(".delete").click(function(e) {
                e.preventDefault();

                Swal.fire({
                    title: '{{ translate('are_you_sure_to_delete_this') }}?',
                    text: "{{ translate('you_will_not_be_able_to_revert_this') }}!",
                    showCancelButton: true,
                    confirmButtonColor: 'primary',
                    cancelButtonColor: 'secondary',
                    confirmButtonText: '{{ translate('yes_delete_it') }}!',
                    cancelButtonText: '{{ translate('cancel') }}',
                }).then((result) => {
                    if (result.value) {
                        window.location.href = $(this).attr("id");
                    }
                })
            });
        });
    </script>
    <script>
        function default_language_delete_alert() {
            toastr.warning(
                '{{ translate('default_language_can_not_be_deleted') }}! {{ translate('to_delete_change_the_default_language_first') }}!'
            );
        }

        function default_language_status_alert() {
            toastr.warning('{{ translate('default_language_can_not_be_deactive') }}!');
        }
    </script>
@endsection
