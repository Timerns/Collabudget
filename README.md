# Collabudget


  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#Etat-du-projet">Etat du projet</a>
    </li>
    <li><a href="#Structure-des-dossiers-principals-du-projet">Structure des dossiers</a></li>
    <li>
      <a href="#getting-started">Démarrer rapidement</a>
      <ul>
      <li><a href="#Cloner-le-projet">Cloner le projet</a></li>
        <li><a href="#Creation-de-la-base-de-donnée">Creation de la base de donnée</a></li>
        <li><a href="#Ajouté-les-fichiers-.env">Ajouté les fichiers .env</a></li>
        <li><a href="#Démarer-les-projets">Démarer les projets</a></li>
      </ul>
    </li>
    <li>
      <a href="#Contribution-au-projet ">Contribution au projet </a>
    </li>
    <li>
      <a href="#Technologie-utilisé">Technologie uilisé</a>
    </li>
    
  </ol>


## Etat du projet
Workflows

  [![Backend unit testing](https://github.com/Timerns/Collabudget/actions/workflows/ut_backend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/ut_backend.yml)
  [![Frontend unit testing](https://github.com/Timerns/Collabudget/actions/workflows/ut_frontend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/ut_frontend.yml)
  [![Build and Deploy backend to GKE](https://github.com/Timerns/Collabudget/actions/workflows/google_backend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/google_backend.yml)
  [![Build and Deploy frontend to GKE](https://github.com/Timerns/Collabudget/actions/workflows/google_frontend.yml/badge.svg)](https://github.com/Timerns/Collabudget/actions/workflows/google_frontend.yml)

Issues

![GitHub issues](https://img.shields.io/github/issues/timerns/Collabudget?label=GitHub%20total%20issues)
![GitHub issues by-label](https://img.shields.io/github/issues/timerns/Collabudget/frontend)
![GitHub issues by-label](https://img.shields.io/github/issues/timerns/Collabudget/backend)

## Structure des dossiers principals du projet
```
📦Collabudget
 ┣ 📂.github
 ┃ ┗ 📂workflows          # workflows git hub
 ┣ 📂backend              # Node backend code
 ┃ ┣ 📂app                # application backend
 ┃ ┣ 📂tests              # dossier des tests
 ┣ 📂deployment
 ┃ ┣ 📂backend
 ┃ ┗ 📂frontend
 ┗ 📂frontend             # Next.js app code
   ┣ 📂public
   ┣ 📂src
   ┃ ┗ 📂app             
   ┃   ┣ 📂(auth)         # route pour l'authentification
   ┃   ┣ 📂(landingpage)  # route pour la landing page
   ┃   ┣ 📂app            # route pour l'application
   ┃   ┣ 📂components     # composant react pour la réutilisation
   ┃   ┣ 📂types          # les types des objets
   ┃   ┗ 📂utils          # fonction utilitaire
   ┗ 📂tests
```

## Comment démarrer le projet en moins de 15 minutes en local

### Cloner le projet

```
git clone https://github.com/Timerns/Collabudget.git
```


### Creation de la base de donnée

Créer une base de donnée [postgresql](https://www.postgresql.org/download/) avec le nom que vous voulez. 

### Ajouté les fichiers .env

Le fichier .env sert à définir une variable d'environnement du projet fontend et backend. Il faut ajouter le fichier avec les variables d'environnement dans les deux dossiers le frontend et backend.

Exemple de fichier .env pour une configuration local:
```{bash}
DB_CS="postgres://<nom d'utilisateur>:<mot de pass>@localhost:5432/<nom de la db crée>"
EXPRESS_SECRET="secret aléatoire pour les cookies"
BACKEND="http://localhost:8000"
FRONTEND="http://localhost:3000"
```

⚠️ Si une des valeurs ci-dessus contient des caractères spéciaux (par exemple '\$') il faut les remplacer par leur versions hexadécimales (pour '\$' il faudra écrire '%24') ⚠️

### Démarrer les projets 

Pour démarrer le projet backend et frontend, il y a des prérequis. Il faut avoir installé  [node](https://nodejs.org/en/download) avec npm.  

Pour démarrer le projet backend, il faut ouvrir un terminal dans le dossier backend puis exécuter les commandes ci-dessous: 

```
npm install
```
```
npm run dev-local
```

De même pour le frontend, ouvrir un terminal dans le dossier frontend puis exécuter les commandes ci-dessous:

```
npm install
```
```
npm run dev-local
```

## Contribution au projet 

Pour contribuer au projet, deux étapes à effectuer. La première créer une branche pour sa feature, faire ses modifications. Puis faire une pull request. Lors de la pull request les tests unitaires seront executés automatiquement et lors du merge de la pull request dans la branche main le déploiement sera fait automatiquement sur Google cloud. 



## Technologie uilisé
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)