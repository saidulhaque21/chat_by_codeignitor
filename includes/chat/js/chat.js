/*
 

*/
var imagePath = '';
var windowFocus = true;
var username;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 1000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();

$(document).ready(function(){
    originalTitle = document.title;
    startChatSession();

    $([window, document]).blur(function(){
        windowFocus = false;
    }).focus(function(){
        windowFocus = true;
        document.title = originalTitle;
    });
});

function restructureChatBoxes() {
    align = 0;
    for (x in chatBoxes) {
        chatboxtitle = chatBoxes[x];

        if ($("#chatbox_"+chatboxtitle).css('display') != 'none') {
            if (align == 0) {
                $("#chatbox_"+chatboxtitle).css('left', '10px');
            } else {
                width = (align)*(225+7)+10;
                $("#chatbox_"+chatboxtitle).css('left', width+'px');
                $("#chat_message_box").css('width', width+'px');
            }
            align++;
        }
    }
}

function chatWith(chatuser) {
    numLive= $("div.chatbox").length;
    numHidden = $("div.chatbox:hidden").length;
    num = numLive - numHidden ;
    //alert(num);
    if(num >= 2) {
        alert('Please close one, then open another chatbox. ');
    }
    else {
        createChatBox(chatuser);
        $("#chatbox_"+chatuser+" .chatboxtextarea").focus();
    }

       
}

