-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2026 at 12:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `business_settings`
--

CREATE TABLE  IF NOT EXISTS `business_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `branch_id` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `business_settings`
--

INSERT INTO `business_settings` (`id`, `type`, `value`, `branch_id`, `created_at`, `updated_at`) VALUES
(1, 'language', '[{\"id\":\"1\",\"name\":\"english\",\"direction\":\"ltr\",\"code\":\"en\",\"status\":1,\"default\":true},{\"id\":\"2\",\"name\":\"Arabic\",\"direction\":\"rtl\",\"code\":\"ar\",\"status\":1,\"default\":false}]', NULL, NULL, '2026-04-25 12:50:15'),
(2, 'pnc_language', '[\"en\",\"ar\"]', NULL, NULL, NULL),
(3, 'pos_theme', '0', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE IF NOT EXISTS `currencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) DEFAULT NULL,
  `decimal_digits` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `name`, `code`, `symbol`, `decimal_digits`, `created_at`, `updated_at`) VALUES
(1, 'United Arab Emirates', 'AED', 'د.إ', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(2, 'Afghan afghani', 'AFN', '؋', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(3, 'Albanian lek', 'ALL', 'L', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(4, 'Armenian dram', 'AMD', '', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(5, 'Angolan kwanza', 'AOA', 'Kz', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(6, 'Argentine peso', 'ARS', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(7, 'Australian dollar', 'AUD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(8, 'Aruban florin', 'AWG', 'ƒ', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(9, 'Azerbaijani manat', 'AZN', '', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(10, 'Bosnia and Herzegovi', 'BAM', 'KM or ÐšÐœ', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(11, 'Barbadian dollar', 'BBD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(12, 'Bangladeshi taka', 'BDT', '৳', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(13, 'Bulgarian lev', 'BGN', 'лв', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(14, 'Bahraini dinar', 'BHD', '.د.ب', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(15, 'Burundian franc', 'BIF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(16, 'Bermudian dollar', 'BMD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(17, 'Brunei dollar', 'BND', '$', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(18, 'Bolivian boliviano', 'BOB', 'Bs.', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(19, 'Brazilian real', 'BRL', 'R$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(20, 'Bhutanese ngultrum', 'BTN', 'Nu.', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(21, 'Botswana pula', 'BWP', 'P', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(22, 'Belarusian ruble', 'BYR', 'Br', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(23, 'Belize dollar', 'BZD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(24, 'Canadian dollar', 'CAD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(25, 'Swiss franc', 'CHF', 'Fr', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(26, 'Chilean peso', 'CLP', '$', '4', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(27, 'Chinese yuan', 'CNY', '¥ or 元', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(28, 'Colombian peso', 'COP', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(29, 'Costa Rican colÃ³n', 'CRC', '₡', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(30, 'Cuban convertible pe', 'CUC', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(31, 'Cape Verdean escudo', 'CVE', 'Esc or $', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(32, 'Czech koruna', 'CZK', 'Kč', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(33, 'Djiboutian franc', 'DJF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(34, 'Danish krone', 'DKK', 'kr', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(35, 'Dominican peso', 'DOP', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(36, 'Algerian dinar', 'DZD', 'د.ج', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(37, 'Egyptian pound', 'EGP', '£ or ج.م', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(38, 'Eritrean nakfa', 'ERN', 'Nfk', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(39, 'Ethiopian birr', 'ETB', 'Br', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(40, 'Euro', 'EUR', '€', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(41, 'Falkland Islands pou', 'FKP', 'Â£', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(42, 'British pound', 'GBP', '£', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(43, 'Georgian lari', 'GEL', 'ლ', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(44, 'Ghana cedi', 'GHS', '₵', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(45, 'Gibraltar pound', 'GIP', '£', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(46, 'Guinean franc', 'GNF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(47, 'Guatemalan quetzal', 'GTQ', 'Q', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(48, 'Guyanese dollar', 'GYD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(49, 'Honduran lempira', 'HNL', 'L', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(50, 'Haitian gourde', 'HTG', 'G', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(51, 'Hungarian forint', 'HUF', 'Ft', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(52, 'Indonesian rupiah', 'IDR', 'Rp', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(53, 'Israeli new shekel', 'ILS', '₪', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(54, 'Indian rupee', 'INR', '₹', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(55, 'Iraqi dinar', 'IQD', 'ع.د', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(56, 'Iranian rial', 'IRR', 'ï·¼', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(57, 'Icelandic krÃ³na', 'ISK', 'kr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(58, 'Jamaican dollar', 'JMD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(59, 'Jordanian dinar', 'JOD', 'د.ا', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(60, 'Japanese yen', 'JPY', '¥', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(61, 'Kenyan shilling', 'KES', 'Sh', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(62, 'Kyrgyzstani som', 'KGS', 'лв', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(63, 'Cambodian riel', 'KHR', '៛', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(64, 'Comorian franc', 'KMF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(65, 'Kuwaiti dinar', 'KWD', 'د.ك', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(66, 'Cayman Islands dolla', 'KYD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(67, 'Kazakhstani tenge', 'KZT', '', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(68, 'Lao kip', 'LAK', '₭', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(69, 'Lebanese pound', 'LBP', 'ل.ل', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(70, 'Sri Lankan rupee', 'LKR', 'Rs or රු', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(71, 'Liberian dollar', 'LRD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(72, 'Lesotho loti', 'LSL', 'L', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(73, 'Libyan dinar', 'LYD', 'Ù„.Ø¯', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(74, 'Moroccan dirham', 'MAD', 'د.م.', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(75, 'Moldovan leu', 'MDL', 'L', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(76, 'Malagasy ariary', 'MGA', 'Ar', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(77, 'Burmese kyat', 'MMK', 'Ks', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(78, 'Mongolian tÃ¶grÃ¶g', 'MNT', '₮', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(79, 'Mauritanian ouguiya', 'MRO', 'UM', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(80, 'Mauritian rupee', 'MUR', '₨', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(81, 'Maldivian rufiyaa', 'MVR', '.ރ', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(82, 'Malawian kwacha', 'MWK', 'MK', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(83, 'Mexican peso', 'MXN', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(84, 'Malaysian ringgit', 'MYR', 'RM', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(85, 'Mozambican metical', 'MZN', 'MT', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(86, 'Namibian dollar', 'NAD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(87, 'Nigerian naira', 'NGN', '₦', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(88, 'Nicaraguan cÃ³rdoba', 'NIO', 'C$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(89, 'Norwegian krone', 'NOK', 'kr', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(90, 'Nepalese rupee', 'NPR', '₨', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(91, 'New Zealand dollar', 'NZD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(92, 'Omani rial', 'OMR', 'ر.ع.', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(93, 'Panamanian balboa', 'PAB', 'B/.', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(94, 'Peruvian nuevo sol', 'PEN', 'S/.', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(95, 'Papua New Guinean ki', 'PGK', 'K', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(96, 'Philippine peso', 'PHP', '₱', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(97, 'Pakistani rupee', 'PKR', '₨', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(98, 'Polish zÅ‚oty', 'PLN', 'zł', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(99, 'Paraguayan guaranÃ­', 'PYG', '₲', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(100, 'Qatari riyal', 'QAR', 'ر.ق', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(101, 'Romanian leu', 'RON', 'lei', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(102, 'Serbian dinar', 'RSD', 'дин. or din.', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(103, 'Russian ruble', 'RUB', '', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(104, 'Rwandan franc', 'RWF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(105, 'Saudi riyal', 'SAR', 'ر.س', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(106, 'Solomon Islands doll', 'SBD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(107, 'Seychellois rupee', 'SCR', '₨', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(108, 'Sudanese pound', 'SDG', 'ج.س.', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(109, 'Swedish krona', 'SEK', 'kr', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(110, 'Saint Helena pound', 'SHP', 'Â£', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(111, 'Sierra Leonean leone', 'SLL', 'Le', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(112, 'Somali shilling', 'SOS', 'Sh', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(113, 'Surinamese dollar', 'SRD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(114, 'South Sudanese pound', 'SSP', 'Â£', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(115, 'SÃ£o TomÃ© and PrÃ­n', 'STD', 'Db', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(116, 'Syrian pound', 'SYP', 'Â£ or Ù„.Ø³', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(117, 'Swazi lilangeni', 'SZL', 'L', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(118, 'Thai baht', 'THB', '฿', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(119, 'Tajikistani somoni', 'TJS', 'ЅМ', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(120, 'Turkmenistan manat', 'TMT', 'm', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(121, 'Tunisian dinar', 'TND', 'د.ت', '3', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(122, 'Tongan paÊ»anga', 'TOP', 'T$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(123, 'Turkish lira', 'TRY', '', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(124, 'Trinidad and Tobago ', 'TTD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(125, 'New Taiwan dollar', 'TWD', '$', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(126, 'Tanzanian shilling', 'TZS', 'Sh', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(127, 'Ukrainian hryvnia', 'UAH', '₴', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(128, 'Ugandan shilling', 'UGX', 'Sh', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(129, 'United States dollar', 'USD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(130, 'Uruguayan peso', 'UYU', '$', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(131, 'Uzbekistani som', 'UZS', '', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(132, 'Venezuelan bolÃ­var', 'VEF', 'Bs F', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(133, 'Vietnamese Ä‘á»“ng', 'VND', '₫', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(134, 'Vanuatu vatu', 'VUV', 'Vt', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(135, 'Samoan tÄlÄ', 'WST', 'T', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(136, 'Central African CFA ', 'XAF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(137, 'East Caribbean dolla', 'XCD', '$', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(138, 'West African CFA fra', 'XOF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(139, 'CFP franc', 'XPF', 'Fr', '0', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(140, 'Yemeni rial', 'YER', '﷼', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(141, 'South African rand', 'ZAR', 'R', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18'),
(142, 'Zambian kwacha', 'ZMW', 'ZK', '2', '2026-04-13 12:49:18', '2026-04-13 12:49:18');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `f_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `type` enum('individual','company') NOT NULL DEFAULT 'individual',
  `mobile` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `opening_balance` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `credit_limit` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `total_sales_due` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `total_sales_return_due` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `pay_term` varchar(255) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `building_number` varchar(255) DEFAULT NULL,
  `additional_number` varchar(255) DEFAULT NULL,
  `ledger_id` bigint(20) UNSIGNED DEFAULT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `branch_id` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE IF NOT EXISTS`general_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `branch_id` tinyint(4) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `logo_width` int(11) DEFAULT NULL,
  `logo_height` int(11) DEFAULT NULL,
  `credit_amount` int(11) DEFAULT NULL,
  `credit_days` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `financial_year_start_month` int(11) DEFAULT NULL,
  `currency_symbol_placement` varchar(255) DEFAULT NULL,
  `currency_precision` int(11) DEFAULT NULL,
  `currency_symbol` varchar(255) DEFAULT NULL,
  `currency_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`id`, `title`, `branch_id`, `timezone`, `logo_width`, `logo_height`, `credit_amount`, `credit_days`, `start_date`, `financial_year_start_month`, `currency_symbol_placement`, `currency_precision`, `currency_symbol`, `currency_id`, `created_at`, `updated_at`) VALUES
(1, 'Codex', NULL, 'Pacific/Honolulu', 43, 543, 54, 54, NULL, 1, 'before', 2, '$', 17, NULL, '2026-04-15 09:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `group_masters`
--

CREATE TABLE IF NOT EXISTS `group_masters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `branch_id` tinyint(4) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(15, '0001_01_01_000000_create_users_table', 1),
(16, '0001_01_01_000001_create_cache_table', 1),
(17, '0001_01_01_000002_create_jobs_table', 1),
(18, '2026_02_10_231032_create_business_settings_table', 1),
(19, '2026_03_05_142647_create_general_settings_table', 1),
(20, '2026_03_09_211250_create_roles_table', 1),
(21, '2026_03_15_035910_create_group_masters_table', 1),
(22, '2026_04_13_122945_create_customers_table', 1),
(23, '2026_04_13_122952_create_suppliers_table', 1),
(24, '2026_04_25_221555_create_currencies_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `modules` longtext DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `is_team_leader` tinyint(4) DEFAULT NULL,
  `retail_pos` tinyint(4) DEFAULT NULL,
  `branch_id` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `modules`, `status`, `is_team_leader`, `retail_pos`, `branch_id`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Admin Role', '{\"store_master\":{\"p\":\"5\"},\"currency\":{\"p\":\"5\"},\"salesman\":{\"p\":\"5\"},\"users\":{\"p\":\"5\"},\"roles\":{\"p\":\"5\"}}', 'active', NULL, 1, NULL, '2026-04-13 07:55:01', '2026-04-13 07:55:01');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('xecnUKWPgnHvmvqOCPthVObDdW8E0Hcwv3MAwxsY', 2, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiZ1ZMSEVmY2E2cTRYTmVuakRrMW1NQlZiQ05zZWExN3hKeENoWmZSdCI7czo4OiJsYW5ndWFnZSI7YToyOntpOjA7YTo2OntzOjI6ImlkIjtzOjE6IjEiO3M6NDoibmFtZSI7czo3OiJlbmdsaXNoIjtzOjk6ImRpcmVjdGlvbiI7czozOiJsdHIiO3M6NDoiY29kZSI7czoyOiJlbiI7czo2OiJzdGF0dXMiO2k6MTtzOjc6ImRlZmF1bHQiO2I6MTt9aToxO2E6Njp7czoyOiJpZCI7aToyO3M6NDoibmFtZSI7czo2OiJBcmFiaWMiO3M6OToiZGlyZWN0aW9uIjtzOjM6InJ0bCI7czo0OiJjb2RlIjtzOjI6ImFkIjtzOjY6InN0YXR1cyI7aToxO3M6NzoiZGVmYXVsdCI7YjowO319czo2OiJsb2NhbGUiO3M6MjoiZW4iO3M6OToiZGlyZWN0aW9uIjtzOjM6Imx0ciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9waGFybWFjeS9wdWJsaWMvZGFzaGJvYXJkIjtzOjU6InJvdXRlIjtzOjk6ImRhc2hib2FyZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==', 1777156807);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE IF NOT EXISTS `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `f_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `type` enum('individual','company') NOT NULL DEFAULT 'individual',
  `mobile` varchar(255) DEFAULT NULL,
  `tax_no` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `opening_balance` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `advance_balance` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `total_purchase_due` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `total_purchase_return_due` decimal(15,5) NOT NULL DEFAULT 0.00000,
  `pay_term` varchar(255) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `building_number` varchar(255) DEFAULT NULL,
  `additional_number` varchar(255) DEFAULT NULL,
  `ledger_id` bigint(20) UNSIGNED DEFAULT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `branch_id` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `store_id` tinyint(4) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `last_checked_in` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `username` varchar(255) DEFAULT NULL,
  `modules` longtext DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 0,
  `branch_id` tinyint(4) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `store_id`, `mobile`, `user_type`, `last_checked_in`, `status`, `username`, `modules`, `email_verified_at`, `password`, `pwd`, `role_id`, `branch_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'admin', 'admin@example.com', NULL, NULL, NULL, NULL, 'active', 'admin', '{\"store_master\":{\"p\":\"5\"},\"currency\":{\"p\":\"5\"},\"salesman\":{\"p\":\"5\"},\"users\":{\"p\":\"5\"},\"roles\":{\"p\":\"5\"}}', NULL, '$2y$12$i/.2pXI.vEsUFdtXWp6xIOLa6KiN/xqefCyCpOTrzVEPOb5VPKCjO', '12345', 1, NULL, NULL, '2026-04-13 07:44:00', '2026-04-13 07:55:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business_settings`
--
ALTER TABLE `business_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `business_settings_type_unique` (`type`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_masters`
--
ALTER TABLE `group_masters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `group_masters_code_unique` (`code`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `suppliers_email_unique` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business_settings`
--
ALTER TABLE `business_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `group_masters`
--
ALTER TABLE `group_masters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
