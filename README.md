<<<<<<< Updated upstream
# Antigravity — ESG Clean Tech Dashboard
=======
# Laeleworld — ESG Clean Tech Dashboard
>>>>>>> Stashed changes

Plataforma integrada de simulação para produtores de energia solar gerenciarem excedentes de produção, simularem a distribuição de energia limpa em redes internacionais (com foco em países emergentes) e mensurarem o impacto socioeconômico através da geração de Créditos de Carbono baseados em ESG.

Esta aplicação foi desenvolvida em HTML5 estático, CSS3 moderno (Vanilla) e JavaScript puro (ES6 Modules) para máxima performance e compatibilidade, pronta para deploy contínuo no **Vercel** e controle de versão via **GitHub Desktop**.

---

## 🚀 Divisão de Tarefas da Dupla (Dev Plan)

Para viabilizar o desenvolvimento ágil em equipe e evitar conflitos de mesclagem (merge conflicts), o projeto foi estruturado em módulos independentes:

### 🧑‍💻 Desenvolvedor A: UI/UX, Estilização & Componente Geográfico
*   **Estrutura Semântica (`index.html`):** Desenhou o esqueleto do dashboard com seções dedicadas a telemetria, mapa global, console de logs, modais de interação e controles de tema/áudio.
*   **Design System (`css/dashboard.css`):** Criou o design corporativo Clean Tech com variáveis de HSL suportando Dark Mode e Light Mode. Implementou efeitos de *glassmorphism*, responsividade completa (Mobile, Tablet, Desktop) e animações suaves de transição.
*   **Módulo do Mapa (`js/geoMap.js`):** Codificou o carregamento assíncrono do mapa mundial SVG a partir de CDN pública (`@svg-maps/world`), adicionou eventos de hover (tooltip com dados) e clique para seleção de países, e a função para pintar dinamicamente os países de acordo com o índice de saturação.

### 🧑‍💻 Desenvolvedor B: Lógica de Simulação, Motor do Jogo & Integração
*   **Módulo de Cálculo (`js/calculator.js`):** Implementou os algoritmos de conversão de Megajoules (MJ) para créditos ESG, cálculo de saturação e a determinação de cores HSL graduais do mapa de calor.
*   **Fluxo Principal e Estados (`js/app.js`):**
    *   Montou o banco de dados inicial contendo 31 países com foco em economias emergentes.
    *   Implementou o loop infinito de geração contínua ($6.67\text{ MJ/s}$).
    *   Desenvolveu a simulação de demanda flutuante (decaimento periódico da rede a cada 8 segundos).
    *   Integrou o salvamento de progresso automático via `localStorage`.
    *   Estruturou o sintetizador de áudio programático (Web Audio API) para feedback de despacho e alertas sem usar arquivos externos.
    *   Acoplou a biblioteca Chart.js para exibição de histórico de saturação por país.
*   **Documentação (`README.md`):** Redigiu o manual de usuário, fórmulas matemáticas e instruções de deploy.

---

## 📐 Regras de Negócio e Fórmulas Matemáticas

### 1. Dinâmica da Saturabilidade (Níveis de Rede)
Cada país ativo na simulação possui uma capacidade de rede em Megajoules (MJ) e um nível atual de Saturabilidade de Energia Limpa de 0% a 100%:
*   **Crítico (0% - 30% / Vermelho):** Alta demanda de energia fóssil. Países emergentes iniciam aqui. Fator ESG: **3.0x**
*   **Em Transição (31% - 75% / Laranja e Amarelo):** Infraestrutura energética em evolução. Fator ESG: **1.5x**
*   **Estabilizado (76% - 100% / Verde):** Matriz limpa consolidada. Fator ESG: **1.0x**

### 2. Conversão de Energia para Créditos ESG
A geração de créditos de carbono é diretamente proporcional aos Megajoules injetados e inversamente proporcional à eficiência energética atual (estimulando o foco em regiões críticas):
$$\text{Créditos ESG Gerados} = \text{MJ Injetados} \times \text{Fator ESG Regional}$$

*Exemplo:* Enviar $1.000\text{ MJ}$ para um país crítico (fator $3.0$) gera $3.000$ créditos ESG. Conforme o país é saturado com energia limpa e passa para o estado "Estabilizado", o fator cai organicamente para $1.0$.

### 3. Decaimento e Manutenção (Consumo)
A cada 8 segundos, o sistema simula o consumo de energia. Países têm 35% de chance de perder carga (entre $0.8\%$ e $2.8\%$ de saturação), exigindo monitoramento e manutenção contínua pelo painel de distribuição global.

---

## 🛠️ Como Executar Localmente

Como o projeto é construído em Vanilla JS utilizando módulos ES6 (`import`/`export`), o navegador exige que ele seja servido por um servidor web local (devido a restrições de CORS ao abrir arquivos locais `file://`).

Você pode rodar o projeto localmente com qualquer uma das seguintes opções:

### Opção A: Extensão Live Server (Recomendado no VS Code)
1. Instale a extensão **Live Server** no VS Code.
2. Clique em **Go Live** na barra inferior do editor ou clique com o botão direito no `index.html` e selecione *Open with Live Server*.

### Opção B: Servidor local via Python ou Node.js
Se você tiver o Python ou Node.js instalado na sua máquina, abra o terminal no diretório do projeto e execute:

*   **Python 3:**
    ```bash
    python -m http.server 8000
    ```
    Acesse no navegador: `http://localhost:8000`

*   **Node.js (NPM):**
    ```bash
    npx serve .
    ```
    Acesse no navegador: `http://localhost:3000`

---

## ☁️ Como Fazer Deploy no Vercel

O deploy da aplicação no Vercel é extremamente simples e leva menos de 2 minutos utilizando o GitHub Desktop e a integração direta da Vercel.

### Passo 1: Enviar seu código para o GitHub
1. Abra o **GitHub Desktop**.
2. Adicione este repositório local (`C:\Users\26012421\Documents\GitHub\odsgame`) no GitHub Desktop através do menu `File > Add local repository...`.
<<<<<<< Updated upstream
3. Escreva uma mensagem de commit (ex: "Initial commit: Antigravity Dashboard") e clique em **Commit to main**.
=======
3. Escreva uma mensagem de commit (ex: "Initial commit: Laeleworld Dashboard") e clique em **Commit to main**.
>>>>>>> Stashed changes
4. Clique em **Publish repository** para criar o repositório e subir o código no seu GitHub pessoal.

### Passo 2: Vincular o Repositório no Vercel
1. Acesse o painel da Vercel: [https://vercel.com/](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique no botão **Add New...** e escolha **Project**.
3. Na lista de repositórios do seu GitHub, selecione o repositório **odsgame** e clique em **Import**.
4. Nas configurações do projeto, a Vercel detectará automaticamente que se trata de uma aplicação estática (HTML/CSS/JS). Não altere nenhuma configuração de build.
5. Clique no botão **Deploy**.

Pronto! A Vercel gerará uma URL pública segura (com HTTPS) para o seu dashboard corporativo. Qualquer commit futuro que você fizer pelo GitHub Desktop atualizará a aplicação na Vercel automaticamente!
