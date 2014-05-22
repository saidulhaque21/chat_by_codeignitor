<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Welcome to Chat Example like Facebook, google chat  by CodeIgniter</title>

        <style type="text/css">

            body {
                background-color: #fff;
                margin: 40px;
                font-family: Lucida Grande, Verdana, Sans-serif;
                font-size: 14px;
                color: #4F5155;
            }
            .container{width: 1000px; margin: auto;}
            a {
                color: #003399;
                background-color: transparent;
                font-weight: normal;
            }

            h1 {
                color: #444;
                background-color: transparent;
                border-bottom: 1px solid #D0D0D0;
                font-size: 16px;
                font-weight: bold;
                margin: 24px 0 2px 0;
                padding: 5px 0 6px 0;
            }

            code {
                font-family: Monaco, Verdana, Sans-serif;
                font-size: 12px;
                background-color: #f9f9f9;
                border: 1px solid #D0D0D0;
                color: #002166;
                display: block;
                margin: 14px 0 14px 0;
                padding: 12px 10px 12px 10px;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Chat Example like Facebook, google chat  by CodeIgniter!</h1>

            <p>For testing, there is given some user links. If you click, then this user will set to do chat</p>

            <ul>
                <?php
                if (isset($_SESSION['online_chat_username'])) {
                    ?>
                <li> I  <strong> <?php echo $_SESSION['online_chat_username']; ?></strong>   is now chat room || <a href="<?php echo site_url('chat/online_users/unset_user/'); ?>">out from chat room</a> </li>
                    <?php
                }

                if (!empty($all_user_list)) {

                    foreach ($all_user_list as $user) {
                        if (isset($_SESSION['online_chat_username'])) {
                            ?>
                            <li>  <?php echo $user->first_name; ?> <?php echo $user->last_name; ?>  </li>
                            <?php
                        } else {
                            ?>
                            <li> I want to enter in chat room as <a href="<?php echo site_url('chat/online_users/set_user/' . $user->id); ?>"><?php echo $user->first_name; ?> <?php echo $user->last_name; ?></a> </li>
                            <?php
                        }
                    }
                }
                ?>
            </ul>

        </div>
        <script src="<?php echo base_url(); ?>includes/js/jquery.min.js" type="text/javascript"></script>
        <?php
        if (isset($_SESSION['online_chat_username'])) {
            echo $this->load->view('chat/chat');
        }
        ?>


    </body>
</html>