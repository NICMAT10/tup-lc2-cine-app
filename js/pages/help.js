document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("button");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    btn.value = "Enviando...";
    btn.disabled = true;

    const name = document.getElementsByName("name")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const message = document.getElementById("textmensaje").value;

    

    // Enviar los datos a través de EmailJS
    const templateParams = {
      name: name,
      email: email,
      message: message
    };

    emailjs.send("service_dbz13i4", "template_fyipnin", templateParams)
      .then(function(response) {
        btn.value = "Enviar Mensaje";
        btn.disabled = false;
        alert("Mensaje Enviado Correctamente");
        form.reset();
      })
      .catch(function(error) {
        btn.value = "Enviar Mensaje";
        btn.disabled = false;
        alert("Error al enviar el mensaje: " + error);
      });
  });
});
