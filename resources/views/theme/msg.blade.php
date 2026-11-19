 <style> 
.top-msg {
    position: fixed;
    top: 20px;  
    right: 20px;
    min-width: 250px;
    max-width: 350px;  
    padding: 10px 15px;
    border-radius: 6px;
    z-index: 99999;
    display: flex;
    align-items: center;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    color: #fff;
}

.top-msg.success { background-color: #28a745; }
.top-msg.error { background-color: #dc3545; }

.top-msg .top-msg-ico {
    font-weight: bold;
    margin-right: 10px;
    font-size: 16px;
}

.top-msg .top-msg-inner {
    flex: 1;
}

.top-msg .top-msg-content {
    margin: 0;
    line-height: 1.3;
}

.top-msg .top-msg-close {
    margin-left: 10px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
}
 
.top-msg-2 {
    top: 55px !important;
}
</style>

@php
    $msg = session('msg') ?? session('error_msg') ?? '';
    $class = session('error_msg') ? 'error' : 'success';

    if($msg == 1){ $msg = translate("Successfully Saved"); }
    elseif($msg == 2){ $msg = translate("Successfully Updated"); }
    elseif($msg == 3){ $msg = translate("Unknown Error"); }
@endphp
 
<div class="top-msg top-msg-1 {{ $class }}" style="{{ !$msg ? 'display:none;' : '' }}">
    {{-- <div class="top-msg-ico">!</div> --}}
    <div class="top-msg-inner">
        <p id="top-msg-content" class="top-msg-content">{{ $msg }}</p>
    </div>
    <div class="top-msg-close" style="cursor:pointer;" onclick="erp_msg_clear()">&#10005;</div>
</div>
 
<div class="top-msg top-msg-2" style="top:55px !important; display:none;">
    {{-- <div class="top-msg-ico">!</div> --}}
    <div class="top-msg-inner">
        <p id="top-msg-ajax-content" class="top-msg-content"></p>
    </div>
    <div class="top-msg-close" style="cursor:pointer;" onclick="erp_msg_clear()">&#10005;</div>
</div>

<script>
    function erp_msg_clear() {
        $('.top-msg').hide();
        $('#top-msg-content').text('');
        $('#top-msg-ajax-content').text('');
    }

    function erp_msg_show(msg, type = 'success') {
        let $msgDiv = $('.top-msg-2');
        $msgDiv.removeClass('success error').addClass(type);
        $('#top-msg-ajax-content').text(msg);
        $msgDiv.show();
        setTimeout(() => {
            $msgDiv.fadeOut();
        }, 3000);
    }
</script>
