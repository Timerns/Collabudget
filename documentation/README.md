# Collabudget

## Requirements fonctionnels
* Création d'un compte
* Page de login
* Page de paramètres
    - Déconnexion
    - Choix de la devise par défaut
    - Modification du mot de passe
* Ajouter/Modifier/Supprimer une dépense
    - Titre
    - Montant
    - Devise
    - Label
    - Date
* Ajouter/Modifier/Supprimer un label
    - Titre
    - Couleur
    - Color picker
* Ajouter/Modifier/Supprimer la limite Globale
    - Calcul minimum correct en fonction de la valeur défini pour les limites de chaque labels
* Ajouter/Modifier/Supprimer une limite sur un Label
    - Sélection d'un label
    - Sélection d'une valeur limite à appliquer pour ce label
* Affichage des dépenses par Catégories
    - Affichage des dépenses d'un label
    - Affichage des dépenses au sein des différents groupes
* Affichage du montant total exact dépensé sur le mois
* Affichage du montant disponible en fonction de la limite
    - Label
    - Globale
* Ajouter/Modifier/Supprimer un groupe
    - Nom du groupe
    - Image du groupe
    - Description
* Ajouter/Modifier/Supprimer une dépense de groupe
    - Titre
    - Montant
    - Devise
    - Label
    - Date
    - Sélectionner les participants à la dépense dans le groupe
    - Indication du montant payé par chaque personne
    - Sélectionner la personne ayant effectué la transaction
* Présence d'un bouton permettant de quitter un groupe
* Lien pour inviter les gens dans le groupe
* Afficher pour chaque participant les montants totaux à recevoir/à payer
* Possibilité de rembourser une personne dans les transactions qui concernent l'utilisateur uniquement

## Requirements non-fonctionnels
- Convivialité : Facilité d'utilisation, interface compréhensible et responsive ainsi qu'une documentation claire
- Performance : Chargement des pages rapides pour les interactions utilisateurs (chargement des pages en moins de 3 secondes)
- Compatibilité : Application compatibles avec les principaux navigateurs modernes (Chrome, Firefox, Brave, ...)
- Disponibilité : Application disponibles 24h/24 et 7j/j avec une disponibilité cible de 99%

## Méthodologie de développement
Utilisation de la méthode SCRUM pour l'organisation.

On effectue des sprints de 2-3 jours avec des réunions le lundi et le mercredi afin de discuter de l'avancée du projet et des modifications à apporter.

Pour notre workflow on a décidé de suivre une méthodologie dans laquelle on crée une branche à partir de main pour chacune des features du projets qui lorsqu'elle est terminée est push via une pull request sur la branche main.

Un issue tracker à été intégré directement dans un channel de notre serveur discord pour que l'on puisse voir rapidement lorsqu'une issue à été ouverte / fermée.

Comme outils de développement, on utilisera React pour la gestion de la partie frontend et Express.JS pour la gestion de la partie backend. On utilisera Github actions afin d'avoir un déploiement automatisé et Google Cloud pour l'hébergement. Pour la gestion des version on se servira de Github et on se servira directement du backlog dans Github afin d'organiser nos tâches.

Des tests unitaires sont effectués de façon automatique avec les GitHub actions lors de la création d'une pull request sur la branche main, de la même façon lors d'un push sur la branche main le déploiement est effectué de façon automatisée en production.

Les tests unitaires seront réalisés avant la pull request de la feature au fur et à mesure du développement de la feature selon le besoin du développeur.

Les pull requests sont vérifiées par une personne autre que la personne ayant demandé la pull request afin d'être certain du bon développement de celle-ci et pour éviter au maximum les erreurs.

Dans les slides de présentation se trouve un schéma détaillé de l'architecture utilisée.