// Estados da aplicação
let theme = localStorage.getItem("theme") || "light";
let notificationsOpen = false;
let faqOpen = false;
let chatOpen = false;
let messagesOpen = false;
let feedbackOpen = false;
let rating = 0;

// Dados simulados
const notifications = [
  "Nova atualização no sistema",
  "Seu pedido foi processado",
  "Lembrete: prazo para inscrição se encerra em breve"
];

const faqs = [
  "Como faço minha matrícula?",
  "Onde encontro meu boletim?",
  "Como entrar em contato com o suporte?"
];

const messages = [
  { id: 1, name: "Atendimento Suporte", message: "Olá! Como podemos ajudar?", avatar: "👨‍💼" },
  { id: 2, name: "Dúvidas sobre matrícula", message: "Qual é o prazo para inscrição?", avatar: "📅" },
  { id: 3, name: "Orientação acadêmica", message: "Quais matérias devo escolher?", avatar: "📚" }
];

// Função para renderizar o conteúdo
function render() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="container ${theme === "dark" ? "dark-mode" : ""}">
      <!-- Barra lateral -->
      <div class="sidebar">
        <div class="icon">🏠</div>
        <div class="icon" onclick="toggleNotifications()">🔔</div>
        <div class="icon" onclick="toggleTheme()">⚙️</div>
        <div class="icon" onclick="openMessages()">💬</div>
      </div>

      <!-- Conteúdo principal -->
      <div class="main-content">
        <h1>Apoio Estudantil</h1>
        <div class="buttons">
          <div class="button">Acompanhamento em tempo real →</div>
          <div class="button" onclick="openFeedback()">Feedback pós-solicitação →</div>
          <div class="button" onclick="openFaq()">Ir para FAQ →</div>
        </div>
      </div>

      <!-- Modal de notificações -->
      ${notificationsOpen ? `
        <div class="notifications-modal">
          ${notifications.map(note => `<p>${note}</p>`).join("")}
          <div class="button" onclick="toggleNotifications()">Fechar</div>
        </div>
      ` : ""}

      <!-- Modal de feedback -->
      ${feedbackOpen ? `
        <div class="feedback-modal">
          <div class="feedback-modal-content">
            <h2>Avaliação</h2>
            <p>Dê uma nota de 1 a 5:</p>
            <div class="stars">
              ${[1, 2, 3, 4, 5].map(num => `
                <span class="star ${rating >= num ? "active" : ""}" onclick="setRating(${num})">★</span>
              `).join("")}
            </div>
            <div class="buttons">
              <div class="button" onclick="closeFeedback()">Enviar</div>
              <div class="button" onclick="closeFeedback()">Cancelar</div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Botão flutuante do chat -->
      <div class="chat-button" onclick="toggleChat()">💬</div>
    </div>
  `;
}

// Funções de interação
function toggleNotifications() {
  notificationsOpen = !notificationsOpen;
  render();
}

function toggleTheme() {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  render();
}

function openFeedback() {
  feedbackOpen = true;
  render();
}

function closeFeedback() {
  feedbackOpen = false;
  render();
}

function setRating(num) {
  rating = num;
  render();
}

function toggleChat() {
  chatOpen = !chatOpen;
  render();
}

// Renderização inicial
render();