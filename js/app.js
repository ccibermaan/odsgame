/**
 * Inicializador e Loop Principal do Sistema
 * Sistema Antigravity - ESG Clean Tech
 */

// --- CONFIGURAÇÃO E BASE DE DADOS INICIAL ---
const INITIAL_COUNTRIES = {
  // América Latina (Emergentes)
  br: { name: 'Brasil', region: 'América do Sul', capacity: 35000, saturation: 15, injected: 0, initial: 15 },
  ar: { name: 'Argentina', region: 'América do Sul', capacity: 20000, saturation: 20, injected: 0, initial: 20 },
  co: { name: 'Colômbia', region: 'América do Sul', capacity: 18000, saturation: 25, injected: 0, initial: 25 },
  cl: { name: 'Chile', region: 'América do Sul', capacity: 15000, saturation: 40, injected: 0, initial: 40 },
  pe: { name: 'Peru', region: 'América do Sul', capacity: 16000, saturation: 22, injected: 0, initial: 22 },
  mx: { name: 'México', region: 'América do Norte', capacity: 25000, saturation: 18, injected: 0, initial: 18 },
  
  // África (Emergentes / Críticos)
  ng: { name: 'Nigéria', region: 'África', capacity: 30000, saturation: 10, injected: 0, initial: 10 },
  za: { name: 'África do Sul', region: 'África', capacity: 22000, saturation: 28, injected: 0, initial: 28 },
  eg: { name: 'Egito', region: 'África', capacity: 25000, saturation: 20, injected: 0, initial: 20 },
  ke: { name: 'Quênia', region: 'África', capacity: 14000, saturation: 15, injected: 0, initial: 15 },
  ma: { name: 'Marrocos', region: 'África', capacity: 16000, saturation: 35, injected: 0, initial: 35 },
  ao: { name: 'Angola', region: 'África', capacity: 15000, saturation: 8, injected: 0, initial: 8 },
  et: { name: 'Etiópia', region: 'África', capacity: 18000, saturation: 12, injected: 0, initial: 12 },
  
  // Ásia (Emergentes / Críticos & 1 Estabilizado)
  in: { name: 'Índia', region: 'Ásia', capacity: 45000, saturation: 12, injected: 0, initial: 12 },
  cn: { name: 'China', region: 'Ásia', capacity: 55000, saturation: 25, injected: 0, initial: 25 },
  id: { name: 'Indonésia', region: 'Ásia', capacity: 28000, saturation: 15, injected: 0, initial: 15 },
  pk: { name: 'Paquistão', region: 'Ásia', capacity: 24000, saturation: 10, injected: 0, initial: 10 },
  vn: { name: 'Vietnã', region: 'Ásia', capacity: 18000, saturation: 30, injected: 0, initial: 30 },
  th: { name: 'Tailândia', region: 'Ásia', capacity: 17000, saturation: 32, injected: 0, initial: 32 },
  ph: { name: 'Filipinas', region: 'Ásia', capacity: 20000, saturation: 18, injected: 0, initial: 18 },
  jp: { name: 'Japão', region: 'Ásia', capacity: 40000, saturation: 80, injected: 0, initial: 80 },
  
  // Europa (Estabilizados & Emergentes)
  de: { name: 'Alemanha', region: 'Europa', capacity: 38000, saturation: 78, injected: 0, initial: 78 },
  fr: { name: 'França', region: 'Europa', capacity: 35000, saturation: 82, injected: 0, initial: 82 },
  it: { name: 'Itália', region: 'Europa', capacity: 30000, saturation: 65, injected: 0, initial: 65 },
  es: { name: 'Espanha', region: 'Europa', capacity: 28000, saturation: 55, injected: 0, initial: 55 },
  ua: { name: 'Ucrânia', region: 'Europa', capacity: 22000, saturation: 15, injected: 0, initial: 15 },
  ru: { name: 'Rússia', region: 'Europa', capacity: 45000, saturation: 20, injected: 0, initial: 20 },

  // América do Norte & Oceania (Estabilizados)
  us: { name: 'Estados Unidos', region: 'América do Norte', capacity: 60000, saturation: 60, injected: 0, initial: 60 },
  ca: { name: 'Canadá', region: 'América do Norte', capacity: 30000, saturation: 85, injected: 0, initial: 85 },
  au: { name: 'Austrália', region: 'Oceania', capacity: 28000, saturation: 70, injected: 0, initial: 70 },
  nz: { name: 'Nova Zelândia', region: 'Oceania', capacity: 15000, saturation: 90, injected: 0, initial: 90 }
};

