# Documentação do Projeto: Plataforma de Conexão para ONGs

## 1. Apresentação e Motivação
O desenvolvimento deste projeto partiu de uma análise sobre o Terceiro Setor no Brasil. Percebi que muitas ONGs fazem um trabalho incrível, mas operam de forma isolada. A motivação central aqui não foi apenas criar um site institucional para uma única organização, mas sim desenvolver um **hub centralizador**.

A ideia é ampliar o alcance dessas iniciativas: ao invés de o voluntário ter que procurar site por site, ele entra na nossa plataforma e encontra diversas causas (Educação, Fome, Saúde) em um só lugar. Isso facilita o "match" entre quem quer ajudar e quem precisa de ajuda.

## 2. Estrutura do Projeto
Para atender aos requisitos de entrega, organizei o projeto separando claramente as responsabilidades (HTML para estrutura, CSS para estilo e JS para comportamento). A arquitetura de pastas ficou assim:

* **Raiz (`/src`)**: Contém os arquivos HTML principais (`index.html`, `projetos.html`, `cadastro.html`).
* **Estilos (`/assets/css`)**: Concentra o design system em `styles.css`.
* **Scripts (`/assets/js`)**:
    * `main.js`: O "cérebro" da aplicação (gerencia dados e autenticação simulada).
    * `index.js`, `projetos.js`, `cadastro.js`: Scripts específicos para modularizar a lógica de cada página.

## 3. Decisões Técnicas e Implementação

### 3.1. HTML5 Semântico
Fugi do uso excessivo de `divs` genéricas. Utilizei tags semânticas como `<header>`, `<nav>`, `<section>`, `<article>` e `<footer>`. Isso não só ajuda na organização do código, mas é fundamental para acessibilidade e SEO, garantindo que a estrutura da página faça sentido para leitores de tela e buscadores.

### 3.2. CSS3 e Design Responsivo
Para o estilo, adotei uma abordagem moderna:
* **Variáveis CSS (`:root`)**: Defini uma paleta de cores (Primary, Secondary, Dark, Light) no início do arquivo. Isso facilitou muito a manutenção; se precisarmos mudar a cor da marca amanhã, mudamos em apenas um lugar.
* **Flexbox e Grid Layout**: Utilizei `Grid` para a vitrine de ONGs (para que os cards se ajustem automaticamente) e `Flexbox` para alinhamentos internos (menus, cards).
* **Responsividade**: O layout se adapta a celulares. O menu de navegação e as colunas dos grids se reorganizam automaticamente em telas menores (break point em 768px).

### 3.3. JavaScript e Persistência de Dados (O Desafio do Backend)
Como este é um projeto Front-End e ainda não temos um banco de dados real, precisei ser criativo para manter os dados vivos entre as trocas de página.

Criei um objeto global chamado `Storage` dentro do `main.js`.
* **Como funciona**: Ele verifica o `localStorage` do navegador. Se for a primeira vez que o usuário acessa, o sistema "semeia" (loadDefaults) o banco local com dados fictícios de ONGs (ONG Esperança, Alimenta Brasil, etc.).
* **Vantagem**: Isso permite simular uma aplicação real. Se você cadastrar um voluntário na página de cadastro, esses dados são salvos no navegador. Se você for para a Home, os dados das ONGs são carregados desse mesmo local.
* **Componentização**: Para evitar repetir código, criei funções como `UI.footer()`, que injeta o rodapé via JavaScript em todas as páginas.

## 4. Detalhamento das Funcionalidades

### Página Principal (Hub)
Esta é a vitrine. O JavaScript lê o array de ONGs e renderiza os cards dinamicamente. Também implementei um painel de estatísticas no topo ("hero section") que calcula automaticamente o total de beneficiários e voluntários somando os dados de todas as ONGs cadastradas.

### Página de Projetos
Aqui apliquei uma lógica de filtragem via URL.
* Se o usuário clica em "Ver Projetos" na Home, ele é levado para `projetos.html?ongId=1`.
* O script captura esse ID da URL e renderiza apenas os projetos daquela ONG específica. Se nenhum ID for passado, ele mostra todos os projetos disponíveis na plataforma.
* Incluí barras de progresso visuais para mostrar o quanto falta para a meta de arrecadação de cada projeto.

### Página de Cadastro
O formulário foi construído com validações nativas do HTML5 (`required`, `type="email"`, etc.). Ao submeter:
1.  O evento padrão de recarregamento é prevenido (`e.preventDefault`).
2.  Os dados são capturados via `FormData`.
3.  Um novo objeto "Voluntário" é criado e adicionado ao array `Storage.volunteers`.
4.  O novo estado é salvo no `localStorage`, simulando o envio para um servidor.

## 5. Conclusão e Próximos Passos
O projeto atende a todos os requisitos propostos: é semântico, responsivo e funcional. Consegui simular um ambiente dinâmico onde as informações fluem entre as páginas sem a necessidade (neste momento) de um backend complexo.

Para evoluções futuras, o foco seria implementar uma autenticação real e conectar a uma API para que os dados não fiquem restritos apenas ao navegador do usuário.

---

**Como testar:**
Basta abrir o arquivo `index.html` (caso renomeie) em qualquer navegador moderno. Não é necessária instalação de servidores, pois o `localStorage` funciona nativamente.