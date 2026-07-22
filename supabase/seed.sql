-- ==========================================================
--  YBA - DADOS FICTICIOS (seed)
--  Rode DEPOIS do schema.sql, no mesmo SQL Editor do Supabase.
--  Sao os mesmos dados que aparecem no "modo demonstracao".
-- ==========================================================

-- Limpa antes (util se rodar de novo)
truncate table order_items, orders, expenses, products, users restart identity cascade;

-- ---------- PRODUTOS ----------
insert into products (slug, name, description, price, cost, unit, category, image, stock, active, featured) values
('alface-crespa-organica','Alface Crespa Orgânica','Colhida no dia, folhas crocantes e sem agrotóxicos. Direto da roça baiana para sua mesa.',4.50,1.80,'maço','verduras','https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80',40,true,true),
('cenoura-organica','Cenoura Orgânica','Doce, firme e cheia de sabor. Cultivada em solo vivo, sem adubo químico.',6.90,2.50,'kg','legumes','https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',60,true,true),
('tomate-italiano-organico','Tomate Italiano Orgânico','Ideal para molhos e saladas. Maturação natural, colhido no ponto certo.',8.90,3.40,'kg','legumes','https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',35,true,true),
('banana-da-terra-organica','Banana da Terra Orgânica','Clássica da Bahia. Perfeita para fritar, assar ou fazer aquela farofa.',7.50,2.90,'kg','frutas','https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80',50,true,true),
('coentro-organico','Coentro Orgânico','Não tem comida baiana sem coentro. Aroma intenso, folhas fresquinhas.',3.00,1.00,'maço','temperos','https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=800&q=80',45,true,false),
('pimenta-de-cheiro-organica','Pimenta de Cheiro Orgânica','O tempero que perfuma o dendê. Suave no ardor, forte no aroma.',5.50,1.90,'bandeja','temperos','https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&q=80',30,true,false),
('beterraba-organica','Beterraba Orgânica','Raiz doce e nutritiva, ótima em sucos, saladas e assados.',5.90,2.20,'kg','legumes','https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=800&q=80',38,true,false),
('couve-manteiga-organica','Couve Manteiga Orgânica','Folhas macias para o acarajé, o caruru e o suco verde de todo dia.',4.00,1.40,'maço','verduras','https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=800&q=80',42,true,false),
('manga-rosa-organica','Manga Rosa Orgânica','Doce, suculenta e perfumada. A cara do verão baiano.',9.90,3.80,'kg','frutas','https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=80',25,true,true),
('feijao-de-corda-organico','Feijão de Corda Orgânico','Base do acarajé e do baião. Grão selecionado, cultivo agroecológico.',12.90,6.50,'kg','graos','https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',55,true,false),
('cesta-organica-semana','Cesta Orgânica da Semana','Seleção do agricultor com 8 a 10 itens da estação. Colheita comum, união que frutifica.',59.90,28.00,'cesta','cestas','https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',20,true,true),
('cebola-roxa-organica','Cebola Roxa Orgânica','Sabor marcante para vinagretes e refogados. Sem conservantes.',6.50,2.30,'kg','legumes','https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',48,true,false);

-- ---------- PEDIDOS ----------
insert into orders (customer_name, customer_email, customer_phone, address, city, total, shipping, status, payment_method, created_at) values
('Ana Souza','ana@email.com','71999990001','Rua das Flores, 12','Salvador',74.30,10,'entregue','PIX','2026-06-02'),
('Carlos Lima','carlos@email.com','71999990002','Av. Oceânica, 500','Salvador',59.90,0,'entregue','PIX','2026-06-05'),
('Beatriz Rocha','bia@email.com','71999990003','Rua da Praia, 88','Lauro de Freitas',121.40,15,'entregue','Cartão','2026-06-11'),
('Diego Nunes','diego@email.com','71999990004','Rua do Sol, 3','Salvador',42.50,10,'pago','Boleto','2026-06-18'),
('Elaine Dias','elaine@email.com','71999990005','Av. Paralela, 1000','Salvador',89.70,0,'enviado','PIX','2026-06-24'),
('Fábio Alves','fabio@email.com','71999990006','Rua Nova, 45','Camaçari',67.80,18,'pago','PIX','2026-07-01'),
('Gabi Martins','gabi@email.com','71999990007','Rua Verde, 9','Salvador',154.20,0,'pago','Cartão','2026-07-08'),
('Heitor Pires','heitor@email.com','71999990008','Av. ACM, 200','Salvador',33.40,10,'pendente','PIX','2026-07-15');

-- ---------- DESPESAS ----------
insert into expenses (description, category, amount, date) values
('Compra de sementes orgânicas','Insumos',320,'2026-06-03'),
('Combustível entregas','Logística',210,'2026-06-10'),
('Embalagens ecológicas','Embalagem',180,'2026-06-15'),
('Feira do produtor','Compras',640,'2026-06-20'),
('Anúncios Instagram','Marketing',150,'2026-07-02'),
('Combustível entregas','Logística',190,'2026-07-12');

-- ---------- USUARIOS (clientes + equipe) ----------
insert into users (name, email, phone, city, role, active, orders, spent, created_at) values
('Guilherme Pereira','guilhermepereira0207@gmail.com','71999990000','Salvador','superadmin',true,0,0,'2026-01-10'),
('Marina Costa','marina@yba.com','71999990010','Salvador','admin',true,0,0,'2026-02-01'),
('Ana Souza','ana@email.com','71999990001','Salvador','cliente',true,4,312.40,'2026-03-12'),
('Carlos Lima','carlos@email.com','71999990002','Salvador','cliente',true,3,198.70,'2026-03-20'),
('Beatriz Rocha','bia@email.com','71999990003','Lauro de Freitas','cliente',true,5,421.90,'2026-04-02'),
('Diego Nunes','diego@email.com','71999990004','Salvador','cliente',true,2,89.50,'2026-04-18'),
('Elaine Dias','elaine@email.com','71999990005','Salvador','cliente',false,1,89.70,'2026-05-05'),
('Fábio Alves','fabio@email.com','71999990006','Camaçari','cliente',true,2,145.60,'2026-05-22'),
('Gabi Martins','gabi@email.com','71999990007','Salvador','cliente',true,6,612.30,'2026-06-01'),
('Heitor Pires','heitor@email.com','71999990008','Salvador','cliente',true,1,33.40,'2026-07-10');

-- ---------- ITENS DOS PEDIDOS ----------
-- Liga cada pedido (pelo e-mail do cliente) aos produtos (pelo slug),
-- para o painel calcular os "produtos mais vendidos".
insert into order_items (order_id, product_id, product_name, price, quantity)
select o.id, p.id, p.name, p.price, x.qty
from (values
  ('ana@email.com','alface-crespa-organica',6),
  ('ana@email.com','cenoura-organica',3),
  ('carlos@email.com','tomate-italiano-organico',4),
  ('carlos@email.com','alface-crespa-organica',5),
  ('bia@email.com','banana-da-terra-organica',8),
  ('bia@email.com','cenoura-organica',6),
  ('diego@email.com','alface-crespa-organica',4),
  ('elaine@email.com','tomate-italiano-organico',5),
  ('elaine@email.com','cenoura-organica',4),
  ('fabio@email.com','banana-da-terra-organica',3),
  ('fabio@email.com','alface-crespa-organica',7),
  ('gabi@email.com','tomate-italiano-organico',9),
  ('gabi@email.com','cenoura-organica',5),
  ('heitor@email.com','alface-crespa-organica',3)
) as x(email, slug, qty)
join orders o on o.customer_email = x.email
join products p on p.slug = x.slug;