// --- ESTADO GLOBAL DA APLICAÇÃO ---
let state = {
  energyBank: 5000, // Começa com 5000 MJ para o jogador testar
  carbonCredits: 0,
  totalDispatched: 0,
  countries: JSON.parse(JSON.stringify(INITIAL_COUNTRIES)),
  selectedCountryId: null,
  soundEnabled: true,
  theme: 'dark'
};

// --- CACHE DE ELEMENTOS DO DOM ---
const valGeneration = document.getElementById('val-generation');
const valEnergyBank = document.getElementById('val-energy-bank');
const valCarbonCredits = document.getElementById('val-carbon-credits');
const valAvgSaturation = document.getElementById('val-avg-saturation');
const valStableRatio = document.getElementById('val-stable-ratio');
const valGlobalFactor = document.getElementById('val-global-factor');

const dispNoSelection = document.getElementById('disp-no-selection');
const dispCountryDetails = document.getElementById('disp-country-details');
const dispCountryName = document.getElementById('disp-country-name');
const dispCountryRegion = document.getElementById('disp-country-region');
const dispCountryStatus = document.getElementById('disp-country-status');
const dispSaturationVal = document.getElementById('disp-saturation-val');
const dispProgressFill = document.getElementById('disp-progress-fill');
const dispCapacityVal = document.getElementById('disp-capacity-val');
const dispFactorVal = document.getElementById('disp-factor-val');
const dispInjectedVal = document.getElementById('disp-injected-val');

const dispatchForm = document.getElementById('dispatch-form');
const dispatchSlider = document.getElementById('dispatch-slider');
const dispatchSliderDisplay = document.getElementById('dispatch-slider-display');
const dispatchAmount = document.getElementById('dispatch-amount');
const btnDispatchSubmit = document.getElementById('btn-dispatch-submit');
const dispatchCostDisplay = document.getElementById('dispatch-cost-display');

const logContainer = document.getElementById('log-container');
const btnTheme = document.getElementById('btn-theme');
const themeText = document.getElementById('theme-text');
const btnSound = document.getElementById('btn-sound');
const soundText = document.getElementById('sound-text');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const btnReset = document.getElementById('btn-reset');

// --- SINTETIZADOR DE ÁUDIO (WEB AUDIO API) ---
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playBeep(frequency, duration, type = 'sine', volume = 0.1) {
  if (!state.soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.warn('Erro ao reproduzir áudio programático:', err);
  }
}

// Sons específicos do dashboard
const sounds = {
  click: () => playBeep(800, 0.08, 'sine', 0.08),
  success: () => {
    // Efeito sweep ascendente (carregamento de energia)
    playBeep(440, 0.3, 'triangle', 0.1);
    setTimeout(() => playBeep(554, 0.2, 'triangle', 0.1), 100);
    setTimeout(() => playBeep(659, 0.4, 'sine', 0.12), 200);
  },
  stable: () => {
    // Acorde maior brilhante (país estabilizado)
    playBeep(523.25, 0.15, 'sine', 0.1); // C5
    setTimeout(() => playBeep(659.25, 0.15, 'sine', 0.1), 80); // E5
    setTimeout(() => playBeep(783.99, 0.15, 'sine', 0.1), 160); // G5
    setTimeout(() => playBeep(1046.50, 0.4, 'sine', 0.15), 240); // C6
  },
  error: () => {
    playBeep(220, 0.15, 'sawtooth', 0.12);
    setTimeout(() => playBeep(180, 0.25, 'sawtooth', 0.12), 150);
  }
};

// --- LOG CONSOLE (TERMINAL) ---
function logToConsole(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  const line = document.createElement('div');
  line.className = 'log-line';
  
  let typeClass = '';
  if (type === 'success') typeClass = 'log-success';
  else if (type === 'warning') typeClass = 'log-warning';
  else if (type === 'error') typeClass = 'log-error';
  
  line.innerHTML = `<span class="log-time">[${timestamp}]</span> <span class="${typeClass}">${message}</span>`;
  logContainer.appendChild(line);
  
  // Rolar para baixo automaticamente
  logContainer.scrollTop = logContainer.scrollHeight;
}

// --- HISTÓRICO E GRÁFICO DO PAÍS (CHART.JS) ---
let countryChart = null;
const chartDataPoints = {}; // Guarda histórico de saturação para cada país

function initChart() {
  // Se a biblioteca Chart.js falhar em carregar do CDN, desativar silenciosamente
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js CDN não pôde ser carregado. Painel gráfico desativado.');
    logToConsole('Gráficos de análise técnica indisponíveis (modo offline).', 'warning');
    return;
  }

  try {
    const ctx = document.getElementById('country-history-chart').getContext('2d');
    
    // Criar dados vazios para o gráfico
    const labels = Array(8).fill('');
    const initialData = Array(8).fill(0);
    
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#06b6d4';

    countryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Saturação (%)',
          data: initialData,
          borderColor: accentColor,
          borderWidth: 2,
          pointBackgroundColor: accentColor,
          pointRadius: 2,
          tension: 0.3,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: 'rgba(255, 255, 255, 0.4)', font: { size: 9 } }
          },
          x: {
            grid: { display: false },
            ticks: { display: false }
          }
        }
      }
    });
  } catch (err) {
    console.error('Falha ao inicializar Chart.js:', err);
  }
}

function updateChart(countryId) {
  if (!countryChart) return;
  
  const history = chartDataPoints[countryId] || [];
  
  // Atualizar a linha com as últimas 8 medições
  const chartData = history.slice(-8);
  // Preencher com zeros à esquerda caso tenhamos menos que 8 registros
  while (chartData.length < 8) {
    chartData.unshift(history[0] || 0);
  }
  
  const themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const gridColor = document.body.classList.contains('light-theme') ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  const tickColor = document.body.classList.contains('light-theme') ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.4)';

  countryChart.data.datasets[0].data = chartData;
  countryChart.data.datasets[0].borderColor = themeAccent;
  countryChart.data.datasets[0].pointBackgroundColor = themeAccent;
  countryChart.options.scales.y.grid.color = gridColor;
  countryChart.options.scales.y.ticks.color = tickColor;
  countryChart.update();
}

function recordHistoryData() {
  Object.keys(state.countries).forEach(countryId => {
    if (!chartDataPoints[countryId]) {
      chartDataPoints[countryId] = [];
    }
    chartDataPoints[countryId].push(Math.round(state.countries[countryId].saturation));
    // Limitar histórico a 20 entradas por performance
    if (chartDataPoints[countryId].length > 20) {
      chartDataPoints[countryId].shift();
    }
  });
  
  // Se houver um país selecionado, atualizar seu gráfico imediatamente
  if (state.selectedCountryId) {
    updateChart(state.selectedCountryId);
  }
}

// --- LOCAL STORAGE E PERSISTÊNCIA ---
function saveState() {
  try {
    localStorage.setItem('antigravity_state', JSON.stringify({
      energyBank: state.energyBank,
      carbonCredits: state.carbonCredits,
      totalDispatched: state.totalDispatched,
      countries: state.countries,
      soundEnabled: state.soundEnabled,
      theme: state.theme
    }));
  } catch (e) {
    console.warn('Não foi possível salvar o estado no localStorage:', e);
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem('antigravity_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.energyBank = parsed.energyBank;
      state.carbonCredits = parsed.carbonCredits;
      state.totalDispatched = parsed.totalDispatched || 0;
      state.soundEnabled = parsed.soundEnabled ?? true;
      state.theme = parsed.theme || 'dark';
      
      // Mesclar estados para evitar falhas caso a modelagem dos países mude
      if (parsed.countries) {
        Object.keys(state.countries).forEach(id => {
          if (parsed.countries[id]) {
            state.countries[id].saturation = parsed.countries[id].saturation;
            state.countries[id].injected = parsed.countries[id].injected || 0;
          }
        });
      }
      
      // Aplicar tema carregado
      if (state.theme === 'light') {
        document.body.classList.add('light-theme');
        themeText.innerText = 'Modo Escuro';
      }
      
      // Aplicar som carregado
      updateSoundUI();
    }
  } catch (e) {
    console.error('Erro ao ler estado salvo:', e);
  }
}

// --- LÓGICA DE NEGÓCIO E INTERFACES ---

/**
 * Atualiza o painel de telemetria superior e outras métricas globais.
 */
function updateGlobalTelemetry() {
  // Odomêtros fluidos com número formatado
  valEnergyBank.innerHTML = `${state.energyBank.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size: 1rem; font-weight: 500;">MJ</span>`;
  valCarbonCredits.innerHTML = `${state.carbonCredits.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style="font-size: 1rem; font-weight: 500;">Créditos</span>`;

  // Cálculos globais
  const keys = Object.keys(state.countries);
  let totalSat = 0;
  let stableCount = 0;
  let totalFactorSum = 0;
  
  keys.forEach(id => {
    const sat = state.countries[id].saturation;
    totalSat += sat;
    totalFactorSum += getImpactFactor(sat);
    if (sat >= 76) stableCount++;
  });
  
  const avgSat = Math.round(totalSat / keys.length);
  const avgFactor = (totalFactorSum / keys.length).toFixed(2);
  
  valAvgSaturation.innerText = `${avgSat}%`;
  valStableRatio.innerText = `${stableCount} de ${keys.length} países estáveis`;
  valGlobalFactor.innerText = `Fator Médio: ${avgFactor}x`;

  // Se o país selecionado estiver ativo, atualiza o botão de despacho caso o banco mude
  if (state.selectedCountryId) {
    validateDispatchInput();
  }
}

/**
 * Exibe as informações do país ativo no painel lateral de distribuição.
 */
function selectCountry(countryId) {
  state.selectedCountryId = countryId;
  const country = state.countries[countryId];
  if (!country) return;

  sounds.click();

  // Ocultar placeholder e exibir formulário
  dispNoSelection.style.display = 'none';
  dispCountryDetails.style.display = 'flex';

  // Injetar dados básicos
  dispCountryName.innerText = country.name;
  dispCountryRegion.innerText = country.region;
  dispCapacityVal.innerText = `${country.capacity.toLocaleString('pt-BR')} MJ`;
  dispInjectedVal.innerText = `${Math.round(country.injected).toLocaleString('pt-BR')} MJ`;

  // Slider do formulário
  dispatchSlider.max = Math.min(state.energyBank, Math.ceil(country.capacity * (1 - country.saturation / 100)));
  if (dispatchSlider.max < 50) dispatchSlider.max = 50;
  dispatchSlider.value = Math.min(500, dispatchSlider.max);
  dispatchAmount.value = dispatchSlider.value;
  updateDispatchCostLabels();

  // Atualizar barra de progresso e status
  updateCountryProgressUI(country);
  updateChart(countryId);
}

/**
 * Atualiza apenas os elementos visuais do progresso do país selecionado.
 */
function updateCountryProgressUI(country) {
  const satVal = Math.round(country.saturation);
  const factor = getImpactFactor(country.saturation);
  const category = getSaturationCategory(country.saturation);

  dispSaturationVal.innerText = `${satVal}%`;
  dispFactorVal.innerText = `${factor.toFixed(1)}x`;

  // Barra de progresso
  dispProgressFill.style.width = `${satVal}%`;
  
  // Alterar cor da barra e badge conforme status
  dispCountryStatus.className = `country-status-badge status-${category}`;
  dispCountryStatus.innerText = category;

  if (category === 'critico') {
    dispProgressFill.style.backgroundColor = 'var(--color-critical)';
  } else if (category === 'transição') {
    dispProgressFill.style.backgroundColor = 'var(--color-transition)';
  } else {
    dispProgressFill.style.backgroundColor = 'var(--color-stabilized)';
  }
}

/**
 * Atualiza o label do custo de despacho com base no input atual.
 */
function updateDispatchCostLabels() {
  const value = parseInt(dispatchAmount.value) || 0;
  dispatchSliderDisplay.innerText = `${value.toLocaleString('pt-BR')} MJ`;
  dispatchCostDisplay.innerText = `(${value.toLocaleString('pt-BR')} MJ)`;
  validateDispatchInput();
}

/**
 * Valida o input manual de despacho e habilita/desabilita o botão.
 */
function validateDispatchInput() {
  const value = parseInt(dispatchAmount.value) || 0;
  
  if (value <= 0) {
    btnDispatchSubmit.disabled = true;
    return;
  }

  if (value > state.energyBank) {
    btnDispatchSubmit.disabled = true;
    dispatchCostDisplay.innerText = '(Saldo Insuficiente)';
    dispatchCostDisplay.style.color = 'var(--color-critical)';
  } else {
    btnDispatchSubmit.disabled = false;
    dispatchCostDisplay.style.color = '';
  }
}

/**
 * Realiza o despacho de energia para o país selecionado.
 */
