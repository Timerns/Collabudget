# Collabudget


  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#Etat-du-projet">Etat du projet</a>
    </li>
    <li><a href="#Structure-des-dossiers-principals-du-projet">Structure des dossiers</a></li>
    <li>
      <a href="#getting-started">Démarer rapidement</a>
      <ul>
      <li><a href="#Cloner-le-projet">Cloner le projet</a></li>
        <li><a href="#Creation-de-la-base-de-donnée">Creation de la base de donnée</a></li>
        <li><a href="#Ajouté-les-fichiers-.env">Ajouté les fichiers .env</a></li>
        <li><a href="#Démarer-les-projets">Démarer les projets</a></li>
      </ul>
    </li>
  </ol>


## Etat du projet
Workflows
<p align="center">

  [![Backend unit testing](https://github.com/Timerns/Collabudget/actions/workflows/ut_backend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/ut_backend.yml)

  [![Frontend unit testing](https://github.com/Timerns/Collabudget/actions/workflows/ut_frontend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/ut_frontend.yml)

  [![Build and Deploy backend to GKE](https://github.com/Timerns/Collabudget/actions/workflows/google_backend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/google_backend.yml)

  [![Build and Deploy frontend to GKE](https://github.com/Timerns/Collabudget/actions/workflows/google_frontend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/google_frontend.yml)

Issues
<p align="center">

![GitHub issues](https://img.shields.io/github/issues/timerns/Collabudget?label=GitHub%20total%20issues)


![GitHub issues by-label](https://img.shields.io/github/issues/timerns/Collabudget/frontend)

![GitHub issues by-label](https://img.shields.io/github/issues/timerns/Collabudget/backend)
</p>

## Structure des dossiers principals du projet
```
📦Collabudget
 ┣ 📂.github
 ┃ ┗ 📂workflows          # workflows git hub
 ┣ 📂backend             # Node backend code
 ┃ ┣ 📂app                # application backend
 ┃ ┣ 📂tests              # dossier des test
 ┣ 📂deployment
 ┃ ┣ 📂backend
 ┃ ┗ 📂frontend
 ┗ 📂frontend            # Next.js app code
   ┣ 📂public
   ┣ 📂src
   ┃ ┗ 📂app             
   ┃   ┣ 📂(auth)         # route pour l'authentifiactioon
   ┃   ┣ 📂(landingpage)  # route pour la landing page
   ┃   ┣ 📂app            # route pour l'application
   ┃   ┣ 📂components     # composent react pour la réutilisation
   ┃   ┣ 📂types          # les types des object
   ┃   ┗ 📂utils          # fonction utilitaire
   ┗ 📂tests
```

## Comment démarer le projet en moin de 15min en local

### Cloner le projet

```
git clone https://github.com/Timerns/Collabudget.git
```


### Creation de la base de donnée

Créer une base de donnée [postgresql](https://www.postgresql.org/download/) avec le nom que vous voulez. 

### Ajouté les fichiers .env

Le fichier .env sert à définir une variable d'envrionement du projet fontend et backend. Il faut ajouté le fichier avec les variable d'enviroment dans les deux dossiers le frontend et backend.

Exemple de fichie .env pour une configuration local:
```{bash}
DB_CS="postgres://<nom d'utilisateur>:<mot de pass>@localhost:5432/<nom de la db crée>"
EXPRESS_SECRET="secret aléatoire pour les cookies"
BACKEND="http://localhost:8000"
FRONTEND="http://localhost:3000"
```

### Démarer les projets 

Pour démarer le projet backend et frontend, il y a des prérequie. Il faut avoir installé  [node](https://nodejs.org/en/download) avec npm.  

Pour démarer le projet backend, il faut ouvrir un terminal dans le dossier backend puis executer les commandes si dessous: 

```
npm install
```
```
npm run dev-local
```

De même pour le frontend, ouvrir un terminal dans le dossier frontend puis executer les commandes si dessous:

```
npm install
```
```
npm run dev-local
```