document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let rotation = { x: 0, y: 0 };
  let rotationInterval;
  let isRotating = false;

  const updateVisibility = () => {
    const faces = cube.querySelectorAll('.face');
    const faceElements = {
      front: cube.querySelector('.face--front'),
      right: cube.querySelector('.face--right'),
      back: cube.querySelector('.face--back'),
      left: cube.querySelector('.face--left'),
      top: cube.querySelector('.face--top'),
      bottom: cube.querySelector('.face--bottom'),
    };

    // Ocultar todas as letras em todas as faces
    faces.forEach(face => {
      face.querySelectorAll('.lado').forEach(lado => lado.classList.add('hidden'));
    });

    // Determinar a face mais visível
    let visibleFace = faceElements.front;
    const angle = (rotation.y + 360) % 360; // Ajustar ângulo para sempre ser positivo

    if (rotation.x < -45) {
      visibleFace = faceElements.top;
    } else if (rotation.x > 45) {
      visibleFace = faceElements.bottom;
    } else if (angle > 45 && angle <= 135) {
      visibleFace = faceElements.left;
    } else if (angle > 135 && angle <= 225) {
      visibleFace = faceElements.back;
    } else if (angle > 225 && angle <= 315) {
      visibleFace = faceElements.right;
    } else {
      visibleFace = faceElements.front;
    }

    // Exibir todas as letras na face visível
    visibleFace.querySelectorAll('.lado').forEach(lado => lado.classList.remove('hidden'));
  };

  const rotateToFace = (face) => {
    switch (face) {
      case 'front':
        rotation = { x: 0, y: 0 };
        break;
      case 'right':
        rotation = { x: 0, y: -90 };
        break;
      case 'back':
        rotation = { x: 0, y: 180 };
        break;
      case 'left':
        rotation = { x: 0, y: 90 };
        break;
      case 'top':
        rotation = { x: -90, y: 0 };
        break;
      case 'bottom':
        rotation = { x: 90, y: 0 };
        break;
    }
    cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    updateVisibility();
  };

  const rotateCube = (deltaX, deltaY) => {
    rotation.y += deltaX * 0.5;
    rotation.x -= deltaY * 0.5;
    cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    updateVisibility();
  };

  cube.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    cube.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    rotateCube(deltaX, deltaY);
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      updateVisibility(); // Atualiza visibilidade ao soltar o mouse
    }
    cube.style.cursor = 'grab';
  });

  document.getElementById('rotateToFront').addEventListener('click', () => rotateToFace('front'));
  document.getElementById('rotateToRight').addEventListener('click', () => rotateToFace('right'));
  document.getElementById('rotateToBack').addEventListener('click', () => rotateToFace('back'));
  document.getElementById('rotateToLeft').addEventListener('click', () => rotateToFace('left'));
  document.getElementById('rotateToTop').addEventListener('click', () => rotateToFace('top'));
  document.getElementById('rotateToBottom').addEventListener('click', () => rotateToFace('bottom'));

  const startRotation = (direction) => {
    if (isRotating) return; // Evitar iniciar várias rotações contínuas
    isRotating = true;
    rotationInterval = setInterval(() => {
      if (direction === 'left') {
        rotation.y -= 2;
      } else if (direction === 'right') {
        rotation.y += 2;
      } else if (direction === 'up') {
        rotation.x -= 2;
      } else if (direction === 'down') {
        rotation.x += 2;
      }
      cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
      updateVisibility();
    }, 10);
  };

  const stopRotation = () => {
    if (!isRotating) return; // Evitar parar a rotação se não estiver rodando
    isRotating = false;
    clearInterval(rotationInterval);
  };

  document.getElementById('rotateLeft').addEventListener('click', () => {
    if (isRotating) {
      stopRotation();
    } else {
      startRotation('left');
    }
  });

  document.getElementById('rotateRight').addEventListener('click', () => {
    if (isRotating) {
      stopRotation();
    } else {
      startRotation('right');
    }
  });

  document.getElementById('rotateUp').addEventListener('click', () => {
    if (isRotating) {
      stopRotation();
    } else {
      startRotation('up');
    }
  });

  document.getElementById('rotateDown').addEventListener('click', () => {
    if (isRotating) {
      stopRotation();
    } else {
      startRotation('down');
    }
  });

  // Parar a rotação ao soltar o botão do mouse, se necessário
  document.addEventListener('mouseup', stopRotation);
});


document.addEventListener('DOMContentLoaded', () => {
  // Todo o código anterior

  // Função para atualizar letras com base nos inputs
  const updateLetter = (letter, value) => {
    const elements = document.querySelectorAll(`.lado.${letter}`);
    elements.forEach(element => element.textContent = value);
  };

  // Mapeamento dos inputs com as classes de letras
  const inputs = {
    inputA: 'a',
    inputB: 'b',
    inputC: 'c',
    inputD: 'd',
    inputE: 'e',
    inputF: 'f',
    inputG: 'g',
    inputH: 'h',
    inputI: 'i',
    inputJ: 'j',
    inputK: 'k',
    inputL: 'l',
    inputM: 'm',
  };

  // Adiciona eventos de input para cada campo de texto
  for (const [inputId, letterClass] of Object.entries(inputs)) {
    document.getElementById(inputId).addEventListener('input', (event) => {
      updateLetter(letterClass, event.target.value);
    });
  }
});