function createChatBox(chatboxtitle,minimizeChatBox) {
    if ($("#chatbox_"+chatboxtitle).length > 0) {
        if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
            $("#chatbox_"+chatboxtitle).css('display','block');
            restructureChatBoxes();
        }
        $("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
        return;
    }

    $(" <div />" ).attr("id","chatbox_"+chatboxtitle)
    .addClass("chatbox")
    .html('<div class="chatboxhead"><div class="chatboxtitle">'+chatboxtitle+'</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:toggleChatBoxGrowth(\''+chatboxtitle+'\')">-</a> <a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+chatboxtitle+'\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript:return checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');"></textarea></div>')
    .appendTo($( "#chat_message_box" ));
			   
    $("#chatbox_"+chatboxtitle).css('bottom', '0px');
	
    chatBoxeslength = 0;

    for (x in chatBoxes) {
        if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
            chatBoxeslength++;
        }
    }

    if (chatBoxeslength == 0) {
        $("#chat_message_box").css('width', '250px');
        $("#chatbox_"+chatboxtitle).css('right', '385px');
    } else {
        width = (chatBoxeslength)*(225+7)+10;
        $("#chatbox_"+chatboxtitle).css('right', width+'px');
        $("#chat_message_box").css('width', width+'px');

    }
	
    chatBoxes.push(chatboxtitle);

    if (minimizeChatBox == 1) {
        minimizedChatBoxes = new Array();

        if ($.cookie('chatbox_minimized')) {
            minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
        }
        minimize = 0;
        for (j=0;j<minimizedChatBoxes.length;j++) {
            if (minimizedChatBoxes[j] == chatboxtitle) {
                minimize = 1;
            }
        }

        if (minimize == 1) {
            $('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
            $('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
        }
    }

    chatboxFocus[chatboxtitle] = false;

    $("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
        chatboxFocus[chatboxtitle] = false;
        $("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
    }).focus(function(){
        chatboxFocus[chatboxtitle] = true;
        newMessages[chatboxtitle] = false;
        $('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('chatboxblink');
        $("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
    });

    $("#chatbox_"+chatboxtitle).click(function() {
        if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') != 'none') {
            $("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
        }
    });

    $("#chatbox_"+chatboxtitle).show();
}


function chatHeartbeat(){

    var itemsfound = 0;
	
    if (windowFocus == false) {
 
        var blinkNumber = 0;
        var titleChanged = 0;
        for (x in newMessagesWin) {
            if (newMessagesWin[x] == true) {
                ++blinkNumber;
                if (blinkNumber >= blinkOrder) {
                    document.title = x+' says...';
                    titleChanged = 1;
                    break;
                }
            }
        }
		
        if (titleChanged == 0) {
            document.title = originalTitle;
            blinkOrder = 0;
        } else {
            ++blinkOrder;
        }

    } else {
        for (x in newMessagesWin) {
            newMessagesWin[x] = false;
        }
    }

    for (x in newMessages) {
        if (newMessages[x] == true) {
            if (chatboxFocus[x] == false) {
                //FIXME: add toggle all or none policy, otherwise it looks funny
                $('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
            }
        }
    }
	
    $.ajax({
        url: base_url+"chat.php?action=chatheartbeat",
        cache: false,
        dataType: "json",
        success: function(data) {

            $.each(data.items, function(i,item){
                if (item)	{ // fix strange ie bug

                    chatboxtitle = item.f;

                    if ($("#chatbox_"+chatboxtitle).length <= 0) {
                        createChatBox(chatboxtitle);
                    }
                    if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
                        $("#chatbox_"+chatboxtitle).css('display','block');
                        restructureChatBoxes();
                    }
				
                    if (item.s == 1) {
                        item.f = username;
                    }

                    if (item.s == 2) {
                        $("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
                    } else {
                        newMessages[chatboxtitle] = true;
                        newMessagesWin[chatboxtitle] = true;
                        //set profile image
                        $("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
                    }

                    $("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
                    itemsfound += 1;
                }
            });

            chatHeartbeatCount++;

            if (itemsfound > 0) {
                chatHeartbeatTime = minChatHeartbeat;
                chatHeartbeatCount = 1;
            } else if (chatHeartbeatCount >= 10) {
                chatHeartbeatTime *= 2;
                chatHeartbeatCount = 1;
                if (chatHeartbeatTime > maxChatHeartbeat) {
                    chatHeartbeatTime = maxChatHeartbeat;
                }
            }
		
            setTimeout('chatHeartbeat();',chatHeartbeatTime);
        }
    });
}

function closeChatBox(chatboxtitle) {
    $('#chatbox_'+chatboxtitle).css('display','none');
    restructureChatBoxes();

    $.post(base_url+"chat.php?action=closechat", {
        chatbox: chatboxtitle
    } , function(data){
        });

}

function toggleChatBoxGrowth(chatboxtitle) {
    if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') == 'none') {
		
        var minimizedChatBoxes = new Array();
		
        if ($.cookie('chatbox_minimized')) {
            minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
        }

        var newCookie = '';

        for (i=0;i<minimizedChatBoxes.length;i++) {
            if (minimizedChatBoxes[i] != chatboxtitle) {
                newCookie += chatboxtitle+'|';
            }
        }

        newCookie = newCookie.slice(0, -1)


        $.cookie('chatbox_minimized', newCookie);
        $('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','block');
        $('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','block');
        $("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
    } else {
		
        var newCookie = chatboxtitle;

        if ($.cookie('chatbox_minimized')) {
            newCookie += '|'+$.cookie('chatbox_minimized');
        }


        $.cookie('chatbox_minimized',newCookie);
        $('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
        $('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
    }
	
}

function checkChatBoxInputKey(event,chatboxtextarea,chatboxtitle) {
	 
    if(event.keyCode == 13 && event.shiftKey == 0)  {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g,"");

        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(chatboxtextarea).css('height','44px');
        if (message != '') {
            $.post(base_url+"chat.php?action=sendchat", {
                to: chatboxtitle,
                message: message
            } , function(data){
                message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
                 
               //  var myPhoto = ' <img  title="You" alt="" src="'+imagePath+username+'.gif" class="chat_profile_image">';
               //  <span class="chatboxphoto">'+myPhoto+'</span>
                $("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+username+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+message+'</span></div>');
                $("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
            });
        }
        chatHeartbeatTime = minChatHeartbeat;
        chatHeartbeatCount = 1;

        return false;
    }

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 94;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height',adjustedHeight+8 +'px');
    } else {
        $(chatboxtextarea).css('overflow','auto');
    }
	 
}

function startChatSession(){  
    $.ajax({
        url: base_url+"chat.php?action=startchatsession",
        cache: false,
        dataType: "json",
        success: function(data) {
 
            username = data.username;

            $.each(data.items, function(i,item){
                if (item)	{ // fix strange ie bug

                    chatboxtitle = item.f;

                    if ($("#chatbox_"+chatboxtitle).length <= 0) {
                        createChatBox(chatboxtitle,1);
                    }
				
                    if (item.s == 1) {
                        item.f = username;
                    }

                    if (item.s == 2) {
                        $("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
                    } else {
                        $("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
                    }
                }
            });
		
            for (i=0;i<chatBoxes.length;i++) {
                chatboxtitle = chatBoxes[i];
                $("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
                setTimeout('$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);', 100); // yet another strange ie bug
            }
	
            setTimeout('chatHeartbeat();',chatHeartbeatTime);
		
        }
    });
}
 