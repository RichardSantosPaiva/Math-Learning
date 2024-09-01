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

document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  let rotation = { x: 0, y: 0 };

  // Função para atualizar as letras nas faces do cubo
  const updateFaceLetters = () => {
    const faceElements = {
      front: cube.querySelector('.face--front'),
      right: cube.querySelector('.face--right'),
      back: cube.querySelector('.face--back'),
      left: cube.querySelector('.face--left'),
      top: cube.querySelector('.face--top'),
      bottom: cube.querySelector('.face--bottom'),
    };

    // Atualizar letras nas faces do cubo
    faceElements.front.querySelector('.a').textContent = document.getElementById('inputA').value || 'A';
    faceElements.front.querySelector('.b').textContent = document.getElementById('inputB').value || 'B';
    faceElements.front.querySelector('.c').textContent = document.getElementById('inputC').value || 'C';
    faceElements.front.querySelector('.d').textContent = document.getElementById('inputD').value || 'D';

    faceElements.right.querySelector('.a').textContent = document.getElementById('inputE').value || 'E';
    faceElements.right.querySelector('.b').textContent = document.getElementById('inputF').value || 'F';
    faceElements.right.querySelector('.c').textContent = document.getElementById('inputG').value || 'G';
    faceElements.right.querySelector('.d').textContent = document.getElementById('inputB').value || 'B';

    faceElements.back.querySelector('.a').textContent = document.getElementById('inputH').value || 'H';
    faceElements.back.querySelector('.b').textContent = document.getElementById('inputI').value || 'I';
    faceElements.back.querySelector('.c').textContent = document.getElementById('inputJ').value || 'J';
    faceElements.back.querySelector('.d').textContent = document.getElementById('inputF').value || 'F';

    faceElements.left.querySelector('.a').textContent = document.getElementById('inputK').value || 'K';
    faceElements.left.querySelector('.b').textContent = document.getElementById('inputL').value || 'L';
    faceElements.left.querySelector('.c').textContent = document.getElementById('inputM').value || 'M';
    faceElements.left.querySelector('.d').textContent = document.getElementById('inputI').value || 'I';

    faceElements.top.querySelector('.a').textContent = document.getElementById('inputH').value || 'H';
    faceElements.top.querySelector('.b').textContent = document.getElementById('inputE').value || 'E';
    faceElements.top.querySelector('.c').textContent = document.getElementById('inputA').value || 'A';
    faceElements.top.querySelector('.d').textContent = document.getElementById('inputK').value || 'K';

    faceElements.bottom.querySelector('.a').textContent = document.getElementById('inputC').value || 'C';
    faceElements.bottom.querySelector('.b').textContent = document.getElementById('inputG').value || 'G';
    faceElements.bottom.querySelector('.c').textContent = document.getElementById('inputJ').value || 'J';
    faceElements.bottom.querySelector('.d').textContent = document.getElementById('inputM').value || 'M';
  };

  // Adicionar event listeners para atualizar o cubo quando os campos de entrada mudarem
  document.querySelectorAll('#letrasForm input').forEach(input => {
    input.addEventListener('change', updateFaceLetters);
  });

  // Função para girar o cubo
  const rotateCube = (x, y) => {
    cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  };

  // Adicionar eventos aos botões para girar o cubo
  document.getElementById('rotateToFront').addEventListener('click', () => {
    rotation = { x: 0, y: 0 };
    rotateCube(rotation.x, rotation.y);
  });

  document.getElementById('rotateToRight').addEventListener('click', () => {
    rotation = { x: 0, y: 90 };
    rotateCube(rotation.x, rotation.y);
  });

  document.getElementById('rotateToBack').addEventListener('click', () => {
    rotation = { x: 0, y: 180 };
    rotateCube(rotation.x, rotation.y);
  });

  document.getElementById('rotateToLeft').addEventListener('click', () => {
    rotation = { x: 0, y: -90 };
    rotateCube(rotation.x, rotation.y);
  });

  document.getElementById('rotateToTop').addEventListener('click', () => {
    rotation = { x: -90, y: 0 };
    rotateCube(rotation.x, rotation.y);
  });

  document.getElementById('rotateToBottom').addEventListener('click', () => {
    rotation = { x: 90, y: 0 };
    rotateCube(rotation.x, rotation.y);
  });

  // Atualizar letras ao carregar a página
  updateFaceLetters();
});
