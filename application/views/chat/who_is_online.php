<link href="<?php echo base_url();?>includes/chat/css/chat.css"  rel="stylesheet" type="text/css" />
<link href="<?php echo base_url();?>includes/chat/css/screen.css"  rel="stylesheet" type="text/css" />
<script type="text/javascript" language="javascript" src="<?php echo base_url();?>includes/chat/js/jquery.idle-timer.js" ></script>



<script>
    
    var base_url= '<?php echo base_url(); ?>'; 
    $().ready(function() {
        $(window).unload( function(){
            //  alert('close');
            $.ajax({
                type: "POST",
                url: base_url+"chat/online_users/set_online",
                data: "userid=1",
                success: function(msg){
                    $("#status").html(msg);
                }
            });

        });
    });



    function check(){
        $.ajax({
            type: "POST",
            url: base_url+"chat/online_users/who_is_online",
            data: "userid=1",
            success: function(msg){
                $("#status").html(msg);
            }
        });

        window.setTimeout(function() {
            check();
        }, 10000);
    }



    $().ready(function() {
        $.ajax({
            type: "POST",
            url: base_url+"chat/online_users/who_is_online",
            data: "userid=1",
            success: function(msg){
                $("#status").html(msg);
            }
        });
        window.setTimeout(function() {
            check();
        }, 1000);

    });


    (function($){

        var timeout = 50000;

        $(document).bind("idle.idleTimer", function(){

            $.ajax({
                type: "POST",
                url: base_url+"chat/online_users/set_idle",
                data: "userid=1",
                success: function(msg){
                    // alert('sdsfs');
                }
            });


            //   $("#status").html("User is idle :(").css("backgroundColor", "silver");

        });

        $(document).bind("active.idleTimer", function(){

            $.ajax({
                type: "POST",
                url: base_url+"chat/online_users/set_online",
                data: "userid=1",
                success: function(msg){
                    // alert('sdsfs');
                }
            });

            // $("#status").html("User is active :D").css("backgroundColor", "yellow");
        });

        $.idleTimer(timeout);

        // correct the page
        $('#timeout').text(timeout/1000);


    })(jQuery);



</script>

<div id="status"> </div>
 
