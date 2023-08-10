function submitComment() {
    const username = document.getElementById('username').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    if (!username || !rating || !comment) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (rating > 5){
      alert('Avalie com um número de 1 a 5')
      return;
    }
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment');

    commentContainer.innerHTML = `
      <p><strong>${username}</strong> avaliou o site com ${rating} estrelas:</p>
      <p>${comment}</p>
    `;

    document.getElementById('comments-container').appendChild(commentContainer);

    // Limpar campos após enviar o comentário
    document.getElementById('username').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('comment').value = '';
  }