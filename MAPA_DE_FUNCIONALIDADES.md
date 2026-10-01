# OBRACOM – O iFood da Construção Civil
## Documento de Especificação, Arquitetura e Mapeamento de Funcionalidades Tela a Tela

---

### 1. Visão Geral do Sistema: O que é a OBRACOM?

A **OBRACOM** é a primeira plataforma completa de marketplace sob demanda voltada para o setor da **Construção Civil**, estruturada no modelo consagrado do **"iFood da Construção Civil"**. 

#### 1.1. A Dor que o Sistema Resolve
Na construção civil tradicional, o maior gargalo financeiro e de produtividade é a **"obra parada"**:
- Faltou cimento, conexões hidráulicas, fiação ou parafusos específicos no meio da jornada de trabalho.
- O mestre de obras ou proprietário precisa parar o serviço, ligar para depósitos locais, negociar cotação sem transparência de estoque, aguardar orçamentos manuais via WhatsApp e esperar dias para receber a carga.
- Pequenos e médios depósitos de bairro (lojas de materiais de construção) não possuem tecnologia de entrega rápida nem canais digitais com geolocalização.

#### 1.2. A Solução OBRACOM
A OBRACOM conecta, em tempo real e por raio de proximidade geográfica:
1. **Consumidores Finais, Mestres de Obras, Construtores e Arquitetos** que necessitam de suprimentos com entrega imediata ou agendada na obra.
2. **Depósitos e Lojas de Materiais de Construção Parceiros (Sellers)** que digitalizam seu estoque, vendem para clientes em seu raio de atuação e aumentam o faturamento.
3. **Prestadores de Serviços Qualificados (Eletricistas, Pedreiros, Encanadores, Pintores)** para cotação e contratação de mão de obra verificada.
4. **Logística sob medida para materiais pesados e leves**: desde pequenas entregas expressas via utilitários/motos até fretes de caminhão toco, truck ou munck para cargas volumosas (cimento, areia, brita, ferro e blocos).

---

### 2. Perfis de Usuários (Atores do Ecossistema)

| Perfil | Descrição e Papel na Plataforma |
| :--- | :--- |
| **Cliente / Construtor / Mestre de Obras** | Navega pelo catálogo, compara preços entre depósitos vizinhos, calcula frete para o endereço da obra, efetua compras de emergência ou programadas, rastreia caminhões de entrega e contrata mão de obra. |
| **Lojista Parceiro (Seller / Depósito)** | Opera o painel administrativo da sua loja, gerencia catálogo, controla níveis de estoque, precifica produtos, aceita pedidos em tempo real, imprime romaneios de separação e gerencia repasses financeiros. |
| **Prestador de Serviço / Mão de Obra** | Mantém perfil com portfólio de obras concluídas, recebe solicitações de orçamentos estruturadas e negocia propostas de serviço. |
| **Entregador / Transportador da Obra** | Executa a logística de entrega (própria da loja ou parceira) com rastreamento GPS ativo até o canteiro de obras. |

---

### 3. Mapeamento de Funcionalidades: Telas do Cliente (Consumidor & Construtor)

Abaixo está o detalhamento funcional de todas as **19 telas** que compõem a jornada do cliente.

---

#### Tela 1: Splash / Onboarding (`SplashView.tsx`)
* **Objetivo:** Apresentação da marca, identidade visual OBRACOM e proposta de valor nos primeiros segundos de uso.
* **Componentes e Elementos Visuais:**
  - Logotipo oficial OBRACOM com ícone da casa/canteiro de obras em azul institucional e laranja construtivo.
  - Carrossel dinâmico com os pilares da plataforma:
    1. *Ampla Variedade:* Mais de 50.000 itens de materiais básicos ao acabamento.
    2. *Entrega Expressa na Obra:* Evite obra parada com entrega em até 2 horas.
    3. *Melhores Preços da Região:* Comparador inteligente entre depósitos parceiros.
  - Botão de Ação Primária: "Começar Agora" / "Acessar Catálogo".
  - Link de Ação Secundária: "Já sou cadastrado / Entrar".
  - Atalho de rodapé: "É lojista ou fornecedor? Cadastre sua loja".

---

#### Tela 2: Autenticação / Login (`LoginView.tsx`)
* **Objetivo:** Autenticação segura do cliente ou mestre de obras.
* **Componentes e Elementos Visuais:**
  - Campos de entrada: E-mail / CPF e Senha com máscara e botão de visualização (olho).
  - Checkbox "Lembrar de mim neste dispositivo".
  - Link "Esqueci minha senha" com recuperação automatizada.
  - Botões de Login Social: "Continuar com Google" e "Continuar com Apple".
  - Seletor de modo no rodapé: "Acesso para Lojistas Parceiros".
  - Validações: Feedback visual para e-mail inválido e campos vazios.

---

#### Tela 3: Cadastro de Usuário (`RegisterView.tsx`)
* **Objetivo:** Registro ágil de novos compradores (Pessoa Física ou Pessoa Jurídica/Construtora).
* **Componentes e Elementos Visuais:**
  - Seletor de Tipo de Perfil:
    - *Pessoa Física:* Nome completo, CPF, telefone celular e e-mail.
    - *Pessoa Jurídica / Construtora:* Razão Social, CNPJ, Inscrição Estadual e dados do comprador.
  - Endereço principal ou endereço do primeiro canteiro de obras (com busca automática por CEP via ViaCEP).
  - Termos de Uso e Política de Privacidade de Dados (LGPD).
  - Confirmação de telefone por código SMS/WhatsApp de 4 dígitos.

---

#### Tela 4: Tela Principal / Feed da Obra (`HomeView.tsx`)
* **Objetivo:** Hub principal de compras estilo iFood, com foco em localização da obra, velocidade de entrega e descoberta de materiais.
* **Componentes e Elementos Visuais:**
  - **Barra de Endereço Ativo (Topo):** Exibe a obra atual selecionada (ex: *"Av. Paulista, 1578 - Canteiro 02"*) com modal de troca rápida de endereço.
  - **Barra de Pesquisa Global:** Campo com sugestões instantâneas, histórico de buscas e atalho para leitura de código de barras.
  - **Banners Rotativos em Destaque:** Promoções de cimento, tintas, fiação e frete grátis para compras acima de R$ 500.
  - **Carrossel de Categorias Principais:** Ícones ilustrados de Materiais Básicos, Hidráulica, Elétrica, Pisos & Revestimentos, Tintas, Ferramentas e Esquadrias.
  - **Seção "Entrega Rápida na sua Obra" (Depósitos Próximos):**
    - Cards das lojas de materiais de construção mais próximas do CEP ativo.
    - Metadados: Distância em km (ex: *1.8 km*), tempo estimado de entrega (ex: *35-50 min*), nota média de avaliação e valor do frete.
  - **Seção "Ofertas Relâmpago para sua Obra":** Produtos com desconto por tempo limitado e contagem regressiva.
  - **Seção "Mais Vendidos na sua Região":** Cimento CP II, areia ensacada, bloco cerâmico, tubo PVC 100mm, argamassa AC-III.
  - **Banner de Mão de Obra:** Card de chamada para contratação de profissionais certificados (eletricistas, encanadores, etc.).

---

#### Tela 5: Busca, Filtros & Catálogo Geral (`SearchCatalogView.tsx`)
* **Objetivo:** Catálogo completo de materiais com filtros granulares e busca de alta precisão.
* **Componentes e Elementos Visuais:**
  - Campo de busca persistente com tags de buscas populares ("Cimento Votoran 50kg", "Tubo Tigre 100mm", "Piso Portobello 60x60").
  - **Gaveta / Barra Lateral de Filtros:**
    - Filtro por Categoria e Subcategoria.
    - Filtro por Faixa de Preço (slider interativo mín/máx).
    - Filtro por Tipo de Frete: *Entrega Expressa até 2h*, *Entrega Agendada*, *Retirada no Depósito*.
    - Filtro por Distância da Loja: até 5 km, até 15 km, qualquer distância.
    - Filtro por Marcas Oficiais (Votorantim, Tigre, Amanco, Quartzolit, Suvinil, Coral, Bosch, Deca).
    - Filtro por Avaliação dos Compradores (4 estrelas ou mais).
  - **Grid de Produtos:** Cards com foto em alta qualidade, título, marca, preço original riscado, preço à vista no PIX com destaque verde, selo de frete e botão de adição rápida ao carrinho (+).
  - **Ordenação:** Menor Preço, Mais Relevantes, Menor Distância, Melhores Avaliações.

---

#### Tela 6: Detalhe do Produto (`ProductDetailView.tsx`)
* **Objetivo:** Ficha técnica completa, comparação de preços entre diferentes depósitos parceiros e tomada de decisão de compra.
* **Componentes e Elementos Visuais:**
  - **Galeria de Imagens:** Carrossel de fotos em alta resolução com zoom e foto de aplicação na obra.
  - **Cabeçalho do Produto:** Título, marca, SKU, avaliação em estrelas e quantidade de avaliações de outros construtores.
  - **Box de Preço e Desconto:**
    - Preço parcelado em até 12x no cartão.
    - Preço promocional no PIX com porcentagem de economia (ex: *5% OFF no PIX*).
  - **Box da Loja Vendedora (Seller Box):**
    - Nome do depósito (ex: *"ConstróiMais Materiais"*), distância em km, nota da loja e selo de "Loja Oficial".
    - **Comparador "Outras lojas vendendo este item":** Lista outros depósitos parceiros que possuem o mesmo produto em estoque, comparando preço e prazo de entrega.
  - **Calculadora de Frete na Obra:** Campo de CEP que calcula o valor do frete baseado no peso total (ex: *50 kg = R$ 18,00 / Prazo: Hoje até as 16h*).
  - **Especificações Técnicas e Normas:** Tabela com rendimento, composição, dimensões, peso bruto, validade e conformidade com normas ABNT.
  - **Seletor de Quantidade com Calculadora de Fração:** Incremento numérico ou inserção direta (ex: 50 sacos, 100 m²).
  - **Barra Inferior Fixa:** Preço total calculado, botão de favoritar e botão "Adicionar ao Carrinho".

