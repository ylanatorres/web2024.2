// Estados da aplicação
let theme = localStorage.getItem("theme") || "light";
let chatbotOpen = false;
let chatbotMessages = [{ sender: "bot", text: "Olá! Como posso te ajudar hoje?" }];

// Perguntas sugeridas
const suggestedQuestions = [
  "Como entrar em contato com o suporte?",
  "Quais documentos são necessários para a inscrição?",
  "Como acompanhar minha solicitação de auxílio?"
];

// Respostas predefinidas do chatbot
const chatbotResponses = {
  "como entrar em contato com o suporte?": ["O suporte está disponível via e-mail e telefone."],
  "quais documentos são necessários para a inscrição?": ["Você precisa de RG, CPF e comprovante de residência."],
  "como acompanhar minha solicitação de auxílio?": ["Verifique na aba 'Meus Pedidos' dentro do portal do estudante."]
};

// Renderizar o chatbot
function renderChatbot() {
  return `
    <div class='chatbot-window ${chatbotOpen ? "active" : ""}'>
      <div class='chatbot-header'>
        Suporte Virtual <span class="close-chat" onclick='toggleChatbot()'>✖</span>
      </div>
      <div class='chatbot-body'>
        ${chatbotMessages.map(msg => `
          <div class='chat-message ${msg.sender}'>${msg.text}</div>
        `).join('')}
        <div class='suggested-questions'>
          ${suggestedQuestions.map(q => `<div class='question' onclick='sendPredefinedMessage("${q}")'>${q}</div>`).join('')}
        </div>
      </div>
      <div class='chatbot-input'>
        <input type='text' id='chatbot-input' placeholder='Digite sua pergunta...' onkeypress='handleEnter(event)'/>
        <button onclick='sendChatbotMessage()'>Enviar</button>
      </div>
      <button class='reset-chat' onclick='resetChat()'>Reiniciar Chat</button>
    </div>
  `;
}

// Alternar chatbot
function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  render();
}

// Enviar mensagem para o chatbot
function sendChatbotMessage() {
  const input = document.getElementById("chatbot-input");
  if (!input) return;

  const userMessage = input.value.trim().toLowerCase();
  if (!userMessage) return;

  chatbotMessages.push({ sender: "user", text: input.value });
  input.value = "";

  const response = chatbotResponses[userMessage] || ["Desculpe, não tenho essa informação no momento."];
  chatbotMessages.push({ sender: "bot", text: response[Math.floor(Math.random() * response.length)] });

  render();
}

// Enviar perguntas predefinidas
function sendPredefinedMessage(question) {
  chatbotMessages.push({ sender: "user", text: question });
  const response = chatbotResponses[question.toLowerCase()] || ["Desculpe, não tenho essa informação no momento."];
  chatbotMessages.push({ sender: "bot", text: response[Math.floor(Math.random() * response.length)] });

  render();
}

// Reiniciar o chat
function resetChat() {
  chatbotMessages = [{ sender: "bot", text: "Olá! Como posso te ajudar hoje?" }];
  render();
}

// Permitir envio ao pressionar Enter
function handleEnter(event) {
  if (event.key === "Enter") sendChatbotMessage();
}

function renderFeedbackModal() {
  return `
    <div id="feedback-modal" class="feedback-modal">
      <div class="feedback-content">
        <h2>Feedback</h2>
        <p>Nos avalie e deixe seu comentário:</p>
        <div class="star-rating">
          <span class="star" onclick="setRating(1)">★</span>
          <span class="star" onclick="setRating(2)">★</span>
          <span class="star" onclick="setRating(3)">★</span>
          <span class="star" onclick="setRating(4)">★</span>
          <span class="star" onclick="setRating(5)">★</span>
        </div>
        <textarea id="feedback-comment" placeholder="Digite seu comentário..."></textarea>
        <div class="feedback-buttons">
          <button onclick="submitFeedback()">Enviar</button>
          <button onclick="toggleFeedbackModal()">Fechar</button>
        </div>
      </div>
    </div>
  `;
}

// Função para exibir/esconder a modal
function toggleFeedbackModal() {
  const modal = document.getElementById("feedback-modal");
  if (modal) {
      modal.classList.toggle("active");
  }
}

// Variável para armazenar a avaliação
let selectedRating = 0;

// Função para definir a quantidade de estrelas clicadas
function setRating(stars) {
  selectedRating = stars;
  const starElements = document.querySelectorAll(".star");
  starElements.forEach((star, index) => {
      star.style.color = index < stars ? "#FFD700" : "#ccc";
  });
}

