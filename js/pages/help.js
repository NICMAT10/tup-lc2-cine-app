document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("button");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Enviando...";
    btn.disabled = true;

    const name = document.getElementsByName("name")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const message = document.getElementById("textmensaje").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      btn.value = "Enviar Mensaje";
      btn.disabled = false;
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Enviar los datos a través de EmailJS
    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send("service_dbz13i4", "template_fyipnin", templateParams)
      .then(function (response) {
        btn.value = "Enviar Mensaje";
        btn.disabled = false;
        alert("Mensaje Enviado Correctamente");
        form.reset();
      })
      .catch(function (error) {
        btn.value = "Enviar Mensaje";
        btn.disabled = false;
        alert("Error al enviar el mensaje: " + error);
      });
  });
});


/*document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("button");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Enviando...";
    btn.disabled = true;

    const name = document.getElementsByName("name")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const message = document.getElementById("textmensaje").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      btn.value = "Enviar Mensaje";
      btn.disabled = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico válido.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    // Enviar los datos a través de EmailJS
    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send("service_dbz13i4", "template_fyipnin", templateParams)
      .then(function (response) {
        btn.value = "Enviar Mensaje";
        btn.disabled = false;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Mensaje Enviado Correctamente',
          confirmButtonColor: '#3085d6',
        }).then((result) => {
          if (result.isConfirmed) {
            form.reset();
          }
        });
      })
      .catch(function (error) {
        btn.value = "Enviar Mensaje";
        btn.disabled = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al enviar el mensaje: ' + error,
          confirmButtonColor: '#3085d6',
        });
      });
  });
});*/
