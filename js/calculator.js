/**
 * Algoritmo de conversão de MJ para Crédito de Carbono e cálculo de Saturação.
<<<<<<< Updated upstream
 * Sistema Antigravity - ESG Clean Tech
=======
 * Sistema Laeleworld - ESG Clean Tech
>>>>>>> Stashed changes
 */

// Fatores de impacto com base no estado da nação
const IMPACT_FACTORS = {
  CRITICAL: 3.0,     // 0% - 30% saturação
  TRANSITION: 1.5,   // 31% - 75% saturação
  STABILIZED: 1.0    // 76% - 100% saturação
};

/**
 * Retorna o fator de impacto regional correspondente à saturação atual do país.
 * @param {number} saturation Porcentagem de saturação (0 a 100)
 * @returns {number} Fator de Impacto
 */
function getImpactFactor(saturation) {
  if (saturation <= 30) {
    return IMPACT_FACTORS.CRITICAL;
  } else if (saturation <= 75) {
    return IMPACT_FACTORS.TRANSITION;
  } else {
    return IMPACT_FACTORS.STABILIZED;
  }
}

/**
 * Retorna a classificação textual do estado de saturação.
 * @param {number} saturation Porcentagem de saturação (0 a 100)
 * @returns {string} Categoria de estado ('crítico', 'transição' ou 'estabilizado')
 */
function getSaturationCategory(saturation) {
  if (saturation <= 30) {
    return 'crítico';
  } else if (saturation <= 75) {
    return 'transição';
  } else {
    return 'estabilizado';
  }
}

/**
 * Calcula a cor hexadecimal correspondente ao nível de saturação atual (Red -> Orange -> Yellow -> Green).
 * @param {number} saturation Porcentagem de saturação (0 a 100)
 * @returns {string} Cor CSS em formato HSL ou Hex
 */
function getSaturationColor(saturation) {
  // Transições graduais baseadas em HSL (0 = Vermelho, 35 = Laranja, 60 = Amarelo, 120 = Verde)
  let hue;
  if (saturation <= 30) {
    // Escala de vermelho a laranja avermelhado (0 a 20)
    hue = (saturation / 30) * 20;
  } else if (saturation <= 75) {
    // Escala de laranja a amarelo (20 a 60)
    hue = 20 + ((saturation - 30) / 45) * 40;
  } else {
    // Escala de amarelo a verde (60 a 120)
    hue = 60 + ((saturation - 75) / 25) * 60;
  }
  return `hsl(${hue}, 85%, 45%)`;
}

/**
 * Calcula o acréscimo de saturação de um país a partir de uma injeção de energia (MJ).
 * @param {number} injectedEnergy Energia injetada em Megajoules (MJ)
 * @param {number} capacity Capacidade total do país em MJ
 * @returns {number} Porcentagem a ser adicionada
 */
function calculateSaturationIncrease(injectedEnergy, capacity) {
  if (capacity <= 0) return 0;
  return (injectedEnergy / capacity) * 100;
}

/**
 * Calcula os créditos de carbono gerados pela injeção de energia.
 * @param {number} injectedEnergy Energia injetada em Megajoules (MJ)
 * @param {number} currentSaturation Saturação atual do país (antes da injeção)
 * @returns {number} Créditos de Carbono gerados
 */
function calculateCarbonCredits(injectedEnergy, currentSaturation) {
  const factor = getImpactFactor(currentSaturation);
  return injectedEnergy * factor;
}
