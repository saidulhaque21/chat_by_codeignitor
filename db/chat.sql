 

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(255) NOT NULL DEFAULT '',
  `to` varchar(255) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `sent` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `recd` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `chat`
--


-- --------------------------------------------------------

--
-- Table structure for table `chat_online`
--

CREATE TABLE IF NOT EXISTS `chat_online` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `channel` int(11) NOT NULL,
  `chat_date_time` datetime NOT NULL,
  `ip` varbinary(16) NOT NULL,
  `status` set('0','1','2') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `chat_online`
--

INSERT INTO `chat_online` (`id`, `user_id`, `channel`, `chat_date_time`, `ip`, `status`) VALUES
(1, '1', 0, '2014-05-21 12:50:59', '127.0.0.1', '1'),
(2, '2', 0, '2014-05-21 12:48:38', '127.0.0.1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `last_login`, `last_login_ip`, `created`, `updated`, `status`) VALUES
(1, 'Saidul', 'Haque', 'user1', 'pclanguage@gmail.com', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', NULL, NULL, NULL, '2011-07-14 23:48:58', '1'),
(2, 'User 2', 'Moni', 'user2', 'onlymoni@gmail.com', '43d3810c065f4bf3550fac648d605fcb', '2011-06-29 02:10:52', '0', '2011-06-29 02:10:52', '2011-10-03 21:40:55', '1');