---

#### Tela 7: Carrinho & Checkout Multi-loja (`CheckoutView.tsx`)
* **Objetivo:** Finalização simplificada da compra de materiais, com suporte a pedidos fracionados por loja e frete para carga pesada.
* **Componentes e Elementos Visuais:**
  - **Lista de Itens Agrupados por Loja Fornecedora:**
    - Foto, nome, quantidade, preço unitário e subtotal de cada produto.
    - Controle de quantidade (+ / -) e botão de remoção.
  - **Seletor do Tipo de Logística & Veículo:**
    - *Entrega Expressa na Obra (Fiorino/Utilitário):* Para pedidos leves de emergência (até 500kg).
    - *Caminhão Toco / Truck Basculante:* Para materiais a granel ou pesados (cimento, areia, brita, blocos).
    - *Retirar no Balcão:* Opção de retirada imediata sem cobrança de frete.
  - **Agendamento da Entrega:** Data e janela de horário de descarregamento na obra (Manhã: 08h-12h / Tarde: 13h-18h).
  - **Formas de Pagamento:**
    - **PIX:** Desconto exclusivo de 5%, geração imediata de QR Code e chave Copia e Cola.
    - **Cartão de Crédito:** Até 12x com cálculo de parcelas e preenchimento seguro de dados.
    - **Boleto Faturado PJ / Construtora:** Opção para compras faturadas a prazo para empresas cadastradas com crédito aprovado.
    - **Carteira Digital OBRACOM:** Saldo de cashback e créditos de devolução.
  - **Campo de Cupom de Desconto:** Validação de cupons promocionais (ex: *PRIMEIRAOBRA*).
  - **Resumo Financeiro da Obra:** Subtotal dos materiais, Frete calculado por peso/distância, Descontos aplicados e Valor Total Final.
  - **Botão de Conclusão:** "Confirmar Pedido e Pagar".

---

#### Tela 8: Confirmação de Pedido (`OrderConfirmedView.tsx`)
* **Objetivo:** Feedback imediato de pedido recebido com sucesso e instruções operacionais.
* **Componentes e Elementos Visuais:**
  - Ícone de sucesso animado com código identificador único (ex: `#OBR-254789`).
  - Previsão de chegada na obra (ex: *"Hoje entre 14h30 e 15h15"*).
  - Instruções de recebimento na obra: *"Certifique-se de que há espaço desobstruído para o descarregamento e um responsável no local para conferência dos volumes"*.
  - Botão Primário: "Rastrear Pedido em Tempo Real".
  - Botão Secundário: "Voltar para o Início / Continuar Comprando".

---

#### Tela 9: Rastreamento em Tempo Real do Pedido (`OrderTrackingView.tsx`)
* **Objetivo:** Experiência idêntica ao iFood: acompanhamento visual do veículo de entrega a caminho da obra.
* **Componentes e Elementos Visuais:**
  - **Mapa Interativo em Tempo Real:** Visualização do trajeto do depósito até o endereço da obra com pino do caminhão em movimento.
  - **Card do Motorista / Logística:**
    - Nome do motorista (ex: *"Carlos Eduardo - Caminhão Munck Mercedes-Benz"*).
    - Placa do veículo (ex: *"ABC-4D29"*).
    - Botão "Ligar para o Motorista" e "Mensagem via WhatsApp".
  - **Linha do Tempo de Status (Progresso da Obra):**
    1. *Pedido Confirmado:* Pagamento aprovado pelo sistema.
    2. *Em Separação no Depósito:* Materiais sendo paletizados pelos ajudantes da loja.
    3. *Caminhão Carregado:* Carga conferida e nota fiscal emitida.
    4. *Saiu para Entrega:* Veículo a caminho do canteiro de obras.
    5. *Chegando na sua Obra:* Veículo a menos de 5 minutos do local.
    6. *Descarregamento Concluído:* Carga conferida e entrega finalizada com sucesso.
  - **Resumo dos Itens da Carga:** Lista rápida dos volumes transportados.