function executeDispatch() {
  const countryId = state.selectedCountryId;
  const country = state.countries[countryId];
  if (!country) return;

  const energyToDispatch = parseInt(dispatchAmount.value) || 0;
  if (energyToDispatch <= 0 || energyToDispatch > state.energyBank) {
    sounds.error();
    return;
  }

  // Obter estados antes da injeção
  const oldSaturation = country.saturation;
  const oldCategory = getSaturationCategory(oldSaturation);
  const factor = getImpactFactor(oldSaturation);

  // Fazer os cálculos de ESG
  const creditsGenerated = calculateCarbonCredits(energyToDispatch, oldSaturation);
  const satIncrease = calculateSaturationIncrease(energyToDispatch, country.capacity);

  // Atualizar estado
  state.energyBank -= energyToDispatch;
  state.carbonCredits += creditsGenerated;
  state.totalDispatched += energyToDispatch;
  
  country.injected += energyToDispatch;
  country.saturation = Math.min(100, country.saturation + satIncrease);
  
  const newSaturation = country.saturation;
  const newCategory = getSaturationCategory(newSaturation);

  // Efeitos Sonoros e de Log
  if (newSaturation >= 76 && oldSaturation < 76) {
    sounds.stable();
    logToConsole(`[ESTABILIZAÇÃO] A rede de ${country.name} foi 100% estabilizada! Matriz limpa consolidada.`, 'success');
  } else {
    sounds.success();
  }

  logToConsole(`Enviado +${energyToDispatch.toLocaleString('pt-BR')} MJ para ${country.name}. Fator ESG: ${factor.toFixed(1)}x. Gerou +${creditsGenerated.toLocaleString('pt-BR')} Créditos ESG.`, 'success');

  // Atualizar interface
  updateGlobalTelemetry();
  updateCountryProgressUI(country);
  dispInjectedVal.innerText = `${Math.round(country.injected).toLocaleString('pt-BR')} MJ`;
  
  // Atualizar cor no mapa de calor
  updateMapColors(state.countries);

  // Registrar histórico e atualizar gráfico
  if (!chartDataPoints[countryId]) chartDataPoints[countryId] = [];
  chartDataPoints[countryId][chartDataPoints[countryId].length - 1] = Math.round(newSaturation); // Sobrescreve o último ponto gravado com a injeção
  updateChart(countryId);

  // Reajustar limites de sliders
  const maxNeeded = Math.ceil(country.capacity * (1 - country.saturation / 100));
  dispatchSlider.max = Math.min(state.energyBank, maxNeeded > 0 ? maxNeeded : 0);
  if (dispatchSlider.max < 50) dispatchSlider.max = 50;
  dispatchSlider.value = Math.min(energyToDispatch, dispatchSlider.max);
  dispatchAmount.value = dispatchSlider.value;
  updateDispatchCostLabels();

  saveState();
}

// --- LOOPS DE SIMULAÇÃO (MOTOR PRINCIPAL) ---

/**
 * Loop de Geração Contínua de Energia (6.67 MJ por segundo / 400 MJ por minuto).
 */
function startGenerationLoop() {
  const generationPerSec = 400 / 60; // 6.67 MJ/s
  
  setInterval(() => {
    state.energyBank += generationPerSec;
    updateGlobalTelemetry();
  }, 1000);
}

/**
 * Loop de Decaimento de Saturação (Simula o aumento de consumo fóssil/demanda).
 * Roda a cada 8 segundos e reduz levemente a saturação de nações aleatórias.
 */
function startConsumptionDecayLoop() {
  setInterval(() => {
    let stateChanged = false;
    const countryIds = Object.keys(state.countries);
    
    countryIds.forEach(id => {
      const country = state.countries[id];
      
      // 35% de chance de decaimento de carga a cada ciclo
      if (Math.random() < 0.35) {
        const oldSaturation = country.saturation;
        const oldCategory = getSaturationCategory(oldSaturation);
        
        // Decaimento proporcional ao tamanho da rede (países maiores decaem ligeiramente mais devagar)
        // Reduz entre 0.8% e 2.8% de saturação por ciclo
        const decayAmount = 0.8 + Math.random() * 2.0;
        country.saturation = Math.max(0, country.saturation - decayAmount);
        
        const newSaturation = country.saturation;
        const newCategory = getSaturationCategory(newSaturation);

        // Se o país mudou de categoria para baixo, alertar no log
        if (oldCategory !== newCategory) {
          stateChanged = true;
          if (newCategory === 'critico') {
            logToConsole(`[ALERTA REDE] Rede de ${country.name} decaiu para estado CRÍTICO (${Math.round(newSaturation)}% Sat). Demanda de combustíveis fósseis subindo!`, 'error');
            playBeep(290, 0.3, 'sine', 0.05); // Alerta sonoro sutil
          } else if (newCategory === 'transição' && oldCategory === 'estabilizado') {
            logToConsole(`[MANUTENÇÃO REQUERIDA] Matriz limpa em ${country.name} perdeu estabilização (${Math.round(newSaturation)}% Sat).`, 'warning');
          }
        }
      }
    });

    // Atualizar mapa se alguma carga decair
    updateMapColors(state.countries);
    
    // Gravar histórico para o gráfico
    recordHistoryData();

    // Se o país selecionado foi afetado, atualiza o formulário e detalhes em tempo real
    if (state.selectedCountryId) {
      updateCountryProgressUI(state.countries[state.selectedCountryId]);
    }
    
    saveState();
  }, 8000);
}

