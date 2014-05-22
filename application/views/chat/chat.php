<link href="<?php echo base_url(); ?>includes/chat/css/style.css" rel="stylesheet"/>
<link href="<?php echo base_url(); ?>includes/chat/css/screen.css" rel="stylesheet"/>
<script type="text/javascript" src="<?php echo base_url(); ?>includes/chat/js/chat.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>includes/chat/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>includes/chat/js/jquery.idle-timer.js"></script>
<script>

    $().ready(function() {
 $.cookie("a_online_user_min", "-", { expires: 7,path: '/temp' });
  $('#a_online_user_min').html('-');
            $('#online_container').css('height','304px');
//        if($.cookie("a_online_user_min")=='+' || $.cookie("a_online_user_min")==null ) {
//            $('#a_online_user_min').html('+');
//            $('#online_container').css('height',"32px");
//        }
//        else {
//            $('#a_online_user_min').html('-');
//            $('#online_container').css('height','304px');
//        }
    });


    function online_user_min(){
        var val =  $('#a_online_user_min').html();
        if(val=='-') {
            $('#a_online_user_min').html('+');
            $('#online_container').css('height',"32px");
            $.cookie("a_online_user_min", "+", { expires: 7,path: '/temp' });
        }
        else {
            $('#a_online_user_min').html('-');
            $('#online_container').css('height','304px');
            $.cookie("a_online_user_min", "-", { expires: 7,path: '/temp' });
        }

    }


</script>
<div id="online_container">

    <div class="chatboxhead">
        <div class="chatboxtitle">Online Users</div>
        <div class="chatboxoptions">
            <a href="javascript:void(0)" onclick="online_user_min();" id="a_online_user_min">-</a>
        </div><br clear="all">
    </div>
    <div id="online_users_list">
        <?php $this->load->view('chat/who_is_online'); ?>
    </div>


</div>



<div id="chat_message" style="width: 472px; overflow: auto; height: 310px;  float: left;">
    <div id="chat_message_box"  style=" height: 310px;  position: relative;"  > </div>
</div>

