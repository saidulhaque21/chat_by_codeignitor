<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Welcome extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    function index() {
        $this->load->helper('url');

        // user list 
        $this->load->model('MChat');
        $data['all_user_list'] = $this->MChat->rest_of_user_list();
         $this->load->view('welcome_message', $data);
        
    }

}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */