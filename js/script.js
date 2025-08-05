window.onload = () => {
  const selectPotencia = document.getElementById('potencia');
  
  limparCampos();

  motores.forEach(motor => {
    const option = document.createElement('option');
    option.value = motor.cv;
    option.textContent = `${motor.cv} CV (${motor.kw} kW)`;
    option.setAttribute('data-kw', motor.kw);
    selectPotencia.appendChild(option);
  });
};

function preencherPlaca() {
  const selectPotencia = document.getElementById('potencia');
  const selectFS = document.getElementById('fs');
  const selectPolos = document.getElementById('polos');

  const selectedOption = selectPotencia.options[selectPotencia.selectedIndex];
  const cv = parseFloat(selectedOption.value);
  const kw = parseFloat(selectedOption.getAttribute('data-kw'));
  const fs = selectFS.value;
  const polos = selectPolos.value;

  const motorSelecionado = motores.find(motor => motor.cv === cv);
  
  document.getElementById('campo-fs').textContent = `${fs}`;
  document.getElementById('campo-kwcv').textContent = `${kw} (${cv})`;
  
  if (motorSelecionado) {
    const poloKey = `${polos}p`;
    const dadosPolos = motorSelecionado.polos[poloKey];
    
    if (dadosPolos) {
      document.getElementById('campo-ip-in').textContent = `${dadosPolos.ip_in}`;
      document.getElementById('campo-rendimento').textContent = `${dadosPolos.η}`;
      document.getElementById('campo-fator-potencia').textContent = `${dadosPolos.cosφ}`;
    } else {
      document.getElementById('campo-ip-in').textContent = '-';
      document.getElementById('campo-rendimento').textContent = '-';
      document.getElementById('campo-fator-potencia').textContent = '-';
    }
  }
}

function limparCampos() {
  document.getElementById('campo-fs').textContent = '';
  document.getElementById('campo-kwcv').textContent = '';
  document.getElementById('campo-ip-in').textContent = '';
  document.getElementById('campo-rendimento').textContent = '';
  document.getElementById('campo-fator-potencia').textContent = '';
}

function visualizacao() {
  let campoKwcv = document.getElementById('campo-kwcv');
  let viewKwcv = document.getElementById('view-kwcv').checked;

  let campoFs = document.getElementById('campo-fs');
  let viewFS = document.getElementById('view-fs').checked;

  let campoIpin = document.getElementById('campo-ip-in');
  let viewIpin = document.getElementById('view-ip-in').checked;

  let campoRend = document.getElementById('campo-rendimento');
  let viewRend = document.getElementById('view-rendimento').checked;

  let campoFp = document.getElementById('campo-fator-potencia');
  let viewFp = document.getElementById('view-fator-potencia').checked;

  if(!viewKwcv) {
    campoKwcv.style.display = "none";
  } else {
    campoKwcv.style.display = "block";
  }

  if(!viewFS) {
    campoFs.style.display = "none";
  } else {
    campoFs.style.display = "block";
  }

  if(!viewIpin) {
    campoIpin.style.display = "none";
  } else {
    campoIpin.style.display = "block";
  }

  if(!viewRend) {
    campoRend.style.display = "none";
  } else {
    campoRend.style.display = "block";
  }

  if(!viewFp) {
    campoFp.style.display = "none";
  } else {
    campoFp.style.display = "block";
  }
}