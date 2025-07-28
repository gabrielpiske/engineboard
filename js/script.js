window.onload = () => {
  const selectPotencia = document.getElementById('potencia');

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
  const kw = selectedOption.getAttribute('data-kw');
  const cv = selectedOption.value;
  const fs = selectFS.value;

  document.getElementById('campo-fs').textContent = `${fs}`;
  document.getElementById('campo-kwcv').textContent = `${kw} (${cv})`;
}