---

#### Tela 10: Histórico de Pedidos da Obra (`OrdersListView.tsx`)
* **Objetivo:** Consulta de todos os pedidos realizados, notas fiscais e facilidade de reposição rápida de materiais.
* **Componentes e Elementos Visuais:**
  - Abas de Filtro: *Todos*, *Em Andamento*, *Concluídos*, *Cancelados*.
  - Campo de busca por número do pedido ou nome do produto.
  - Cards detalhados de cada pedido:
    - Data da compra, número do pedido, valor total e quantidade de itens.
    - Selo de status colorido (*Em Transporte*, *Entregue*, *Aguardando Pagamento*).
    - Miniaturas dos produtos comprados.
    - **Botão "Comprar Novamente" (Recompra com 1 Clique):** Adiciona exatamente a mesma lista de materiais ao carrinho para reposição imediata de itens consumidos na obra.
    - Botão "Rastrear" ou "Ver Detalhes do Pedido".

---

#### Tela 11: Favoritos & Listas de Obras (`FavoritesView.tsx`)
* **Objetivo:** Gestão de listas de materiais salvas por etapa da obra (Fundação, Alvenaria, Elétrica, Pintura).
* **Componentes e Elementos Visuais:**
  - Agrupamento de itens favoritos em listas personalizáveis.
  - Informações de preço atualizado e alerta de queda de preço ("Este item baixou R$ 4,50").
  - Indicador de disponibilidade em estoque nos depósitos próximos.
  - Botão "Mover Todos para o Carrinho": Adição em lote de listas de cotação prontas para compra.

---

#### Tela 12: Central de Notificações (`NotificationsView.tsx`)
* **Objetivo:** Alertas operacionais e comerciais push/in-app em tempo real.
* **Componentes e Elementos Visuais:**
  - Abas de categorização: *Todas*, *Pedidos da Obra*, *Ofertas & Cupons*, *Avisos do Sistema*.
  - Notificações de logística: *"Seu caminhão de cimento acabou de sair da ConstróiMais rumo à sua obra"*.
  - Notificações de cotação: *"O eletricista Marcos respondeu sua solicitação de orçamento"*.
  - Notificações de preço: *"Alerta de Oferta: Argamassa AC-III com 18% OFF hoje no depósito vizinho"*.
  - Ações rápidas: Botão "Marcar todas como lidas" e limpeza de notificações.

---

#### Tela 13: Marketplace de Serviços & Mão de Obra (`ServicesMarketplaceView.tsx`)
* **Objetivo:** Contratação de profissionais e especialistas da construção com garantia e reputação verificada.
* **Componentes e Elementos Visuais:**
  - Filtro por Categoria Profissional: Pedreiros, Eletricistas, Encanadores, Gesseiros, Pintores, Serralheiros, Mestres de Obras, Engenheiros e Arquitetos.
  - Filtro por Raio de Atuação e Disponibilidade Imediata.
  - Cards de Profissionais em Destaque:
    - Foto de perfil, nome e profissão.
    - Selo "Profissional Verificado OBRACOM" (documentação e antecedentes validados).
    - Nota média (estrelas) e número de obras concluídas na plataforma.
    - Preço inicial estimado por diária ou metro quadrado.
    - Mini-galeria de fotos de reformas recentes.
  - Botão "Ver Perfil Completo" e "Solicitar Orçamento Grátis".

---

#### Tela 14: Perfil Detalhado do Profissional (`ProfessionalProfileView.tsx`)
* **Objetivo:** Avaliação aprofundada da experiência e portfólio de um prestador de serviço.
* **Componentes e Elementos Visuais:**
  - Cabeçalho com biografia profissional, anos de experiência e registro em conselhos (CREA/CFT).
  - Tabela de especialidades e serviços oferecidos (ex: *Instalação de quadro de distribuição, Troca de fiação completa*).
  - Galeria "Antes e Depois" com fotos em alta definição de obras finalizadas.
  - Seção de Depoimentos e Avaliações de clientes anteriores com notas em critérios: *Pontualidade, Limpeza da Obra, Qualidade do Acabamento e Custo-Benefício*.
  - Botão CTA: "Pedir Orçamento para Minha Obra".

---

#### Tela 15: Solicitação de Orçamento de Serviço (`RequestQuoteView.tsx`)
* **Objetivo:** Wizard estruturado para cotação de serviços sem necessidade de orçamentos vagos.
* **Componentes e Elementos Visuais:**
  - Seletor do tipo de intervenção: Reforma Completa, Reparo Emergencial, Instalação Nova.
  - Metragem estimada do local da obra (m² ou quantidade de pontos).
  - Campo de upload de fotos e vídeos do ambiente atual para análise do profissional.
  - Data desejada para início e prazo estimado.
  - Opção de envio: Para profissional exclusivo ou disparo para até 3 profissionais mais bem avaliados da região.
  - Confirmação de envio com prazo de resposta garantido em até 24 horas.

