/**
 * Módulo de Visualização Geográfica (Mapa SVG Interativo)
 * Sistema Antigravity - ESG Clean Tech
 */

// Cache dos elementos DOM
const mapContainer = document.getElementById('map-container');
const tooltip = document.getElementById('map-tooltip');
const tooltipTitle = document.getElementById('tooltip-country-name');
const tooltipInfo = document.getElementById('tooltip-country-info');

// Estado interno do mapa
let activeCountryPath = null;
let countrySelectCallback = null;
let countriesDataRef = null;

// URL do mapa SVG do Mundo (Leve e responsivo com códigos ISO nos IDs)
const SVG_MAP_URL = 'https://cdn.jsdelivr.net/npm/@svg-maps/world@1.0.1/world.svg';

/**
 * Inicializa o mapa SVG, fazendo o download, injetando na tela e registrando os eventos.
 * @param {Object} countriesData Referência ao estado global dos países
 * @param {Function} onSelect Callback disparada ao clicar em um país
 */
async function initMap(countriesData, onSelect) {
  countriesDataRef = countriesData;
  countrySelectCallback = onSelect;

  try {
    // 1. Carregar o SVG do mapa mundial da CDN
    const response = await fetch(SVG_MAP_URL);
    if (!response.ok) throw new Error('Não foi possível carregar o mapa SVG.');
    const svgText = await response.text();

    // 2. Parsear a string SVG em elemento DOM
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');

    if (!svgElement) throw new Error('Documento SVG inválido.');

    // Ajustar atributos para responsividade e customização
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    svgElement.setAttribute('viewBox', '0 0 1008 651'); // ViewBox padrão da biblioteca
    svgElement.removeAttribute('style'); // Remove estilos em linha que possam quebrar CSS

    // Limpar contêiner e injetar o SVG
    mapContainer.innerHTML = '';
    mapContainer.appendChild(svgElement);

    // Esconder tela de loading principal
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => loadingOverlay.style.display = 'none', 500);
    }

    // 3. Configurar caminhos dos países
    const paths = svgElement.querySelectorAll('path');
    paths.forEach(path => {
      const countryId = path.getAttribute('id'); // ID é o ISO code em minúsculo (ex: "br")
      
      // Se o país fizer parte da nossa simulação de 30 países, pintar sua cor inicial
      if (countriesDataRef[countryId]) {
        const countryState = countriesDataRef[countryId];
        path.style.fill = getSaturationColor(countryState.saturation);
      } else {
        // Países que não estão ativos na simulação ficam com estilo neutro inativo
        path.style.fill = 'rgba(120, 120, 120, 0.08)';
        path.style.cursor = 'default';
        path.style.pointerEvents = 'none'; // Desabilita cliques nos inativos para foco do jogo
      }

      // Adicionar listeners apenas para os países ativos na simulação
      if (countriesDataRef[countryId]) {
        // Evento de clique
        path.addEventListener('click', (e) => {
          handleCountryClick(path, countryId);
        });

        // Evento de hover (mostrar tooltip)
        path.addEventListener('mousemove', (e) => {
          handleCountryHover(e, countryId);
        });

        // Evento de sair com o mouse (esconder tooltip)
        path.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });
      }
    });

    return true;
  } catch (error) {
    console.error('Erro na inicialização do mapa:', error);
    mapContainer.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: var(--color-critical);">
        <p>Erro ao carregar mapa mundial interativo.</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: var(--text-secondary);">${error.message}</p>
      </div>
    `;
    // Esconder o loading mesmo em caso de erro para não travar a aplicação
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => loadingOverlay.style.display = 'none', 500);
    }
    return false;
  }
}

/**
 * Trata o clique em um país no mapa, atualizando a classe visual e chamando o callback do App.
 */
function handleCountryClick(path, countryId) {
  // Remover classe de país ativo anterior
  if (activeCountryPath) {
    activeCountryPath.classList.remove('active-country');
  }

  // Definir novo país ativo
  activeCountryPath = path;
  activeCountryPath.classList.add('active-country');

  // Chamar o callback para carregar os detalhes no painel lateral
  if (countrySelectCallback) {
    countrySelectCallback(countryId);
  }
}

/**
 * Trata o hover sobre o país, atualizando e posicionando a tooltip flutuante.
 */
function handleCountryHover(event, countryId) {
  const country = countriesDataRef[countryId];
  if (!country) return;

  const satVal = Math.round(country.saturation);
  const factor = getImpactFactor(country.saturation).toFixed(1);
  const category = getSaturationCategory(country.saturation).toUpperCase();

  tooltipTitle.innerText = country.name;
  tooltipInfo.innerHTML = `
    <div>Saturação: <strong>${satVal}%</strong> (${category})</div>
    <div>Fator ESG: <strong>${factor}x</strong></div>
  `;

  // Obter posição relativa do mouse dentro do mapContainer
  const containerRect = mapContainer.getBoundingClientRect();
  const posX = event.clientX - containerRect.left;
  const posY = event.clientY - containerRect.top;

  tooltip.style.left = `${posX}px`;
  tooltip.style.top = `${posY}px`;
  tooltip.style.display = 'block';
}

/**
 * Atualiza visualmente as cores de todos os países ativos no mapa.
 * @param {Object} countriesData Estado atualizado de todos os países
 */
function updateMapColors(countriesData) {
  if (!mapContainer.querySelector('svg')) return;
  
  countriesDataRef = countriesData;
  const svg = mapContainer.querySelector('svg');

  Object.keys(countriesData).forEach(countryId => {
    const path = svg.getElementById(countryId);
    if (path) {
      const currentSaturation = countriesData[countryId].saturation;
      path.style.fill = getSaturationColor(currentSaturation);
    }
  });
}

/**
 * Define e destaca um país no mapa a partir de seu código ISO externo (ex: ao clicar no log ou gráfico).
 * @param {string} countryId Código ISO do país
 */
function selectCountryOnMap(countryId) {
  const svg = mapContainer.querySelector('svg');
  if (!svg) return;

  const path = svg.getElementById(countryId);
  if (path) {
    handleCountryClick(path, countryId);
  }
}
