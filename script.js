// =====================================================
// ASSISTENTE DE PLANOS VIA 1 - V1.1
// PLANOS DE SAÚDE E ODONTOLÓGICO
// =====================================================

const atendimento = {
  nome: "",
  cpf: "",
  empresa: "",
  area: "",
  operadora: "",
  assunto: "",
  tipoProblema: "",
  descricaoProblema: "",
  historico: [],
  inicio: new Date(),
  fim: null,
  resultado: ""
};

let chat = null;
// =====================================================
// CONFIGURAÇÃO DO ENVIO POR E-MAIL
// =====================================================
// O envio é feito pelo aplicativo de e-mail configurado no computador
// através de um link mailto.
const EMAIL_DESTINATARIO = "beneficios@grupovia1.com.br";

// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  chat = document.getElementById("chat");

  if (!chat) {
    console.error("Elemento #chat não encontrado.");
    return;
  }

  telaIdentificacao();
});

// =====================================================
// FUNÇÕES BÁSICAS
// =====================================================

function limparChat() {
  chat.innerHTML = "";
}

function escaparHTML(texto) {
  if (texto === null || texto === undefined) {
    return "";
  }

  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function botaoDocumento(caminho, titulo) {
  return `
    <div class="document-card">
      <div class="document-card-title">📄 ${escaparHTML(titulo)}</div>
      <a class="document-btn" href="${caminho}" target="_blank" rel="noopener noreferrer">
        Abrir documento
      </a>
    </div>
  `;
}

function listaDocumentos(titulo, documentos) {
  return `
    <div class="documents-box">
      <strong>${escaparHTML(titulo)}</strong>
      <div class="documents-grid">
        ${documentos.map(doc => botaoDocumento(doc.caminho, doc.titulo)).join('')}
      </div>
    </div>
  `;
}

function registrarHistorico(mensagem) {
  atendimento.historico.push({
    data: new Date(),
    mensagem
  });
}

// =====================================================
// IDENTIFICAÇÃO
// =====================================================

function telaIdentificacao() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">👋 Olá!</div>

      <p>
        Sou o <strong>Assistente de Planos VIA 1</strong>.
      </p>

      <p>
        Este canal é exclusivo para informações sobre
        <strong>Planos de Saúde e Odontológico</strong>.
      </p>

      <div class="info-box">
        Para começarmos, preciso de algumas informações.
      </div>
    </div>

    <div class="form-group">
      <label>Nome completo</label>
      <input
        type="text"
        id="nome"
        placeholder="Digite seu nome completo"
      >
    </div>

    <div class="form-group">
      <label>CPF</label>
      <input
        type="text"
        id="cpf"
        placeholder="Digite seu CPF"
      >
    </div>

    <div class="form-group">
      <label>Empresa / Marca</label>
      <input
        type="text"
        id="empresa"
        placeholder="Digite sua empresa ou marca"
      >
    </div>

    <button class="primary-btn" onclick="confirmarIdentificacao()">
      Continuar
    </button>
  `;
}

function confirmarIdentificacao() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const empresa = document.getElementById("empresa").value.trim();

  if (!nome || !cpf || !empresa) {
    alert("Preencha nome completo, CPF e Empresa/Marca.");
    return;
  }

  atendimento.nome = nome;
  atendimento.cpf = cpf;
  atendimento.empresa = empresa;
  atendimento.inicio = new Date();

  registrarHistorico("Identificação preenchida");

  telaConfirmacao();
}

// =====================================================
// CONFIRMAÇÃO
// =====================================================

function telaConfirmacao() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">📋 Confira seus dados</div>

      <div class="summary">
        <div class="summary-row">
          <span class="summary-label">Nome:</span><br>
          ${escaparHTML(atendimento.nome)}
        </div>

        <div class="summary-row">
          <span class="summary-label">CPF:</span><br>
          ${escaparHTML(atendimento.cpf)}
        </div>

        <div class="summary-row">
          <span class="summary-label">Empresa/Marca:</span><br>
          ${escaparHTML(atendimento.empresa)}
        </div>
      </div>

      <p>Os dados estão corretos?</p>
    </div>

    <div class="buttons">
      <button class="primary-btn" onclick="confirmarDados()">
        ✅ Sim, continuar
      </button>

      <button class="secondary-btn" onclick="telaIdentificacao()">
        ✏️ Corrigir
      </button>
    </div>
  `;
}

function confirmarDados() {
  registrarHistorico("Dados confirmados");
  telaArea();
}

// =====================================================
// ESCOLHA DA ÁREA
// =====================================================

function telaArea() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">Como posso ajudar?</div>

      <p>
        Selecione o tipo de plano que deseja consultar:
      </p>
    </div>

    <div class="menu-grid">
      <button
        class="menu-button"
        onclick="selecionarArea('Plano de Saúde')"
      >
        🏥 Plano de Saúde
      </button>

      <button
        class="menu-button"
        onclick="selecionarArea('Plano Odontológico')"
      >
        🦷 Plano Odontológico
      </button>

      <button
        class="menu-button"
        onclick="mostrarOutrasInformacoes()"
      >
        📚 Outras informações
      </button>
    </div>
  `;
}

function selecionarArea(area) {
  atendimento.area = area;

  registrarHistorico(`Área selecionada: ${area}`);

  if (area === "Plano de Saúde") {
    telaOperadoraSaude();
  } else {
    telaOperadoraOdonto();
  }
}

// =====================================================
// OUTRAS INFORMAÇÕES
// =====================================================

function mostrarOutrasInformacoes() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">📚 Outras informações</div>

      <p>
        Este Assistente é exclusivo para assuntos relacionados
        a <strong>Planos de Saúde e Odontológico</strong>.
      </p>

      <p>
        Para outros assuntos, utilize os contatos abaixo:
      </p>

      <div class="info-box">
        🍽️ <strong>Vale Alimentação/Refeição e Wellhub (Gympass)</strong><br>
        📱 Leticia Melo: (81) 99316-6918
      </div>

      <div class="info-box">
        ⏰ <strong>Batida de Ponto e Atestados</strong><br>
        📱 Marina Nascimento: (81) 98943-8860
      </div>

      <div class="info-box">
        🚌 <strong>Vale-Transporte</strong><br>
        📱 Willams: (81) 99462-5427
      </div>

      <div class="info-box">
        📋 <strong>Outros assuntos</strong><br>
        Procure o DP/Folha responsável pela sua Empresa/Marca.
      </div>
    </div>

    <button
      class="secondary-btn"
      onclick="telaArea()"
    >
      🔙 Voltar
    </button>
  `;
}

// =====================================================
// OPERADORA - SAÚDE
// =====================================================

