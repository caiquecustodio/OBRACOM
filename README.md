# OBRACOM – Tudo para sua obra

Marketplace completo de materiais de construção, serviços, cotações e gestão para lojistas — o "iFood da construção civil".

A OBRACOM conecta, por proximidade geográfica:

- **Consumidores, mestres de obras e construtores** que precisam de suprimentos com entrega rápida na obra.
- **Depósitos e lojas de materiais (lojistas parceiros)** que digitalizam o estoque e vendem no raio de entrega.
- **Prestadores de serviço** (eletricistas, pedreiros, encanadores, pintores) para cotação de mão de obra.
- **Logística sob medida** para cargas leves (utilitários) e pesadas (caminhões toco, truck e munck).

## Stack

- **Frontend:** React 19 + TypeScript + Vite 8
- **Estilização:** Tailwind CSS v4
- **Ícones:** Lucide React
- **Animações:** Motion

## Rodar localmente

**Pré-requisito:** Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o dev server:
   ```bash
   npm run dev
   ```
3. Acesse http://localhost:3000

## Comandos

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento (porta 3000) |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Typecheck do TypeScript (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` e artefatos de build |

## Estrutura do projeto

```
src/
├── components/       # Header, navegação inferior, moldura do dispositivo, logo
├── views/            # 19 telas do consumidor (catálogo, checkout, rastreamento...)
│   └── lojista/      # 9 telas do painel do lojista (dashboard, catálogo, financeiro...)
├── data/             # Dados e mock da aplicação
└── types/            # Modelos TypeScript (Product, Order, CartItem...)
```

## Telas

- **Consumidor:** Splash, Login/Cadastro, Home, Busca e Catálogo, Detalhe do Produto, Checkout, Confirmação e Rastreamento de Pedido, Histórico, Favoritos, Marketplace de Serviços, Perfil, Notificações, Central de Ajuda e Sobre.
- **Lojista:** Captação ("Seja Parceiro"), Dashboard, Gestão de Catálogo e Estoque, Wizard de Cadastro de Produto, Pedidos/Romaneios, Financeiro e Repasses, Métricas, Avaliações e Configurações da Loja.

O mapeamento detalhado de todas as telas está em [MAPA_DE_FUNCIONALIDADES.md](MAPA_DE_FUNCIONALIDADES.md).

> **Nota:** a aplicação roda atualmente com dados de demonstração (`src/data/mockData.ts`), sem backend conectado.
