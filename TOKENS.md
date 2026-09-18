# Como editar os tokens do CalvinDS

Os tokens vivem em dois arquivos, dentro de `src/tokens/`:

- **`primitive.css`** — as escalas "cruas": paleta de cores completa (ex. `--color-primary-600`),
  espaçamentos, tamanhos de radius, tipografia. Só troque aqui quando o Figma
  "CalvinDS - Primitive Tokens" mudar.
- **`semantic.css`** — os tokens que os componentes realmente usam (ex.
  `--color-brand`, `--radius-button`). É aqui que você mexe no dia a dia.

## Incluir um token novo

Adicione uma linha nova na seção certa, por exemplo em `semantic.css`:

```css
--color-brand-bg-subtle: #FEF0F2;
```

Depois, adicione a mesma variável dentro do bloco `@theme inline` em
`src/styles.css`, na seção correspondente (cores, radius, spacing...), assim:

```css
--color-brand-bg-subtle: var(--color-brand-bg-subtle);
```

Isso é o que transforma o token numa classe Tailwind utilizável nos
componentes (ex. `bg-brand-bg-subtle`).

## Editar um token existente

Troque o valor da linha em `primitive.css` ou `semantic.css`. Não precisa
mexer em `styles.css` nem rodar nenhum comando — o valor novo já vale para
todo componente que usa aquele token.

## Excluir um token

Antes de apagar, procure o nome do token em `src/components/` (ex. buscar
por `brand-bg-subtle` na pasta) para confirmar que nenhum componente ainda
depende dele. Aí sim, apague a linha em `primitive.css`/`semantic.css` e a
linha correspondente em `styles.css`.

## Modo escuro

Tokens semânticos têm uma versão light (padrão) e uma dark, dentro de
`semantic.css`. Edite os dois blocos se a mudança precisa valer nos dois
modos; edite só um se for uma diferença intencional entre light e dark.

## Onde ver os tokens no Storybook

- **Foundations → Primitive Tokens** — toda a paleta/escalas de `primitive.css`, com busca e botão para copiar `var(--token)`.
- **Foundations → Semantic Tokens** — tudo de `semantic.css` com valores Light e Dark lado a lado e o primitivo por trás de cada cor (ex. `brand → primary-600`).
- **Foundations → Token Usage** — visão geral de todos os componentes: quantos tokens cada um usa, valores fixos (arbitrários) e problemas, mais um índice "token → componentes".
- **Docs de cada componente** — a seção **Tokens usados** no fim da página lista os tokens daquele componente (com light/dark, primitivo e as classes que os usam).

As páginas leem direto dos arquivos CSS, então refletem qualquer edição de token na hora. A seção "Tokens usados" vem de `npm run tokens:usage` (análise estática das classes Tailwind de `src/components/`); ele roda automaticamente antes de `npm run storybook` e `npm run build-storybook`, e o resultado (`src/foundations/usage/token-usage.generated.json`) fica versionado.

O extrator também sinaliza **problemas**: classes numéricas fora da escala registrada (ex. `p-20`, que não gera CSS nenhum) e cores hardcoded. Os testes (`npm run test`) falham se algum componente introduzir uma classe fora da escala.
