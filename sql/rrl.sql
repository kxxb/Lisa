-- phpMyAdmin SQL Dump
-- version 3.4.5deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Дек 12 2011 г., 11:28
-- Версия сервера: 5.1.58
-- Версия PHP: 5.3.6-13ubuntu3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `rrl`
--

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_dep`
--

CREATE TABLE IF NOT EXISTS `rrl_dep` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `rrl_dep`
--

INSERT INTO `rrl_dep` (`id`, `name`) VALUES
(1, 'Руководство'),
(2, 'Логисты');

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_handbooks`
--

CREATE TABLE IF NOT EXISTS `rrl_handbooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_sys_content`
--

CREATE TABLE IF NOT EXISTS `rrl_sys_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_text` tinyblob,
  `status` int(11) DEFAULT NULL,
  `last_user_id` int(11) DEFAULT NULL,
  `date_rec` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `rrl_sys_content`
--

INSERT INTO `rrl_sys_content` (`id`, `content_text`, `status`, `last_user_id`, `date_rec`) VALUES
(1, NULL, 1, 1, '2011-12-07 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_sys_menu`
--

CREATE TABLE IF NOT EXISTS `rrl_sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `item_name` varchar(45) DEFAULT NULL,
  `item_url` varchar(500) DEFAULT NULL,
  `last_user_id` int(11) DEFAULT NULL,
  `js_function_name` varchar(250) DEFAULT NULL,
  `rec_date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=101 ;

--
-- Дамп данных таблицы `rrl_sys_menu`
--

INSERT INTO `rrl_sys_menu` (`id`, `pid`, `status`, `item_name`, `item_url`, `last_user_id`, `js_function_name`, `rec_date`) VALUES
(1, 1, 1, 'Задачи', '#', 1, '', '2011-07-12'),
(2, 1, 1, 'Главная', '../app.startpage/', 1, 'onStartPageClick', '2011-07-12'),
(3, 1, 1, 'Работа', '../app.work/', 1, 'onWorkClick', '2011-07-12'),
(4, 1, 1, 'Сотрудники', '../app.users/', 1, 'onUsersClick', '2011-07-12'),
(100, 1, 1, 'Выход', '../app.startpage/logout.php', 1, 'onLogoutClick', '2011-07-12');

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_s_handbooks`
--

CREATE TABLE IF NOT EXISTS `rrl_s_handbooks` (
  `rrl_handbooks_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`rrl_handbooks_id`,`id`),
  KEY `fk_rrl_s_handbooks_fk1` (`rrl_handbooks_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_users`
--

CREATE TABLE IF NOT EXISTS `rrl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pass` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `middle_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'отчество',
  `last_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'фамилия',
  `rrl_dep_id` int(11) DEFAULT NULL,
  `user_status` int(11) DEFAULT NULL COMMENT '1 - активный\n0- уволен',
  `user_photo` blob,
  `user_start_date` datetime DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `date_rec` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rrl_users_fk1` (`rrl_dep_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `rrl_users`
--

INSERT INTO `rrl_users` (`id`, `login`, `pass`, `name`, `middle_name`, `last_name`, `rrl_dep_id`, `user_status`, `user_photo`, `user_start_date`, `user_birthday`, `date_rec`) VALUES
(1, 'admin', '1000', 'Кирилл', 'Александрович', 'Шаврак', 1, 1, NULL, '2011-01-20 11:00:00', '1984-02-04', '2011-01-20'),
(2, 'fakir', '1000', 'Факир', 'Абдулович', 'Бабаджанов', 2, 1, NULL, '2011-01-20 11:00:00', '1984-03-05', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `rrl_user_login`
--

CREATE TABLE IF NOT EXISTS `rrl_user_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `login_status` int(11) DEFAULT NULL,
  `login_datetime` datetime DEFAULT NULL,
  `logout_datetime` datetime DEFAULT NULL,
  `user_ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Дамп данных таблицы `rrl_user_login`
--

INSERT INTO `rrl_user_login` (`id`, `user_id`, `login_status`, `login_datetime`, `logout_datetime`, `user_ip`) VALUES
(1, 1, 1, '2011-12-11 18:51:41', NULL, '127.0.0.1'),
(2, 1, 1, '2011-12-11 19:01:09', NULL, '127.0.0.1'),
(3, NULL, NULL, '2011-12-11 19:05:28', '2011-12-11 19:05:28', '127.0.0.1'),
(4, 2, 1, '2011-12-11 19:08:18', '2011-12-11 19:08:18', '127.0.0.1'),
(5, 2, 1, '2011-12-11 19:10:44', NULL, '127.0.0.1'),
(6, 1, 1, '2011-12-11 19:15:29', NULL, '::1'),
(7, 1, 1, '2011-12-11 19:26:17', NULL, '127.0.0.1'),
(8, 2, 1, '2011-12-11 19:59:08', NULL, '127.0.0.1'),
(9, 2, 1, '2011-12-11 20:00:22', NULL, '127.0.0.1'),
(10, 2, 1, '2011-12-11 20:01:44', NULL, '127.0.0.1'),
(11, 2, 1, '2011-12-11 20:04:04', NULL, '127.0.0.1'),
(12, 2, 0, '2011-12-11 20:04:47', NULL, '127.0.0.1'),
(13, 1, 1, '2011-12-11 20:07:46', NULL, '127.0.0.1'),
(14, 1, 0, '2011-12-11 20:08:20', NULL, '127.0.0.1'),
(15, 1, 1, '2011-12-11 20:11:31', NULL, '127.0.0.1'),
(16, 1, 1, '2011-12-11 20:16:56', NULL, '::1'),
(17, 1, 1, '2011-12-12 08:44:40', NULL, '::1'),
(18, 1, 1, '2011-12-12 11:20:35', NULL, '::1');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `rrl_s_handbooks`
--
ALTER TABLE `rrl_s_handbooks`
  ADD CONSTRAINT `fk_rrl_s_handbooks_fk1` FOREIGN KEY (`rrl_handbooks_id`) REFERENCES `rrl_handbooks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `rrl_users`
--
ALTER TABLE `rrl_users`
  ADD CONSTRAINT `fk_rrl_users_fk1` FOREIGN KEY (`rrl_dep_id`) REFERENCES `rrl_dep` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
