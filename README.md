![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

# 💍 Guilherme & Taine — Site dos Noivos
(Ainda não finalizado)
Site de casamento desenvolvido para o casamento de Guilherme e Taine, marcado para 30 de maio de 2026 na Chácara Laggus, Campo Largo - PR.
sites-dos-noivos.vercel.app

## Sobre o projeto
Single Page Application estática com as seções:

- Hero — contador regressivo para o casamento
- Local — endereço com link para o Google Maps
- Noivos — galeria de fotos com carousel e lightbox
- Padrinhos & Madrinhas — carousel com foto e nome
- Confirmação de Presença (RSVP) — formulário integrado ao Supabase (com opção de exportar CSV)
- Presentes — lista de presentes e PIX
- Contato — WhatsApp e e-mail dos noivos


## Stack
Camada: Tecnologia Frontend HTML5, CSS3, JavaScript. Banco de dados: Supabase (PostgreSQL). Hospedagem: Vercel. Controle de versão: GitHub

```
## Estrutura
sites-dos-noivos/
├── admin/
│   └── index.html        # Painel administrativo (acesso restrito)
├── assets/
│   └── images/           # Fotos, favicons e SVGs
├── css/
│   ├── style.css         # Estilos da página principal
│   └── admin.css         # Estilos do painel admin
├── js/
│   ├── main.js           # Navegação, carousels, PIX
│   ├── gallery.js        # Galeria e lightbox
│   ├── rsvp.js           # Formulário de confirmação
│   └── countdown.js      # Contador regressivo
├── index.html            # Página principal
└── site.webmanifest
```

## Segurança
O repositório é público. A segurança é garantida por:

Supabase RLS configurado na tabela confirmacoes:

INSERT liberado para anon — convidados podem enviar confirmações
SELECT restrito a authenticated — somente o admin logado lê os dados


Admin com autenticação via Supabase Auth (e-mail + senha) — nenhuma senha no código
.gitignore configurado para ignorar .env e arquivos sensíveis


## Variáveis de ambiente
Veja o arquivo .env.example na raiz para referência. As chaves do Supabase devem ser configuradas diretamente nos arquivos JS ou via variáveis de ambiente da Vercel.

👨‍💻 Desenvolvimento
Projeto desenvolvido com auxílio do GitHub Copilot. Não requer build — basta abrir o index.html ou fazer deploy direto na Vercel.

Mateus 19:6 — "Assim já não são duas pessoas, mas uma só. Portanto, que ninguém separe o que Deus uniu."