function telaOperadoraSaude() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">🏥 Plano de Saúde</div>

      <p>
        Qual plano de saúde você deseja consultar?
      </p>
    </div>

    <div class="menu-grid">
      <button
        class="menu-button"
        onclick="selecionarOperadora('Hapvida')"
      >
        🏥 Hapvida
      </button>

      <button
        class="menu-button"
        onclick="selecionarOperadora('Amil')"
      >
        🏥 Amil
      </button>
    </div>

    <br>

    <button
      class="secondary-btn"
      onclick="telaArea()"
    >
      🔙 Voltar
    </button>
  `;
}

// =====================================================
// OPERADORA - ODONTO
// =====================================================

function telaOperadoraOdonto() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">🦷 Plano Odontológico</div>

      <p>
        Qual plano odontológico você deseja consultar?
      </p>
    </div>

    <div class="menu-grid">
      <button
        class="menu-button"
        onclick="selecionarOperadora('Hapvida')"
      >
        🦷 Hapvida Odonto
      </button>

      <button
        class="menu-button"
        onclick="selecionarOperadora('Porto Seguro')"
      >
        🦷 Porto Seguro Odonto
      </button>
    </div>

    <br>

    <button
      class="secondary-btn"
      onclick="telaArea()"
    >
      🔙 Voltar
    </button>
  `;
}

// =====================================================
// SELEÇÃO DA OPERADORA
// =====================================================

function selecionarOperadora(operadora) {
  atendimento.operadora = operadora;

  registrarHistorico(`Operadora selecionada: ${operadora}`);

  mostrarMenuPlano(
    operadora,
    atendimento.area === "Plano de Saúde"
      ? "saude"
      : "odonto"
  );
}

// =====================================================
// MENU DO PLANO
// =====================================================

function mostrarMenuPlano(operadora, tipo) {
  limparChat();

  const saude = tipo === "saude";

  let botoes = "";

  if (saude) {
    botoes = `
      <button class="menu-button" onclick="abrirAssunto('valores')">
        💰 Valores e planos
      </button>

      <button class="menu-button" onclick="abrirAssunto('adesao')">
        📝 Adesão
      </button>

      <button class="menu-button" onclick="abrirAssunto('dependente')">
        👨‍👩‍👧 Inclusão de dependente
      </button>

      <button class="menu-button" onclick="abrirAssunto('cancelamento')">
        ❌ Cancelamento
      </button>

      <button class="menu-button" onclick="abrirAssunto('carencia')">
        ⏳ Carência
      </button>

      <button class="menu-button" onclick="abrirAssunto('carteirinha')">
        💳 Carteirinha
      </button>
    `;

    // Rede credenciada somente para Amil
    if (operadora === "Amil") {
      botoes += `
        <button class="menu-button" onclick="abrirAssunto('rede')">
          🏥 Rede credenciada
        </button>
      `;
    }

    botoes += `
      <button class="menu-button" onclick="abrirAssunto('utilizacao')">
        💳 Coparticipação
      </button>

      <button class="menu-button" onclick="abrirAssunto('documentos')">
        📄 Documentos
      </button>

      <button class="menu-button" onclick="abrirTriagemProblema()">
        ⚠️ Estou com um problema
      </button>
    `;
  } else {
    if (operadora === "Hapvida") {
      botoes = `
        <button class="menu-button" onclick="abrirAssunto('valores')">
          💰 Valores
        </button>

        <button class="menu-button" onclick="abrirAssunto('carencia')">
          ⏳ Carência
        </button>

        <button class="menu-button" onclick="abrirAssunto('carteirinha')">
          💳 Carteirinha
        </button>

        <button class="menu-button" onclick="abrirAssunto('procedimentos')">
          🏥 Rede Credenciada
        </button>

        <button class="menu-button" onclick="abrirTriagemProblema()">
          ⚠️ Estou com um problema
        </button>
      `;
    } else {
      botoes = `
        <button class="menu-button" onclick="abrirAssunto('valores')">
          💰 Valores
        </button>

        <button class="menu-button" onclick="abrirAssunto('adesao')">
          📝 Adesão
        </button>

        <button class="menu-button" onclick="abrirAssunto('dependente')">
          👨‍👩‍👧 Inclusão de dependente
        </button>

        <button class="menu-button" onclick="abrirAssunto('cancelamento')">
          ❌ Cancelamento
        </button>

        <button class="menu-button" onclick="abrirAssunto('carencia')">
          ⏳ Carência
        </button>

        <button class="menu-button" onclick="abrirAssunto('carteirinha')">
          💳 Carteirinha
        </button>
      `;
    }

    // Hapvida Odonto e Porto Seguro Odonto possuem opção de rede credenciada.
    if (operadora === "Porto Seguro") {
      botoes += `
        <button class="menu-button" onclick="abrirAssunto('rede')">
          🏥 Rede Credenciada
        </button>
      `;
    }

    if (operadora === "Porto Seguro") {
      botoes += `
        <button class="menu-button" onclick="abrirAssunto('documentos')">
          📄 Documentos
        </button>

        <button class="menu-button" onclick="abrirTriagemProblema()">
          ⚠️ Estou com um problema
        </button>
      `;
    }
  }

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">
        ${saude ? "🏥" : "🦷"} ${escaparHTML(operadora)}
      </div>

      <p>
        Selecione o assunto que deseja consultar:
      </p>
    </div>

    <div class="menu-grid">
      ${botoes}
    </div>

    <br>

    <button
      class="secondary-btn"
      onclick="${saude ? "telaOperadoraSaude()" : "telaOperadoraOdonto()"}"
    >
      🔙 Voltar
    </button>
  `;
}

// =====================================================
// ABRIR ASSUNTO
// =====================================================

function abrirAssunto(assunto) {
  atendimento.assunto = assunto;

  registrarHistorico(
    `Assunto selecionado: ${tituloAssunto(assunto)}`
  );

  mostrarInformacao();
}

// =====================================================
// MOSTRAR INFORMAÇÃO
// =====================================================

function mostrarInformacao() {
  limparChat();

  const conteudo = obterInformacao(
    atendimento.operadora,
    atendimento.area === "Plano de Saúde",
    atendimento.assunto
  );

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">
        ${tituloAssunto(atendimento.assunto)}
      </div>

      ${conteudo}
    </div>

    <div class="feedback-box">
      <p>
        <strong>Essa informação resolveu sua dúvida?</strong>
      </p>

      <div class="buttons">
        <button
          class="primary-btn"
          onclick="respostaSim()"
        >
          ✅ Sim
        </button>

        <button
          class="secondary-btn"
          onclick="respostaNao()"
        >
          ❌ Não
        </button>
      </div>
    </div>
  `;
}

// =====================================================
// INFORMAÇÕES
// =====================================================

