# 🎬 Monitor de Lançamentos - Cinefy (Web Scraper)

Um bot automatizado construído com **TypeScript** e **Playwright** para monitorar lançamentos de novos episódios (como Bleach) no site Cinefy. 

O script acessa a página, aguarda a renderização dinâmica do React/Next.js e extrai inteligentemente os dados dos cartões de vídeo, filtrando os lançamentos recentes do dia ("há minutos" ou "há horas").

## 🚀 Funcionalidades

*   **Renderização Dinâmica:** Usa o Playwright para lidar com sites modernos que dependem de JavaScript para renderizar o conteúdo.
*   **Busca Inteligente (Resiliente):** Em vez de depender de classes dinâmicas complexas do React (que mudam a cada atualização), o bot varre a árvore do HTML em busca de atributos semânticos (`title`, `href`) e textos literais.
*   **Filtro de Lançamentos:** Identifica vídeos recém-lançados buscando por termos de tempo relativo (ex: "minutos", "horas", "hoje").

## 🛠️ Tecnologias Utilizadas

*   [Node.js](https://nodejs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Playwright](https://playwright.dev/) (Motor de Web Scraping)
*   [tsx](https://github.com/privatenumber/tsx) (Para rodar TypeScript nativamente com suporte moderno a ESM/CommonJS)

## ⚙️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto na sua máquina:

**1. Clone ou crie a pasta do projeto:**
```bash
mkdir cinefy-monitor
cd cinefy-monitor
```

**2. Inicialize o projeto Node:**
```bash
npm init -y
```

**3. Instale as dependências:**
```bash
npm install playwright
npm install -D typescript @types/node tsx
```

**4. Instale o navegador do Playwright (Chromium):**
```bash
npx playwright install chromium
```

**5. Configure o TypeScript:**
Certifique-se de que o seu ficheiro `tsconfig.json` está configurado para módulos modernos, para evitar conflitos:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## ▶️ Como Executar

Para rodar o bot de monitoramento, execute o seguinte comando no terminal:

```bash
npx tsx index.ts
```

*Nota: Se quiser ver o robô a navegar visualmente em vez de rodar em modo fantasma, altere a propriedade `headless: true` para `headless: false` dentro do código no ficheiro `index.ts`.*

## 📝 Próximos Passos (Integrações)

Como o script já devolve um *array* formatado com os episódios novos encontrados, o próximo passo recomendado é integrar uma notificação automática na condicional final, como:

*   Webhook para o **Discord** (usando `axios` ou `fetch`).
*   Bot no **Telegram** (usando a API oficial).
*   Envio de e-mail automatizado.

---
*Projeto desenvolvido para fins educacionais e de automação pessoal.*