 

USE `ci_chat`;

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(255) NOT NULL DEFAULT '',
  `to` varchar(255) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `sent` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `recd` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `chat` */

/*Table structure for table `chat_online` */

DROP TABLE IF EXISTS `chat_online`;

CREATE TABLE `chat_online` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `channel` int(11) NOT NULL,
  `chat_date_time` datetime NOT NULL,
  `ip` varbinary(16) NOT NULL,
  `status` set('0','1','2') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `chat_online` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `username` varchar(16) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL DEFAULT '',
  `last_login` datetime DEFAULT NULL,
  `last_login_ip` varchar(50) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `status` set('0','1') DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`first_name`,`last_name`,`username`,`email`,`password`,`last_login`,`last_login_ip`,`created`,`updated`,`status`) values (1,'Saidul','Haque','saidul','pclanguage@gmail.com','0b4e7a0e5fe84ad35fb5f95b9ceeac79',NULL,NULL,NULL,'2011-07-14 23:48:58','1'),(2,'Monira','Moni','moni','moni@gmail.com','43d3810c065f4bf3550fac648d605fcb','2011-06-29 02:10:52','0','2011-06-29 02:10:52','2011-10-03 21:40:55','1'),(3,'Salman','Haque','salman','salman@gmail.com','43d3810c065f4bf3550fac648d605fcb','2011-06-29 02:10:52','0','2011-06-29 02:10:52','2011-10-03 21:40:55','1'),(4,'Akhi','Moni','akhi','akhi@gmail.com','43d3810c065f4bf3550fac648d605fcb','2011-06-29 02:10:52','0','2011-06-29 02:10:52','2011-10-03 21:40:55','1'),(5,'Salim','Sarker','salim','salim@gmail.com','43d3810c065f4bf3550fac648d605fcb','2011-06-29 02:10:52','0','2011-06-29 02:10:52','2011-10-03 21:40:55','1'),(6,'Fatem','Akter','fatema','fatema@gmail.com','43d3810c065f4bf3550fac648d605fcb','2011-06-29 02:10:52','0','2011-06-29 02:10:52','2011-10-03 21:40:55','1');
