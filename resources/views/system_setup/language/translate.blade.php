@extends('theme.main')

@section('title', translate('language_Translate'))

@section('css')
    <script src="{{ asset(main_path() . 'js/datatables/dataTables.bootstrap4.min.css') }}"></script>

    <style>
        #dataTable_wrapper>.row:nth-child(1) {
            display: flex;
        }

        #dataTable_wrapper>.row:nth-child(1) #dataTable_length {
            display: none;
        }

        [dir="rtl"] div.dataTables_wrapper div.dataTables_filter {
            text-align: left !important;
            padding-inline-end: 0px !important;
        }

        [dir="rtl"] div.table-responsive>div.dataTables_wrapper>div.row>div[class^="col-"]:last-child {
            padding-left: 0;
        }
    </style>
@endsection

@section('content')

    <div class="content container-fluid">
   

        <div class="row __mt-20">
            <div class="col-md-12">
                <div class="card" style="text-align: {{ Session::get('direction') === 'rtl' ? 'right' : 'left' }};">
                    <div class="card-header">
                        <h5>{{ translate('language_content_table') }}</h5>
                        <a href="{{ route('system_setup.language.index') }}"
                            class="btn btn-sm btn-danger btn-icon-split float-right">
                            <span class="text text-capitalize">{{ translate('back') }}</span>
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th style="max-width: 100px">{{ translate('SL') }}</th>
                                        <th style="width: 400px">{{ translate('key') }}</th>
                                        <th style="min-width: 300px">{{ translate('value') }}</th>
                                        {{-- <th style="max-width: 150px">{{translate('auto_translate')}}</th> --}}
                                        <th style="max-width: 150px">{{ translate('update') }}</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <!-- Page level plugins -->
    <script src="{{ asset(main_path() . 'js/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/datatables/dataTables.bootstrap4.min.js') }}"></script>
    <!-- Page level custom scripts -->
    <script>
        function update_lang(key, value) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            $.ajax({
                url: "{{ route('system_setup.language.translate-submit', [$lang]) }}",
                method: 'POST',
                data: {
                    key: key,
                    value: value
                },
                beforeSend: function() {
                    $('#loading').fadeIn();
                },
                success: function(response) {
                    toastr.success('{{ translate('text_updated_successfully') }}');
                },
                complete: function() {
                    $('#loading').fadeOut();
                },
            });
        }

        function remove_key(key, id) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            $.ajax({
                url: "{{ route('system_setup.language.remove-key', [$lang]) }}",
                method: 'POST',
                data: {
                    key: key
                },
                beforeSend: function() {
                    $('#loading').fadeIn();
                },
                success: function(response) {
                    toastr.success('{{ translate('key_removed_successfully') }}');
                    $('#lang-' + id).hide();
                },
                complete: function() {
                    $('#loading').fadeOut();
                },
            });
        }

        function auto_translate(key, id) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
            $.ajax({
                url: "{{ route('system_setup.language.auto-translate', [$lang]) }}",
                method: 'POST',
                data: {
                    key: key
                },
                beforeSend: function() {
                    $('#loading').fadeIn();
                },
                success: function(response) {
                    toastr.success('{{ translate('key_translated_successfully') }}');
                    console.log(response.translated_data)
                    $('#value-' + id).val(response.translated_data);
                    //$('#value-' + id).text(response.translated_data);
                },
                complete: function() {
                    $('#loading').fadeOut();
                },
            });
        }
    </script>

    <script>
        $(document).ready(function() {
            // Call the dataTables jQuery plugin || Start
            $('#dataTable').DataTable({
                "pageLength": {{ \App\Helpers\Helpers::pagination_limit() }},
                    dom: '<"row mb-3"<"col-md-6"l><"col-md-6 text-right"f>>rt<"row"<"col-md-6"i><"col-md-6"p>>',

                ajax: {
                    type: "get",
                    url: "{{ route('system_setup.language.translate.list', ['lang' => $lang]) }}",
                    dataSrc: ''
                },
                language: {
                    // Information
                    info: "{{ translate('Showing') }} _START_ {{ translate('To') }} _END_ {{ translate('Of') }} _TOTAL_ {{ translate('Entries') }}",
                    infoEmpty: "{{ translate('Showing') }} 0 {{ translate('To') }} 0 {{ translate('Of') }} 0 {{ translate('Entries') }}",
                    infoFiltered: "({{ translate('Filtered') }} _MAX_ {{ translate('Total_entries') }})",
                    emptyTable: "{{ translate('No_data_found') }}",
                    zeroRecords: "{{ translate('No_matching_data_found') }}",
                    // Search
                    search: "{{ translate('Search') }}:",
                    // Length menu
                    lengthMenu: "{{ translate('Show') }} _MENU_ {{ translate('Entries') }}",
                    // Pagination
                    paginate: {
                        first: "{{ translate('First') }}",
                        last: "{{ translate('Last') }}",
                        next: "{{ translate('Next') }}",
                        previous: "{{ translate('Previous') }}"
                    },
                },
                columns: [{
                        data: null,
                        className: "text-center",
                        render: function(data, type, full, meta) {
                            return meta.row + 1;
                        }
                    },
                    {
                        className: "text-center break-all",
                        data: 'key'
                    },
                    {
                        "data": null,
                        className: "text-center",
                        render: function(data, type, full, meta) {
                            return `<input class="form-control w-100" id="value-${meta.row + 1}" value="` +
                                data.value + `">`;
                        },
                    },
                    // {
                    //     "data":null,
                    //     className: "text-center",
                    //     render: function (data, type, full, meta) {
                    //         return `<button type="button" onclick="auto_translate('${data.key}','${meta.row + 1}')" class="btn btn-ghost-success btn-block">
                //                     <i class="tio-globe"></i></button>`;
                    //     },
                    // },
                    {
                        "data": null,
                        className: "text-center",
                        render: function(data, type, full, meta) {
                            return `<button type="button" onclick="update_lang('${data.key}', $('#value-${meta.row + 1}').val())"
                                            class="btn btn-primary btn-block"><i class="fa fa-plus-circle"></i>
                                    </button>`;
                        },
                    },
                ],
            });
            // Call the dataTables jQuery plugin || End
        });
    </script>

@endsection
