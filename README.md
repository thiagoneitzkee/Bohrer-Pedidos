# Bohrer Pedidos 6.0

Sistema web responsivo para pedidos online e gestão de restaurante.

## O que foi melhorado
- Interface mais moderna, limpa e responsiva.
- Favoritos no cardápio.
- Controle visual de produtos esgotados.
- Limite de quantidade pelo estoque.
- Checkout com dados preservados ao alternar Delivery.
- Cupom com desconto visível no resumo.
- Persistência local de dados.
- Sincronização com Supabase quando configurado.
- Atualização automática do painel em nuvem a cada 30 segundos.
- PWA/instalação no celular.
- Painel administrativo com pedidos, cozinha, mesas, produtos, estoque, clientes, relatórios, equipe e configurações.
- Impressão de pedidos e envio pelo WhatsApp.

## Demonstração local
Abra `index.html` em um servidor local ou publique no GitHub Pages.

Acesso de demonstração:
- E-mail: `admin@bohrer.local`
- Senha: `bohrer123`

> Para produção, substitua o login local por Supabase Auth e proteja as operações administrativas com RLS e perfis de equipe.

## Publicação no GitHub Pages
1. Envie o conteúdo desta pasta para um repositório.
2. Ative Pages em Settings → Pages.
3. Selecione a branch principal e a pasta `/root`.
4. Aguarde a publicação.

## Supabase
Preencha `assets/config.js` com a URL do projeto e a chave anon pública e execute `supabase/schema.sql`.
Nunca coloque uma `service_role key` no frontend.
