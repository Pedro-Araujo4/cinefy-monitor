import { chromium } from 'playwright';

// Estrutura dos vídeos encontrados
interface VideoInfo {
    title: string | null;
    date: string | null;
    url: string | null;
}

async function monitorarCinefy() {
    console.log('Iniciando o monitoramento do Cinefy...');

    // Inicia o navegador (headless: false para você ver o robô agindo na primeira vez)
    const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe' });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        const targetUrl = 'https://cinefy.gg/title/oWyIXdfjko6GRz/videos';
        await page.goto(targetUrl, { waitUntil: 'networkidle' });

        console.log('A aguardar a renderização dos vídeos no ecrã...');

        // Força o robô a esperar até que o elemento do vídeo exista
        await page.waitForSelector('[class*="VideoCardContainer"]', { state: 'visible', timeout: 15000 });

        //  Extrai as informações com base no seletor flexível
        const videosLancadosHoje = await page.$$eval('[class*="VideoCardContainer"]', (cards) => {
            const novosVideos: VideoInfo[] = [];

            cards.forEach(card => {
                // Procura a primeira tag <a> que possua um atributo 'title' definido
                // Se não encontrar, pega a primeira tag <a> que possua um link ('href')
                const linkElement = card.querySelector('a[title]') || card.querySelector('a[href]');
                
                // Primeiro tenta pegar o valor do atributo title. Se falhar, tenta o texto interno.
                // Se tudo falhar, coloca "Título não encontrado" para não quebrar a tabela com 'null'
                const title = linkElement?.getAttribute('title') || linkElement?.textContent?.trim() || 'Título não encontrado';
                
                let url = linkElement?.getAttribute('href') || null;
                if (url && url.startsWith('/')) {
                    url = `https://cinefy.gg${url}`;
                }

                // Procura em TODOS os elementos do cartão (*)
                const todosOsElementos = Array.from(card.querySelectorAll('*'));
                
                const elementoDeData = todosOsElementos.find(el => {
                    const texto = el.textContent?.toLowerCase() || '';
                    // Confirma se contém as palavras e se é o nó folha (não tem outros elementos HTML dentro de si)
                    return (texto.includes('há') || texto.includes('minuto') || texto.includes('hora')) && el.children.length === 0;
                });

                const dateText = elementoDeData ? elementoDeData.textContent?.trim() : null;

                if (dateText) {
                    const textoData = dateText.toLowerCase();
                    if (textoData.includes('minuto') || textoData.includes('hora') || textoData.includes('hoje')) {
                        novosVideos.push({ title, date: dateText, url }); 
                    }
                }
            });

            return novosVideos;
        });

        if (videosLancadosHoje.length > 0) {
            console.log('\n✅ NOVOS VÍDEOS ENCONTRADOS HOJE!');
            console.table(videosLancadosHoje);
        } else {
            console.log('\n❌ Nenhum vídeo novo da categoria encontrado hoje.');
        }

    } catch (error) {
        console.error('Erro ao aceder à página:', error);
    } finally {
        await browser.close();
    }
}
monitorarCinefy();
