--
-- Database: `filteProds`
--

DROP DATABASE IF EXISTS filterProds;
CREATE DATABASE IF NOT EXISTS filterProds;
USE filterProds;

SELECT 'CREATING DATABASE STRUCTURE' as 'INFO';


-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `categoryName` varchar(50) NOT NULL
) AUTO_INCREMENT=1000;

-- --------------------------------------------------------

--
-- Table structure for table `Brand`
--

CREATE TABLE `brand` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `brandName` varchar(50) NOT NULL,
  `brandImage` varchar(500) NOT NULL
) AUTO_INCREMENT=2000;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(500),
  `price` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `brand` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `sale` int(11) NOT NULL,
  FOREIGN KEY (`brand`) REFERENCES `brand` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE
) AUTO_INCREMENT=3000;

-- --------------------------------------------------------


--
-- Loading Data for all entities
--
SELECT 'LOADING brands' as 'INFO';
source loadbrands.dump ;
SELECT 'LOADING categories' as 'INFO';
source loadcategories.dump ;
SELECT 'LOADING products' as 'INFO';
source loadprods.dump ;

-- COMMIT;


