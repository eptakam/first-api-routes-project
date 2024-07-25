/*
  Utilisation d'un api routes pour pre-render des pages:
      ici je desire pouvoir afficher les feedbacks recuperes du serveur par le chemin localhost:3000/feedback mais en me servant de mon api route qui a pour chemin localhost:3000/api/feedback

      pour cela, nous allons creer un composant normal qui retournera les feedbacks recuperes du serveur.
*/

import { buildFeedbackPath, extractFeedback  } from "../api/feedback";

export default function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // Note: on n'utilise pas fetch dans getStaticProps pour communiquer avec notre propre API route, mais on utilise fetch pour communiquer avec des API externes. A cause de cela, nous utiliserons la logique de node.js pour lire le fichier feedback.json et retourner les feedbacks. Dans ce cas, nous allons juste exporter nos fonctions buildFeedbackPath et extractFeedback du fichier pages/api/feedback.js et les importer ici pour les utiliser dans getStaticProps.
 
  // determiner le chemin du fichier feedback.json en utilisant la fonction buildFeedbackPath()
  const filePath = buildFeedbackPath();

  // extraire les feedbacks deja existants dans le fichier feedback.json
  const data = extractFeedback(filePath);

  // retourner un objet JSON contenant les feedbacks extraits du fichier feedback.json
  return {
    props: {
      feedbackItems: data,
    },
  };
}