// Função para enviar o feedback
function submitFeedback() {
  const comment = document.getElementById("feedback-comment").value;
  alert(`Obrigado pelo feedback! Avaliação: ${selectedRating} estrelas\nComentário: ${comment}`);
  toggleFeedbackModal();
}

// Função para renderizar a modal de notificações
function renderNotifications() {
  return `
    <div id="notification-modal" class="notification-modal">
      <div class="notification-content">
        <p>Nova atualização no sistema</p>
        <p>Seu pedido foi processado</p>
        <p>Lembrete: prazo para inscrição se encerra em breve</p>
        <button onclick="toggleNotifications()">Fechar</button>
      </div>
    </div>
  `;
}

// Alternar exibição da modal de notificações
function toggleNotifications() {
  const modal = document.getElementById("notification-modal");
  if (modal) {
      modal.classList.toggle("active");
  }
}

function renderFAQ() {
  return `
    <div id="faq-modal" class="faq-modal">
      <div class="faq-content">
        <h2>Perguntas Frequentes</h2>
        <div class="faq-list">
          ${faqData.map(item => `
            <div class="faq-item">
              <button class="faq-question" onclick="toggleFAQAnswer(this)">
                ${item.question}
              </button>
              <p class="faq-answer">${item.answer}</p>
            </div>
          `).join('')}
        </div>
        <button class="faq-close" onclick="toggleFAQModal()">Fechar</button>
      </div>
    </div>
  `;
}

// Dados de perguntas e respostas extraídos do relatório
const faqData = [
  { question: "Quais documentos são necessários para solicitar o auxílio?", answer: "Você precisa de RG, CPF e comprovante de residência." },
  { question: "Como acompanhar o status da minha solicitação?", answer: "O acompanhamento será feito por meio do portal do estudante." },
  { question: "Por que preciso reenviar documentos?", answer: "Os documentos podem ter sido enviados incompletos ou ilegíveis. Verifique a notificação recebida para mais detalhes." },
  { question: "Quanto tempo leva para minha solicitação ser analisada?", answer: "O prazo pode variar, mas normalmente a análise leva até 15 dias úteis." },
  { question: "Como entrar em contato com a equipe de assistência estudantil?", answer: "O suporte pode ser acessado via e-mail ou pelo telefone listado no portal do estudante." },
  { question: "O sistema enviará notificações sobre minha solicitação?", answer: "Sim, as notificações serão enviadas por e-mail ou WhatsApp, dependendo da sua configuração de preferência." }
];

// Alternar exibição da modal FAQ
function toggleFAQModal() {
  const modal = document.getElementById("faq-modal");
  if (modal) {
      modal.classList.toggle("active");
  }
}

// Expandir ou recolher resposta ao clicar na pergunta
function toggleFAQAnswer(button) {
  const answer = button.nextElementSibling;
  answer.style.display = answer.style.display === "block" ? "none" : "block";
}

function render() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="container ${theme === "dark" ? "dark-mode" : ""}">
      <div class="sidebar">
        <div class="icon">🏠</div>
        <div class="icon notification" onclick="toggleNotifications()">🔔</div>
        <div class="icon">⚙️</div>
        <div class="icon faq" onclick="toggleFAQModal()">❓</div>
      </div>
      <div class="main-content">
        <h1>Apoio Estudantil</h1>
        <div class="buttons">
          <button class="button">Acompanhamento em tempo real</button>
          <button class="button" onclick="toggleFeedbackModal()">Feedback pós solicitação</button>
          <button class="button" onclick="window.location.href='cadastro.html'">Cadastro</button>
        </div>
        <div class="chat-button" onclick="toggleChatbot()">💬</div>
      </div>
      ${renderChatbot()}
      ${renderNotifications()}
      ${renderFeedbackModal()}
      ${renderFAQ()}
    </div>
  `;
}

function handleCadastro(event) {
    event.preventDefault(); // Impede a pagina inicial de ser sempre renderizada acima da tela de cadastro
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
  
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    const usuario = {
      nome,
      email,
      cpf,
      matricula,
      senha
    };
  
    // Armazenamento local (localStorage)
    localStorage.setItem('usuario', JSON.stringify(usuario));
  
    alert('Cadastro realizado com sucesso!');
  
    // Redireciona manualmente para a tela inicial após o cadastro
    window.location.href = 'index.html';
  }

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se estamos na página inicial (index.html)
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
      render(); // Renderiza a tela inicial
    }
  });