# Bohrer Pedidos 4.0

Sistema de pedidos com modo local e modo cloud.

## GitHub Pages
1. Envie todos os arquivos para a raiz do repositório.
2. Settings → Pages → Deploy from branch → `main` → `/ (root)`.
3. Para modo cloud, crie um projeto Supabase, execute `supabase/schema.sql` no SQL Editor e preencha `assets/config.js`.

## Login do painel
Usuário: `admin`
Senha: `bohrer123`

> O login acima é apenas demonstração. Para produção, use autenticação real (Supabase Auth) e políticas RLS restritivas.

## O que é novo na 4.0
- Banco de dados Supabase opcional
- Pedidos sincronizados entre dispositivos quando cloud está configurado
- Atualização automática do painel
- CRUD de produtos
- Gestão de pedidos e status
- Dashboard e relatórios
- Configurações do restaurante
- Fallback localStorage para demonstração sem backend
