// ============================================
// CHATBOT COM IA
// ============================================

/**
 * Base de conhecimento sobre agronegócio sustentável
 * Respostas predefinidas para perguntas comuns
 */
const knowledgeBase = {
    'sustentabilidade': {
        keywords: ['sustentável', 'sustentabilidade', 'meio ambiente', 'ambiental'],
        response: 'A sustentabilidade no agronegócio é o equilíbrio entre produção agrícola e preservação ambiental. Envolve práticas que mantêm a produtividade enquanto protegem recursos naturais como água, solo e biodiversidade.'
    },
    'agua': {
        keywords: ['água', 'irrigação', 'hídrico', 'aquífero', 'chuva'],
        response: 'A água é essencial para a agricultura. O Brasil possui 12% da água doce do planeta. Práticas sustentáveis incluem irrigação por gotejamento, captação de chuva e proteção de nascentes. A eficiência hídrica reduz custos e impacto ambiental.'
    },
    'solo': {
        keywords: ['solo', 'terra', 'degradação', 'matéria orgânica', 'erosão'],
        response: 'Um solo saudável é a base da agricultura sustentável. Indicadores importantes incluem matéria orgânica adequada (>2%), estrutura estável e biodiversidade de microrganismos. O plantio direto e rotação de culturas ajudam a preservar a saúde do solo.'
    },
    'tecnologia': {
        keywords: ['tecnologia', 'inovação', 'drone', 'sensor', 'ia', 'precisão', 'digital'],
        response: 'Tecnologias sustentáveis incluem agricultura de precisão com drones e sensores, sistemas integrados (ILPF), rastreabilidade digital com blockchain e IoT. Essas inovações otimizam recursos e aumentam produtividade.'
    },
    'biodiversidade': {
        keywords: ['biodiversidade', 'ecossistema', 'polinização', 'praga', 'controle biológico'],
        response: 'A biodiversidade é crucial para a saúde agrícola. Áreas de preservação e corredores ecológicos promovem polinização natural e controle biológico de pragas, reduzindo a necessidade de pesticidas.'
    },
    'carbono': {
        keywords: ['carbono', 'emissão', 'clima', 'aquecimento', 'regenerativo'],
        response: 'Práticas regenerativas como plantio direto e ILPF sequestram carbono da atmosfera, contribuindo para mitigação das mudanças climáticas. Propriedades rurais podem funcionar como sumidouros de carbono.'
    },
    'agrinho': {
        keywords: ['agrinho', 'concurso', 'senar', 'seed', 'programação', 'scratch', 'html', 'javascript'],
        response: 'O Concurso Agrinho 2026 é promovido pelo SENAR-PR e SEED-PR para incentivar estudantes a explorar programação e tecnologia aplicadas ao agronegócio sustentável. Há subcategorias em Scratch e HTML/CSS/JavaScript.'
    },
    'economia': {
        keywords: ['economia', 'rentabilidade', 'custo', 'lucro', 'financeiro', 'viabilidade'],
        response: 'Propriedades que adotam práticas sustentáveis apresentam maior produtividade a longo prazo e menor custo operacional. A sustentabilidade não é apenas ambiental, mas também economicamente viável.'
    },
    'brasil': {
        keywords: ['brasil', 'brasileiro', 'paraná', 'agronegócio', 'agricultura'],
        response: 'O Brasil é um dos maiores produtores agrícolas do mundo. Com investimentos em pesquisa e tecnologia, pode se tornar líder global em agronegócio regenerativo, combinando produtividade com preservação ambiental.'
    },
    'futuro': {
        keywords: ['futuro', '2050', 'próxima geração', 'visão', 'transformação'],
        response: 'O futuro do agronegócio brasileiro depende de transformação profunda que integre sustentabilidade em cada aspecto. Estudantes como você, com habilidades em programação e pensamento computacional, serão os líderes dessa mudança.'
    }
};

/**
 * Respostas padrão para perguntas não reconhecidas
 */
const defaultResponses = [
    'Essa é uma ótima pergunta! Posso ajudar com informações sobre sustentabilidade, água, solo, tecnologias agrícolas ou o Concurso Agrinho. O que você gostaria de saber?',
    'Interessante! Você poderia ser mais específico? Posso falar sobre agricultura sustentável, inovações tecnológicas, recursos naturais ou o concurso.',
    'Entendo sua dúvida. Estou aqui para ajudar com tópicos sobre agronegócio sustentável. Qual aspecto interessa mais a você?',
    'Que pergunta legal! Para melhor ajudá-lo, poderia detalhar um pouco mais? Estou pronto para falar sobre qualquer aspecto da sustentabilidade agrícola.'
];

/**
 * Saudações e respostas iniciais
 */
