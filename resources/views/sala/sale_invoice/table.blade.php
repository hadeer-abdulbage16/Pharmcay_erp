
@if ($invoices->count())
<div class="table-responsive">
 <table class="table table-bordered"  id="purchase_invoice_table" data-route="{{ route('purchase.purchase_invoice.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('SupplierName') }}</th>
                <th>{{ translate('store') }}</th>
                <th>{{ translate('invoice number') }}</th>
                <th>{{ translate('grand total') }}</th>
                <th>{{ translate('payment method') }}</th>
                <th>{{ translate('Created Date') }}</th>
                <th>{{ translate('Edited Data') }}</th>
                
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoices as $item)
                <tr>
                    @if (method_exists($invoices, 'currentPage'))
                        <td>{{ ($invoices->currentPage() - 1) * $invoices->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    
                   
                    <td>{{ $item->supplier->f_name }}</td>
                    <td>{{ $item->store->name }}</td>
                    <td>{{ $item->invoice_number }}</td>
                    <td>{{ $item->grand_total }}</td>
                    <td>{{ $item->paymentMethod->name }}</td>
                    <td>{{ date('d-m-Y', strtotime($item->created_at)) }}</td>
                    <td>{{ date('d-m-Y', strtotime($item->updated_at)) }}</td>
                    

                    

                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route-store="{{ route('purchase.purchase_invoice.store') }}"
                                    data-route-form="{{ route('purchase.purchase_invoice.form') }}"
                                    data-route-edit="{{ route('purchase.purchase_invoice.edit', ':id') }}"
                                    data-route-update="{{ route('purchase.purchase_invoice.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('purchase.purchase_invoice.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
   

    @if (method_exists($invoices, 'links'))
        <div class="pagination-wrapper">
            {{ $invoices->appends(['wrapper' => 'category_table_wrapper'])->links() }}
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