function obterInformacao(operadora, saude, assunto) {

  // =====================================================
  // HAPVIDA SAÚDE
  // =====================================================

  if (operadora === "Hapvida" && saude) {

    if (assunto === "valores") {
      return `
        <p>
          Os valores mensais do Plano de Saúde Hapvida, sem considerar o subsídio da empresa, são:
        </p>

        <div class="info-box">
          <strong>📍 Demais localidades</strong><br>
          🏥 <strong>Enfermaria: R$ 270,55</strong><br>
          🏥 <strong>Apartamento: R$ 303,82</strong>
        </div>

        <div class="info-box">
          <strong>📍 Residentes em Caruaru – PE</strong><br>
          🏥 <strong>Enfermaria: R$ 337,57</strong><br>
          🏥 <strong>Apartamento: R$ 472,59</strong>
        </div>

        <div class="info-box">
          📄 <strong>Taxa de adesão: R$ 29,56</strong> — cobrada uma única vez
        </div>

        <p>
          O Plano Odontológico Hapvida possui mensalidade de
          <strong>R$ 14,18</strong> e é aderido juntamente com o Plano de Saúde Hapvida.
        </p>

        <div class="info-box">
          <strong>💰 Participação da empresa conforme remuneração:</strong><br><br>
          • Até R$ 2.000,00 → R$ 100,00<br>
          • De R$ 2.000,01 até R$ 4.000,00 → R$ 90,00<br>
          • De R$ 4.000,01 até R$ 6.000,00 → R$ 80,00<br>
          • Acima de R$ 6.000,00 → R$ 40,00
        </div>
      `;
    }

    if (assunto === "adesao") {
      return `
        <p>
          Para adesão ao Plano de Saúde Hapvida, são necessários:
        </p>

        <ul class="document-list">
          <li>📄 Ficha de Adesão</li>
          <li>📄 Carta de Orientação ao Beneficiário</li>
          <li>📄 Declaração de Saúde</li>
          <li>🪪 RG e CPF</li>
          <li>💍 Certidão de casamento ou união estável, quando aplicável</li>
        </ul>

        <div class="info-box">
          Após preencher e assinar os documentos, envie para:
          <strong>${EMAIL_DESTINATARIO}</strong>
        </div>

        <p>
          O setor de Benefícios realizará a conferência e dará andamento
          ao processo de inclusão.
        </p>
      `;
    }

    if (assunto === "dependente") {
      return `
        <p>
          A inclusão de dependentes deve seguir o processo de adesão
          e a documentação exigida pela operadora.
        </p>

        <div class="info-box">
          Para confirmar os documentos necessários para o seu caso,
          utilize a opção <strong>Documentos</strong> ou fale com o
          Consultor de Planos VIA 1.
        </div>
      `;
    }

    if (assunto === "cancelamento") {
      return `
        <p>Para solicitar o cancelamento:</p>

        ${listaDocumentos("Formulário de cancelamento", [
          { titulo: "01 - Cancelamento - Planos", caminho: "Documentos/Cancelamento/01 - Cancelamento - Planos.pdf" }
        ])}

        <ol class="document-list">
          <li>Preencha todos os campos do formulário.</li>
          <li>Assine o documento.</li>
          <li>Envie para <strong>${EMAIL_DESTINATARIO}</strong>.</li>
        </ol>

        <div class="warning-box">
          O cancelamento será realizado após o recebimento e análise
          da documentação pelo setor de Benefícios.
        </div>
      `;
    }    if (assunto === "carencia") {
      return `
        <p>
          As carências informadas para o Hapvida são:
        </p>

        <div class="info-box">
          <strong>🚨 24 horas</strong><br>
          • Atendimento de urgência e emergência após o código de liberação.<br><br>

          <strong>📅 30 dias</strong><br>
          • Consultas;<br>
          • Exames simples.<br><br>

          <strong>📅 90 dias</strong><br>
          • Ultrassonografia;<br>
          • Endoscopia.<br><br>

          <strong>📅 180 dias</strong><br>
          • Exames complexos;<br>
          • Cirurgias;<br>
          • Ressonância magnética e procedimentos equivalentes.<br><br>

          <strong>👶 300 dias</strong><br>
          • Parto.
        </div>

        <div class="warning-box">
          As carências podem depender das condições de inclusão
          e do contrato aplicável.
        </div>
      `;
    }

    if (assunto === "carteirinha") {
      return `
        <p>
          Para acessar a sua <strong>Carteirinha Provisória Hapvida</strong>,
          utilize o portal oficial da Hapvida.
        </p>

        <div class="info-box">
          💳 <strong>Carteirinha Provisória Hapvida:</strong><br><br>
          <a href="https://www.hapvida.com.br/pls/webhap/pk_carteira_provisoria.login_usuario_form" target="_blank" rel="noopener noreferrer">
            Acessar Carteirinha Provisória Hapvida
          </a>
        </div>
      `;
    }

    if (assunto === "procedimentos") {
      return `
        <p>
          Para consultar a rede credenciada do Hapvida Odonto, acesse o portal oficial
          da Hapvida e selecione a rede odontológica correspondente ao seu benefício.
        </p>

        <div class="info-box">
          🔗 <strong>Rede Credenciada Hapvida Odonto:</strong><br><br>
          <button class="menu-button" type="button" onclick="window.open('https://www.hapvida.com.br/pls/podontow/webdentalredecredenciada.selecionaRede?pOrgAmb=2', '_blank', 'noopener,noreferrer')">
            🔗 Acessar Rede Credenciada Hapvida Odonto
          </button>
          <br>
          <small>
            Se o botão não abrir, copie e cole este endereço no navegador:<br>
            https://www.hapvida.com.br/pls/podontow/webdentalredecredenciada.selecionaRede?pOrgAmb=2
          </small>
        </div>
      `;
    }

    if (assunto === "utilizacao") {
      return `
        <p>
          O Plano de Saúde Hapvida possui coparticipação conforme
          os procedimentos realizados.
        </p>

        <div class="info-box">
          <strong>💳 Valores informados de coparticipação:</strong><br><br>
          • Consulta: R$ 25,89<br>
          • Urgência/emergência: R$ 43,15<br>
          • Exame simples: R$ 10,78<br>
          • Exame complexo: R$ 21,58
        </div>

        <p>
          Os valores são referentes à coparticipação informada
          para utilização do plano.
        </p>
      `;
    }

    if (assunto === "documentos") {
      return `
        <p>
          <strong>📄 Documentos para adesão ao Hapvida</strong>
        </p>

        ${listaDocumentos("Documentos disponíveis", [
          { titulo: "01 - Formulário de Adesão", caminho: "Documentos/Hapvida/01 - Formulário de Adesão.pdf" },
          { titulo: "02 - Declaração de Saúde", caminho: "Documentos/Hapvida/02 - Declaração de Saúde.pdf" },
          { titulo: "03 - Carta de Orientação", caminho: "Documentos/Hapvida/03 - Carta de Orientação.pdf" }
        ])}

        <div class="info-box">
          Após preencher e assinar os documentos, envie para:
          <strong>${EMAIL_DESTINATARIO}</strong>
        </div>
      `;
    }
  }

  // =====================================================
  // AMIL SAÚDE
  // =====================================================

  if (operadora === "Amil" && saude) {

    if (assunto === "valores") {
      return `
        <p>
          Os valores do Plano de Saúde Amil variam conforme
          o plano escolhido e a faixa etária.
        </p>

        <div class="info-box">
          <strong>Planos disponíveis:</strong><br>
          • Amil Prata<br>
          • Amil Ouro<br>
          • Amil S380<br>
          • Amil S450
        </div>

        <p><strong>📊 Valores por faixa etária:</strong></p>

        <div class="info-box">
          <strong>AMIL PRATA</strong><br><br>

          00–18: R$ 397,50 / R$ 441,23<br>
          19–23: R$ 465,07 / R$ 516,23<br>
          24–28: R$ 567,38 / R$ 629,80<br>
          29–33: R$ 680,85 / R$ 755,75<br>
          34–38: R$ 714,89 / R$ 793,55<br>
          39–43: R$ 786,38 / R$ 872,89<br>
          44–48: R$ 982,97 / R$ 1.091,12<br>
          49–53: R$ 1.081,27 / R$ 1.200,23<br>
          54–58: R$ 1.351,59 / R$ 1.500,29<br>
          59–100: R$ 2.365,27 / R$ 2.625,50
        </div>

        <div class="info-box">
          <strong>AMIL OURO</strong><br><br>

          00–18: R$ 508,31 / R$ 564,21<br>
          19–23: R$ 594,72 / R$ 660,13<br>
          24–28: R$ 725,55 / R$ 805,35<br>
          29–33: R$ 870,65 / R$ 966,42<br>
          34–38: R$ 914,19 / R$ 1.014,74<br>
          39–43: R$ 1.005,61 / R$ 1.116,21<br>
          44–48: R$ 1.257,01 / R$ 1.395,26<br>
          49–53: R$ 1.382,70 / R$ 1.534,78<br>
          54–58: R$ 1.728,38 / R$ 1.918,48<br>
          59–100: R$ 3.024,65 / R$ 3.357,34
        </div>

        <div class="info-box">
          <strong>AMIL S380</strong><br><br>

          00–18: R$ 445,19 / R$ 494,15<br>
          19–23: R$ 520,87 / R$ 578,15<br>
          24–28: R$ 635,46 / R$ 705,34<br>
          29–33: R$ 762,55 / R$ 846,40<br>
          34–38: R$ 800,68 / R$ 888,72<br>
          39–43: R$ 880,74 / R$ 977,59<br>
          44–48: R$ 1.100,93 / R$ 1.221,99<br>
          49–53: R$ 1.211,02 / R$ 1.344,18<br>
          54–58: R$ 1.513,78 / R$ 1.680,22<br>
          59–100: R$ 2.649,12 / R$ 2.940,37
        </div>

        <div class="info-box">
          <strong>AMIL S450</strong><br><br>

          00–18: R$ 569,32 / R$ 631,94<br>
          19–23: R$ 666,09 / R$ 739,38<br>
          24–28: R$ 812,64 / R$ 902,03<br>
          29–33: R$ 975,17 / R$ 1.082,44<br>
          34–38: R$ 1.023,92 / R$ 1.136,56<br>
          39–43: R$ 1.126,32 / R$ 1.250,21<br>
          44–48: R$ 1.407,90 / R$ 1.562,76<br>
          49–53: R$ 1.548,68 / R$ 1.719,03<br>
          54–58: R$ 1.935,86 / R$ 2.148,79<br>
          59–100: R$ 3.387,74 / R$ 3.760,38
        </div>

        <p>
          Os dois valores apresentados por faixa correspondem
          às condições cadastradas na base atual.
        </p>
      `;
    }

    if (assunto === "adesao") {
      return `
        <p>
          Para adesão ao Plano de Saúde Amil, são necessários:
        </p>

        <p><strong>📄 Titular</strong></p>

        <ul class="document-list">
          <li>Termo de Adesão e Autorização</li>
          <li>Declaração de Saúde</li>
          <li>E-Social</li>
          <li>RG e CPF ou CNH</li>
          <li>E-mail</li>
          <li>Telefone</li>
        </ul>

        <p><strong>📄 Dependente</strong></p>

        <ul class="document-list">
          <li>Declaração de Saúde</li>
          <li>RG e CPF ou CNH</li>
          <li>Certidão de casamento para cônjuge</li>
          <li>Certidão de nascimento para filho sem RG/CPF</li>
        </ul>

        <div class="info-box">
          No Termo de Adesão e Autorização devem ser informados
          o plano escolhido, a data e a assinatura.
        </div>

        <div class="info-box">
          Na Declaração de Saúde, todas as páginas devem ser assinadas
          e, na página 3, todas as perguntas sobre doenças ou condições
          preexistentes devem ser respondidas com <strong>SIM</strong> ou <strong>NÃO</strong>.
        </div>

        <p>
          Após o preenchimento, envie a documentação para:
          <strong>${EMAIL_DESTINATARIO}</strong>
        </p>
      `;
    }

    if (assunto === "dependente") {
      return `
        <p>
          Para inclusão de dependente no Amil, são necessários:
        </p>

        <ul class="document-list">
          <li>Declaração de Saúde</li>
          <li>RG e CPF ou CNH</li>
          <li>Certidão de casamento para cônjuge</li>
          <li>Certidão de nascimento para filho sem RG/CPF</li>
        </ul>

        <div class="info-box">
          A documentação deve ser enviada para
          <strong>${EMAIL_DESTINATARIO}</strong>.
        </div>
      `;
    }

    if (assunto === "cancelamento") {
      return `
        <p>Para solicitar o cancelamento:</p>

        ${listaDocumentos("Formulário de cancelamento", [
          { titulo: "01 - Cancelamento - Planos", caminho: "Documentos/Cancelamento/01 - Cancelamento - Planos.pdf" }
        ])}

        <ol class="document-list">
          <li>Preencha todos os campos do formulário de cancelamento.</li>
          <li>Assine o documento.</li>
          <li>Envie para <strong>${EMAIL_DESTINATARIO}</strong>.</li>
        </ol>

        <div class="warning-box">
          O cancelamento será realizado após o recebimento e análise
          da documentação pelo setor de Benefícios.
        </div>
      `;
    }

    if (assunto === "carencia") {
      return `
        <p>
          As carências informadas para o Amil seguem a
          <strong>PRC 606</strong>.
        </p>

        <div class="info-box">
          <strong>🚨 0 dia</strong><br>
          • Consulta em pronto-socorro.<br><br>

          <strong>📅 30 dias</strong><br>
          • Consultas eletivas em consultórios, clínicas ou centros médicos;<br>
          • Exames e procedimentos básicos em regime ambulatorial, exceto terapias.<br><br>

          <strong>📅 180 dias</strong><br>
          • Exames e procedimentos especiais;<br>
          • Endoscopia digestiva, respiratória e urológica;<br>
          • Ultrassonografia;<br>
          • TC e RNM;<br>
          • Neurorradiologia;<br>
          • Cardiografia;<br>
          • Mielografia;<br>
          • Radiologia intervencionista;<br>
          • Hemodinâmica;<br>
          • Procedimentos terapêuticos endoscópicos;<br>
          • Hemodinâmica terapêutica e angioplastias, quando não relacionadas a doenças preexistentes;<br>
          • Quimioterapia e radioterapia, quando não relacionadas a doenças preexistentes;<br>
          • Litotripsia;<br>
          • Videolaparoscopia e procedimentos videoassistidos;<br>
          • Artroscopia;<br>
          • Diálise ou hemodiálise, quando não relacionadas a doenças preexistentes;<br>
          • Hemoterapia.
        </div>
      `;
    }
      if (assunto === "carteirinha") {
      return `
        <p>
          As orientações específicas para acesso à carteirinha Amil
          ainda não estão cadastradas nesta versão.
        </p>

        <div class="warning-box">
          Para orientação sobre a carteirinha, fale com o
          <strong>Consultor de Planos VIA 1</strong>.
        </div>
      `;
    }

    if (assunto === "rede") {
      return `
        <p>
          A opção de <strong>Rede Credenciada</strong> está disponível
          para o Plano de Saúde Amil.
        </p>

        <div class="info-box">
          🔗 <strong>Consulta oficial da Rede Credenciada Amil:</strong><br><br>
          <a href="https://amil.com.br/portal/web/servicos/saude/rede-credenciada/amil/busca-avancada" target="_blank" rel="noopener noreferrer">
            Acessar busca avançada da Rede Credenciada Amil
          </a>
        </div>

        <p>
          A consulta será feita diretamente no portal oficial da Amil.
        </p>
      `;
    }

    if (assunto === "utilizacao") {
      return `
        <p>
          Os planos Amil Prata, Amil Ouro, Amil S380 e Amil S450
          possuem coparticipação de <strong>30%</strong>.
        </p>

        <div class="info-box">
          <strong>💳 Limites máximos por procedimento</strong><br><br>

          • Consulta eletiva: R$ 30,00<br>
          • Consulta pronto-socorro: R$ 60,00<br>
          • Exames básicos: R$ 25,00<br>
          • Exames especiais: R$ 110,00<br>
          • Procedimentos básicos: R$ 60,00<br>
          • Procedimentos especiais: R$ 150,00<br>
          • Terapias não médicas: R$ 60,00<br>
          • Diálise/Hemodiálise: sem cobrança<br>
          • Quimioterapia: sem cobrança<br>
          • Radioterapia: sem cobrança<br>
          • Internação: R$ 220,00
        </div>

        <div class="info-box">
          Em utilização de alguns desses planos nos Hospitais
          Santa Joana e Monte Klinikum, não haverá cobrança
          de coparticipação.
        </div>

        <p>
          Os valores apresentados são limites máximos por procedimento.
          Um exame básico, por exemplo, possui limite de R$ 25,00,
          mas um hemograma costuma ter coparticipação aproximada
          de R$ 2,00 a R$ 3,00, em média.
        </p>

        <p>
          <strong>Internação:</strong> R$ 220,00 corresponde à franquia
          de internação, cobrada uma única vez por internação.
        </p>
      `;
    }

    if (assunto === "documentos") {
      return `
        <p>
          <strong>📄 Documentos do Plano de Saúde Amil</strong>
        </p>

        ${listaDocumentos("Documentos disponíveis", [
          { titulo: "01 - Declaração de Saúde", caminho: "Documentos/Amil/01 - Declaração de Saúde.pdf" },
          { titulo: "02 - Opção de Desconto", caminho: "Documentos/Amil/02 - Opção de Desconto.pdf" }
        ])}

        <div class="info-box">
          Os documentos devem ser preenchidos e, quando aplicável, assinados antes do envio para
          <strong>${EMAIL_DESTINATARIO}</strong>.
        </div>
      `;
    }
  }

  // =====================================================
  // HAPVIDA ODONTO
  // =====================================================

  if (operadora === "Hapvida" && !saude) {

    if (assunto === "valores") {
      return `
        <p>
          O Hapvida Odonto possui mensalidade de:
        </p>

        <div class="info-box">
          🦷 <strong>R$ 14,18 por mês</strong>
        </div>

        <p>
          O Hapvida Odonto é incluso juntamente com a adesão
          ao Plano de Saúde Hapvida, conforme as condições
          do benefício.
        </p>
      `;
    }

    if (assunto === "adesao") {
      return `
        <div class="info-box">
          O Hapvida Odonto é aderido juntamente com o
          Plano de Saúde Hapvida.
        </div>

        <p>
          Caso você já possua o plano e esteja com algum problema,
          selecione <strong>"Estou com um problema"</strong>
          para solicitar atendimento.
        </p>
      `;
    }

    if (assunto === "dependente") {
      return `
        <p>
          As informações específicas para inclusão de dependente
          no Hapvida Odonto ainda não estão cadastradas nesta versão.
        </p>

        <div class="warning-box">
          Para confirmar a documentação e as condições,
          fale com o <strong>Consultor de Planos VIA 1</strong>.
        </div>
      `;
    }

    if (assunto === "carencia") {
      return `
        <div class="info-box">
          <strong>⏳ Carências – Hapvida Odonto</strong><br><br>

          • 60 dias: Odontologia clínica, como restauração e obturação<br>

          • 90 dias: Endodontia (canal), cirurgia odontológica
          (extração) e periodontia (raspagem de tártaro)<br>

          • 180 dias: Prótese dentária
        </div>

        <div class="success-box">
          📌 Caso a inclusão seja realizada dentro dos 30 primeiros
          dias após a admissão, não serão aplicadas essas carências,
          conforme as condições do benefício.
        </div>
      `;
    }

    if (assunto === "carteirinha") {
      return `
        <p>
          Para acessar a sua <strong>Carteirinha Provisória Hapvida</strong>,
          utilize o portal oficial da Hapvida. O acesso é válido para
          as informações do Plano de Saúde e também do Odonto.
        </p>

        <div class="info-box">
          💳 <strong>Carteirinha Provisória Hapvida:</strong><br><br>
          <a href="https://www.hapvida.com.br/pls/webhap/pk_carteira_provisoria.login_usuario_form" target="_blank" rel="noopener noreferrer">
            Acessar Carteirinha Provisória Hapvida
          </a>
        </div>
      `;
    }

    if (assunto === "utilizacao") {
      return `
        <p>
          As informações detalhadas sobre utilização do
          Hapvida Odonto ainda não estão cadastradas nesta versão.
        </p>

        <div class="warning-box">
          Se você estiver com dificuldade para utilizar o plano,
          selecione <strong>"Estou com um problema"</strong>.
        </div>
      `;
    }

    if (assunto === "documentos") {
      return `
        <p>
          O Hapvida Odonto é aderido juntamente com o
          Plano de Saúde Hapvida.
        </p>

        <div class="info-box">
          Para adesão, consulte os documentos do Plano de Saúde
          Hapvida ou fale com o
          <strong>Consultor de Planos VIA 1</strong>.
        </div>
      `;
    }
  }

  // =====================================================
  // PORTO SEGURO ODONTO
  // =====================================================

  if (operadora === "Porto Seguro" && !saude) {

    if (assunto === "valores") {
      return `
        <div class="info-box">
          🦷 <strong>Valor: R$ 8,84 por pessoa ativa.</strong>
        </div>

        <p>
          Podem ser incluídos como dependentes:
          <strong>cônjuge e filhos.</strong>
        </p>

        <div class="warning-box">
          Ao entrar/ativar o plano, é necessário permanecer
          por 1 ano (12 meses).

          Se o cancelamento for solicitado antes desse período,
          será cobrada uma taxa referente aos meses restantes
          para completar 1 ano.
        </div>
      `;
    }

    if (assunto === "adesao") {
      return `
        <p>
          Para adesão ao Porto Seguro Odonto, são necessários:
        </p>

        <ul class="document-list">
          <li>📄 Formulário</li>
          <li>🪪 RG e CPF</li>
        </ul>

        <div class="info-box">
          <strong>📅 Prazo para inclusão</strong><br><br>

          • Solicitações entre os dias 01 e 10:
          previsão de ativação no dia 01 do mês seguinte.<br><br>

          • Solicitações após o dia 10:
          ativação prevista para o 2º mês subsequente.
        </div>

        <p>
          Após preencher e assinar, envie o formulário e os documentos para:
        </p>

        <div class="info-box">
          <strong>${EMAIL_DESTINATARIO}</strong>
        </div>
      `;
    }

    if (assunto === "dependente") {
      return `
        <p>
          Podem ser incluídos como dependentes:
        </p>

        <div class="info-box">
          👨‍👩‍👧 <strong>Cônjuge e filhos.</strong>
        </div>

        <p>
          Para realizar a inclusão, é necessário seguir o processo
          de adesão e apresentar a documentação exigida.
        </p>
      `;
    }

    if (assunto === "cancelamento") {
      return `
        <p>
          Para solicitar o cancelamento:
        </p>

        ${listaDocumentos("Formulário de cancelamento", [
          { titulo: "01 - Cancelamento - Planos", caminho: "Documentos/Cancelamento/01 - Cancelamento - Planos.pdf" }
        ])}

        <ol class="document-list">
          <li>Preencha todos os campos do formulário.</li>
          <li>Assine o documento.</li>
          <li>Envie para <strong>${EMAIL_DESTINATARIO}</strong>.</li>
        </ol>

        <div class="warning-box">
          ⚠️ No Porto Seguro Odonto, é necessário permanecer
          por 1 ano (12 meses).

          Em caso de cancelamento antes desse período,
          será cobrada taxa referente aos meses restantes
          para completar 1 ano.
        </div>
      `;
    }

    if (assunto === "carencia") {
      return `
        <p>
          A informação específica de carência do
          Porto Seguro Odonto ainda não está cadastrada
          nesta versão.
        </p>

        <div class="warning-box">
          Para confirmar a carência aplicável,
          fale com o <strong>Consultor de Planos VIA 1</strong>.
        </div>
      `;
    }

    if (assunto === "carteirinha") {
      return `
        <p>
          Para utilizar o Porto Seguro Odonto:
        </p>

        <ol class="document-list">
          <li>
            Baixe o aplicativo
            <strong>Porto Seguro Saúde</strong>.
          </li>

          <li>
            Faça seu cadastro com Nome e CPF.
          </li>

          <li>
            Selecione o produto
            <strong>Bronze Integral 10</strong>.
          </li>
        </ol>
      `;
    }

    if (assunto === "rede") {
      return `
        <p>
          Para consultar a rede credenciada do Porto Seguro Odonto,
          acesse a página oficial da Porto Seguro.
        </p>

        <div class="info-box">
          🔗 <strong>Rede Credenciada Porto Seguro Odonto:</strong><br><br>
          <a href="https://www.portoseguro.com.br/porto-seguro-saude/rede-referenciada-odonto" target="_blank" rel="noopener noreferrer">
            Acessar Rede Credenciada Porto Seguro Odonto
          </a>
        </div>
      `;
    }

    if (assunto === "utilizacao") {
      return `
        <p>
          O produto informado para utilização é o
          <strong>Bronze Integral 10</strong>.
        </p>

        <div class="info-box">
          <strong>Procedimentos inclusos:</strong><br><br>

          • Consultas<br>
          • Próteses ROL<br>
          • Restaurações<br>
          • Tratamento de gengiva<br>
          • Radiologia<br>
          • Cirurgia (extrações)<br>
          • Tratamento de canal<br>
          • Odontopediatria<br>
          • Documentação periodontal<br>
          • Clareamento de dente desvitalizado<br>
          • RX ATM
        </div>

        <p>
          Para acessar o plano, utilize o aplicativo
          <strong>Porto Seguro Saúde</strong>.
        </p>
      `;
    }

    if (assunto === "documentos") {
      return `
        <p>
          <strong>📄 Documento do Porto Odonto</strong>
        </p>

        ${listaDocumentos("Formulário disponível", [
          { titulo: "01 - Formulário Porto Odonto", caminho: "Documentos/Porto/01 - Formulário Porto Odonto.pdf" }
        ])}

        <div class="info-box">
          Após preencher e assinar, siga as orientações do setor de Benefícios.
        </div>
      `;
    }
  }

  // =====================================================
  // INFORMAÇÃO NÃO CADASTRADA
  // =====================================================

  return `
    <div class="warning-box">
      ⚠️ Essa informação ainda não está cadastrada
      na base do Assistente.
    </div>

    <p>
      Para receber orientação sobre este assunto,
      fale com o <strong>Consultor de Planos VIA 1</strong>.
    </p>
  `;
}// =====================================================
// TÍTULO DO ASSUNTO
// =====================================================