const greetings = {
    'oi': 'Olá! Bem-vindo ao Assistente Agrinho! 👋 Como posso ajudá-lo hoje?',
    'olá': 'Olá! Sou o Assistente Agrinho, aqui para responder suas dúvidas sobre agronegócio sustentável. O que você gostaria de saber?',
    'opa': 'Opa! Tudo bem? Estou aqui para ajudar com informações sobre agricultura sustentável e o Concurso Agrinho 2026.',
    'e aí': 'E aí! Que legal você estar aqui! Posso responder perguntas sobre sustentabilidade, tecnologias agrícolas, água, solo e muito mais.',
    'tudo bem': 'Tudo certo! Obrigado por perguntar. Como posso ajudá-lo com informações sobre agronegócio sustentável?'
};

/**
 * Estado do chatbot
 */
const chatbotState = {
    isOpen: false,
    messageCount: 0,
    conversationHistory: []
};

// ============================================
// FUNÇÕES PRINCIPAIS DO CHATBOT
// ============================================

/**
 * Abre ou fecha o chatbot
 */
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotFab = document.getElementById('chatbotFab');

    chatbotState.isOpen = !chatbotState.isOpen;

    if (chatbotState.isOpen) {
        chatbotContainer.classList.add('active');
        chatbotFab.style.opacity = '0.7';
        
        // Se é a primeira abertura, mostra mensagem de boas-vindas
        if (chatbotState.messageCount === 0) {
            addBotMessage('Olá! 👋 Bem-vindo ao Assistente Agrinho! Sou aqui para responder suas dúvidas sobre agronegócio sustentável, tecnologias inovadoras e o Concurso Agrinho 2026. Como posso ajudá-lo?');
        }
    } else {
        chatbotContainer.classList.remove('active');
        chatbotFab.style.opacity = '1';
    }
}

/**
 * Adiciona mensagem do usuário
 * @param {string} message - Mensagem do usuário
 */
function addUserMessage(message) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message user';
    messageElement.textContent = message;
    
    chatbotMessages.appendChild(messageElement);
    
    // Scroll para a última mensagem
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Armazena no histórico
    chatbotState.conversationHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
    });
}

/**
 * Adiciona mensagem do bot
 * @param {string} message - Mensagem do bot
 */
function addBotMessage(message) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message bot';
    messageElement.textContent = message;
    
    chatbotMessages.appendChild(messageElement);
    
    // Scroll para a última mensagem
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Armazena no histórico
    chatbotState.conversationHistory.push({
        role: 'bot',
        content: message,
        timestamp: new Date()
    });
    
    chatbotState.messageCount++;
}

/**
 * Processa a entrada do usuário e gera resposta
 * @param {string} userInput - Entrada do usuário
 */
function processUserInput(userInput) {
    const normalizedInput = userInput.toLowerCase().trim();

    // Verifica se é uma saudação
    for (const [greeting, response] of Object.entries(greetings)) {
        if (normalizedInput.includes(greeting)) {
            addBotMessage(response);
            return;
        }
    }

    // Procura na base de conhecimento
    let foundResponse = false;
    for (const [category, data] of Object.entries(knowledgeBase)) {
        for (const keyword of data.keywords) {
            if (normalizedInput.includes(keyword)) {
                addBotMessage(data.response);
                foundResponse = true;
                break;
            }
        }
        if (foundResponse) break;
    }

    // Se não encontrou resposta, usa resposta padrão
    if (!foundResponse) {
        const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        addBotMessage(randomResponse);
    }
}

/**
 * Envia mensagem do chatbot
 */
function sendChatMessage() {
    const chatbotInput = document.getElementById('chatbotInput');
    const userMessage = chatbotInput.value.trim();

    if (userMessage === '') {
        return;
    }

    // Adiciona mensagem do usuário
    addUserMessage(userMessage);

    // Limpa o input
    chatbotInput.value = '';

    // Simula digitação do bot
    setTimeout(() => {
        processUserInput(userMessage);
    }, 500);
}

/**
 * Manipula Enter no input do chatbot
 * @param {Event} event - Evento do teclado
 */
function handleChatInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendChatMessage();
    }
}

// ============================================
// INICIALIZAÇÃO DO CHATBOT
// ============================================

/**
 * Inicializa o chatbot quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', function() {
    // Garante que o chatbot começa fechado
    const chatbotContainer = document.getElementById('chatbotContainer');
    chatbotContainer.classList.remove('active');

    // Adiciona listener ao botão de envio
    const chatbotSend = document.querySelector('.chatbot-send');
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendChatMessage);
    }

    // Adiciona listener ao input
    const chatbotInput = document.getElementById('chatbotInput');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', handleChatInput);
    }

    // Adiciona perguntas sobre Agrinho à base de conhecimento
    addAgrinhoPagesQuestions();

    console.log('✓ Chatbot Agrinho inicializado com sucesso');
});

/**
 * Adiciona perguntas específicas sobre as páginas do Agrinho
 */
