const cube = document.getElementById('cube');
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: 0, y: 0 }; // Para armazenar a rotação atual

cube.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
  cube.style.cursor = 'grabbing'; // Muda o cursor ao arrastar
});

document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - previousMousePosition.x;
  const deltaY = event.clientY - previousMousePosition.y;

  // Atualiza a rotação do cubo com base no movimento do mouse
  rotation.y += deltaX * 0.5; // Ajuste a sensibilidade conforme necessário
  rotation.x -= deltaY * 0.5; // Ajuste a sensibilidade conforme necessário

  // Aplica a nova rotação ao cubo
  cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

  previousMousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  cube.style.cursor = 'grab'; // Restaura o cursor
});