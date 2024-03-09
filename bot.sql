-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 10 mars 2024 à 00:31
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bot`
--

-- --------------------------------------------------------

--
-- Structure de la table `crash`
--

CREATE TABLE `crash` (
  `id` int(11) NOT NULL,
  `guild` varchar(255) DEFAULT '0',
  `num` varchar(255) DEFAULT '0',
  `crash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `crash`
--

INSERT INTO `crash` (`id`, `guild`, `num`, `crash`) VALUES
(1, '1212179591309959249', '28', '');

-- --------------------------------------------------------

--
-- Structure de la table `server`
--

CREATE TABLE `server` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `guild` varchar(255) DEFAULT NULL,
  `bienvenueId` varchar(255) DEFAULT NULL,
  `suggestionId` varchar(255) DEFAULT NULL,
  `logsId` varchar(255) DEFAULT NULL,
  `vip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `server`
--

INSERT INTO `server` (`id`, `name`, `guild`, `bienvenueId`, `suggestionId`, `logsId`, `vip`) VALUES
(17, 'Linky-Rp', '1', NULL, NULL, NULL, 'false'),
(19, 'Zeldoma | Vanilla', '1123999017739767820', NULL, NULL, NULL, 'false'),
(20, 'Zeldoma V2', '908460138954891326', NULL, NULL, NULL, 'false'),
(23, 'Serveur de ! ᴢᴇʀᴋø', '1209589747085873212', '1211044799927554082', '1211044812979966073', '1211044889714757672', 'false'),
(24, 'medelin', '1211819926017413203', NULL, NULL, NULL, 'false'),
(25, 'lyon rp', '1193980493201412167', '1193980493805391991', NULL, NULL, 'false'),
(29, 'Entre pote', '1171107739355844668', NULL, NULL, '1171110918055268452', 'false'),
(30, 'Gendarmerie nationale', '1210656221107986442', NULL, NULL, NULL, 'false'),
(31, 'Game_op', '1175810784715083857', NULL, NULL, NULL, 'false'),
(32, 'New Paris RP 75 [ER:LC]', '1136292035914125443', NULL, NULL, NULL, 'false'),
(33, 'Exotic', '1198070518167908403', '1198070518818029759', NULL, NULL, 'false'),
(34, 'ETH Life『????????』', '1063047169453596682', '1191407171561340979', NULL, '1212179008893227049', 'false'),
(35, 'ZerkiTo', '1212179591309959249', '1212179804498165851', NULL, '1212179776673161246', 'false'),
(36, 'KenzayCorporation Of Grinder’ s', '728392087866966036', NULL, NULL, NULL, 'false'),
(37, 'gta', '1211770223653421076', NULL, NULL, NULL, 'false'),
(38, 'casino eth life', '1191164493619798126', NULL, NULL, NULL, 'false'),
(39, 'Ark Ascended', '1214737617229189151', '1214751938214887455', '1214754949406269450', '1214782782803288124', 'false');

-- --------------------------------------------------------

--
-- Structure de la table `user_xp`
--

CREATE TABLE `user_xp` (
  `id` int(11) NOT NULL,
  `guild` varchar(255) DEFAULT '0',
  `user` varchar(255) DEFAULT '0',
  `xp` varchar(255) DEFAULT '0',
  `level` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_xp`
--

INSERT INTO `user_xp` (`id`, `guild`, `user`, `xp`, `level`) VALUES
(1, '1209589747085873212', '195954240559120386', '100', '0'),
(2, '1209589747085873212', '875098081622888488', '66', '0'),
(3, '1209589747085873212', '527828271237300254', '14', '0'),
(4, '1063047169453596682', '195954240559120386', '157', '0'),
(5, '1063047169453596682', '1172970518471770317', '37', '0'),
(6, '1063047169453596682', '1192803407652728906', '0', '0'),
(7, '1212179591309959249', '195954240559120386', '0', '0'),
(8, '1214737617229189151', '875098081622888488', '146', '0'),
(9, '1063047169453596682', '1052032291502817411', '0', '0'),
(10, '1063047169453596682', '987321183064178720', '0', '0'),
(11, '1214737617229189151', '527828271237300254', '139', '0'),
(12, '1214737617229189151', '195954240559120386', '113', '0'),
(13, '1136292035914125443', '985084723778977792', '0', '0'),
(14, '1191164493619798126', '987321183064178720', '0', '0'),
(15, '1063047169453596682', '1189185683760369724', '0', '0');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `crash`
--
ALTER TABLE `crash`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `server`
--
ALTER TABLE `server`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_xp`
--
ALTER TABLE `user_xp`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `crash`
--
ALTER TABLE `crash`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `server`
--
ALTER TABLE `server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `user_xp`
--
ALTER TABLE `user_xp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
