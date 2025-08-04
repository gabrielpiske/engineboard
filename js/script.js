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

  const selectedOption = selectPotencia.options[selectPotencia.selectedIndex];
  const cv = parseFloat(selectedOption.value);
  const kw = parseFloat(selectedOption.getAttribute('data-kw'));
  const fs = selectFS.value;

  const motorSelecionado = motores.find(motor => motor.cv === cv);
  
  document.getElementById('campo-fs').textContent = `${fs}`;
  document.getElementById('campo-kwcv').textContent = `${kw} (${cv})`;
  
  if (motorSelecionado) {
    document.getElementById('campo-ip-in').textContent = `${motorSelecionado.polos4p.ip_in}`;
    document.getElementById('campo-rendimento').textContent = `${motorSelecionado.polos4p.n}`;
    document.getElementById('campo-fator-potencia').textContent = `${motorSelecionado.polos4p.cos}`;
  }
}

function limparCampos() {
  document.getElementById('campo-fs').textContent = ` `;
  document.getElementById('campo-kwcv').textContent = ` `;
  document.getElementById('campo-ip-in').textContent = ` `;
}