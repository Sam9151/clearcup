// ClearCup — interactivité

// Smooth scroll pour tous les liens d'ancre
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Gestion du formulaire Formspree (AJAX)
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        successMsg.classList.remove('hidden');
        submitBtn.textContent = 'Envoyer ma demande';
        submitBtn.disabled = false;
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      errorMsg.classList.remove('hidden');
      submitBtn.textContent = 'Envoyer ma demande';
      submitBtn.disabled = false;
    }
  });
}
