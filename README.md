# Bohrer Pedidos — MVP profissional

Protótipo funcional de sistema de pedidos para a Churrascaria Bohrer, em Pelotas/RS.

## O que já funciona
- Cardápio responsivo
- Categorias
- Produtos e preços
- Carrinho com quantidade
- Retirada ou delivery
- Forma de pagamento
- Criação de pedidos
- Persistência com localStorage
- Painel administrativo em formato Kanban
- Avanço de status: Novo → Em preparo → Pronto → Concluído
- Indicadores de pedidos e faturamento
- Layout mobile e desktop

## Como testar
1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Clique em **Painel** para acessar a área administrativa.
4. Faça um pedido no cardápio e depois abra o painel.

## Próxima versão para vender
Este MVP usa `localStorage` para demonstração. Para produção, substitua por:
- Backend/API
- PostgreSQL/Supabase
- Login administrativo
- Banco de produtos
- WhatsApp Business API
- Gateway de pagamento
- Controle de entrega
- Impressão de pedidos/cozinha
- Relatórios por período
- Domínio próprio e hospedagem

> Observação: nomes, preços, horários e demais dados usados no protótipo são demonstrativos e devem ser validados com o estabelecimento antes de qualquer uso comercial.
