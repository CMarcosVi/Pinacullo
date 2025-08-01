
## **1. SELECT**
Usado para buscar dados de uma tabela.
```sql
SELECT nome, idade
FROM clientes;
```
Explicação:  
Retorna as colunas `nome` e `idade` da tabela `clientes`. Se quiser todas as colunas, use `SELECT *`.
## **2. SELECT DISTINCT**
Remove valores duplicados de uma coluna.
```sql
SELECT DISTINCT cidade
FROM clientes;
```
Explicação:  
Retorna apenas cidades únicas da tabela `clientes`.
## **3. WHERE**
Filtra registros com base em condições.
```sql
SELECT * FROM clientes
WHERE idade > 30;
```
Explicação:  
Seleciona todos os clientes com idade maior que 30.
## **4. AND / OR / NOT**
Combina múltiplas condições.
```sql
SELECT * FROM clientes
WHERE idade > 30 AND cidade = 'São Paulo';
```
Explicação:  
Seleciona clientes maiores de 30 anos que moram em São Paulo.
## **5. ORDER BY**
Ordena os resultados.
```sql
SELECT * FROM clientes
ORDER BY idade DESC;
```
Explicação:  
Ordena os clientes pela idade do maior para o menor.
## **6. INSERT INTO**
Insere novos registros na tabela.
```sql
INSERT INTO clientes (nome, idade, cidade)
VALUES ('Ana', 25, 'Rio de Janeiro');
```
Explicação:  
Adiciona um novo cliente chamado Ana, com 25 anos, morando no Rio de Janeiro.
## **7. UPDATE**
Atualiza dados existentes.
```sql
UPDATE clientes
SET cidade = 'Belo Horizonte'
WHERE id = 1;
```
Explicação:  
Muda a cidade do cliente com `id = 1` para Belo Horizonte.
## **8. DELETE**
Remove registros.
```sql
DELETE FROM clientes
WHERE idade < 18;
```
Explicação:  
Exclui clientes menores de 18 anos.
## **9. LIMIT / TOP**
Limita a quantidade de registros retornados.
```sql
SELECT * FROM clientes
LIMIT 5;
```
Explicação:  
Retorna apenas os primeiros 5 clientes (MySQL/PostgreSQL).  
No SQL Server, use `SELECT TOP 5`.
## **10. MIN / MAX**
Obtém o menor ou maior valor de uma coluna.
```sql
SELECT MIN(idade) AS idade_minima, MAX(idade) AS idade_maxima
FROM clientes;
```
Explicação:  
Mostra a menor e maior idade dos clientes.
## **11. COUNT / AVG / SUM**
Funções de agregação para contar, calcular média ou somar valores.
```sql
SELECT COUNT(*) AS total_clientes,
       AVG(idade) AS idade_media,
       SUM(saldo) AS saldo_total
FROM clientes;
```
Explicação:  
Conta clientes, calcula média de idade e soma do saldo.
## **12. GROUP BY**
Agrupa registros para usar funções de agregação.
```sql
SELECT cidade, COUNT(*) AS total
FROM clientes
GROUP BY cidade;
```
Explicação:  
Conta quantos clientes existem por cidade.
## **13. HAVING**
Filtra após o `GROUP BY`.
```sql
SELECT cidade, COUNT(*) AS total
FROM clientes
GROUP BY cidade
HAVING COUNT(*) > 5;
```
Explicação:  
Mostra apenas cidades com mais de 5 clientes.
## **14. LIKE**
Busca por padrões em texto.
```sql
SELECT * FROM clientes
WHERE nome LIKE 'A%';
```
Explicação:  
Seleciona clientes cujo nome começa com a letra A.
## **15. IN**
Filtra valores específicos.
```sql
SELECT * FROM clientes
WHERE cidade IN ('São Paulo', 'Rio de Janeiro');
```
Explicação:  
Seleciona clientes que moram em São Paulo ou Rio de Janeiro.
## **16. BETWEEN**
Filtra valores dentro de um intervalo.
```sql
SELECT * FROM clientes
WHERE idade BETWEEN 20 AND 30;
```
Explicação:  
Seleciona clientes com idade entre 20 e 30 anos.
## **17. JOIN (INNER JOIN)**
Combina registros de duas tabelas.
```sql
SELECT clientes.nome, pedidos.valor
FROM clientes
INNER JOIN pedidos ON clientes.id = pedidos.cliente_id;
```
Explicação:  
Mostra o nome do cliente e o valor do pedido relacionado.
## **18. LEFT JOIN**
Retorna todos da tabela da esquerda, mesmo sem correspondência.
```sql
SELECT clientes.nome, pedidos.valor
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;
```
Explicação:  
Mostra todos os clientes, mesmo os que não têm pedidos.
## **19. RIGHT JOIN**
Retorna todos da tabela da direita, mesmo sem correspondência.
```sql
SELECT clientes.nome, pedidos.valor
FROM clientes
RIGHT JOIN pedidos ON clientes.id = pedidos.cliente_id;
```
Explicação:  
Mostra todos os pedidos, mesmo sem cliente correspondente.
## **20. FULL OUTER JOIN**
Retorna todos os registros, com ou sem correspondência.
```sql
SELECT clientes.nome, pedidos.valor
FROM clientes
FULL OUTER JOIN pedidos ON clientes.id = pedidos.cliente_id;
```
Explicação:  
Mostra todos os clientes e pedidos, mesmo sem correspondência.
## **21. UNION / UNION ALL**
Combina resultados de duas consultas.
```sql
SELECT nome FROM clientes
UNION
SELECT nome FROM fornecedores;
```
Explicação:  
Combina os nomes de clientes e fornecedores (remove duplicados).  
Com `UNION ALL`, mantém duplicados.
## **22. CREATE TABLE**
Cria uma nova tabela.
```sql
CREATE TABLE produtos (
  id INT PRIMARY KEY,
  nome VARCHAR(50),
  preco DECIMAL(10,2)
);
```
Explicação:  
Cria tabela `produtos` com id, nome e preço.
## **23. ALTER TABLE**
Modifica estrutura da tabela.
```sql
ALTER TABLE produtos ADD estoque INT;
```
Explicação:  
Adiciona a coluna `estoque` na tabela `produtos`.
## **24. DROP TABLE**
Remove uma tabela.
```sql
DROP TABLE produtos;
```
Explicação:  
Exclui a tabela `produtos` e seus dados.
## **25. CREATE INDEX**
Cria índice para acelerar buscas.
```sql
CREATE INDEX idx_nome ON clientes(nome);
```
Explicação:  
Cria um índice na coluna `nome` para buscas mais rápidas.
## **26. DROP INDEX**
Remove um índice.
```sql
DROP INDEX idx_nome;
```
Explicação:  
Exclui o índice `idx_nome`.
## **27. CREATE VIEW**
Cria uma view (tabela virtual).
```sql
CREATE VIEW clientes_ativos AS
SELECT nome, cidade FROM clientes WHERE ativo = 1;
```
Explicação:  
Cria uma visão apenas dos clientes ativos.
## **28. DROP VIEW**
Remove uma view.
```sql
DROP VIEW clientes_ativos;
```
Explicação:  
Exclui a view `clientes_ativos`.
# **1. Triggers (Gatilhos)**
Executam ações automaticamente quando ocorre um evento (INSERT, UPDATE, DELETE).
```sql
CREATE TRIGGER atualiza_estoque
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
  UPDATE produtos
  SET estoque = estoque - NEW.quantidade
  WHERE id = NEW.produto_id;
END;
```
**Explicação:**  
Sempre que um pedido é inserido, o estoque do produto é atualizado automaticamente.
# **2. Stored Procedures (Procedimentos Armazenados)**
Blocos de código SQL reutilizáveis e executáveis sob demanda.
```sql
CREATE PROCEDURE listar_clientes_ativos()
BEGIN
  SELECT nome, cidade FROM clientes WHERE ativo = 1;
END;
```
**Chamada:**
```sql
CALL listar_clientes_ativos();
```
**Explicação:**  
Procedimentos armazenados encapsulam lógicas complexas para reutilização e melhor performance.
# **3. Funções de Usuário (UDF)**
Funções personalizadas que retornam valores.
```sql
CREATE FUNCTION calcular_desconto(preco DECIMAL(10,2), porcentagem DECIMAL(5,2))
RETURNS DECIMAL(10,2)
BEGIN
  RETURN preco - (preco * porcentagem / 100);
END;
```
**Explicação:**  
Permite criar funções para cálculos customizados.

