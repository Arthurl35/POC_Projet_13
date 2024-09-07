# Projet Your Car Your Way
Cette application permet la gestion de la location de voitures.

## Description
L'architecture repose sur une application web Angular (client) et un backend Spring Boot. La communication en temps réel est assurée par un WebSocket.

## Installation

Git clone:

> git clone https://github.com/Arthurl35/POC_Projet_13.git

Base de données:

Le script SQL de création de la base de données et des tables se trouve dans le répertoire scripts de l'application.
Importer le fichier scripts/db.sql dans votre base de données

## Front

L'application front est développé en Angular.

Allez dans le répertoire front:

> cd /front

Installer les dépendances:

> npm install

Lancer le Front-end:

> npm run start;

## Back

L'application back est développé en Java Spring.

Allez dans le répertoire back:

> cd /back

Lancer Back-end:

> mvn spring-boot:run;
