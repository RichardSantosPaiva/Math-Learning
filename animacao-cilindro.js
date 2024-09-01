const cilindro = document.getElementById('cilindro');
let isDragging = false;
let startX, startY;
let rotateX = 0;
let rotateY = 0;

cilindro.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  e.preventDefault(); // Evita o comportamento padrão do mouse
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const currentY = e.clientY;
  
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  rotateY += deltaX * 0.5; // Ajuste a sensibilidade conforme necessário
  rotateX -= deltaY * 0.5; // Ajuste a sensibilidade conforme necessário

  cilindro.querySelector('.box-cilindro').style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  startX = currentX;
  startY = currentY;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});
