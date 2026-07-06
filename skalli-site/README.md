# Site institucional do Skalli

Site estático pronto para GitHub Pages.

## Estrutura

- `/` — página inicial
- `/privacidade/` — Política de Privacidade
- `/termos/` — Termos de Uso
- `/excluir-conta/` — solicitação pública de exclusão de conta
- `/suporte/` — canais de suporte
- `/faq/` — perguntas frequentes

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `skalli-site`.
2. Envie todos os arquivos desta pasta para o repositório.
3. No GitHub, entre em **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/root`.
6. Salve e aguarde a publicação.

## Domínio próprio

O arquivo `CNAME` já está configurado com:

```txt
skalli.com.br
```

Depois, configure o DNS do domínio conforme as instruções do GitHub Pages.

## Observação

Este site não usa backend. A página de exclusão de conta usa um botão `mailto:` para abrir o e-mail do usuário com uma solicitação pré-preenchida.