---

#### Tela 16: Central de Avaliações e Depoimentos (`ReviewsView.tsx`)
* **Objetivo:** Transparência de reputação sobre depósitos, produtos e serviços.
* **Componentes e Elementos Visuais:**
  - Média geral da plataforma (ex: *4.8 de 5 estrelas baseada em mais de 12.000 avaliações*).
  - Feed de comentários de outros compradores e mestres de obra.
  - Filtro por tipo de avaliação: Qualidade dos Materiais, Pontualidade da Entrega, Estado da Carga ao Descarregar.

---

#### Tela 17: Perfil do Usuário & Configurações (`ProfileView.tsx`)
* **Objetivo:** Gestão da conta do cliente, endereços de obras e métodos de faturamento.
* **Componentes e Elementos Visuais:**
  - Dados pessoais: Nome, foto de perfil, telefone, e-mail e documento (CPF/CNPJ).
  - **Gerenciador de Endereços de Obras:** Cadastro de múltiplos locais (ex: *"Casa de Praia - Obra 01"*, *"Edifício Horizon - Apto 804"*), com marcação de endereço padrão.
  - Cartões de crédito salvos e dados bancários para estorno/cashback.
  - Dados de Faturamento PJ para emissão automática de NF-e com Inscrição Estadual.
  - **Botão de Alternância de Perfil:** Atalho direto para "Acessar Área do Lojista" ou "Quero Vender na OBRACOM".
  - Opções de Notificação, Privacidade, Segurança e Botão de Logout.

---

#### Tela 18: Central de Ajuda & Suporte (`HelpCenterView.tsx`)
* **Objetivo:** Resolução de dúvidas operacionais e canal de suporte humanizado para problemas na obra.
* **Componentes e Elementos Visuais:**
  - Barra de pesquisa de dúvidas frequentes.
  - Tópicos rápidos:
    - *Entrega e Descarregamento:* Regras para locais de difícil acesso ou sem ajudante no canteiro.
    - *Devoluções e Avarias:* Como proceder se sacos de cimento chegarem rasgados ou pisos quebrados.
    - *Pagamentos e Faturamento:* Emissão de notas fiscais e boletos a prazo para construtoras.
    - *Cancelamentos:* Prazos e regras antes do carregamento do caminhão.
  - Botão de atendimento via chat ao vivo ou WhatsApp com equipe especializada em construção civil.

---

#### Tela 19: Sobre a Plataforma (`AboutView.tsx`)
* **Objetivo:** Comunicação institucional, missão da empresa e sustentabilidade no canteiro de obras.
* **Componentes e Elementos Visuais:**
  - História da OBRACOM e propósito de erradicar a obra parada no Brasil.
  - Dados da empresa, CNPJ e canais oficiais de comunicação.
  - Certificados de segurança de dados e políticas éticas de descarte de entulho e materiais reciclados.

---

### 4. Mapeamento de Funcionalidades: Portal do Lojista / Seller (`views/lojista/`)

Abaixo está o detalhamento funcional das **9 telas** do painel de controle do lojista parceiro (o "iFood Merchant" das lojas de materiais de construção).

---

#### Tela 20: Captação de Lojistas / "Seja um Parceiro" (`BecomeSellerView.tsx`)
* **Objetivo:** Landing page de adesão e conversão de novos depósitos e lojas físicas para a plataforma digital.
* **Componentes e Elementos Visuais:**
  - Banner explicativo: *"Aumente suas vendas e alcance mais construtores no maior marketplace da construção civil"*.
  - 4 Pilares de Benefícios para o Lojista:
    1. *Mais Clientes:* Divulgue seu estoque para quem está construindo ou reformando no seu bairro e cidade.
    2. *Mais Vendas & Giro de Estoque:* Venda materiais parados na loja com agilidade.
    3. *Segurança Financeira:* Receba pagamentos garantidos sem risco de inadimplência e com repasse programado.
    4. *Painel Completo de Gestão:* Controle pedidos, estoque, preços e romaneios em uma interface intuitiva.
  - Formulário inicial de credenciamento: CNPJ da Loja, Razão Social, Nome Fantasia, Telefone do Responsável e Quantidade aproximada de SKUs.
  - Botão CTA: "Iniciar Cadastro de Lojista" e "Já sou lojista / Acessar Painel".

---

