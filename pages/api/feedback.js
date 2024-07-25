/*
    Important:
        Dans le dossier api, on exporte pas les composants React. mais plutot des fonctions qui vont être appelées par Next.js

    Nous allons ensuite accepter les requete sur cette route et nous allons extraire les données du corps de la requête. pour les sauvegarder dans une base de donnees ou ailleurs.

    avant de le faire, il est important de determiner quel est le type de requete a declenche l'execution de notre fonction (api routes). pour cela, on utilise la methode req.method qui retourne le type de requete (GET, POST, PUT, DELETE, etc.)

    vu que cette fonction sera executee uniquement cote serveur, on peut utiliser des modules Node.js pour sauvegarder les donnees dans une base de donnees ou dans un fichier. Mais ne pas perdre de vue qu'avant d'ecrire dans un fichier, il faut d'abord lire le contenu du fichier pour ne pas ecraser les donnees deja existantes.
*/

import fs from 'fs';  // fs est un module Node.js qui permet de lire et d'ecrire dans des fichiers
import path from 'path';  // path est un module Node.js qui permet de manipuler les chemins de fichiers

export default function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

   const newFeedback = {
      id: new Date().toISOString(),
      email,  // ecriture possible car la clé et la valeur ont le même nom (email: email)
      text: feedbackText
    };

    console.log('text: ',newFeedback);
    // store that in a database or in a file
    // pour le faire, il nous faut d'abord determiner le chemin du fichier (construire le chemin) dans lequel nous allons sauvegarder les donnees. pour cela, on utilise la methode .join() du module path de Node.js
    // process.cwd() retourne le repertoire de travail actuel du processus Node.js
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');  

    // lire le contenu du fichier feedback.json (si le fichier n'existe pas, il sera cree): fichier qui contiendra les feedbacks
    const fileData = fs.readFileSync(filePath);
    console.log('fileData: ',fileData);

    // convertir le contenu du fichier en objet JSON
    const data = JSON.parse(fileData);
    console.log('data: ',data);

    // ajouter le nouveau feedback a l'objet JSON
    data.push(newFeedback); // s'assurer que data est un tableau sinon il y aura une erreur

    // ecrire le nouvel objet JSON dans le fichier feedback.json
    fs.writeFileSync(filePath, JSON.stringify(data)); // JSON.stringify() convertit un objet JSON en chaine de caractères

    // retourner une reponse (objet JSON) pour indiquer que la requete a ete traitee avec succes
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
      res.status(200).json({ message: 'This is a feedback API route' });  // cette fonction retourne une reponse (objet JSON) lorsqu'une requête est faite sur cette route (http://localhost:3000/api/feedback)
  }
}