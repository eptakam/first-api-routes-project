/*
  Utilisation d'un api routes pour pre-render des pages:
      ici je desire pouvoir afficher les feedbacks recuperes du serveur par le chemin localhost:3000/feedback mais en me servant de mon api route qui a pour chemin localhost:3000/api/feedback

      pour cela, nous allons creer un composant normal qui retournera les feedbacks recuperes du serveur.
*/

import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { useState, Fragment } from "react";

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState([]);

  // declencher une requete GET pour recuperer les details d'un feedback au clic sur le bouton "Show details"
  function showDetailsHandler(id) {
    // envoyer une requete GET au serveur pour recuperer les details du feedback
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      }) // mettre a jour le state feedbackItems avec les details du feedback recuperes grace a la cle "feedback" de l'objet JSON retourne par le serveur
      .catch((error) => console.log(error));
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            {/* .bind() permet de preconfigurer une fonction avec une valeur specifique. ici le premier argument represente le contexte (this) et les arguments suivants representent les arguments de la fonction. dans ce cas, on utilise null comme contexte et item.id comme argument de la fonction showDetailsHandler */}
            <button onClick={showDetailsHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
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
