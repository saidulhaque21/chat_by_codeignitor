Welcome to Chatting application like Facebook, google chat by CodeIgniter!
 
Installation step:
--------------------------------------------------------------------
 1. download CodeIgnitor from http://ellislab.com/codeigniter/user-guide/installation/downloads.html
 2. Extract in root folder and take a name ci_chat
 3. Download  Chatting application from https://github.com/pclanguage/chat_by_codeignitor
 4. Extract this zip and replace all file in ci_chat folder which is created 
 5. Here you will a db folder and database, create a database ci_chat and import this database. 
 6. Now browse in http://localhost/ci_chat/ and go to chat room by clicking on user and open same url in 
      different browser and go to chat room with another user.
 7. That's all  

Development Guideline:
--------------------------------------------------------------------
1. Call chat in view: 
First of all you have to call chat in view. for that simply you write the bellow code 
before ending body in common layout page.

<?php   echo $this->load->view('chat/chat'); ?>  

2. Set user in Session: 
You have to set user before going to chat room or doing chat. For that you follow the code when 
user login and set two variable for chat. 

$this->session->set_userdata('online_chat_user', USER_ID); // session set the user id 

$_SESSION['online_chat_username'] =  USERNAME; // session set the user name  




 
github URL : https://github.com/pclanguage/chat_by_codeignitor

Developer Info-  
@name           : Md saidul haque

@web            : http://saidul.songzog.com/
