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