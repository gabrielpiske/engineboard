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

function calcularCorrenteNominal(kw, rendimento, cosPhi) {
  const tensao = 380;
  const rendimentoDecimal = rendimento / 100;
  
  // Fórmula: In = (P * 1000) / (√3 * V * η * cosφ)
  const correnteNominnal = (kw * 1000) / (Math.sqrt(3) * tensao * rendimentoDecimal * cosPhi);
  return correnteNominnal.toFixed(2);
}

function preencherPlaca() {
  const selectPotencia = document.getElementById('potencia');
  const selectFS = document.getElementById('fs');
  const selectPolos = document.getElementById('polos');
  const inputEscorregamento = document.getElementById('escorregamento');

  const selectedOption = selectPotencia.options[selectPotencia.selectedIndex];
  const cv = parseFloat(selectedOption.value);
  const kw = parseFloat(selectedOption.getAttribute('data-kw'));
  const fs = selectFS.value;
  const polos = selectPolos.value;
  const escorregamento = parseFloat(inputEscorregamento.value) || 0;

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

      const correnteNominnal = calcularCorrenteNominal(kw, dadosPolos.η, dadosPolos.cosφ);
      document.getElementById('campo-in').textContent = correnteNominnal;
      
      const rpm = calcularRPM(polos, escorregamento);
      document.getElementById('campo-rpm').textContent = rpm;
    } else {
      document.getElementById('campo-ip-in').textContent = '-';
      document.getElementById('campo-rendimento').textContent = '-';
      document.getElementById('campo-fator-potencia').textContent = '-';
      document.getElementById('campo-rpm').textContent = '-';
    }
  }

}

function limparCampos() {
  document.getElementById('campo-fs').textContent = '';
  document.getElementById('campo-kwcv').textContent = '';
  document.getElementById('campo-ip-in').textContent = '';
  document.getElementById('campo-rendimento').textContent = '';
  document.getElementById('campo-fator-potencia').textContent = '';
  document.getElementById('campo-rpm').textContent = '';
}

function calcularRPM(polos, escorregamento) {
  let rpmSincrono;
  switch(polos) {
    case '2': rpmSincrono = 3600; break;
    case '4': rpmSincrono = 1800; break;
    case '6': rpmSincrono = 1200; break;
    case '8': rpmSincrono = 900; break;
    default: rpmSincrono = 0;
  }
  
  const rpm = rpmSincrono * (1 - escorregamento/100);
  return Math.round(rpm);
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

  let campoCn = document.getElementById('campo-in');
  let viewCn = document.getElementById('view-corrente-nominal').checked;

  let campoRpm = document.getElementById('campo-rpm');
  let viewRpm = document.getElementById('view-rpm').checked;

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

  if(!viewCn) {
    campoCn.style.display = "none";
  } else {
    campoCn.style.display = "block";
  }

  if(!viewRpm) {
    campoRpm.style.display = "none";
  } else {
    campoRpm.style.display = "block";
  }
}

function closeModal() {
  let modal = document.getElementById("modal-placa");
  
  modal.style.display = "none";
}

function abrirModal() {
  let modal = document.getElementById("modal-placa");
  
  modal.style.display = "flex";
  preencherPlacaModal();
}

function preencherPlacaModal() {
  const selectPotencia = document.getElementById('potencia');
  const selectFS = document.getElementById('fs');
  const selectPolos = document.getElementById('polos');
  const inputEscorregamento = document.getElementById('escorregamento');

  const selectedOption = selectPotencia.options[selectPotencia.selectedIndex];
  const cv = parseFloat(selectedOption.value);
  const kw = parseFloat(selectedOption.getAttribute('data-kw'));
  const fs = selectFS.value;
  const polos = selectPolos.value;
  const escorregamento = parseFloat(inputEscorregamento.value) || 0;

  const motorSelecionado = motores.find(motor => motor.cv === cv);
  
  // Obter estado das checkboxes
  const viewKwcv = document.getElementById('view-kwcv').checked;
  const viewFS = document.getElementById('view-fs').checked;
  const viewIpin = document.getElementById('view-ip-in').checked;
  const viewRend = document.getElementById('view-rendimento').checked;
  const viewFp = document.getElementById('view-fator-potencia').checked;
  const viewCn = document.getElementById('view-corrente-nominal').checked;
  const viewRpm = document.getElementById('view-rpm').checked;

  // Preencher apenas os campos selecionados
  if (viewKwcv) {
    document.getElementById('modal-campo-kwcv').textContent = `${kw} (${cv})`;
    document.getElementById('modal-campo-kwcv').style.display = "block";
  } else {
    document.getElementById('modal-campo-kwcv').style.display = "none";
  }

  if (viewFS) {
    document.getElementById('modal-campo-fs').textContent = `${fs}`;
    document.getElementById('modal-campo-fs').style.display = "block";
  } else {
    document.getElementById('modal-campo-fs').style.display = "none";
  }

  if (motorSelecionado) {
    const poloKey = `${polos}p`;
    const dadosPolos = motorSelecionado.polos[poloKey];
    
    if (dadosPolos) {
      if (viewIpin) {
        document.getElementById('modal-campo-ip-in').textContent = `${dadosPolos.ip_in}`;
        document.getElementById('modal-campo-ip-in').style.display = "block";
      } else {
        document.getElementById('modal-campo-ip-in').style.display = "none";
      }

      if (viewRend) {
        document.getElementById('modal-campo-rendimento').textContent = `${dadosPolos.η}`;
        document.getElementById('modal-campo-rendimento').style.display = "block";
      } else {
        document.getElementById('modal-campo-rendimento').style.display = "none";
      }

      if (viewFp) {
        document.getElementById('modal-campo-fator-potencia').textContent = `${dadosPolos.cosφ}`;
        document.getElementById('modal-campo-fator-potencia').style.display = "block";
      } else {
        document.getElementById('modal-campo-fator-potencia').style.display = "none";
      }

      if (viewCn) {
        const correnteNominnal = calcularCorrenteNominal(kw, dadosPolos.η, dadosPolos.cosφ);
        document.getElementById('modal-campo-in').textContent = correnteNominnal;
        document.getElementById('modal-campo-in').style.display = "block";
      } else {
        document.getElementById('modal-campo-in').style.display = "none";
      }
      
      if (viewRpm) {
        const rpm = calcularRPM(polos, escorregamento);
        document.getElementById('modal-campo-rpm').textContent = rpm;
        document.getElementById('modal-campo-rpm').style.display = "block";
      } else {
        document.getElementById('modal-campo-rpm').style.display = "none";
      }
    }
  }
}