-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: emp_taskmgm
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `Dept_id` int unsigned NOT NULL,
  `Dept_name` varchar(20) NOT NULL,
  `Manager_id` int DEFAULT NULL,
  PRIMARY KEY (`Dept_id`),
  KEY `Manager_id` (`Manager_id`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`Manager_id`) REFERENCES `managers` (`Manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `Employee_id` int unsigned NOT NULL AUTO_INCREMENT,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Mobno` char(14) NOT NULL,
  `Hire_date` date NOT NULL,
  `Job_id` char(20) DEFAULT NULL,
  `Salary` double DEFAULT NULL,
  `Aadhaar_no` char(14) NOT NULL,
  `PAN_no` char(10) NOT NULL,
  `Dept_id` int unsigned DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Pass_word` varchar(50) GENERATED ALWAYS AS (concat(`Fname`,`Dept_id`)) VIRTUAL,
  `Manager_id` int DEFAULT NULL,
  PRIMARY KEY (`Employee_id`),
  UNIQUE KEY `Aadhaar_no_UNIQUE` (`Aadhaar_no`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `Mobno_UNIQUE` (`Mobno`),
  UNIQUE KEY `PAN_no_UNIQUE` (`PAN_no`),
  UNIQUE KEY `Pass_word_UNIQUE` (`Pass_word`),
  KEY `Job_id_idx` (`Job_id`),
  KEY `Manager_id_idx` (`Manager_id`),
  KEY `Dept_id` (`Dept_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`Job_id`) REFERENCES `jobs` (`Job_id`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`Manager_id`) REFERENCES `managers` (`Manager_id`),
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`Dept_id`) REFERENCES `departments` (`Dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `Job_id` char(20) NOT NULL,
  PRIMARY KEY (`Job_id`),
  UNIQUE KEY `Job_id_UNIQUE` (`Job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `Manager_id` int NOT NULL,
  `Dept_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`Manager_id`),
  KEY `Dept_id` (`Dept_id`),
  CONSTRAINT `managers_ibfk_2` FOREIGN KEY (`Dept_id`) REFERENCES `departments` (`Dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `Project_id` int unsigned NOT NULL AUTO_INCREMENT,
  `Project_name` varchar(45) NOT NULL,
  `Dept_id` int unsigned DEFAULT NULL,
  `Projectstatus_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`Project_id`),
  UNIQUE KEY `Project_id_UNIQUE` (`Project_id`),
  KEY `Dept_id` (`Dept_id`),
  KEY `Projectstatus_id` (`Projectstatus_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`Dept_id`) REFERENCES `departments` (`Dept_id`),
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`Dept_id`) REFERENCES `departments` (`Dept_id`),
  CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`Projectstatus_id`) REFERENCES `projectstatus` (`Projectstatus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectstatus`
--

DROP TABLE IF EXISTS `projectstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectstatus` (
  `Projectstatus_id` int unsigned NOT NULL AUTO_INCREMENT,
  `Project_status` char(20) NOT NULL,
  PRIMARY KEY (`Projectstatus_id`),
  UNIQUE KEY `Projectstatuse_id_UNIQUE` (`Projectstatus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectstatus`
--

LOCK TABLES `projectstatus` WRITE;
/*!40000 ALTER TABLE `projectstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `Task_id` int unsigned NOT NULL,
  `Task_name` varchar(20) NOT NULL,
  `Task_description` varchar(6000) NOT NULL,
  `Status_id` int DEFAULT NULL,
  `Employee_remark` varchar(45) DEFAULT NULL,
  `Manager_remark` varchar(45) DEFAULT NULL,
  `Employee_id` int unsigned DEFAULT NULL,
  `Task_create_date` date NOT NULL,
  `Task_assign_date` date NOT NULL,
  `Task_deadline_date` date NOT NULL,
  `Task_completion_date` date DEFAULT NULL,
  PRIMARY KEY (`Task_id`),
  UNIQUE KEY `Task_id_UNIQUE` (`Task_id`),
  KEY `Employee_id` (`Employee_id`),
  KEY `Status_id` (`Status_id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`Employee_id`) REFERENCES `employees` (`Employee_id`),
  CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`Employee_id`) REFERENCES `employees` (`Employee_id`),
  CONSTRAINT `tasks_ibfk_4` FOREIGN KEY (`Status_id`) REFERENCES `taskstatuses` (`Status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskstatuses`
--

DROP TABLE IF EXISTS `taskstatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskstatuses` (
  `Status_id` int NOT NULL,
  `Status_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskstatuses`
--

LOCK TABLES `taskstatuses` WRITE;
/*!40000 ALTER TABLE `taskstatuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `taskstatuses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-17 23:36:09
