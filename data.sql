-- MySQL dump 10.13  Distrib 8.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: trabajo_final
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Categoria uno actualizada','Descripción de la categoría 1'),(2,'Categoria 2','Descripción de la categoría 2');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `dni` varchar(50) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion_calle` varchar(100) DEFAULT NULL,
  `direccion_numero` varchar(20) DEFAULT NULL,
  `direccion_comuna` varchar(50) DEFAULT NULL,
  `direccion_ciudad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES ('1019105070','Cliente 2','Calle Cliente 2','123','Comuna 21','Ciudad 21'),('9876543210','Cliente 1','Calle Cliente 1','123','Comuna 1','Ciudad 1');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_eventos`
--

DROP TABLE IF EXISTS `log_eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_eventos` (
  `id_evento` int NOT NULL AUTO_INCREMENT,
  `evento` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_evento`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_eventos`
--

LOCK TABLES `log_eventos` WRITE;
/*!40000 ALTER TABLE `log_eventos` DISABLE KEYS */;
INSERT INTO `log_eventos` VALUES (1,'INSERT','Se creó el producto: producto con trigger','2023-12-12 14:39:14');
/*!40000 ALTER TABLE `log_eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `precio_actual` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `id_proveedor` varchar(50) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_proveedor` (`id_proveedor`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`dni_provedor`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Produto actualizado',100.00,100,'1234567890',1),(2,'Producto 2',100.00,100,'1234567890',1),(3,'Produto creado',100.00,100,'1234567890',1),(4,'Produto creado',100.00,100,'1234567890',1),(7,'producto con trigger',100.00,100,'191919',1),(8,'producto con trigger',100.00,100,'191919',1),(9,'producto con trigger',100.00,100,'191919',1),(12,'producto con trigger',100.00,100,'191919',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_producto` AFTER INSERT ON `productos` FOR EACH ROW BEGIN
    DECLARE mensaje VARCHAR(100);
    SELECT CONCAT('Se creó el producto: ', nombre) INTO mensaje FROM productos WHERE id_producto = NEW.id_producto;
    INSERT INTO log_eventos (evento, descripcion, fecha) VALUES ('INSERT', mensaje, NOW());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `productos_venta`
--

DROP TABLE IF EXISTS `productos_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_venta` (
  `id_venta` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  `cantidad_vendida` int DEFAULT NULL,
  `monto_total_producto` decimal(10,2) DEFAULT NULL,
  `id_producto_venta` int DEFAULT NULL,
  KEY `id_venta` (`id_venta`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `productos_venta_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`num_factura`),
  CONSTRAINT `productos_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_venta`
--

LOCK TABLES `productos_venta` WRITE;
/*!40000 ALTER TABLE `productos_venta` DISABLE KEYS */;
INSERT INTO `productos_venta` VALUES (1,1,10.99,5,1235.00,1),(2,1,25.55,10,225.00,2);
/*!40000 ALTER TABLE `productos_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `dni_provedor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `pagina_web` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`dni_provedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES ('1234567890','Proveedor 1','Dirección 1','123456789','www.proveedor1.com'),('191919','Proveedor 19','Dirección 19','123456789','www.proveedor2.com');
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonos_clientes`
--

DROP TABLE IF EXISTS `telefonos_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonos_clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dni_cliente` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dni_cliente` (`dni_cliente`),
  CONSTRAINT `telefonos_clientes_ibfk_1` FOREIGN KEY (`dni_cliente`) REFERENCES `clientes` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonos_clientes`
--

LOCK TABLES `telefonos_clientes` WRITE;
/*!40000 ALTER TABLE `telefonos_clientes` DISABLE KEYS */;
INSERT INTO `telefonos_clientes` VALUES (2,'9876543210','8888888');
/*!40000 ALTER TABLE `telefonos_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `num_factura` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `dni_cliente` varchar(50) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `monto_final` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`num_factura`),
  KEY `dni_cliente` (`dni_cliente`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`dni_cliente`) REFERENCES `clientes` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'2023-12-04','9876543210',0.50,50.00),(2,'2023-12-06','1019105070',1.50,1.00);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'trabajo_final'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-12  9:40:09
