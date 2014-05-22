<?php

class Online_users extends CI_Controller {

    public $user_id;

    function __construct() {
        parent::__construct();
        $this->load->model('MChat');
        $this->user_id = $this->session->userdata('online_chat_user');
    }

    function set_user($id=NULL) {

        $user_info = $this->MChat->get_user_by_id($id);
        if (!empty($user_info)) {
            // user data 
            $this->session->set_userdata('online_chat_user', $user_info->id);
            $_SESSION['online_chat_username'] = $user_info->username;
            $this->user_id = $user_info->id;
            $this->set_online();
            redirect('/');
        } else {
            echo 'No match user';
        }
    }

    function unset_user() {
        $this->set_inactive();
        $this->session->unset_userdata('online_chat_user');
        unset($_SESSION['online_chat_username']);
        redirect('/');
    }

    function who_is_online() {
        $users = $this->MChat->get_online_users();
        $online_users = "";
        if (count($users) > 1) {
            $online_users .= ' <ol class="online_list" style="width: 220px;"> ';
            foreach ($users as $user) {

                if ($user->id != $this->user_id) {
                    $online_users .= '<li id="online_user_' . $user->id . '" style="width: 220px;">';
                    if ($user->online_status == 1)
                        $online_users .= '<div class="active">   <a href="javascript:void(0)" onclick="javascript:chatWith(\'' . $user->username . '\',\'' . $_SESSION['online_chat_username'] . '\' )">
                            ' . $user->first_name . ' ' . $user->last_name . ' 
                              </a> </div>';
                    else if ($user->online_status == 2)
                        $online_users .= '<div class="idle">   ' . $user->first_name . ' ' . $user->last_name . '  </div>';
                    else {
                        
                    }
                    $online_users .= '      </li>';
                }
            }
            $online_users .= ' </ol> ';
        } else {
            $online_users .= '<small style="padding-top: 50px;"> No user online </small>';
        }
        echo $online_users;
    }

    function set_online() {
        $this->MChat->set_user_online($this->user_id);
    }

    function set_inactive() {
        $this->MChat->set_user_inactive($this->user_id);
    }

    function set_idle() {
        $this->MChat->set_user_idle($this->user_id);
    }

}

?>