// --- EVENTOS E CONTROLADORES ---

function updateSoundUI() {
  if (state.soundEnabled) {
    soundText.innerText = 'Sons Ativos';
    soundIconOn.style.display = 'block';
    soundIconOff.style.display = 'none';
  } else {
    soundText.innerText = 'Sons Mudos';
    soundIconOn.style.display = 'none';
    soundIconOff.style.display = 'block';
  }
}

function registerEventListeners() {
  // Eventos de Input do Painel de Despacho
  dispatchSlider.addEventListener('input', (e) => {
    dispatchAmount.value = e.target.value;
    updateDispatchCostLabels();
  });

  dispatchAmount.addEventListener('input', (e) => {
    dispatchSlider.value = e.target.value;
    updateDispatchCostLabels();
  });

  dispatchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    executeDispatch();
  });

  // Tema Switcher (Dark/Light)
  btnTheme.addEventListener('click', () => {
    sounds.click();
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
      state.theme = 'light';
      themeText.innerText = 'Modo Escuro';
    } else {
      state.theme = 'dark';
      themeText.innerText = 'Modo Claro';
    }
    // Forçar atualização de grid e labels do gráfico com as novas cores CSS
    if (state.selectedCountryId) {
      updateChart(state.selectedCountryId);
    }
    saveState();
  });

  // Som Switcher (Mute/Unmute)
  btnSound.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    updateSoundUI();
    if (state.soundEnabled) {
      initAudio();
      sounds.click();
    }
    saveState();
  });

  // Reset Button
  btnReset.addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja apagar os inventários e resetar o dashboard corporativo?')) {
      localStorage.removeItem('antigravity_state');
      state.energyBank = 5000;
      state.carbonCredits = 0;
      state.totalDispatched = 0;
      state.countries = JSON.parse(JSON.stringify(INITIAL_COUNTRIES));
      state.selectedCountryId = null;
      
      // Limpar histórico dos gráficos
      Object.keys(chartDataPoints).forEach(id => {
        chartDataPoints[id] = [state.countries[id].saturation];
      });

      // Esconder painel de distribuição
      dispNoSelection.style.display = 'flex';
      dispCountryDetails.style.display = 'none';

      // Resetar visual do mapa
      updateMapColors(state.countries);
      const activePath = document.querySelector('.active-country');
      if (activePath) activePath.classList.remove('active-country');

      updateGlobalTelemetry();
      logToConsole('[REINICIALIZAÇÃO] Banco de energia e ativos ambientais redefinidos. Simulação reiniciada.', 'warning');
      sounds.error();
      saveState();
    }
  });
}

// --- INICIALIZAÇÃO DO SISTEMA ---
window.addEventListener('DOMContentLoaded', async () => {
  // 1. Carregar estado anterior do localStorage (se existir)
  loadState();

  // 2. Inicializar histórico inicial dos países para o gráfico
  Object.keys(state.countries).forEach(id => {
    chartDataPoints[id] = [Math.round(state.countries[id].saturation)];
  });

  // 3. Inicializar Componentes Visuais (Gráficos e Mapas)
  initChart();
  
  // Inicializar o mapa interativo
  const mapLoaded = await initMap(state.countries, selectCountry);
  if (mapLoaded) {
    logToConsole('Mapa geográfico interativo carregado com sucesso.', 'info');
  } else {
    // Caso o mapa falhe (ex: offline), garante que a tela de loading suma
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => loadingOverlay.style.display = 'none', 500);
    }
  }

  // 4. Registrar Listeners de Eventos
  registerEventListeners();

  // 5. Iniciar Simulação Principal (Loops Contínuos)
  startGenerationLoop();
  startConsumptionDecayLoop();

  // Registrar histórico inicial e fazer a primeira telemetria
  updateGlobalTelemetry();
  recordHistoryData();
  
  logToConsole('Rede ESG Antigravity ativada. Operando a 400 MJ/min.', 'success');
});
