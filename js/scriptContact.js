emailjs.init("Sz2dg-roTNNUxL1p7");

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Cambia el estado del botón
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <span>Enviando...</span>
        <i class="fas fa-spinner fa-spin"></i>
    `;

    // Obtiene los valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    console.log(formData);

    emailjs.send(
        'service_0f8ly6r', 
        'template_e69abyk',
        {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
        }
    )
    .then(() => {
        // Muestra mensaje de éxito
        showNotification('¡Mensaje enviado con éxito!', 'success');

        // Limpia el formulario
        contactForm.reset();

        // Restaura el botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    })
    .catch((error) => {
        // Muestra mensaje de error
        showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');

        // Restaura el botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    });
});

// Función para mostrar notificaciones
function showNotification(message, type) {
    // Crea el elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Añade la notificación al DOM
    document.body.appendChild(notification);

    // Añade la clase para mostrar la notificación
    setTimeout(() => notification.classList.add('show'), 100);

    // Elimina la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
