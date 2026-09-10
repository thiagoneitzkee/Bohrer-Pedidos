const products = window.BOHRER.products;
let state = { cart: JSON.parse(localStorage.getItem("bohrer_cart") || "[]"), category:"Destaques" };

const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const save = () => localStorage.setItem("bohrer_cart", JSON.stringify(state.cart));
const count = () => state.cart.reduce((s,i)=>s+i.qty,0);
const total = () => state.cart.reduce((s,i)=>s+i.price*i.qty,0);

function shell(){
  document.getElementById("app").innerHTML = `
  <header class="header"><nav class="nav">
    <div class="logo">BOHRER <span>•</span></div>
    <div class="nav-actions">
      <button class="icon-btn" onclick="openCart()">🛒 <span id="navCount">${count()}</span></button>
      <button class="icon-btn" onclick="renderAdmin()">Painel</button>
    </div>
  </nav></header>
  <main>
    <section class="hero">
      <div class="hero-card"><div class="eyebrow">Churrascaria • Pelotas/RS</div>
        <h1>Sabor de verdade,<br>do nosso jeito.</h1>
        <p>Faça seu pedido de forma rápida e escolha entre retirar ou receber em casa.</p>
      </div>
      <div class="info-card">
        <div class="eyebrow">Bohrer</div>
        <div class="info-row"><span>●</span><div><b>Aberto</b><br><small>Consulte o horário de atendimento</small></div></div>
        <div class="info-row"><span>📍</span><div>${window.BOHRER.restaurant.address}<br>${window.BOHRER.restaurant.city}</div></div>
        <div class="info-row"><span>🚚</span><div><b>Delivery e retirada</b><br>Pedido online</div></div>
      </div>
    </section>
    <section class="container">
      <div class="category-bar">${window.BOHRER.categories.map(c=>`<button class="cat ${state.category===c?"active":""}" onclick="setCategory('${c}')">${c}</button>`).join("")}</div>
      <h2 class="section-title">${state.category}</h2>
      <div class="grid">${products.filter(p=>state.category==="Destaques"?p.popular:p.category===state.category).map(card).join("")}</div>
    </section>
  </main>
  <button class="cart-fab" onclick="openCart()">🛒 Ver pedido <span class="badge">${count()}</span></button>
  <div id="overlay" class="overlay"></div>
  <div id="toast" class="toast"></div>`;
}
function card(p){return `<article class="product">
  <div class="product-top"><span class="emoji">${p.emoji}</span>${p.popular?'<span class="tag">MAIS PEDIDO</span>':''}</div>
  <h3>${p.name}</h3><p>${p.description}</p>
  <div class="price">${money(p.price)}</div><button class="add" onclick="add(${p.id})">Adicionar</button>
</article>`}
function setCategory(c){state.category=c;shell()}
function add(id){
  const p=products.find(x=>x.id===id), old=state.cart.find(x=>x.id===id);
  old?old.qty++:state.cart.push({...p,qty:1});save();shell();toast("Item adicionado ao pedido");
}
function change(id,d){
  const i=state.cart.findIndex(x=>x.id===id); if(i<0)return;
  state.cart[i].qty+=d;if(state.cart[i].qty<=0)state.cart.splice(i,1);save();openCart();
}
function openCart(){
  const overlay=document.getElementById("overlay"); if(!overlay)return;
  overlay.className="overlay open";
  overlay.innerHTML=`<aside class="drawer"><div class="drawer-head"><h2>Seu pedido</h2><button class="close" onclick="closeCart()">✕</button></div>
  ${state.cart.length?state.cart.map(i=>`<div class="cart-item"><div>${i.emoji}</div><div class="cart-item-main"><b>${i.name}</b><br><small>${money(i.price)}</small>
  <div class="qty"><button onclick="change(${i.id},-1)">−</button><b>${i.qty}</b><button onclick="change(${i.id},1)">+</button><span style="margin-left:auto">${money(i.price*i.qty)}</span></div></div></div>`).join(""):'<div class="empty">Seu carrinho está vazio.<br>Escolha algo delicioso para começar.</div>'}
  ${state.cart.length?`<div class="total"><span>Total</span><span>${money(total())}</span></div>
  <div class="field"><label>Nome</label><input id="customerName" placeholder="Como podemos te chamar?"></div>
  <div class="field"><label>Tipo de pedido</label><select id="orderType"><option>Retirada no restaurante</option><option>Delivery</option></select></div>
  <div class="field"><label>Forma de pagamento</label><select id="payment"><option>Pix</option><option>Cartão</option><option>Dinheiro</option></select></div>
  <button class="primary" onclick="finishOrder()">Finalizar pedido • ${money(total())}</button>`:""}
  </aside>`;
}
function closeCart(){const o=document.getElementById("overlay");if(o)o.className="overlay"}
function finishOrder(){
  const name=document.getElementById("customerName").value.trim()||"Cliente";
  const type=document.getElementById("orderType").value,payment=document.getElementById("payment").value;
  const orders=JSON.parse(localStorage.getItem("bohrer_orders")||"[]");
  const order={id:Math.floor(1000+Math.random()*8999),name,type,payment,total:total(),items:state.cart.map(i=>({name:i.name,qty:i.qty,price:i.price})),status:"novo",created:new Date().toISOString()};
  orders.unshift(order);localStorage.setItem("bohrer_orders",JSON.stringify(orders));state.cart=[];save();closeCart();shell();toast(`Pedido #${order.id} recebido!`);
}
function toast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}