#### Tela 21: Painel Geral do Lojista / Dashboard (`LojistaDashboardView.tsx`)
* **Objetivo:** Centro de comando diário do depósito de materiais, com visão instantânea de faturamento, pedidos e alertas operacionais.
* **Componentes e Elementos Visuais:**
  - **Barra de Status da Loja:** Toggle "Loja Aberta para Pedidos / Loja Fechada".
  - **KPIs Principais (Cards de Métricas):**
    - *Vendas do Dia / Faturamento:* Valor monetário em R$ e comparativo percentual com a semana anterior.
    - *Novos Pedidos Aguardando Separação:* Contador com alerta sonoro e visual para novos pedidos na fila.
    - *Ticket Médio por Pedido:* Indicador de rentabilidade das compras.
    - *Avaliação Geral da Loja:* Nota média dos clientes (ex: *4.9 estrelas*).
  - **Atalhos Rápidos de Operação:**
    - Botão "Cadastrar Novo Produto" (+).
    - Botão "Gerenciar Catálogo & Estoque".
    - Botão "Ver Romaneios de Expedição".
    - Botão "Solicitar Repasse Financeiro".
  - **Gráfico de Desempenho Semanal:** Vendas por dia da semana e horários de pico de compras na construção (ex: manhãs entre 07h e 10h).
  - **Lista de Pedidos Recentes com Ação Imediata:** Pedidos que acabaram de chegar com botão de "Aceitar e Imprimir Separação".

---

#### Tela 22: Gestão de Catálogo & Estoque (`LojistaProductsView.tsx`)
* **Objetivo:** Administração de todo o inventário da loja física no ambiente digital.
* **Componentes e Elementos Visuais:**
  - **Abas de Status do Estoque:**
    - *Ativos:* Produtos visíveis e disponíveis para compra imediata.
    - *Pausados:* Produtos temporariamente ocultos da busca.
    - *Esgotados:* Alerta de itens com estoque zerado no depósito.
  - **Barra de Pesquisa e Filtros:** Busca por nome do material, marca ou código SKU interno da loja.
  - **Tabela/Grid de Produtos com Ações Rápidas:**
    - Miniatura da foto, título completo do produto e código SKU.
    - Preço atual de venda com botão de edição rápida de preço inline.
    - Quantidade em estoque com badge de aviso (Verde: *Estoque Alto*, Amarelo: *Estoque Baixo*, Vermelho: *Crítico*).
    - Switch liga/desliga para pausar ou reativar a venda do item com 1 clique.
    - Botões de ação: "Editar Cadastro Completo" e "Excluir".
  - Botão Primário no Topo: "+ Cadastrar Produto".

---

#### Tela 23: Cadastro de Produto / Wizard em 5 Etapas (`LojistaAddProductView.tsx`)
* **Objetivo:** Formulário passo a passo estruturado para cadastro técnico e comercial de materiais de construção.
* **Etapas e Campos Detalhados:**
  - **Etapa 1: Dados Básicos do Material**
    - Nome Comercial (ex: *Cimento Portland CP II-F 50kg*).
    - Categoria e Subcategoria (ex: *Materiais Básicos > Cimentos e Argamassas*).
    - Marca Fabricante (ex: *Votoran, Cauê, Montes Claros*).
    - Modelo e Código SKU/EAN da loja.
    - Descrição comercial e recomendações de aplicação.
  - **Etapa 2: Precificação e Estoque**
    - Preço de Venda Regular (R$).
    - Preço Promocional (opcional, para ofertas relâmpago).
    - Estoque Disponível atual no depósito.
    - Nível de Estoque Mínimo para disparo de alerta de reposição.
    - Unidade de Medida Comercial: *Unidade (un), Saco (sc), Metro Quadrado (m²), Metro Cúbico (m³), Barra, Quilo (kg), Litro (L)*.
  - **Etapa 3: Logística, Dimensões e Peso**
    - Peso bruto por volume (fundamental para o cálculo de frete por tonelada).
    - Dimensões do pacote: Comprimento, Largura e Altura em centímetros.
    - Classificação Fiscal (NCM) e Origem da mercadoria.
    - Tipo de veículo mínimo recomendado para o transporte (Utilitário leve, Fiorino, Caminhão Toco, Caminhão Munck).
  - **Etapa 4: Fotos e Mídia do Produto**
    - Upload de foto de capa (fundo limpo/branco).
    - Upload de fotos secundárias (embalagem, especificações técnicas na etiqueta, fotos reais de saco/peça).
  - **Etapa 5: Revisão e Ativação no Marketplace**
    - Resumo visual de como o anúncio será exibido para o cliente na busca.
    - Botão de confirmação: "Publicar Produto no Catálogo da OBRACOM".

---

