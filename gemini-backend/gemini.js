document.getElementById('geminiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputText = document.getElementById('inputText').value;
    const responseTextDiv = document.getElementById('responseText');
    responseTextDiv.textContent = 'Cargando respuesta...';

    const contextoFijo = ""; // Contexto fijo

    const promptCompleto = contextoFijo + inputText; // Agregar el contexto fijo

    fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptCompleto }) // Usar el prompt completo
    })
    .then(response => response.json())
    .then(data => {
        responseTextDiv.textContent = data.response;
    })
    .catch(error => {
        console.error('Error:', error);
        responseTextDiv.textContent = 'Error al obtener la respuesta.';
    });
});