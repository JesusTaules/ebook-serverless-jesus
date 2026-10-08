const API_URL = 'https://bntvwv77v9.execute-api.us-east-1.amazonaws.com/dev/contact-02/id';
 
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.ebook-download-form');
  if (!form) return;
 
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
 
    const name = document.getElementById('ebook-form-name').value.trim();
    const email = document.getElementById('ebook-email').value.trim();
    const payload = { name, email };
    console.log('Payload:', payload);
 
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
 
      const responseData = await response.json();
      const result = typeof responseData.body === 'string'
        ? JSON.parse(responseData.body)
        : responseData.body ?? responseData;

      if (!response.ok) throw new Error(result.error ?? result.message ?? 'Error al enviar');
      if (!result.message) throw new Error('La API respondió sin devolver un mensaje.');

      alert(result.message);
      form.reset();
    } catch (error) {
      console.error('Error API:', error);
      alert(error.message);
    }
  });
});