#### Tela 24: Gestão Operacional de Pedidos (`LojistaOrdersView.tsx`)
* **Objetivo:** O "KDS/Gestor de Pedidos" da loja de materiais de construção, coordenando o fluxo desde o pedido até a saída do caminhão.
* **Componentes e Elementos Visuais:**
  - **Colunas/Abas do Pipeline Operacional:**
    1. *Novos Pedidos:* Notificação de novas compras com prazo para aceite em até 10 minutos.
    2. *Em Separação no Depósito:* Pedido aprovado, romaneio impresso e ajudantes separando os volumes no pátio.
    3. *Pronto para Envio / Aguardando Coleta:* Carga conferida, paletizada ou ensacada aguardando o veículo.
    4. *Saiu para Entrega / Em Trânsito:* Motorista a caminho do canteiro de obras do cliente.
    5. *Entregues:* Histórico de entregas com comprovante de recebimento assinado.
  - **Card Detalhado de Cada Pedido:**
    - Número do Pedido (#OBR...).
    - Endereço da Obra e distância em km do depósito.
    - Lista discriminada de itens e quantidades.
    - Tipo de veículo solicitado pelo cliente (ex: *Caminhão Basculante de 6m³*).
    - Botão "Imprimir Romaneio de Carga e Cupom Fiscal".
    - Botão de avanço de etapa: "Iniciar Separação" > "Finalizar Separação" > "Despachar Veículo".

---

#### Tela 25: Módulo Financeiro & Repasses (`LojistaFinancialView.tsx`)
* **Objetivo:** Controle de recebíveis, comissões da plataforma, extrato detalhado de vendas e solicitação de transferências bancárias.
* **Componentes e Elementos Visuais:**
  - **Painel de Saldos:**
    - *Saldo Disponível para Saque:* Valor já liberado após confirmação de entrega na obra.
    - *Saldo a Liberar (Lançamentos Futuros):* Pedidos em trânsito ou dentro do prazo de garantia de entrega.
    - *Total Faturado no Mês:* Soma total das vendas brutas da loja.
  - **Botão de Ação:** "Solicitar Transferência via PIX (Saque Instantâneo)".
  - **Extrato Analítico de Transações:**
    - Data e hora, número do pedido, valor bruto da venda, taxa de comissão da plataforma OBRACOM (ex: 10%), taxa de logística (quando aplicável) e valor líquido creditado na conta da loja.
  - **Dados Bancários Cadastrados:** Chave PIX e conta corrente da empresa para recebimento automático semanal ou mensal.

---

#### Tela 26: Métricas de Desempenho & Analytics (`LojistaPerformanceView.tsx`)
* **Objetivo:** Relatórios de inteligência de negócios para o lojista maximizar sua eficiência e rentabilidade.
* **Componentes e Elementos Visuais:**
  - **Métricas de Nível de Serviço (SLA):**
    - *Tempo Médio de Separação de Carga:* Meta de até 25 minutos para materiais básicos.
    - *Taxa de Pedidos Cancelados:* Indicador de ruptura de estoque.
    - *Pontualidade da Entrega:* Porcentagem de pedidos entregues dentro da janela combinada.
  - **Ranking dos Materiais Mais Vendidos na Loja:** Top 5 produtos com maior faturamento e maior margem de lucro.
  - **Recomendações Inteligentes:** Sugestões do sistema para o lojista (ex: *"Aumente o estoque de cimento CP II: a demanda na sua região cresceu 28% esta semana"*).

---

#### Tela 27: Gestão de Avaliações e Reputação (`LojistaReviewsView.tsx`)
* **Objetivo:** Monitoramento de feedbacks dos compradores e resposta institucional da loja.
* **Componentes e Elementos Visuais:**
  - Distribuição das avaliações (5 estrelas a 1 estrela).
  - Feed de comentários deixados pelos mestres de obras e construtores.
  - Campo para a loja enviar resposta pública ao cliente (fortalecendo a credibilidade do estabelecimento).
  - Alerta de avaliações que demandam atenção do atendimento ao cliente.

---

#### Tela 28: Configurações da Loja (`LojistaSettingsView.tsx`)
* **Objetivo:** Parâmetros operacionais, fiscais e logísticos do depósito parceiro.
* **Componentes e Elementos Visuais:**
  - **Dados Cadastrais da Empresa:** Razão Social, CNPJ, Inscrição Estadual, logotipo da loja e fotos do pátio/depósito.
  - **Raio de Atendimento Logístico:** Definição do raio máximo em quilômetros que a loja realiza entregas (ex: *Atender até 20 km do endereço da loja*).
  - **Política de Frete:**
    - Tabela de frete próprio da loja baseada em peso e distância.
    - Integração com a rede de motoristas parceiros OBRACOM Log.
    - Valor mínimo de pedido para frete grátis na região.
  - **Horário de Funcionamento do Depósito:** Definição de horários de abertura, fechamento e dias de funcionamento (segunda a sábado), evitando recebimento de pedidos quando o depósito estiver fechado.
  - **Equipe e Operadores:** Cadastro de acessos secundários para estoquistas e conferentes de carga.

---

### 5. Matriz de Funcionalidades Transversais do "iFood da Construção"

| Funcionalidade Transversal | Descrição Técnica & Operacional |
| :--- | :--- |
| **Geolocalização & Roteirização por Proximidade** | O sistema calcula automaticamente a distância real em km entre a obra cadastrada pelo comprador e os depósitos parceiros, ordenando produtos por menor custo total (preço do item + frete mais barato por km rodado). |
| **Logística Fracionada para Materiais Pesados vs. Leves** | Diferente de apps de delivery convencionais que utilizam apenas motos, a OBRACOM classifica cada produto por cubagem e peso bruto. Pedidos de emergência com itens leves (<30kg) utilizam motos/utilitários; pedidos de alvenaria e cimento (>500kg) exigem alocação automática de carretos, caminhões toco ou munck para descarregamento de paletes. |
| **Comparador Multilojas em Tempo Real** | Se o usuário pesquisa "Cimento Votoran 50kg", o sistema exibe não apenas o produto, mas quais depósitos vizinhos possuem o produto em estoque físico com os respectivos prazos de entrega e valores unitários. |
| **Recompra com 1 Clique ("Comprar Novamente")** | Na construção civil, a reposição de insumos básicos ocorre frequentemente. Com um único toque no histórico de pedidos, o mestre de obras replica a última lista de materiais diretamente para o carrinho de compras. |
| **Rastreamento em Tempo Real com GPS do Veículo** | O comprador visualiza em mapa interativo o caminhão em deslocamento até a obra, com dados do motorista, placa e contato telefônico direto para orientações de acesso ao canteiro. |
| **Proteção de Pagamento & Garantia na Entrega** | O valor pago pelo cliente fica retido na carteira de custódia da plataforma e só é repassado para o depósito parceiro após a conferência e confirmação de entrega dos materiais na obra. Em caso de sacos rasgados ou avarias, o cliente abre disputa imediata pelo app. |
| **Boleto Faturado PJ para Construtoras** | Sistema de análise de crédito e emissão de compras faturadas a 30/60 dias para empresas e construtoras cadastradas, com nota fiscal eletrônica enviada diretamente ao departamento financeiro da obra. |
| **Marketplace Integrado de Mão de Obra** | Complementariedade perfeita: além de comprar os materiais, o cliente pode contratar o profissional certificado que executará o serviço (ex: comprou fios e disjuntores -> recebe sugestão de eletricistas certificados na região). |

---

### 6. Mapa de Navegação e Fluxo de Telas (User Journey)

```
[Splash / Onboarding]
       |
       v
  [Login / Registro]
       |
       +---------------------------------------------+
       |                                             |
       v (Modo Cliente)                              v (Modo Lojista)
 [Home / Feed da Obra]                     [Dashboard do Lojista]
       |                                             |
       +---> [Busca & Catálogo Geral]                 +---> [Gestão de Catálogo & Estoque]
       |            |                                |            |
       |            v                                |            v
       |     [Detalhes do Produto]                   |     [Cadastro de Produto - Wizard]
       |            |                                |
       |            v                                +---> [Gestão de Pedidos / Romaneio]
       |     [Carrinho & Checkout]                   |
       |            |                                +---> [Módulo Financeiro & Repasses]
       |            v                                |
       |     [Confirmação de Pedido]                 +---> [Métricas de Desempenho]
       |            |                                |
       |            v                                +---> [Configurações da Loja]
       |     [Rastreamento no Mapa]
       |
       +---> [Histórico de Pedidos] ---> [Recompra com 1 Clique]
       |
       +---> [Serviços & Mão de Obra] ---> [Perfil Profissional] ---> [Solicitar Orçamento]
       |
       +---> [Favoritos & Listas de Obras]
       |
       +---> [Perfil & Endereços de Obras]
       |
       +---> [Central de Ajuda & Suporte]
```

---

### 7. Tecnologias Utilizadas no Sistema

- **Frontend & Interface:** React 19, TypeScript, Vite.
- **Design System & Estilização:** Tailwind CSS v4, Lucide React Icons.
- **Arquitetura de Telas:** Visualização fluida e 100% responsiva (Mobile First com expansão inteligente em telas Desktop/Tablet).
- **Tipagem Forte:** Modelos de dados completos para `Product`, `Order`, `CartItem`, `Store`, `Professional` e `NotificationItem`.
- **Roteamento SPA:** Máquina de estados baseada em pilha de navegação com histórico (`viewHistory`) e suporte a botão nativo de voltar.

---

*Documento gerado para a plataforma OBRACOM – O iFood da Construção Civil.*
