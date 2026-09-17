# CalvinDS

Biblioteca de componentes do design system Calvin (Mackenzie), fiel ao Figma
"CalvinDS - Core Components". Feita para ser copiada e colada em qualquer
projeto — cada componente é um arquivo autocontido em `src/components/<nome>/`.

## Rodando localmente

```bash
npm install
npm run storybook   # catálogo visual + documentação, http://localhost:6006
npm run test        # testes de comportamento
```

## Usando um componente em outro projeto

1. Copie a pasta `src/tokens/` (os dois arquivos CSS) e `src/icons/Icon.tsx` para o projeto de destino, e importe-os no CSS de entrada do projeto.
2. Copie a pasta do componente desejado, ex. `src/components/button/`.
3. Garanta que o projeto de destino tem as dependências de terceiros listadas em `package.json` (Radix, CVA, clsx, tailwind-merge, Phosphor, Tailwind v4).

## Editando tokens

Veja [TOKENS.md](./TOKENS.md).
