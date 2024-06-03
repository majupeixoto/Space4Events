# Contribuindo para Space4events

Primeiramente, obrigado por dedicar seu tempo para contribuir! ❤️

Todos os tipos de contribuições são encorajados e valorizados. Veja o [Índice](#índice) para diferentes maneiras de ajudar e detalhes sobre como este projeto lida com elas. Por favor, certifique-se de ler a seção relevante antes de fazer sua contribuição. Isso facilitará muito para nós, mantenedores, e tornará a experiência mais tranquila para todos os envolvidos. A comunidade aguarda ansiosamente suas contribuições. 🎉

> E se você gosta do projeto, mas simplesmente não tem tempo para contribuir, tudo bem. Existem outras maneiras fáceis de apoiar o projeto e mostrar sua apreciação, das quais também ficaríamos muito felizes:
> - Dê uma estrela no projeto
> - Tweet sobre ele
> - Referencie este projeto no readme do seu projeto
> - Mencione o projeto em encontros locais e conte para seus amigos/colegas

## Índice

- [Tenho uma Pergunta](#tenho-uma-pergunta)
- [Quero Contribuir](#quero-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Sua Primeira Contribuição de Código](#sua-primeira-contribuição-de-código)
- [Melhorando a Documentação](#melhorando-a-documentação)
- [Guia de Estilo](#guia-de-estilo)
- [Mensagens de Commit](#mensagens-de-commit)

## Tenho uma Pergunta

Antes de fazer uma pergunta, é melhor procurar por [Issues](https://github.com/majupeixoto/Space4Events.git/issues) existentes que possam te ajudar. Caso você encontre uma issue adequada e ainda precise de esclarecimentos, você pode escrever sua pergunta nessa issue. Também é aconselhável procurar respostas na internet primeiro.

Se você ainda sentir a necessidade de fazer uma pergunta e precisar de esclarecimentos, recomendamos o seguinte:

- Abra uma [Issue](https://github.com/majupeixoto/Space4Events.git/issues/new).
- Forneça o máximo de contexto possível sobre o que você está enfrentando.
- Forneça versões do projeto e da plataforma (nodejs, npm, etc), dependendo do que parecer relevante.

Nós cuidaremos da issue o mais rápido possível.

## Quero Contribuir

> ### Aviso Legal <!-- omit in toc -->
> Ao contribuir para este projeto, você deve concordar que é o autor de 100% do conteúdo, que possui os direitos necessários sobre o conteúdo e que o conteúdo que você contribui pode ser fornecido sob a licença do projeto.

### Reportando Bugs

#### Antes de Enviar um Relatório de Bug

Um bom relatório de bug não deve deixar os outros precisando te procurar para mais informações. Portanto, pedimos que você investigue cuidadosamente, colete informações e descreva o problema em detalhes no seu relatório. Por favor, complete os seguintes passos com antecedência para nos ajudar a corrigir qualquer bug potencial o mais rápido possível.

- Certifique-se de que você está usando a versão mais recente.
- Determine se o seu bug é realmente um bug e não um erro do seu lado, por exemplo, usando componentes/versões de ambiente incompatíveis. Se você está procurando suporte, pode querer verificar [esta seção](#tenho-uma-pergunta).
- Para ver se outros usuários já experimentaram (e potencialmente já resolveram) o mesmo problema que você está tendo, verifique se já não existe um relatório de bug para o seu problema ou erro no [rastreador de bugs](https://github.com/majupeixoto/Space4Events.git/issues?q=label%3Abug).
- Também certifique-se de procurar na internet (incluindo Stack Overflow) para ver se usuários fora da comunidade GitHub discutiram o problema.
- Colete informações sobre o bug:
  - Stack trace (Rastreamento de pilha)
  - SO, Plataforma e Versão (Windows, Linux, macOS, x86, ARM)
  - Versão do interpretador, compilador, SDK, ambiente de execução, gerenciador de pacotes, dependendo do que parecer relevante.
  - Possivelmente sua entrada e a saída
  - Você pode reproduzir o problema de forma confiável? E você também pode reproduzi-lo com versões mais antigas?

#### Como Enviar um Bom Relatório de Bug?

> Você nunca deve relatar problemas de segurança, vulnerabilidades ou bugs que incluam informações sensíveis no rastreador de issues, ou em qualquer outro lugar público. Em vez disso, bugs sensíveis devem ser enviados por email para prcr@cesar.school.
<!-- Você pode adicionar uma chave PGP para permitir que as mensagens sejam enviadas criptografadas também. -->

Usamos issues do GitHub para rastrear bugs e erros. Se você encontrar um problema com o projeto:

- Abra uma [Issue](https://github.com/majupeixoto/Space4Events.git/issues/new). (Como não podemos ter certeza neste ponto se é um bug ou não, pedimos que você não fale sobre um bug ainda e não rotule a issue.)
- Explique o comportamento que você esperava e o comportamento real.
- Por favor, forneça o máximo de contexto possível e descreva os *passos de reprodução* que alguém pode seguir para recriar o problema por conta própria. Isso geralmente inclui seu código. Para bons relatórios de bugs, você deve isolar o problema e criar um caso de teste reduzido.
- Forneça as informações que você coletou na seção anterior.

Uma vez arquivado:

- A equipe do projeto rotulará a issue de acordo.
- Um membro da equipe tentará reproduzir o problema com os passos fornecidos por você. Se não houver passos de reprodução ou nenhuma maneira óbvia de reproduzir o problema, a equipe pedirá esses passos e marcará a issue como `needs-repro`. Bugs com a tag `needs-repro` não serão abordados até que sejam reproduzidos.
- Se a equipe conseguir reproduzir o problema, ele será marcado como `needs-fix`, bem como possivelmente outras tags (como `critical`), e a issue será deixada para ser [implementada por alguém](#sua-primeira-contribuição-de-código).

### Sugerindo Melhorias

Esta seção orienta você a enviar uma sugestão de melhoria para o Space4events, **incluindo novos recursos completamente e pequenas melhorias na funcionalidade existente**. Seguir estas diretrizes ajudará os mantenedores e a comunidade a entender sua sugestão e encontrar sugestões relacionadas.

#### Antes de Enviar uma Sugestão de Melhoria

- Certifique-se de que você está usando a versão mais recente.
- Leia a [documentação](https://github.com/majupeixoto/Space4Events#aluguel-de-espa%C3%A7os) cuidadosamente e descubra se a funcionalidade já está coberta, talvez por uma configuração individual.
- Realize uma [busca](https://github.com/majupeixoto/Space4Events.git/issues) para ver se a melhoria já foi sugerida. Se foi, adicione um comentário à issue existente em vez de abrir uma nova.
- Descubra se sua ideia se encaixa no escopo e nos objetivos do projeto. Cabe a você fazer um caso forte para convencer os desenvolvedores do projeto sobre os méritos deste recurso. Lembre-se de que queremos recursos que serão úteis para a maioria dos nossos usuários e não apenas para um pequeno subconjunto. Se você está apenas direcionando uma minoria de usuários, considere escrever uma biblioteca de complemento/plugin.

#### Como Enviar uma Boa Sugestão de Melhoria?

Sugestões de melhorias são rastreadas como [issues do GitHub](https://github.com/majupeixoto/Space4Events.git/issues).

- Use um **título claro e descritivo** para a issue para identificar a sugestão.
- Forneça uma **descrição passo a passo da melhoria sugerida** em tantos detalhes quanto possível.
- **Descreva o comportamento atual** e **explique qual comportamento você esperava ver em vez disso** e por quê. Neste ponto, você também pode dizer quais alternativas não funcionam para você.
- Você pode querer **incluir capturas de tela e GIFs animados** que ajudem a demonstrar os passos ou apontar a parte à qual a sugestão está relacionada. Você pode usar [esta ferramenta](https://www.cockos.com/licecap/) para gravar GIFs no macOS e Windows, e [esta ferramenta](https://github.com/colinkeenan/silentcast) ou [esta ferramenta](https://github.com/GNOME/byzanz) no Linux. <!-- isso deve ser incluído apenas se o projeto tiver uma GUI -->
- **Explique por que essa melhoria seria útil** para a maioria dos usuários do Space4events. Você também pode querer apontar outros projetos que resolveram isso melhor e que poderiam servir de inspiração.

Este guia é baseado no **contributing-gen**. [Faça o seu próprio](https://github.com/bttger/contributing-gen)!