# **4. Event Scheduler (Cron Jobs no MySQL)**
Permite agendar tarefas automáticas no banco de dados (equivalente a cron jobs).
```sql
CREATE EVENT limpar_logs
ON SCHEDULE EVERY 1 DAY
DO
  DELETE FROM logs WHERE data < NOW() - INTERVAL 30 DAY;
```
**Explicação:**  
Remove logs com mais de 30 dias automaticamente, sem precisar de scripts externos.
> **Importante:** Precisa ativar o `event_scheduler` no MySQL:
```sql
SET GLOBAL event_scheduler = ON;
```
# **5. CTEs (Common Table Expressions) Avançadas**
Podem ser recursivas para cálculos hierárquicos.
```sql
WITH RECURSIVE hierarquia AS (
  SELECT id, nome, chefe_id FROM funcionarios WHERE chefe_id IS NULL
  UNION ALL
  SELECT f.id, f.nome, f.chefe_id
  FROM funcionarios f
  INNER JOIN hierarquia h ON f.chefe_id = h.id
)
SELECT * FROM hierarquia;
```
**Explicação:**  
Consulta funcionários e suas hierarquias (chefe → subordinado) recursivamente.
# **6. Window Functions Avançadas**
Funções analíticas poderosas para ranking e cálculos parciais.
```sql
SELECT nome, valor,
  RANK() OVER (ORDER BY valor DESC) AS posicao,
  SUM(valor) OVER (PARTITION BY categoria) AS total_categoria
FROM vendas;
```
**Explicação:**  
Permite calcular totais e rankings sem agrupar a consulta inteira.
# **7. Particionamento de Tabelas**
Divide tabelas grandes em partições para performance.
```sql
CREATE TABLE vendas (
  id INT,
  data_venda DATE,
  valor DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(data_venda)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026)
);
```
**Explicação:**  
Dados de cada ano ficam separados fisicamente, melhorando consultas por período.
# **8. Materialized Views (Views Materializadas)**
(Disponível em PostgreSQL e Oracle)  
Armazena o resultado de uma query como tabela física para consultas rápidas.
```sql
CREATE MATERIALIZED VIEW vendas_resumo AS
SELECT categoria, SUM(valor) AS total
FROM vendas
GROUP BY categoria;
```
**Explicação:**  
É como uma view, mas salva o resultado em disco e pode ser atualizada periodicamente.
# **9. FULLTEXT Search (MySQL) ou Tsvector (Postgres)**
Busca de texto avançada.
```sql
CREATE FULLTEXT INDEX idx_nome ON clientes(nome);
SELECT * FROM clientes WHERE MATCH(nome) AGAINST('João' IN NATURAL LANGUAGE MODE);
```
**Explicação:**  
Permite buscar texto com relevância, muito usado em sistemas de busca internos.
# **10. JSON e Campos Não Estruturados**
Manipulação de JSON dentro do banco.
```sql
SELECT JSON_EXTRACT(dados, '$.endereco.cidade') AS cidade
FROM clientes;
```
**Explicação:**  
Permite armazenar e consultar dados em formato JSON sem normalização.
# **11. Locks e Concurrency Control**
Controle de concorrência para evitar conflitos em transações.
```sql
SELECT * FROM pedidos FOR UPDATE;
```
**Explicação:**  
Bloqueia registros para escrita até a transação finalizar (usado em sistemas bancários).
# **12. Backup e Restore (SQL nativo)**
Alguns bancos permitem via SQL puro (Postgres):
```sql
BACKUP DATABASE minha_base TO DISK = '/backup/minha_base.bak';
```
**Explicação:**  
Cria backup completo do banco (em MySQL e Postgres normalmente feito via ferramentas externas).
# **13. Configuração e Variáveis do Sistema**
Ajustes em tempo real.
```sql
SET GLOBAL max_connections = 200;
SHOW VARIABLES LIKE 'max_connections';
```
**Explicação:**  
Altera parâmetros do servidor sem reiniciar.
# **14. Segurança Avançada**
Gerenciar permissões granulares:
```sql
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'senha123';
GRANT SELECT, INSERT ON loja.* TO 'app_user'@'localhost';
REVOKE DELETE ON loja.* FROM 'app_user'@'localhost';
```
**Explicação:**  
Criação de usuário com permissões específicas por tabela ou banco.
# **15. Monitoramento e Performance**
Ver consultas lentas e estatísticas.
```sql
SHOW PROCESSLIST;
EXPLAIN SELECT * FROM clientes WHERE nome = 'João';
```
**Explicação:**  
Mostra queries em execução e analisa como o banco executa consultas para otimização.
# **16. Transações Avançadas**
Uso de níveis de isolamento para evitar problemas de concorrência:
```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
UPDATE contas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;
```
**Explicação:**  
Garante que transações ocorram de forma segura, sem leituras sujas ou inconsistências.
# **17. Cron Jobs via Banco (Eventos Programados)**
MySQL e MariaDB possuem `EVENT`; em Postgres, usa-se `pgAgent`.
```sql
CREATE EVENT limpar_carrinho
ON SCHEDULE EVERY 1 HOUR
DO
  DELETE FROM carrinho WHERE criado_em < NOW() - INTERVAL 2 HOUR;
```
**Explicação:**  
Executa automaticamente a limpeza de carrinhos abandonados a cada 1 hora.