function tituloAssunto(assunto) {
  const titulos = {
    valores: "💰 Valores e planos",
    adesao: "📝 Adesão",
    dependente: "👨‍👩‍👧 Inclusão de dependente",
    cancelamento: "❌ Cancelamento",
    carencia: "⏳ Carência",
    carteirinha: "💳 Carteirinha",
    rede: "🏥 Rede Credenciada",
    utilizacao: "💳 Coparticipação",
    documentos: "📄 Documentos"
  };

  return titulos[assunto] || "Informação";
}

// =====================================================
// RESPOSTA: SIM
// =====================================================

function respostaSim() {
  registrarHistorico("Informação resolveu a dúvida");

  telaContinuar();
}

// =====================================================
// CONTINUAR ATENDIMENTO
// =====================================================

function telaContinuar() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">😊 Que bom!</div>

      <p>
        Posso ajudar com outra informação?
      </p>
    </div>

    <div class="buttons">

      <button
        class="primary-btn"
        onclick="mostrarMenuPlano(
          '${atendimento.operadora}',
          '${atendimento.area === "Plano de Saúde" ? "saude" : "odonto"}'
        )"
      >
        Sim, continuar
      </button>

      <button
        class="secondary-btn"
        onclick="finalizarAtendimento('Resolvido pelo Assistente')"
      >
        Não, finalizar
      </button>

    </div>
  `;
}

// =====================================================
// RESPOSTA: NÃO
// =====================================================

function respostaNao() {
  registrarHistorico(
    "Informação não resolveu a dúvida"
  );

  atendimento.assunto = "Dúvida não solucionada";

  abrirEncaminhamento();
}

// =====================================================
// TRIAGEM DE PROBLEMA
// =====================================================

function abrirTriagemProblema() {
  limparChat();

  atendimento.tipoProblema = "";
  atendimento.descricaoProblema = "";

  chat.innerHTML = `
    <div class="bot-message">

      <div class="section-title">
        ⚠️ Vamos identificar o problema
      </div>

      <p>
        Para direcionar seu atendimento corretamente,
        selecione o que mais se aproxima da sua situação.
      </p>

    </div>

    <div class="menu-grid">

      <button
        class="menu-button"
        onclick="selecionarProblema('Carteirinha')"
      >
        💳 Carteirinha
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Cadastro')"
      >
        👤 Cadastro
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Inclusão ou exclusão de dependente')"
      >
        👨‍👩‍👧 Dependente
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Cobrança ou desconto')"
      >
        💰 Cobrança / desconto
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Utilização do plano')"
      >
        🏥 Utilização
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Atendimento ou procedimento')"
      >
        🩺 Atendimento
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Carência')"
      >
        ⏳ Carência
      </button>

      <button
        class="menu-button"
        onclick="selecionarProblema('Outro problema')"
      >
        ❓ Outro
      </button>

    </div>

    <br>

    <button
      class="secondary-btn"
      onclick="abrirMenuAtual()"
    >
      🔙 Voltar
    </button>
  `;
}

// =====================================================
// SELECIONAR TIPO DE PROBLEMA
// =====================================================

function selecionarProblema(tipoProblema) {

  atendimento.tipoProblema = tipoProblema;

  registrarHistorico(
    `Tipo de problema: ${tipoProblema}`
  );

  limparChat();

  chat.innerHTML = `
    <div class="bot-message">

      <div class="section-title">
        📝 Descreva o que aconteceu
      </div>

      <p>
        Você selecionou:
        <strong>${escaparHTML(tipoProblema)}</strong>
      </p>

      <div class="info-box">
        Conte brevemente o que está acontecendo.
        Quanto mais detalhes você fornecer, melhor
        poderemos direcionar seu atendimento.
      </div>

    </div>

    <div class="form-group">

      <label>
        Descrição do problema
      </label>

      <textarea
        id="descricaoProblema"
        placeholder="Digite aqui o que aconteceu..."
      ></textarea>

    </div>

    <button
      class="primary-btn"
      onclick="confirmarProblema()"
    >
      Continuar
    </button>
  `;
}

// =====================================================
// CONFIRMAR PROBLEMA
// =====================================================

function confirmarProblema() {

  const campo = document.getElementById(
    "descricaoProblema"
  );

  if (!campo) {
    alert("Não foi possível localizar o campo de descrição.");
    return;
  }

  const descricao = campo.value.trim();

  if (!descricao) {
    alert("Descreva brevemente o problema.");
    return;
  }

  atendimento.descricaoProblema = descricao;

  registrarHistorico(
    "Descrição do problema registrada"
  );

  abrirEncaminhamento();
}

// =====================================================
// ENCAMINHAMENTO PARA CONSULTOR
// =====================================================

function abrirEncaminhamento() {
  limparChat();

  chat.innerHTML = `
    <div class="bot-message">

      <div class="section-title">
        👨‍💼 Atendimento personalizado
      </div>

      <div class="warning-box">
        Essa situação precisa ser analisada pelo
        <strong>Consultor de Planos VIA 1</strong>.
      </div>

      <p>
        Antes de encaminhar, confira o resumo:
      </p>

    </div>

    <div class="summary">

      <div class="summary-row">
        <span class="summary-label">
          Colaborador:
        </span>
        <br>
        ${escaparHTML(atendimento.nome)}
      </div>

      <div class="summary-row">
        <span class="summary-label">
          CPF:
        </span>
        <br>
        ${escaparHTML(atendimento.cpf)}
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Empresa/Marca:
        </span>
        <br>
        ${escaparHTML(atendimento.empresa)}
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Área:
        </span>
        <br>
        ${escaparHTML(atendimento.area)}
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Operadora:
        </span>
        <br>
        ${escaparHTML(atendimento.operadora)}
      </div>

      <div class="summary-row">
        <span class="summary-label">
          Problema:
        </span>
        <br>
        ${escaparHTML(
          atendimento.tipoProblema ||
          "Dúvida não solucionada"
        )}
      </div>

      ${
        atendimento.descricaoProblema
          ? `
            <div class="summary-row">

              <span class="summary-label">
                Descrição:
              </span>

              <br>

              ${escaparHTML(
                atendimento.descricaoProblema
              )}

            </div>
          `
          : ""
      }

    </div>

    <br>

    <div class="buttons">

      <button
        class="primary-btn"
        onclick="finalizarAtendimento(
          'Encaminhado para Consultor'
        )"
      >
        👨‍💼 Falar com o Consultor
      </button>

      <button
        class="secondary-btn"
        onclick="abrirMenuAtual()"
      >
        🔙 Voltar
      </button>

    </div>
  `;
}

// =====================================================
// VOLTAR PARA O MENU ATUAL
// =====================================================

function abrirMenuAtual() {

  mostrarMenuPlano(
    atendimento.operadora,
    atendimento.area === "Plano de Saúde"
      ? "saude"
      : "odonto"
  );
}

function gerarAssuntoEmail() {
  const beneficio = atendimento.operadora
    ? `${atendimento.area === "Plano de Saúde" ? "Plano" : "Odonto"} ${atendimento.operadora}`
    : (atendimento.area || "Benefício");

  return `${beneficio} - WhatsApp - ${atendimento.nome || "Colaborador"}`;
}

function formatarDataHora(data) {
  return data
    ? data.toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
      })
    : "-";
}

function montarResumoEmail() {
  const dataEnvio = new Date();
  atendimento.dataEnvioEmail = dataEnvio;

  const beneficio = atendimento.operadora
    ? `${atendimento.area === "Plano de Saúde" ? "Plano" : "Odonto"} ${atendimento.operadora}`
    : (atendimento.area || "Benefício");

  // Corpo compacto para evitar erro 400 em clientes de e-mail/webmail
  // quando o conteúdo do mailto fica muito grande.
  return [
    "RECIBO DE ATENDIMENTO - ASSISTENTE VIA 1",
    "",
    `Benefício: ${beneficio}`,
    `Data/hora do atendimento: ${formatarDataHora(atendimento.fim || new Date())}`,
    `Data/hora do envio: ${formatarDataHora(dataEnvio)}`,
    `Canal: WhatsApp`,
    "",
    "DADOS DO COLABORADOR",
    `Nome: ${atendimento.nome || "-"}`,
    `CPF: ${atendimento.cpf || "-"}`,
    `Empresa/Marca: ${atendimento.empresa || "-"}`,
    "",
    "SOLICITAÇÃO",
    `Área: ${atendimento.area || "-"}`,
    `Operadora: ${atendimento.operadora || "-"}`,
    `Assunto: ${tituloAssunto(atendimento.assunto)}`,
    `Problema: ${atendimento.tipoProblema || "-"}`,
    `Descrição: ${atendimento.descricaoProblema || "-"}`,
    "",
    "ORIENTAÇÃO / RESULTADO",
    `${atendimento.resultado || "-"}`,
    "",
    "ENVIO DO RECIBO",
    `Destinatário: ${EMAIL_DESTINATARIO}`,
    `Enviado em: ${formatarDataHora(dataEnvio)}`,
    "",
    "Assistente de Planos VIA 1"
  ].join("\n");
}

// Prepara o e-mail no aplicativo de e-mail do colaborador.
// O clique neste botão é a etapa obrigatória para concluir o atendimento.
function enviarEmailAtendimento() {
  const destinatario = EMAIL_DESTINATARIO;
  const assunto = gerarAssuntoEmail();
  const corpo = montarResumoEmail();

  const mailto = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

  atendimento.emailPreparado = true;

  // Abre o Outlook/Gmail/outro cliente configurado no computador.
  window.location.href = mailto;

  // Depois de acionar o e-mail, concluímos a etapa no assistente.
  setTimeout(() => {
    mostrarResumoFinal();
  }, 700);
}

// Mantida para compatibilidade com versões anteriores.
function gerarEmailAtendimento() {
  enviarEmailAtendimento();
}

// =====================================================
// FINALIZAR ATENDIMENTO
// =====================================================

function finalizarAtendimento(resultado) {
  atendimento.fim = new Date();
  atendimento.resultado = resultado;

  registrarHistorico(
    `Atendimento finalizado: ${resultado}`
  );

  // Antes de concluir, o colaborador precisa acionar o envio do resumo.
  mostrarEtapaEnvioEmail();
}

// =====================================================
// ETAPA OBRIGATÓRIA DE ENVIO
// =====================================================

function mostrarEtapaEnvioEmail() {
  limparChat();

  const assunto = gerarAssuntoEmail();

  chat.innerHTML = `
    <div class="bot-message">
      <div class="section-title">📧 Última etapa</div>

      <p>
        Para <strong>concluir sua solicitação</strong>, é necessário enviar o resumo deste atendimento para o setor de Benefícios.
      </p>

      <p>
        Ao clicar no botão abaixo, o seu aplicativo de e-mail será aberto com a mensagem já preenchida.
      </p>
    </div>

    <div class="summary">
      <div class="summary-row">
        <span class="summary-label">Destinatário:</span>
        <br>
        beneficios@grupovia1.com.br
      </div>

      <div class="summary-row">
        <span class="summary-label">Assunto:</span>
        <br>
        ${escaparHTML(assunto)}
      </div>
    </div>

    <div class="buttons">
      <button
        class="primary-btn"
        onclick="enviarEmailAtendimento()"
      >
        📧 Enviar resumo por e-mail e concluir
      </button>
    </div>
  `;
}

// =====================================================
// RESUMO FINAL
// =====================================================

function mostrarResumoFinal() {

  limparChat();

  chat.innerHTML = `
    <div class="bot-message">

      <div class="section-title">
        ✅ Solicitação concluída
      </div>

      <p>
        Obrigado por utilizar o
        <strong>Assistente de Planos VIA 1</strong>.
      </p>

    </div>

    <div class="summary">

      <div class="summary-row">
        <span class="summary-label">Colaborador:</span>
        <br>
        ${escaparHTML(atendimento.nome)}
      </div>

      <div class="summary-row">
        <span class="summary-label">Empresa/Marca:</span>
        <br>
        ${escaparHTML(atendimento.empresa)}
      </div>

      <div class="summary-row">
        <span class="summary-label">Área:</span>
        <br>
        ${escaparHTML(atendimento.area || "-")}
      </div>

      <div class="summary-row">
        <span class="summary-label">Operadora:</span>
        <br>
        ${escaparHTML(atendimento.operadora || "-")}
      </div>

      <div class="summary-row">
        <span class="summary-label">Resultado:</span>
        <br>
        ${escaparHTML(atendimento.resultado)}
      </div>

    </div>

    <div class="success-box email-box">
      <strong>📧 Resumo preparado para envio</strong>
      <p>
        O e-mail foi aberto com o resumo preenchido para <strong>${EMAIL_DESTINATARIO}</strong>.
      </p>
      <p>
        Verifique o aplicativo de e-mail para concluir o envio.
      </p>
    </div>

    <button
      class="secondary-btn"
      onclick="novoAtendimento()"
    >
      🔄 Novo atendimento
    </button>
  `;
}

// =====================================================
// NOVO ATENDIMENTO
// =====================================================

function novoAtendimento() {
  location.reload();
} 
