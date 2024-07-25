/*
    je desire communiquer avec le serveur mais je ne veux pas que le client puisse voir ce que je fais. c'est la que entre en jeu les API routes. 

    j'ai besoin d'une reference a mes input (formulaire) qui va me permettre de recuperer les valeurs entrees par l'utilisateur. D'ou l'utilisation du hook useRef de react
*/

import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  // gestionnaire de la soumission du formulaire
  function submitFormHandler(event) {
    event.preventDefault(); // empeche le rechargement de la page a la soumission du formulaire

    // recuperer l'email entre par l'utilisateur grace a la reference a l'input
    const enteredEmail = emailInputRef.current.value;

    // recuperer le feedback entre par l'utilisateur grace a la reference a l'input
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
    </div>
  );
}

export default HomePage;
