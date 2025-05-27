-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2025 a las 07:33:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_empleados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `idCargo` int(11) NOT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `descripcionCargo` text DEFAULT NULL,
  `jefatura` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`idCargo`, `cargo`, `descripcionCargo`, `jefatura`) VALUES
(1, 'Gerente', 'Responsable de la gestión general', 1),
(2, 'Renovador', 'Estar atento', 0),
(3, 'Asistente', 'Apoya tareas administrativas', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrataciones`
--

CREATE TABLE `contrataciones` (
  `idContratacion` int(11) NOT NULL,
  `idDepartamento` int(11) DEFAULT NULL,
  `idEmpleado` int(11) DEFAULT NULL,
  `idCargo` int(11) DEFAULT NULL,
  `idTipoContratacion` int(11) DEFAULT NULL,
  `fechaContratacion` date DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrataciones`
--

INSERT INTO `contrataciones` (`idContratacion`, `idDepartamento`, `idEmpleado`, `idCargo`, `idTipoContratacion`, `fechaContratacion`, `salario`, `estado`) VALUES
(1, 1, 1, 1, 3, '2020-01-13', 1500.00, 0),
(2, 3, 3, 3, 2, '2024-02-10', 1200.00, 1),
(3, 2, 2, 2, 1, '2025-05-02', 200.00, 1),
(4, 1, 1, 1, 1, '2025-04-28', 20000.00, 1),
(7, 1, 1, 1, 1, '2025-05-02', 100.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `idDepartamento` int(11) NOT NULL,
  `nombreDepartamento` varchar(50) DEFAULT NULL,
  `descripcionDepartamento` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`idDepartamento`, `nombreDepartamento`, `descripcionDepartamento`) VALUES
(1, 'Recursos Humanos', 'Gestiona el talento humano'),
(2, 'Ventas ', 'Cotizaciones de provedores'),
(3, 'Tecnología', 'Soporte y desarrollo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `idEmpleado` int(11) NOT NULL,
  `numeroDui` varchar(9) DEFAULT NULL,
  `nombrePersona` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `numeroTelefono` varchar(9) DEFAULT NULL,
  `correoInstitucional` varchar(50) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`idEmpleado`, `numeroDui`, `nombrePersona`, `usuario`, `numeroTelefono`, `correoInstitucional`, `fechaNacimiento`, `password`, `rol`) VALUES
(1, '012345678', 'Juan Pérez', 'juanp', '987654321', 'juanp@empresa.com', '1990-01-01', '$2a$10$ivgx2yPspfDro9Quvnv9pubPeLT.YEpX6lPUv7qjxfUHTMpv.zmW.', 'ADMIN'),
(2, '12345678', 'Mauricio', 'mau', '76543210', 'mau@empresa.com', '1980-01-01', '$2a$10$rBjyM1qkr3BQI0tNZqRIOOI9Tl0lrlIMncfnqHbwN6gg383irYnB2', 'USER'),
(3, '87654321', 'Ana Gómez', 'anaG', '65432109', 'anaG@empresa.com', '1992-05-15', '$2a$10$EjemploDeHashDeContrasenaAna', 'USER');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocontratacion`
--

CREATE TABLE `tipocontratacion` (
  `idTipoContratacion` int(11) NOT NULL,
  `tipoContratacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipocontratacion`
--

INSERT INTO `tipocontratacion` (`idTipoContratacion`, `tipoContratacion`) VALUES
(1, 'Pasantia'),
(2, 'Temporal'),
(3, 'Indefinido');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`idCargo`);

--
-- Indices de la tabla `contrataciones`
--
ALTER TABLE `contrataciones`
  ADD PRIMARY KEY (`idContratacion`),
  ADD KEY `idDepartamento` (`idDepartamento`),
  ADD KEY `idEmpleado` (`idEmpleado`),
  ADD KEY `idCargo` (`idCargo`),
  ADD KEY `idTipoContratacion` (`idTipoContratacion`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`idDepartamento`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- Indices de la tabla `tipocontratacion`
--
ALTER TABLE `tipocontratacion`
  ADD PRIMARY KEY (`idTipoContratacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `idCargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `contrataciones`
--
ALTER TABLE `contrataciones`
  MODIFY `idContratacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `idDepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipocontratacion`
--
ALTER TABLE `tipocontratacion`
  MODIFY `idTipoContratacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contrataciones`
--
ALTER TABLE `contrataciones`
  ADD CONSTRAINT `contrataciones_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`),
  ADD CONSTRAINT `contrataciones_ibfk_2` FOREIGN KEY (`idEmpleado`) REFERENCES `empleados` (`idEmpleado`),
  ADD CONSTRAINT `contrataciones_ibfk_3` FOREIGN KEY (`idCargo`) REFERENCES `cargos` (`idCargo`),
  ADD CONSTRAINT `contrataciones_ibfk_4` FOREIGN KEY (`idTipoContratacion`) REFERENCES `tipocontratacion` (`idTipoContratacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
