/*
    Implementation des api routes dynamiques:
        ceci nous servira par exemple a afficher les details d'un feedback en particulier. pour cela, nous allons creer un fichier [feedbackId].js dans le dossier api. ce fichier sera un api route dynamique qui nous permettra de recuperer un feedback en particulier en fonction de son id.
*/

import { buildFeedbackPath, extractFeedback } from "./feedback";

export default function handler(req, res) {
    const feedbackId = req.query.feedbackId;
    console.log("feedbackId: ", feedbackId);
  
    // determiner le chemin du fichier feedback.json en utilisant la fonction buildFeedbackPath()
    const filePath = buildFeedbackPath();
  
    // extraire les feedbacks deja existants dans le fichier feedback.json
    const feedbackData = extractFeedback(filePath);
  
    // recuperer le feedback correspondant a l'id passe en parametre
    const selectedFeedback = feedbackData.find((feedback) => feedback.id === feedbackId);
  
    // retourner une reponse (objet JSON) contenant le feedback correspondant a l'id passe en parametre
    res.status(200).json({ feedback: selectedFeedback });
}