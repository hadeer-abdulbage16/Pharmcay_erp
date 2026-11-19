@if ($suppliers->count())
@php
    $currency_symbol_placement = get_general_settings('currency_symbol_placement');
    $currency_precision = get_general_settings('currency_precision');
     
@endphp
    <table class="table table-bordered" id="supplier_table" data-route="{{ route('crm.supplier.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('Name / Company Name') }}</th>
                <th>{{ translate('type') }}</th>
                <th>{{ translate('phone') }}</th>
                <th>{{ translate('email') }}</th>
                <th>{{ translate('Status') }}</th>
                <th class="text-right action-col">{{ translate('Action') }}</th>
                <th>{{ translate('tax_no') }}</th>
                <th>{{ translate('opening_balance') }}</th>
                <th>{{ translate('total_purchase') }}</th>
                <th>{{ translate('total_purchase_return') }}</th>
                <th>{{ translate('address') }}</th>

            </tr>
        </thead>
        <tbody>
            @foreach ($suppliers as $item)
                <tr>
                    @if (method_exists($suppliers, 'currentPage'))
                        <td>{{ ($suppliers->currentPage() - 1) * $suppliers->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->code }}</td>
                    <td>{{ $item->f_name ? $item->f_name . ' ' . $item->l_name : $item->company_name }}</td>
                    <td>{{ $item->type }}</td>
                    <td>{{ $item->phone }}</td>
                    <td>{{ $item->email }}</td>
                    <td>

                        @if ($item->status == 'active')
                            <span class="badge badge-success mr-1">{{ translate('Active') }}</span>
                        @else
                            <span class="badge badge-danger mr-1">{{ translate('Inactive') }}</span>
                        @endif
                    </td>

                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route-store="{{ route('crm.supplier.store') }}"
                                    data-route-form="{{ route('crm.supplier.form') }}"
                                    data-route-edit="{{ route('crm.supplier.edit', ':id') }}"
                                    data-route-update="{{ route('crm.supplier.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('crm.supplier.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                   
                    <td>{{ $item->tax_no }}</td>
                     @if ($currency_symbol_placement == 'after')
                        <td>{{ number_format($item->opening_balance, $currency_precision) }} {{ get_general_settings('currency_symbol') }}</td>
                        <td>{{ number_format($item->total_purchase, $currency_precision) }} {{ get_general_settings('currency_symbol') }}</td>
                        <td>{{ number_format($item->total_purchase_return, $currency_precision) }} {{ get_general_settings('currency_symbol') }}</td>
                    @else
                        <td>{{ get_general_settings('currency_symbol') }} {{ number_format($item->opening_balance, $currency_precision) }}</td>  
                        <td>{{ get_general_settings('currency_symbol') }} {{ number_format($item->total_purchase, $currency_precision) }}</td>  
                        <td>{{ get_general_settings('currency_symbol') }} {{ number_format($item->total_purchase_return, $currency_precision) }}</td>  
                    @endif  
                    <td>{{ $item->address }}</td>

                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($suppliers, 'links'))
        <div class="pagination-wrapper">
            {{ $suppliers->appends(['wrapper' => 'supplier_table_wrapper'])->links() }}
        </div>
    @endif
@else
    <div class="col-md-12 col-md-12-padding">
        <div class="box ">
            <div class="box-body">
                <div class="intro text-center">
                    <div class="videoimg"> </div>
                    <h3>{{ translate('Empty List') }}</h3>
                    <p class="text-muted">{{ translate('No Data Found') }}</p>
                </div>
            </div>
            <div class="box-footer clearfix">
            </div>
        </div>
    </div>


@endif
