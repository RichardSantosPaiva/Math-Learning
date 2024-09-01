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


  document.addEventListener('DOMContentLoaded', () => {
  const cube = document.getElementById('cube');
  
  const calculateArea = () => {
    const inputs = {
      A: document.getElementById('inputA').value,
      B: document.getElementById('inputB').value,
      C: document.getElementById('inputC').value,
      D: document.getElementById('inputD').value,
      E: document.getElementById('inputE').value,
      F: document.getElementById('inputF').value,
      G: document.getElementById('inputG').value,
      H: document.getElementById('inputH').value,
      I: document.getElementById('inputI').value,
      J: document.getElementById('inputJ').value,
      K: document.getElementById('inputK').value,
      L: document.getElementById('inputL').value,
      M: document.getElementById('inputM').value
    };

    // Calcular a área das faces do cubo
    const faceAreas = {
      front: inputs.A && inputs.B && inputs.C && inputs.D ? 
        (inputs.A + inputs.B + inputs.C + inputs.D) / 4 : 0,
      right: inputs.E && inputs.F && inputs.G && inputs.B ? 
        (inputs.E + inputs.F + inputs.G + inputs.B) / 4 : 0,
      back: inputs.H && inputs.I && inputs.J && inputs.F ? 
        (inputs.H + inputs.I + inputs.J + inputs.F) / 4 : 0,
      left: inputs.K && inputs.L && inputs.M && inputs.I ? 
        (inputs.K + inputs.L + inputs.M + inputs.I) / 4 : 0,
      top: inputs.H && inputs.E && inputs.A && inputs.K ? 
        (inputs.H + inputs.E + inputs.A + inputs.K) / 4 : 0,
      bottom: inputs.C && inputs.G && inputs.J && inputs.M ? 
        (inputs.C + inputs.G + inputs.J + inputs.M) / 4 : 0
    };

    const lateralArea = (faceAreas.front + faceAreas.right + faceAreas.back + faceAreas.left) * 2;
    const totalArea = lateralArea + faceAreas.top + faceAreas.bottom;

    // Exibir os resultados
    console.log('Área das faces: ', faceAreas);
    console.log('Área lateral: ', lateralArea);
    console.log('Área total: ', totalArea);
  };

  // Adicionar evento de clique aos botões
  document.getElementById('rotateToFront').addEventListener('click', () => {
    cube.style.transform = 'rotateY(0deg)';
  });

  document.getElementById('rotateToRight').addEventListener('click', () => {
    cube.style.transform = 'rotateY(90deg)';
  });

  document.getElementById('rotateToBack').addEventListener('click', () => {
    cube.style.transform = 'rotateY(180deg)';
  });

  document.getElementById('rotateToLeft').addEventListener('click', () => {
    cube.style.transform = 'rotateY(-90deg)';
  });

  document.getElementById('rotateToTop').addEventListener('click', () => {
    cube.style.transform = 'rotateX(90deg)';
  });

  document.getElementById('rotateToBottom').addEventListener('click', () => {
    cube.style.transform = 'rotateX(-90deg)';
  });

  // Adicionar evento de alteração ao formulário
  document.getElementById('letrasForm').addEventListener('input', calculateArea);
});

document.addEventListener('DOMContentLoaded', () => {
  const rotateToFront = document.getElementById('rotateToFront');
  const rotateToRight = document.getElementById('rotateToRight');
  const rotateToBack = document.getElementById('rotateToBack');
  const rotateToLeft = document.getElementById('rotateToLeft');
  const rotateToTop = document.getElementById('rotateToTop');
  const rotateToBottom = document.getElementById('rotateToBottom');
  
  const cube = document.getElementById('cube');

  rotateToFront.addEventListener('click', () => rotateCube(0));
  rotateToRight.addEventListener('click', () => rotateCube(90));
  rotateToBack.addEventListener('click', () => rotateCube(180));
  rotateToLeft.addEventListener('click', () => rotateCube(-90));
  rotateToTop.addEventListener('click', () => rotateCube(90, 'X'));
  rotateToBottom.addEventListener('click', () => rotateCube(-90, 'X'));

  function rotateCube(degrees, axis = 'Y') {
    cube.style.transform = `rotate${axis}(${degrees}deg)`;
  }

  const form = document.getElementById('letrasForm');
  form.addEventListener('input', () => {
    const inputs = {
      A: parseFloat(document.getElementById('inputA').value) || 0,
      B: parseFloat(document.getElementById('inputB').value) || 0,
      C: parseFloat(document.getElementById('inputC').value) || 0,
      D: parseFloat(document.getElementById('inputD').value) || 0,
      E: parseFloat(document.getElementById('inputE').value) || 0,
      F: parseFloat(document.getElementById('inputF').value) || 0,
      G: parseFloat(document.getElementById('inputG').value) || 0,
      H: parseFloat(document.getElementById('inputH').value) || 0,
      I: parseFloat(document.getElementById('inputI').value) || 0,
      J: parseFloat(document.getElementById('inputJ').value) || 0,
      K: parseFloat(document.getElementById('inputK').value) || 0,
      L: parseFloat(document.getElementById('inputL').value) || 0,
      M: parseFloat(document.getElementById('inputM').value) || 0
    };

    // Calcule a área lateral e a área total
    const areaLateral = (inputs.A + inputs.B + inputs.C + inputs.D + inputs.E + inputs.F + inputs.G + inputs.H + inputs.I + inputs.J + inputs.K + inputs.L + inputs.M) * 4;
    const areaTotal = (inputs.A + inputs.B + inputs.C + inputs.D + inputs.E + inputs.F + inputs.G + inputs.H + inputs.I + inputs.J + inputs.K + inputs.L + inputs.M) * 6;

    // Atualize os resultados
    document.getElementById('resultadoA').textContent = `Área A: ${inputs.A}`;
    document.getElementById('resultadoB').textContent = `Área B: ${inputs.B}`;
    document.getElementById('resultadoC').textContent = `Área C: ${inputs.C}`;
    document.getElementById('resultadoD').textContent = `Área D: ${inputs.D}`;
    document.getElementById('resultadoE').textContent = `Área E: ${inputs.E}`;
    document.getElementById('resultadoF').textContent = `Área F: ${inputs.F}`;
    document.getElementById('resultadoG').textContent = `Área G: ${inputs.G}`;
    document.getElementById('resultadoH').textContent = `Área H: ${inputs.H}`;
    document.getElementById('resultadoI').textContent = `Área I: ${inputs.I}`;
    document.getElementById('resultadoJ').textContent = `Área J: ${inputs.J}`;
    document.getElementById('resultadoK').textContent = `Área K: ${inputs.K}`;
    document.getElementById('resultadoL').textContent = `Área L: ${inputs.L}`;
    document.getElementById('resultadoM').textContent = `Área M: ${inputs.M}`;
    document.getElementById('resultadoAreaLateral').textContent = `Área Lateral: ${areaLateral}`;
    document.getElementById('resultadoAreaTotal').textContent = `Área Total: ${areaTotal}`;
  });
});
