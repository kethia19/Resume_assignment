document.getElementById('contactForm').addEventListener('submit', function(e) {
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  if (!name || !email) {
    alert('Please fill out your name and email.');
    e.preventDefault();
  }
});
