/*
    je desire communiquer avec le serveur mais je ne veux pas que le client puisse voir ce que je fais. c'est la qu'entre en jeu les API routes. 

    j'ai besoin des references a mes input (formulaire). ils me permettront de recuperer les valeurs entrees par l'utilisateur. D'ou l'utilisation du hook useRef de react

    les références peuvent être utilisées pour accéder directement à un élément DOM ou pour stocker une valeur mutable (qui peut changer).
*/

import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  // creer des references aux inputs du formulaire
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  // gestionnaire de la soumission du formulaire
  function submitFormHandler(event) {
    event.preventDefault(); // empecher le rechargement de la page a la soumission du formulaire

    // recuperer l'email entre par l'utilisateur grace a la reference a l'input ref={emailInputRef}
    const enteredEmail = emailInputRef.current.value;

    // recuperer le feedback entre par l'utilisateur grace a la reference a l'input ref={feedbackInputRef}
    const enteredFeedback = feedbackInputRef.current.value;

    // valider les donnees entrees par l'utilisateur
    if (
      enteredEmail.trim() === "" ||
      !enteredEmail.trim().includes("@") ||
      enteredFeedback.trim() === ""
    ) {
      alert("Email and Feedback must not be empty!");
      return;
    }

    // envoyer les donnees au serveur via une requete POST
    // les donnees seront sous cette forme {email: 'test@test.com', text: 'This is a test feedback'}
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, text: enteredFeedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  // declencher une requete GET pour recuperer les feedbacks au clic sur le bouton "Load Feedback"
  function loadFeedbackHandler() {
    // envoyer une requete GET au serveur pour recuperer les feedbacks
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback); // mettre a jour le state feedbackItems avec les feedbacks recuperes grace a la cle "feedback" de l'objet JSON retourne par le serveur (voir le else dans le fichier pages/api/feedback.js)
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" name="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="5"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      {/* afficher la liste des feedbacks */}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