function addAgrinhoPagesQuestions() {
    Object.assign(knowledgeBase, {
        'historia': {
            keywords: ['história', 'histórico', 'origem', 'quando começou', 'como surgiu'],
            response: 'O Concurso Agrinho nasceu da necessidade de conectar educação tecnológica com a realidade do agronegócio brasileiro. O SENAR-PR e SEED-PR uniram-se para criar uma plataforma que inspirasse jovens talentos a desenvolver soluções criativas para os desafios do setor agrícola.'
        },
        'missao': {
            keywords: ['missão', 'objetivo', 'propósito', 'meta'],
            response: 'A missão do Agrinho é incentivar e valorizar o ensino de tecnologia e programação, oportunizando aos estudantes desenvolverem e superarem desafios, colocando em prática conhecimentos em programação, robótica e pensamento computacional.'
        },
        'etapas': {
            keywords: ['etapas', 'fases', 'como funciona', 'processo'],
            response: 'O Agrinho é desenvolvido em três etapas: Etapa Escolar (desenvolvimento e avaliação na instituição), Etapa Regional (seleção dos melhores projetos) e Etapa Estadual (premiação dos projetos mais inovadores).'
        },
        'participacao': {
            keywords: ['participar', 'inscrição', 'como entrar', 'requisitos', 'critérios'],
            response: 'Para participar do Agrinho 2026, você deve estar matriculado na rede pública de ensino do Paraná e ter concluído o mínimo de 2 unidades no Ambiente Virtual de Aprendizagem da Alura. Escolha a subcategoria de acordo com sua série e linguagem de programação.'
        },
        'subcategorias': {
            keywords: ['subcategoria', 'scratch', 'html', 'css', 'javascript', 'linguagem'],
            response: 'Existem três subcategorias: Subcategoria 1 (Scratch para 6º e 7º anos), Subcategoria 2 (Scratch para 8º e 9º anos) e Subcategoria 3 (HTML, CSS e JavaScript para Ensino Médio). Escolha a que corresponde ao seu nível.'
        },
        'valores': {
            keywords: ['valores', 'princípios', 'o que acredita', 'filosofia'],
            response: 'Os valores fundamentais do Agrinho são: Educação (promover aprendizado em tecnologia), Sustentabilidade (integrar responsabilidade ambiental), Inovação (estimular criatividade) e Colaboração (conectar comunidades).'
        }
    });
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Limpa o histórico de conversa
 */
function clearChatHistory() {
    const chatbotMessages = document.getElementById('chatbotMessages');
    chatbotMessages.innerHTML = '';
    chatbotState.conversationHistory = [];
    chatbotState.messageCount = 0;
    addBotMessage('Conversa limpa! Como posso ajudá-lo?');
}

/**
 * Exporta o histórico de conversa
 */
function exportChatHistory() {
    const history = chatbotState.conversationHistory;
    let text = 'Histórico de Conversa - Assistente Agrinho\n';
    text += '=' .repeat(50) + '\n\n';

    history.forEach(msg => {
        const time = msg.timestamp.toLocaleTimeString('pt-BR');
        const role = msg.role === 'user' ? 'Você' : 'Assistente';
        text += `[${time}] ${role}:\n${msg.content}\n\n`;
    });

    return text;
}

/**
 * Adiciona sugestões de perguntas frequentes
 */
function showSuggestedQuestions() {
    const suggestions = [
        'O que é agronegócio sustentável?',
        'Como economizar água na agricultura?',
        'Quais são as tecnologias sustentáveis?',
        'Como participar do Concurso Agrinho?',
        'Como melhorar a saúde do solo?'
    ];

    console.log('Perguntas sugeridas:');
    suggestions.forEach((q, i) => {
        console.log(`${i + 1}. ${q}`);
    });
}

// ============================================
// INTEGRAÇÃO COM PÁGINA
// ============================================

/**
 * Abre o chatbot e foca no input
 */
function openChatbot() {
    if (!chatbotState.isOpen) {
        toggleChatbot();
    }
    
    setTimeout(() => {
        const chatbotInput = document.getElementById('chatbotInput');
        if (chatbotInput) {
            chatbotInput.focus();
        }
    }, 300);
}

/**
 * Fecha o chatbot
 */
function closeChatbot() {
    if (chatbotState.isOpen) {
        toggleChatbot();
    }
}

// Torna as funções disponíveis globalmente
window.toggleChatbot = toggleChatbot;
window.openChatbot = openChatbot;
window.closeChatbot = closeChatbot;
window.sendChatMessage = sendChatMessage;
window.handleChatInput = handleChatInput;