function renderAdmin(){
 const orders=JSON.parse(localStorage.getItem("bohrer_orders")||"[]");
 document.getElementById("app").innerHTML=`<header class="header"><nav class="nav"><div class="logo">BOHRER <span>•</span> PAINEL</div><button class="icon-btn" onclick="shell()">← Cardápio</button></nav></header>
 <main class="admin"><div class="admin-head"><div><div class="eyebrow">Gestão</div><h1>Pedidos</h1></div><button class="icon-btn" onclick="renderAdmin()">↻ Atualizar</button></div>
 <div class="stats"><div class="stat"><span>Pedidos hoje</span><strong>${orders.length}</strong></div><div class="stat"><span>Faturamento</span><strong>${money(orders.reduce((s,o)=>s+o.total,0))}</strong></div><div class="stat"><span>Em preparo</span><strong>${orders.filter(o=>o.status==="preparo").length}</strong></div><div class="stat"><span>Concluídos</span><strong>${orders.filter(o=>o.status==="concluido").length}</strong></div></div>
 <div class="kanban">${column("novo","Novos pedidos",orders)}${column("preparo","Em preparo",orders)}${column("pronto","Prontos",orders)}${column("concluido","Concluídos",orders)}</div></main>`;
}
function column(status,title,orders){return `<section class="column"><h3>${title} · ${orders.filter(o=>o.status===status).length}</h3>${orders.filter(o=>o.status===status).map(o=>`<article class="order"><b>#${o.id} • ${o.name}</b><br><small>${o.type} · ${o.payment}</small><div class="order-items">${o.items.map(i=>`${i.qty}x ${i.name}`).join("<br>")}</div><div class="order-total">${money(o.total)}</div><div class="order-actions">${status!=="concluido"?`<button onclick="advance(${o.id})">Avançar →</button>`:""}<button onclick="removeOrder(${o.id})">Excluir</button></div></article>`).join("")||'<div class="empty">Nenhum pedido</div>'}</section>`}
function advance(id){const orders=JSON.parse(localStorage.getItem("bohrer_orders")||"[]"),o=orders.find(x=>x.id===id);if(!o)return;const seq=["novo","preparo","pronto","concluido"];o.status=seq[Math.min(seq.indexOf(o.status)+1,3)];localStorage.setItem("bohrer_orders",JSON.stringify(orders));renderAdmin()}
function removeOrder(id){const orders=JSON.parse(localStorage.getItem("bohrer_orders")||"[]").filter(o=>o.id!==id);localStorage.setItem("bohrer_orders",JSON.stringify(orders));renderAdmin()}
shell();