
@if ($product_stock->count())
<div class="table-responsive">
 <table class="table table-bordered"  id="product_stock_table" data-route="{{ route('inventory.product_stock.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Barcode') }}</th>
                <th>{{ translate('Name ') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('Store') }}</th> 
                <th>{{ translate('quantity') }}</th> 
                <th>{{ translate('Unit') }}</th> 
                <th>{{ translate('Sale Price') }}</th>
                <th>{{ translate('Tax ') }}</th>
                <th>{{ translate('Discount ') }}</th>
                  
                 <th>{{ translate('expiry date') }}</th>
                <th>{{ translate('Created Date') }}</th>
                <th>{{ translate('Edited Data') }}</th>
                
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($product_stock as $item)
                <tr>
                    @if (method_exists($product_stock, 'currentPage'))
                        <td>{{ ($product_stock->currentPage() - 1) * $product_stock->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->barcode }}</td>
                    <td>{{ $item->product_name }}</td>
                    <td>{{ $item->product_code }}</td>
                    <td>{{ $item->store->name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ $item->unit }}</td> 
                    <td>{{ $item->sale_price }}</td>
                    <td>{{ $item->tax}}</td>
                    <td>{{ $item->discount}}</td>
                     
                    <td>{{ date('d-m-Y', strtotime($item->expiry_date)) }}</td>
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
                                    data-route-store="{{ route('inventory.product_stock.store') }}"
                                    data-route-form="{{ route('inventory.product_stock.form') }}"
                                    data-route-edit="{{ route('inventory.product_stock.edit', ':id') }}"
                                    data-route-update="{{ route('inventory.product_stock.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('inventory.product_stock.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
   

    @if (method_exists($product_stock, 'links'))
        <div class="pagination-wrapper">
            {{ $product_stock->appends(['wrapper' => 'product_stock_table_wrapper'])->links() }}
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
