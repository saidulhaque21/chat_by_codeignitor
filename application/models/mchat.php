<?php

class MChat extends CI_Model {

    public $tableName = 'users';

    function __construct() {
        parent::__construct();
    }

    function is_exist_online_list($id) {
        $this->db->where('user_id', $id);
        $result = $this->db->get('chat_online')->result();
        if (count($result) > 0)
            return true; else
            return false;
    }

    function get_online_users() {
        $this->db->select('*');
        $this->db->select('chat_online.status as online_status');
        $this->db->where('chat_online.status', '1');
        $this->db->join('chat_online', 'chat_online.user_id =' . $this->tableName . '.id', 'left');
        $this->db->order_by('chat_online.id', 'desc');
        return $this->db->get($this->tableName)->result();
    }

    function all_user_list() {
        return $this->db->get($this->tableName)->result();
    }

    function rest_of_user_list() {
        $all_user = $this->db->get($this->tableName)->result();
        $rest_of_user = '';
        
        $online_user = $this->get_online_users();
        $online_user_ids = array();
        foreach ($online_user as $list) {
            $online_user_ids[] = $list->id;
        }
        
       
        foreach ($all_user as $list) {
            if (!in_array($list->id, $online_user_ids)) {
                $rest_of_user[] = $list;
            }
        }

        return $rest_of_user;
    }

    function set_user_online($id=NULL) {
        $now = date("Y-m-d H:i:s");
        $ip = $_SERVER['REMOTE_ADDR'];
        if ($id) {
            // account table
            if ($this->is_exist_online_list($id)) {
                $up_data = array(
                    'chat_date_time' => $now,
                    'ip' => $ip,
                    'status' => '1',
                );
                $this->db->where('id', $id);
                $this->db->update('chat_online', $up_data);
            } else {
                $data = array(
                    'user_id' => $id,
                    'chat_date_time' => $now,
                    'ip' => $ip,
                    'status' => '1'
                );
                $this->db->insert('chat_online', $data);
            }
        }
    }

    function get_user_by_id($id) {
        $this->db->where("id", $id);
        return $this->db->get($this->tableName)->row_object();
    }

    // for chat
    function deleteOnlineUser($id) {
        $this->db->where('user_id', $id);
        $this->db->delete('chat_online');
    }

    function set_user_inactive($id) {
        $now = date("Y-m-d H:i:s");
        $data = array(
            'chat_date_time' => $now,
            'status' => '0',
        );

        $this->db->where('user_id', $id);
        $this->db->update('chat_online', $data);
    }

    function set_all_inactive() {
        $this->db->where('status', 2);
        $chat_online = $this->db->get('chat_online')->result();

        if (!empty($chat_online)) {
            foreach ($chat_online as $list) {

                $last_chat = $list->chat_date_time;
                $now = date("Y-m-d H:i:s");
                $diff = strtotime($now) - strtotime($last_chat);
                $fullDays = floor($diff / (60 * 60 * 24));
                $fullHours = floor(($diff - ($fullDays * 60 * 60 * 24)) / (60 * 60));
                $fullMinutes = floor(($diff - ($fullDays * 60 * 60 * 24) - ($fullHours * 60 * 60)) / 60);

                $idle = false;
                if ($fullDays > 1) {
                    $idle = true;
                } else if ($fullHours > 1) {
                    $idle = true;
                } else if ($fullMinutes > 15) {
                    $idle = true;
                }
                else
                    $idle = false;


                if ($idle) {
                    $this->set_user_inactive($list->user_id);
                }
            }
        }
    }

    function set_user_idle($id) {
        $now = date("Y-m-d H:i:s");
        $data = array(
            'chat_date_time' => $now,
            'status' => '2',
        );
        $this->db->where('user_id', $id);
        $this->db->update('chat_online', $data);
    }

}

?>