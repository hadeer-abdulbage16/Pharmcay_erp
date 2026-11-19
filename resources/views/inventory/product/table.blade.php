
@if ($products->count())
<div class="table-responsive">
 <table class="table table-bordered"  id="product_table" data-route="{{ route('inventory.product.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Name In Arabic') }}</th>
                <th>{{ translate('Name In English') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('Short Code') }}</th>
                <th>{{ translate('international Code') }}</th>
                <th>{{ translate('active ingredient') }}</th>
                <th>{{ translate('manufacturing type') }}</th> 
                <th>{{ translate('company') }}</th> 
                <th>{{ translate('category') }}</th> 
                <th>{{ translate('Store') }}</th> 
                {{-- <th>{{ translate('opening stock') }}</th>  --}}
                <th>{{ translate('Price') }}</th> 
                <th>{{ translate('Tax Value') }}</th>
                <th>{{ translate('Tax Percent') }}</th>
                <th>{{ translate('Discount Value') }}</th>
                <th>{{ translate('Discount Percent') }}</th>
                <th class="text-right action-col">{{ translate('Action') }}</th>
                <th>{{ translate('Unit') }}</th>
                <th>{{ translate('is medicine ?') }}</th> 
                <th>{{ translate('is general shortage ?') }}</th> 
                <th>{{ translate('expiry date') }}</th>
                <th>{{ translate('Created Date') }}</th> 
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $item)
                <tr>
                    @if (method_exists($products, 'currentPage'))
                        <td>{{ ($products->currentPage() - 1) * $products->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->name_ar }}</td>
                    <td>{{ $item->name_en }}</td>
                    <td>{{ $item->code }}</td>
                    <td>{{ $item->short_code }}</td>
                    <td>{{ $item->inter_code }}</td>
                    <td>{{ $item->active_ingredient }}</td>
                    <td>{{ $item->manufacturing_type }}</td> 
                    <td>{{ $item->company?->name }}</td>
                    <td>{{ $item->category?->title }}</td>
                    <td>{{ $item->store?->name }}</td>
                    {{-- <td>{{ $item->opening_stock }}</td> --}}
                    <td>{{ $item->price }}</td>
                    <td>{{ $item->tax_value }}</td>
                    <td>{{ $item->tax_percent }}</td>
                    <td>{{ $item->discount_value }}</td>
                    <td>{{ $item->discount_percent }}</td>
                    
                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route-store="{{ route('inventory.product.store') }}"
                                    data-route-form="{{ route('inventory.product.form') }}"
                                    data-route-edit="{{ route('inventory.product.edit', ':id') }}"
                                    data-route-update="{{ route('inventory.product.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('inventory.product.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                    <td>{{ $item->unit }}</td>
                     <td>
                        @if ($item->is_medicine == 'active')
                            <span class="badge badge-success mr-1">{{ translate('Active') }}</span>
                        @else
                            <span class="badge badge-danger mr-1">{{ translate('Inactive') }}</span>
                        @endif
                    </td>
                     <td>
                        @if ($item->is_general_shortage == 'active')
                            <span class="badge badge-success mr-1">{{ translate('Active') }}</span>
                        @else
                            <span class="badge badge-danger mr-1">{{ translate('Inactive') }}</span>
                        @endif
                    </td>
                    <td>{{ date('d-m-Y', strtotime($item->expiry_date)) }}</td> 
                    <td>{{ $item->description }}</td>

                    

                </tr>
            @endforeach
        </tbody>
    </table>
</div>
   

    @if (method_exists($products, 'links'))
        <div class="pagination-wrapper">
            {{ $products->appends(['wrapper' => 'product_table_wrapper'])->links() }}
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
