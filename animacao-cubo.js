document.addEventListener('DOMContentLoaded', () => {
  // Inicialize animações do cubo
  const cube = document.getElementById('cube');
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let rotation = { x: 0, y: 0 };

  cube.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    cube.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    rotation.y += deltaX * 0.5;
    rotation.x -= deltaY * 0.5;

    cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    cube.style.cursor = 'grab';
  });

  // Inicialize animações do cilindro
  const cilindro = document.getElementById('cilindro');
  let isDraggingCilindro = false;
  let startX, startY;
  let rotateX = 0;
  let rotateY = 0;

  cilindro.addEventListener('mousedown', (e) => {
    isDraggingCilindro = true;
    startX = e.clientX;
    startY = e.clientY;
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingCilindro) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;

    cilindro.querySelector('.box-cilindro').style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    startX = currentX;
    startY = currentY;
  });

  window.addEventListener('mouseup', () => {
    isDraggingCilindro = false;
  });
});
