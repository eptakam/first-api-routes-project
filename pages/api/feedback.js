/*
    Important:
        Dans le dossier api, on exporte pas les composants React. mais plutot des fonctions qui vont être appelées par Next.js
*/

export default function handler(req, res) {
  res.status(200).json({ message: 'This is a feedback API route' });  // cette fonction retourne une reponse (objet JSON) lorsqu'une requête est faite sur cette route (http://localhost:3000/api/feedback)
}