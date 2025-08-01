# 1 Jeitos de carregar JS no navegador
## Script embutido (inline)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Demo – script embutido</title>
</head>
<body>
  <h1>Olá, mundo!</h1>

  <script>
    // Código JS fica diretamente entre as tags
    document.querySelector('h1').style.color = 'royalblue';
  </script>
</body>
</html>

```
**Como funciona**
- O motor do navegador interpreta o JavaScript assim que encontra a tag `<script>` durante o parsing do HTML.
- Enquanto executa, o carregamento do restante do HTML fica bloqueado (render-blocking), a menos que você adicione `defer` ou `async` (que só fazem sentido em scripts externos).
- Útil para trechos rápidos ou testes — o arquivo final contém tudo em um único lugar.
**Prós**
- Sem requisições extras HTTP.
- Facílimo de copiar/colar em pequenos exemplos.
**Contras**
- Mistura lógica JS e marcação HTML, dificultando manutenção.
- Impossível reaproveitar o mesmo código em outras páginas sem duplicar.
## Script externo
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Demo – script externo</title>
  <!-- Carregamento clássico (bloqueia renderização até terminar) -->
  <script src="app.js"></script>

  <!-- OU, preferencialmente, assíncrono/deferido -->
  <!-- <script src="app.js" defer></script> -->
</head>
<body>
  <h1>Olá, mundo!</h1>
</body>
</html>
```
**Como funciona**
- O atributo `src` faz o navegador baixar o arquivo **app.js**.
- Com o modo clássico (sem atributos), a página pausa a renderização até o download e a execução terminarem.
- Com `defer`, o download é feito em paralelo e o script roda **só depois** que o HTML foi completamente parseado, sem travar a construção do DOM.
- Com `async`, o script baixa em paralelo e executa assim que ficar pronto, podendo acontecer antes do DOM completo; use apenas quando o script não depender da ordem com outros scripts ou do DOM pronto.
**Prós**
- Mantém HTML limpo e código JS reutilizável.
- Permite cache do arquivo e paralelismo no download.
- Facilidade para adicionar atributos `defer` ou `async`, melhorando desempenho.
**Contras**
- Requisição HTTP extra (mínimo impacto se o arquivo for pequeno ou estiver em cache).
- Se usar muitas tags `<script>` externas sem `defer/async`, pode degradar o tempo de carregamento.

# 2 variaveis
Em JavaScript (e na maioria das linguagens), **variável** é um “rótulo” que aponta para um valor guardado na memória.  
Ela permite **guardar, ler e (dependendo do tipo de declaração) trocar** esses valores durante a execução do programa.
### var
- _Escopo_: vale para a função inteira (ou global, se fora de funções).
- _Hoisting_: é içada e já começa como `undefined`, então pode ser lida antes da linha de declaração (embora retorne `undefined`).
- _Reatribuição_: permitida.
- _Redeclaração_: permitida no mesmo escopo.
- _Uso típico_: manter compatibilidade com código legado; propensa a erros por “vazar” do bloco `{}`.
### let
- _Escopo_: limitado ao bloco `{}`, à função ou ao módulo onde foi criada.
- _Hoisting_: é içada, mas fica na “zona morta temporal” (TDZ); acessá-la antes da linha de declaração gera `ReferenceError`.
- _Reatribuição_: permitida.
- _Redeclaração_: proibida no mesmo escopo.
- _Uso típico_: valores que realmente mudam (contadores, estados de UI, acumuladores).
### const
- _Escopo_: também é block-scoped.
- _Hoisting_: mesmo comportamento de `let` (TDZ).
- _Reatribuição_: proibida; a referência não pode mudar.
- _Redeclaração_: proibida.
- _Uso típico_: valores fixos ou referências que não devem ser trocadas (configurações, funções, dependências); lembre-se de que objetos/arrays continuam mutáveis internamente.
### Declaração implícita (sem palavra-chave)
- Cria ou usa uma propriedade no objeto global (`window`/`globalThis`).
- Fácil de gerar bugs e, com `"use strict"` ou módulos ES, lança erro.
- Evite — sempre use `const`, `let` ou, se necessário, `var`.
**Boa prática geral**: use `const` por padrão, `let` quando precisar alterar o valor e raramente `var`.


# 3 Tipos Primitivos
Em JavaScript, **existem exatamente sete tipos primitivos**. São valores atômicos, imutáveis e comparados “por valor” (não por referência). Abaixo, cada um deles — sem exceção — com os pontos essenciais que você precisa saber:
### 1. undefined
- Representa “valor não atribuído”.
- Retornado por variáveis declaradas mas ainda não inicializadas, por funções sem `return`, por acessos a propriedades inexistentes, etc.
- `typeof undefined` → `"undefined"`.
- Só existe um valor possível: `undefined` (palavra-chave).
### 2. null
- Significa “ausência intencional de valor”. Use quando quiser dizer “aqui não há nada”.
- Peculiaridade histórica: `typeof null` devolve `"object"` (bug legado da linguagem), mas **null é primitivo**.
- Comparação: `null == undefined` é `true` (coerção), mas `null === undefined` é `false`.
### 3. boolean
- Apenas dois valores possíveis: `true` e `false`.
- Servem para controle de fluxo, flags, retorno de expressões lógicas, etc.
- Convertidos implicitamente em contextos lógicos (`if`, `&&`, `||`).
- Wrapper `Boolean()` cria um objeto — evite misturar com o valor primitivo.
### 4. number
- Usa o padrão IEEE-754 de 64 bits (mesmo para inteiros).
- Inclui valores especiais: `Infinity`, `-Infinity`, `NaN` (Not-a-Number).
- Precisão inteira segura entre −(2⁵³ − 1) e +(2⁵³ − 1). Fora disso, use **BigInt**.
- Operações podem resultar em arredondamento flutuante devido à representação binária.
### 5. bigint
- Inteiros de precisão arbitrária — acrescente `n` ao literal: `9007199254740993n`.
- Não se mistura implicitamente com `number`; comparar ou operar requer conversão explícita.
- Suporta operadores aritméticos (+, -, *, **, %), mas não métodos de `Math`.
### 6. string
- Cadeias de texto UTF-16. Cada posição (`str[i]`) é um código-unit, não necessariamente um caractere Unicode completo.
- Imutáveis: qualquer “mudança” cria uma nova string.
- Literais com aspas simples, duplas ou crases (template literals — permitem interpolação `${}` e multilinha).
- Métodos comuns: `.slice()`, `.includes()`, `.replaceAll()`, etc.
### 7. symbol
- Identificadores únicos e imutáveis, criados via `Symbol()`; dois símbolos nunca são iguais, mesmo com a mesma descrição.
- Usados como chaves de propriedades “invisíveis” ou para protocolos internos (e.g., `Symbol.iterator`).
- Não se convertem implicitamente para string; concatenar gera `TypeError` — use `.toString()` ou `String(sym)`.
## Detalhes finais
- **Primitivo ≠ Objeto:** valores como `42` ou `"abc"` são primitivos; seus wrappers (`new Number(42)`, `new String("abc")`) são objetos — quase nunca necessários.
- **Imutabilidade:** uma vez criado, o valor não muda; operações retornam novos valores.
- **Comparação:** `===` e `!==` comparam estritamente primitivos; cuidado com coerção do `==`.
- **Conversão automática:** para expressões, o motor converte primitivos em seus objetos-wrapper só durante a chamada de métodos (`"ok".toUpperCase()`).

# 4 Condicionais 
## O que é **controle de fluxo**? 
O **controle de fluxo** define a ordem em que as instruções do seu programa são executadas. Por padrão, o JavaScript lê o código de cima para baixo, mas estruturas como condicionais, laços, saltos, tratamento de erros e recursos assíncronos permitem desviar dessa sequência linear. A seguir, veja cada grupo de ferramentas em linguagem direta, com exemplos curtos.
## 2. Instrução `if … else if … else`
### 2.1 O que é
Bloco condicional **mais versátil**; executa o primeiro ramo cuja condição seja verdadeira.
### 2.2 Como funciona
Cada condição é avaliada em ordem; ao encontrar a primeira _truthy_, entra no bloco e ignora os seguintes.
### 2.3 Quando usar
Até algumas (∼3–4) ramificações **com lógicas independentes**.
### 2.4 Exemplo explicado
```js
const idade = 17;

if (idade >= 18) {                         // não entra
  console.log('Pode dirigir');
} else if (idade >= 16) {                  // true → executa
  console.log('Pode votar, mas não dirigir');
} else {                                   // ignorado
  console.log('Menor de idade');
}
```
## 3. Operador condicional (ternário) `? :`
### 3.1 O que é
**Operador de expressão** que devolve um valor: `condição ? valorSeVerdadeiro : valorSeFalso`.
### 3.2 Como funciona
Avalia `condição`; retorna o segundo operando se truthy, senão o terceiro.
### 3.3 Quando usar
Para **atribuir ou retornar** um valor simples em _uma linha legível_.
### 3.4 Exemplo explicado
```js
const nota   = 8.4;
const status = nota >= 7 ? 'Aprovado' : 'Reprovado';
//          ^ condição  ^ valor se true    ^ valor se false
```

## 4. `switch … case`
### 4.1 O que é
Compara **o mesmo valor** contra múltiplos **casos literais** usando igualdade estrita (`===`).
### 4.2 Como funciona
Avalia a expressão do `switch` uma vez; percorre `case` até encontrar igualdade; executa daí em diante até `break` (ou final).
### 4.3 Quando usar
Muitas (>4) opções fixas de um único “alvo”.
### 4.4 Exemplo explicado
```js
const dia = 6;             // Sexta-feira

switch (dia) {
  case 6:
  case 7:                              // queda deliberada
    console.log('É fim de semana');
    break;                             // sai do switch

  default:
    console.log('Dia útil');
}
```
## 5. Curtos-circuitos lógicos `&&` e `||`
### 5.1 O que é
Operadores que **retornam** um dos operandos e podem evitar `if`.
### 5.2 Como funciona
- `expr1 && expr2`: se `expr1` é falsy, devolve `expr1`; senão devolve `expr2`.
- `expr1 || expr2`: se `expr1` é truthy, devolve `expr1`; senão `expr2`.
### 5.3 Quando usar
Para executar algo **apenas se** uma condição for satisfeita ou atribuir **valor padrão** simples.
### 5.4 Exemplo explicado
```js
// Chama função só se existir
user.onLogin && user.onLogin();

// Define fallback ignorando '', 0, false…
const cor = inputCor || 'blue';
```
## 6. Nullish Coalescing `??`
### 6.1 O que é
Versão “mais justa” de `||` que só trata **`null` ou `undefined`** como ausentes.
### 6.2 Como funciona
`a ?? b` devolve `a` exceto quando `a` é `null` ou `undefined`; nesses casos devolve `b`.
### 6.3 Quando usar
Para valores onde `0`, `''`, `false` **são válidos** e não devem acionar fallback.
### 6.4 Exemplo explicado
```js
const config = { porta: 0 };
const porta  = config.porta ?? 80;   // fica 0, não 80
```

## 7. Optional Chaining `?.`
### 7.1 O que é
Operador que **retorna `undefined`** (sem exceção!) se algo no caminho for `null`/`undefined`.
### 7.2 Como funciona
`obj?.prop` tenta acessar `prop`; se `obj` for nullish, resultado é `undefined`.
### 7.3 Quando usar
Acessar dados externos (APIs, DOM, JSON) sem dezenas de verificações.
### 7.4 Exemplo explicado
```js
const cidade = usuario?.endereco?.cidade ?? 'Desconhecida';
```
## 8. Atribuições lógicas `||=`, `&&=`, `??=`
### 8.1 O que são
Atalhos que combinam **verificação + atribuição**.
### 8.2 Como funcionam
`x ||= y` → `x = x || y`; idem para os outros com suas regras.
### 8.3 Quando usar
Definir fallback ou resetar flag sem repetir nome da variável.
### 8.4 Exemplo explicado

```js
settings.tema ||= 'light';     // se falsy → 'light'
user.isAdmin &&= false;        // só desativa se era true
```

## 9. Guard-clauses (retorno antecipado)
### 9.1 O que é
Padrão de estilo: sair cedo de funções para evitar aninhamento profundo.
### 9.2 Como funciona
Primeira condição inválida → `return` termina a função.
### 9.3 Quando usar
Funções com **pré-requisitos** claros ou muitas regras de validação.
### 9.4 Exemplo explicado
```js
function pagar(fatura) {
  if (!fatura?.itens?.length) return 'Fatura vazia';   // guard

  // todo o restante da lógica segura aqui
}
```
## 10. Objeto-mapa (substituto moderno do `switch`)
### 10.1 O que é
Tabela de funções (ou valores) indexada por chave, usando **acesso de propriedade**.
### 10.2 Como funciona
`handlers[chave]?.()` executa a função apenas se existir.
### 10.3 Quando usar
Quando cada caso do `switch` executaria **uma função distinta**.
### 10.4 Exemplo explicado
```js
const handlers = {
  email: (d) => enviarEmail(d),
  sms:   (d) => enviarSMS(d)
};

const tipo = obterTipo();      // 'sms'
handlers[tipo]?.({ msg: 'Oi!' });
```


# 5 loops

## 1. `for` clássico
### 1.1 O que é
Loop imperativo de três partes — inicialização, condição e incremento.
### 1.2 Como funciona
Executa a inicialização **uma vez** → avalia a condição → se verdade, executa o bloco → aplica o incremento → volta à condição.
### 1.3 Quando usar
- Quando você precisa de um **índice numérico**.
- Quando há necessidade de **interromper** (`break`) ou **pular** (`continue`) de forma explícita.
### 1.4 Exemplo explicado
```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// i=0 → imprime   → i++
// i=1 → imprime   → i++
// i=2 → imprime   → i++ (vira 3, condição falha → sai)
```
## 2. `while`
### 2.1 O que é
Loop que repete **enquanto** a condição for verdadeira.
### 2.2 Como funciona
Avalia a condição logo no início de cada iteração.
### 2.3 Quando usar
- Quando não é possível calcular de antemão a quantidade de repetições.
- Em leituras de _streams_ ou entrada de usuário.
### 2.4 Exemplo explicado
```js
let saldo = 10;
while (saldo > 0) {
  console.log(`Saldo: ${saldo}`);
  saldo -= 3;
}
// Condição analisada antes de cada passo.
```
## 3. `do … while`
### 3.1 O que é
Variante do `while` que **executa pelo menos uma vez**.
### 3.2 Como funciona
Executa o bloco, depois avalia a condição.
### 3.3 Quando usar
Quando o corpo precisa rodar antes da validação (ex.: menu interativo).
### 3.4 Exemplo explicado
```js
let senha;
do {
  senha = prompt('Digite a senha:');
} while (!validaSenha(senha));
```

## 4. `for…of`
### 4.1 O que é
Loop dedicado a **iteráveis** (arrays, strings, `Set`, `Map`, generators).
### 4.2 Como funciona
Internamente chama o método `[Symbol.iterator]` do objeto e itera sobre os valores produzidos.
### 4.3 Quando usar
- Percorrer **valores** sem se preocupar com índice.
- Ler `Set`/`Map` ou resultados de _generators_.
### 4.4 Exemplo explicado
```js
const cores = ['red', 'green', 'blue'];

for (const cor of cores) {
  console.log(cor);
}
// “red”, depois “green”, depois “blue”
```
## 5. `for…in`
### 5.1 O que é
Itera sobre **chaves enumeráveis** de um objeto (inclui herança).
### 5.2 Como funciona
Percorre todas as propriedades que retornam `true` para `propertyIsEnumerable`.
### 5.3 Quando usar
- **Quase nunca** em arrays (ordem não garantida).
- Útil para objetos simples quando você precisa das chaves.
- Combine com `Object.hasOwn` para ignorar herança.
### 5.4 Exemplo explicado
```js
const user = { nome: 'Ana', idade: 25 };

for (const chave in user) {
  if (Object.hasOwn(user, chave)) {        // guarda de segurança
    console.log(`${chave}: ${user[chave]}`);
  }
}
```
## 6. `for await…of` (iteração assíncrona)
### 6.1 O que é
Versão assíncrona do `for…of` que trabalha com **AsyncIterables** (`fetch` paginado, streams, APIs que devolvem chunks).
### 6.2 Como funciona
Espera (`await`) cada item produzido pelo método `[Symbol.asyncIterator]`.
### 6.3 Quando usar
- Consumir APIs paginadas que expõem um iterador assíncrono.
- Ler arquivos linha-a-linha em ambientes que fornecem streams (`Deno`, Node 18+).
### 6.4 Exemplo explicado
```js
for await (const linha of readLines(arquivo)) {
  console.log(linha);
}
// A próxima linha só chega após a anterior ser resolvida.
```
## 7. Métodos de ordem superior de _array_
> Não são “instruções” de loop, mas realizam a mesma tarefa de forma funcional.

|Método|Para quê|Observações rápidas|
|---|---|---|
|`.forEach()`|Executar efeito colateral para cada item|Não respeita `break`/`continue`|
|`.map()`|Produzir **novo array** transformado|Retorna array de mesmo tamanho|
|`.filter()`|Manter itens que passem num teste|Retorna array possivelmente menor|
|`.reduce()`|Acumular valores num único resultado|Pode substituir quase qualquer loop|
|`.some()` / `.every()`|Verificar se **algum** / **todos** cumprem condição|Curto-circuito embutido|
|`.find()` / `.findIndex()`|Retornar primeiro item / índice que passar no teste|Retorna `undefined` se não achar|

### Exemplo explicado (`map` + `filter`)
```js
const numeros = [1, 2, 3, 4, 5];

// Dobrar os pares
const paresDobro = numeros
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * 2);           // [4, 8]

console.log(paresDobro);
```

## 8. Quebras de controle: `break`, `continue` e **rótulos**

|Palavra|Faz o quê|Exemplo curto|
|---|---|---|
|`break`|Sai imediatamente do loop mais próximo|`if (falha) break;`|
|`continue`|Pula para a próxima iteração|`if (!ok) continue;`|
|**rótulos**|Nomeiam um loop externo para quebrar/continuar de fora|`js\nouter: for (...) {\n for (...) {\n break outer;\n }\n}\n`|

## 9. Geradores (`function*`) como “loops sob demanda”
### 9.1 Por que contar aqui
Geradores **produzem sequências** que depois serão consumidas por `for…of` ou `for await…of`. Eles próprios controlam o “loop” interno via `yield`.
```js
function* contador(max) {
  for (let i = 0; i <= max; i++) {
    yield i;               // pausa e devolve valor
  }
}

for (const n of contador(3)) console.log(n); // 0,1,2,3
```


# 6 Funções
## 1. Conceito fundamental
Uma função é um _objeto de primeira classe_ cujo propósito é agrupar lógica reutilizável e opcionalmente devolver um valor. Como objeto, pode:
- ser atribuída a variáveis;
- ser passada como argumento ou retornada por outra função;
- receber propriedades (por exemplo, `fn.name`, `fn.length`).
Quando é invocada, o motor cria um **contexto de execução**: parâmetros, variáveis locais, referência a `this` e ligação à cadeia de escopos (_scope chain_).
## 2. Ciclo interno de execução
1. **Preparação** – aloca espaço para parâmetros e variáveis.
2. **Vinculação de `this`** – depende de como a função é chamada.
3. **Criação do ambiente léxico** – possibilita _closures_.
4. **Execução do corpo** – linha por linha até um `return` ou o final.
5. **Libertação** – contexto sai da pilha; variáveis permanecem vivas apenas se alguma closure ainda as referenciar.
## 3. Formas de declarar ou criar funções e quando aplicar
### 3.1 Function Declaration
```js
function soma(a, b) {
  return a + b;
}
```
- Sofre _hoisting_ (pode ser usada antes da linha onde aparece).
- Ideal para API pública de um módulo ou quando quer stack-traces nomeados.
### 3.2 Function Expression
```js
const soma = function (a, b) {
  return a + b;
};
```
- Não é içada; útil quando a criação depende de condições ou precisa ser passada imediatamente como dado.
### 3.3 Arrow Function
```js
const soma = (a, b) => a + b;
```
- Sintaxe concisa.
- **Não** cria novo `this`, `arguments` nem `super`.
- Ótima para callbacks e métodos de array (`map`, `filter`, etc.).
### 3.4 Method Shorthand em objetos ou classes
```js
const utils = {
  soma(a, b) {
    return a + b;
  }
};
```
- Açúcar sintático; `this` aponta para o próprio objeto ou instância.
### 3.5 Constructor Function (padrão legado anterior a `class`)
```js
function Pessoa(nome) {
  this.nome = nome;
}

const ana = new Pessoa('Ana');
```
- Invocada com `new`; cria instância e vincula protótipo.
### 3.6 Generator Function
```js
function* contador(max) {
  for (let i = 0; i <= max; i++) {
    yield i;
  }
}
```
- Usa `yield` para pausar e retomar; devolve um **iterador**.
- Bom para sequências _lazy_ e pipelines de dados.
### 3.7 Async Function
```js
async function pegarDados(url) {
  const res = await fetch(url);
  return res.json();
}
```
- Sempre retorna uma `Promise`.
- Permite escrever código assíncrono com estilo síncrono (`await`).
### 3.8 Async Generator
```js
async function* linhas(stream) {
  for await (const chunk of stream) {
    yield chunk.toString();
  }
}
```
- Combina `await` e `yield`; consumido com `for await…of`.
- Útil para processar streams paginadas ou arquivos grandes.
### 3.9 IIFE (Immediately-Invoked Function Expression)
```js
(() => {
  // bloco isolado; variáveis aqui dentro não vazam para fora
})();
```
- Executa assim que definida, criando escopo privado.
## 4. Parâmetros e valores de retorno
- **Default**: `function f(a = 0) { … }`
- **Rest**: `function somarTudo(...nums) { return nums.reduce((t, n) => t + n, 0); }`
- **Desestruturação**: `function login({ user, pass }) { … }`
- `return` sem expressão (ou omisso) devolve `undefined`.
- Funções construtoras devolvem a instância criada, a menos que retornem outro objeto explicitamente.
## 5. Closures (“funções com memória”)
```js
function criaContador() {
  let i = 0;
  return () => ++i;
}

const prox = criaContador();
prox(); // 1
prox(); // 2
```
A função interna retém acesso à variável `i` mesmo depois que `criaContador` terminou. Use para encapsular estado privado, currying ou fábricas.
## 6. Regras de `this`
- **Chamada simples**: `this` é `undefined` em modo estrito ou o objeto global em modo solto.
- **Chamada como método**: `obj.metodo()` faz `this` apontar para `obj`.
- **`call` / `apply` / `bind`**: `this` vira o primeiro argumento fornecido.
- **`new`**: `this` é a nova instância.
- **Arrow functions**: capturam `this` do escopo onde foram criadas e ignoram `call`/`apply`.
## 7. Funções de alta ordem (Higher-Order Functions)
Funções que recebem ou retornam outras funções.
```js
const logar = fn => (...args) => {
  console.log('Chamando com', args);
  return fn(...args);
};
```
Permitem composição, currying e criação de middlewares.
## 8. Funcionalidades assíncronas
- **Callbacks**: simples mas podem virar _callback hell_.
- **Promises**: encadeamento com `.then()` e erro via `.catch()`.
- **Async/Await**: sintaxe mais linear, tratamento de erro com `try/catch`.
- **Async generators**: iteração gradativa sobre fontes de dados assíncronas.
## 9. Funções puras versus impuras
- **Pura**: depende apenas dos argumentos, sem efeitos colaterais; sempre mesmo resultado.
- **Impura**: lê ou altera estado externo, faz I/O, usa aleatoriedade etc.
Preferir funções puras quando possível facilita testes, paralelização e cache.
## 10. Boas práticas essenciais
1. Dê **nomes claros** às funções, mesmo em expressões, para facilitar _stack traces_.
2. Mantenha funções curtas; delegue subtarefas a funções auxiliares.
3. Use **`const`** para não reatribuir acidentalmente a referência.
4. Evite parâmetros booleanos; prefira objeto de opções (`{ debug: true }`).
5. Documente contratos com JSDoc ou TypeScript.
6. Em callbacks de classe que usam `this`, faça `bind` ou defina como arrow.
7. Separe **lógica pura** de **efeitos colaterais** como I/O ou manipulação de DOM.
# 7 Operadores
### Aritméticos básicos
- `+` — adiciona números **ou** concatena strings.
    ```js
    2 + 3         // 5
    'a' + 'b'     // "ab"
    ```
- `-` — subtrai: `5 - 2 // 3`
- `*` — multiplica: `4 * 3 // 12`
- `/` — divide (resultado sempre ponto-flutuante): `5 / 2 // 2.5`
- `%` — resto da divisão (módulo): `7 % 3 // 1`
- `**` — exponencia: `2 ** 3 // 8`
- `++` / `--` — incrementa ou decrementa 1 (pré e pós).
### Atribuição (guarda valor e, se houver símbolo antes do `=`, faz a operação antes)
```js
let x = 5;      // simples =  
x += 2;         // soma e atribui → 7  
x -= 1;         // subtrai → 6  
x *= 3;         // multiplica → 18  
x /= 2;         // divide → 9  
x %= 4;         // resto → 1  
x **= 2;        // potência → 1  
flag ||= true;  // lógica OR + atribuição  
cfg.port ??= 80 // só define se null/undefined  
```
### Comparação
- `==` / `!=` — compara **após coerção** de tipo (use só quando preciso).
    ```js
    '5' == 5   // true
    ```
- `===` / `!==` — compara valor **e** tipo (preferido).
- `>` `>=` `<` `<=` — maior, maior ou igual, menor, menor ou igual.
### Lógicos e curto-circuito
- `!valor` — nega, devolvendo booleano.
- `cond1 && cond2` — se `cond1` for falsy devolve `cond1`; caso contrário devolve `cond2`.
- `cond1 || cond2` — se `cond1` for truthy devolve `cond1`; senão devolve `cond2`.
- `valor1 ?? valor2` — devolve `valor1`, exceto se for `null` ou `undefined`, aí devolve `valor2`.
### Condicional em linha
```js
const status = nota >= 7 ? 'Aprovado' : 'Reprovado';
```
`?:` escolhe entre dois valores numa única expressão.
### Acesso seguro e fallback
```js
const cidade = usuario?.endereco?.cidade ?? 'desconhecida';
```
- `?.` pára e devolve `undefined` se algo for nullish.
- combinado com `??` define valor-padrão sem quebrar o código.
### Operadores de membro e tipo
```js
'prop' in objeto        // existe essa chave?  
objeto instanceof Classe // Classe está na cadeia de protótipos?  
typeof valor            // string com o tipo primitivo  
delete objeto.prop      // remove a propriedade  
void expr               // avalia expr e devolve undefined  
```
### Bit a bit (32 bits) – para flags e manipulações binárias
```js
a & b   // AND
a | b   // OR
a ^ b   // XOR
~a      // NOT
a << n  // shift esquerda
a >> n  // shift direita preservando sinal
a >>> n // shift direita zerando sinal
```
### Spread e Rest (mesma sintaxe, usos opostos)
```js
const arr = [1, 2, 3];
f(...arr);                 // spread: explode em argumentos
function f(...args) { }    // rest: junta em um array
```
### Controle especial
```js
new Classe()   // cria instância  
await promessa // pausa até resolver (dentro de async)  
yield valor    // pausa generator e devolve valor parcial  
(a, b, c)      // vírgula: avalia múltiplas expressões, devolve a última
```
##### Três lembretes finais
1. `**` e todos os `=` de combinação associam-se da direita para a esquerda.
2. Parênteses sempre vencem na dúvida.
3. Prefira `===` e `!==` para evitar surpresas com coerção de tipo.
# 8 POO,Objetos,Classes,Prótotipos
## 1 POO  
Programação orientada a objetos em JavaScript é um paradigma que organiza o código em torno de entidades que combinam estado e comportamento, permitindo modelar o domínio da aplicação de forma mais intuitiva. Embora a linguagem seja baseada em protótipos e não em classes tradicionais, é possível aplicar os pilares clássicos da POO.
## 1.1 Abstração  
Abstração consiste em criar um modelo que exponha apenas o que interessa e esconda detalhes de implementação. No contexto de uma conta bancária, abstraímos operações como depósito e saque sem revelar como o saldo é guardado.
```js
function criarConta() {
  let saldo = 0;                        // detalhe oculto
  return {
    depositar(valor) { saldo += valor },
    sacar(valor) { if (valor <= saldo) saldo -= valor },
    extrato() { return saldo }
  };
}
const conta = criarConta();
conta.depositar(100);
console.log(conta.extrato()); // 100
```
## 1.2 Encapsulamento  
Encapsulamento protege dados internos contra acesso externo descontrolado. Em JavaScript moderno, campos privados de classe realizam esse isolamento.
```js
class Cofre {
  #quantia = 0;                     // campo privado
  guardar(v) { this.#quantia += v }
  abrir() { return this.#quantia }
}
const c = new Cofre();
c.guardar(50);
console.log(c.abrir()); // 50
```
## 1.3 Herança  
Herança permite reutilizar código criando tipos que estendem funcionalidades de outros. Em JavaScript isso ocorre pela ligação de protótipos ou pela palavra-chave `extends`.
```js
class Animal {
  falar() { console.log('som genérico') }
}
class Cachorro extends Animal {
  falar() { console.log('au au') }
}
new Cachorro().falar(); // au au
```
## 1.4 Polimorfismo  
Polimorfismo é a capacidade de tratar objetos distintos de forma uniforme por meio de uma interface comum.
```js
function tocar(animal) { animal.falar() }
tocar(new Animal());   // som genérico
tocar(new Cachorro()); // au au
```
## 2 Objetos  
Em JavaScript tudo que não é primitivo é objeto, incluindo arrays e funções. Objetos são coleções dinâmicas de pares chave-valor e a unidade fundamental de modularização.
## 2.1 Criação literal  
A forma mais direta de criar um objeto é com a notação `{}`.
```js
const pessoa = { nome: 'Ana', falar() { console.log(this.nome) } };
pessoa.falar(); // Ana
```
## 2.2 Propriedades e métodos  
Propriedades armazenam dados; métodos armazenam funções que operam sobre esses dados. Propriedades podem ser adicionadas ou removidas em tempo de execução.
```js
pessoa.idade = 30;
delete pessoa.nome;
```
## 2.3 Palavra-chave this  
`this` referencia o objeto “dono” da chamada. Seu valor depende do modo de invocação, não de onde a função foi definida.
```js
const carro = { marca: 'Fiat', info() { console.log(this.marca) } };
const ref = carro.info;
ref();           // undefined em modo estrito
carro.info();    // Fiat
```
## 2.4 API Object  
A linguagem oferece utilidades como `Object.freeze` (torna imutável) ou `Object.assign` (cópia rasa).
```js
const config = Object.freeze({ tema: 'dark' });
config.tema = 'light'; // ignorado
```
## 3 Protótipos  
Todo objeto possui um link interno para outro objeto chamado protótipo. Essa cadeia é percorrida na leitura de propriedades até encontrar o nome buscado ou atingir `null`.
## 3.1 Cadeia de protótipos em ação
```js
const pai = { cor: 'castanho' };
const filho = Object.create(pai);
console.log(filho.cor); // castanho, vem do protótipo
```
## 3.2 Propriedade Function.prototype  
Funções construtoras oferecem herança colocando métodos em `Func.prototype`, compartilhado por todas as instâncias.
```js
function Pessoa(nome) { this.nome = nome }
Pessoa.prototype.saudar = function() { console.log('Oi, ' + this.nome) };
const joao = new Pessoa('João');
joao.saudar(); // Oi, João
```
## 3.3 Modificação dinâmica  
Por serem objetos comuns, protótipos podem receber métodos depois que instâncias já existem.
```js
Pessoa.prototype.despedir = function() { console.log('Tchau, ' + this.nome) };
joao.despedir(); // Tchau, João
```
## 4 Classes  
A sintaxe `class` foi introduzida para tornar o modelo prototipal mais familiar a quem vem de linguagens clássicas, mas continua sendo açúcar sobre protótipos.
## 4.1 Definição básica
```js
class Usuario {
  constructor(nome) { this.nome = nome }
  saudar() { console.log(`Olá, ${this.nome}`) }
}
new Usuario('Maria').saudar(); // Olá, Maria
```
## 4.2 Métodos estáticos  
Métodos marcados com `static` pertencem à própria classe, não às instâncias.
```js
class MathHelper {
  static rand(max) { return Math.floor(Math.random() * max) }
}
console.log(MathHelper.rand(10));
```
## 4.3 Campos privados e públicos  
Além de métodos, classes podem declarar campos diretamente, públicos ou privados (`#`).
```js
class Contador {
  #valor = 0;
  inc() { this.#valor++ }
  ler() { return this.#valor }
}
```
## 4.4 Herança e super  
`extends` cria uma subclasse e `super` permite acessar a classe-pai.
```js
class Veiculo {
  mover() { console.log('movendo') }
}
class Carro extends Veiculo {
  mover() { super.mover(); console.log('sobre rodas') }
}
new Carro().mover();
// movendo
// sobre rodas
```

# 9 Coleções
## 1 Coleções do JavaScript  
Os primeiros mecanismos de armazenamento agregados da linguagem são baseados em arrays e objetos literais. Eles existem desde a especificação original e continuam essenciais.
## 1.1 Array  
Um array é um objeto especial que mantém seus elementos em índices numéricos começando em zero. Ele possui capacidade dinâmica: cresce ou encolhe conforme a atribuição ou métodos mutáveis como push, pop, shift, unshift e splice. O motor cria uma propriedade length que é sempre um a mais que o maior índice definido. Quando você altera length para um valor menor, os elementos além do novo limite são descartados.
```js
const numeros = [10, 20, 30];
numeros.push(40);          // [10, 20, 30, 40]
numeros[0] = 7;            // [7, 20, 30, 40]
numeros.length = 2;        // [7, 20]
```
Arrays oferecem métodos de iteração de ordem superior como forEach, map, filter, reduce, some e every, que retornam novos valores sem a necessidade de laços explícitos.
## 1.2 Objeto como dicionário  
Um objeto literal usa pares chave-valor para guardar dados heterogêneos ou atuar como mapa associativo. Chaves são convertidas para strings ou símbolos internos, sem manter ordem garantida anterior ao ES2015. Manipulação é feita por leitura de ponto ou colchetes, e pelas funções Object.keys, Object.values e Object.entries.
```js
const usuario = { nome: 'Ana', idade: 28 };
usuario.id = 123;          // adiciona propriedade
delete usuario.idade;      // remove
for (const chave of Object.keys(usuario)) {
  console.log(chave, usuario[chave]);
}
```
Ao contrário de Map, um objeto mistura seus próprios campos com as propriedades herdadas da cadeia de protótipos, por isso é comum filtrá-las usando Object.hasOwn.
## 1.3 TypedArray e ArrayBuffer (menção na coleção clássica)  
Embora tenham chegado depois, TypedArrays são considerados a versão de baixo nível do próprio array clássico: Int8Array, Uint16Array, Float32Array e outras vistas que compartilham um bloco binário fixo chamado ArrayBuffer. O tamanho não pode crescer e cada elemento segue o tamanho do tipo. São ideais para manipular arquivos binários, trabalhar com WebGL ou WebAudio.
```js
const buffer = new ArrayBuffer(4);     // 4 bytes
const view = new Uint16Array(buffer);  // dois inteiros de 16 bits
view[0] = 500;
view[1] = 1000;
console.log(view); // Uint16Array(2) [500, 1000]
```
## 2 Coleções Modernas  
Com o ES2015 a linguagem ganhou tipos de coleção mais especializados. Eles fornecem semântica clara, melhor performance e recursos antes indisponíveis, como chaves reais de qualquer objeto ou itens únicos garantidos.
## 2.1 Map  
Map é um contêiner de pares chave-valor que aceita qualquer tipo como chave, inclusive funções e objetos. Ele mantém a ordem de inserção e expõe os métodos set, get, has e delete além de size. Itera com for…of devolvendo [chave, valor].
```js
const estoque = new Map();
estoque.set('maçã', 5);
estoque.set({ sku: 12 }, 15);
console.log(estoque.get('maçã')); // 5
for (const [k, v] of estoque) console.log(k, v);
```
## 2.2 Set  
Set armazena somente valores únicos, sem pares. Internamente usa algoritmos de dispersão que tornam a verificação de existência O(1). Possui add, has, delete e size, além de iterar em ordem de inserção.
```js
const tags = new Set(['js', 'web', 'js']);
tags.add('front-end');
console.log(tags.has('js'));   // true
console.log([...tags]);        // ['js', 'web', 'front-end']
```
## 2.3 WeakMap  
WeakMap é semelhante a Map, mas as chaves devem ser objetos e são “fracas”: se nenhum outro código mantiver referência ao objeto usado como chave, a entrada desaparece durante a coleta de lixo. Isso é útil para anexar metadados sem impedir liberação de memória. WeakMap não é iterável.
```js
const meta = new WeakMap();
function criarUsuario(nome) {
  const obj = { nome };
  meta.set(obj, { criado: Date.now() });
  return obj;
}
const u = criarUsuario('Ana');
console.log(meta.get(u)); // { criado: ... }
```
## 2.4 WeakSet  
WeakSet guarda objetos únicos fracos, permitindo saber se um objeto está presente sem evitar que seja coletado. Usado para marcar objetos privados ou rastrear instâncias sem vazamentos. Também não é iterável.
```js
const instancias = new WeakSet();
class Widget {
  constructor() { instancias.add(this); }
  ativo() { return instancias.has(this); }
}
const w = new Widget();
console.log(w.ativo()); // true
```
## 2.5 Iteráveis integrados e relação com coleções modernas  
Todos esses contêineres, exceto WeakMap e WeakSet, implementam o protocolo de iteração por meio de Symbol.iterator, de modo que podem ser expandidos com o operador spread ou usados em for…of. Isso facilita converter entre eles, criar pipelines de transformação e interagir com APIs modernas que esperam um iterável.
```js
const mapa = new Map([['a', 1], ['b', 2]]);
const pares = [...mapa];           // [['a',1],['b',2]]
const listaDeChaves = [...mapa.keys()]; // ['a', 'b']
```

# 10 Assincronismo
## 1 Assincronismo em JavaScript  
Assincronismo é a capacidade de iniciar uma operação potencialmente demorada, liberar a thread principal para outras tarefas e reagir mais tarde ao seu resultado. O motor do navegador ou do Node mantém uma única thread que executa a pilha de chamadas; quando uma instrução invoca uma API não bloqueante como setTimeout ou fetch, o trabalho é delegado a componentes externos (Web APIs, libuv, etc.). Quando o resultado chega, uma função de retorno é enfileirada; o event loop observa se a pilha está vazia, puxa a próxima tarefa da fila e a executa.
```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');       // saída: A C B
```
## 1.1 Macro-tasks, micro-tasks e o event loop  
Chamadas como setTimeout produzem macro-tasks que vão para a task queue; já a resolução de uma Promise cria micro-tasks na microtask queue. Depois que cada macro-task termina e a pilha esvazia, o loop drena a microtask queue antes de buscar a próxima macro-task. Essa prioridade explica por que um then roda antes de um timeout de zero milissegundos.
```js
Promise.resolve().then(() => console.log('micro'));
setTimeout(() => console.log('macro'), 0);
// saída: micro macro
```
## 1.2 Callbacks  
No início da linguagem o padrão dominante era passar funções que seriam chamadas quando o trabalho terminasse. Embora simples, essa abordagem leva facilmente a pirâmides de aninhamento conhecidas como callback hell, dificulta composição e propaga erros por meio do primeiro argumento convencionado como err.
```js
lerArquivo('a.txt', (err, dadoA) => {
  if (err) throw err;
  lerArquivo('b.txt', (err, dadoB) => {
    if (err) throw err;
    console.log(dadoA + dadoB);
  });
});
```
## 1.3 Promises  
Uma Promise representa um resultado futuro que pode estar pendente, resolvido ou rejeitado. O método then encadeia transformações, devolvendo uma nova Promise; catch trata falhas e finally executa limpeza. Exceções jogadas dentro de then são convertidas em rejeições, permitindo fluxo de erro unificado.
```js
const lerJSON = caminho =>
  fetch(caminho).then(r => r.json());

lerJSON('/dados.json')
  .then(obj => obj.valor)
  .then(console.log)
  .catch(console.error);
```
## 1.4 Utilitários de Promise  
Promise.all aguarda várias operações paralelas e falha rápido se qualquer uma rejeitar; Promise.allSettled retorna o status de todas; Promise.race resolve ou rejeita com o primeiro término; Promise.any devolve o primeiro resultado bem-sucedido.
```js
const a = fetch('/a');
const b = fetch('/b');
Promise.all([a, b])
  .then(([ra, rb]) => console.log(ra.status, rb.status))
  .catch(console.error);
```
## 1.5 Async e Await  
A palavra-chave async transforma a função em um gerador de Promises automático; await pausa a execução até a Promise resolver, mantendo a thread livre. Try / catch captura rejeições como exceções normais. Chamadas independentes podem executar em paralelo usando Promise.all dentro de uma função async.
```js
async function resumo() {
  try {
    const [user, posts] = await Promise.all([
      fetch('/user/1').then(r => r.json()),
      fetch('/posts').then(r => r.json())
    ]);
    return { user, totalPosts: posts.length };
  } catch (e) {
    console.error(e);
  }
}
```
## 1.6 Iteradores assíncronos e for await  
Um objeto que implementa Symbol.asyncIterator devolve um valor assíncrono por vez. O laço for await…of consome essas Promises sequencialmente, ideal para streams de rede ou arquivos linha a linha sem bloquear a memória.
```js
async function* contagem(max) {
  for (let i = 1; i <= max; i++) {
    await new Promise(r => setTimeout(r, 500));
    yield i;
  }
}

(async () => {
  for await (const n of contagem(3)) console.log(n);
})();
```
## 1.7 Top-level await  
Dentro de módulos ES2020 pode-se usar await fora de funções async. O carregamento do módulo fica pendente até a Promise resolver, o que simplifica inicializações que precisavam de IIFEs.
```js
// config.js
export const cfg = await fetch('/conf.json').then(r => r.json());
```
## 1.8 Streams  
A API Streams expõe objetos ReadableStream e WritableStream que produzem ou consomem pedaços aos poucos, integrando-se a async iterators. Isso habilita respostas HTTP progressivas, processamento de arquivos grandes e compressão em tempo real.
```js
const resposta = await fetch('/grande.bin');
let total = 0;
for await (const chunk of resposta.body) total += chunk.length;
console.log('bytes', total);
```
## 1.9 AbortController  
Cancelamento é feito criando um AbortController, passando o sinal às APIs que o suportam e chamando abort quando necessário. Operações pendentes rejeitam com DOMException de nome AbortError.
```js
const ctrl = new AbortController();
fetch('/lento', { signal: ctrl.signal })
  .catch(e => console.log(e.name));      // AbortError
setTimeout(() => ctrl.abort(), 100);
```
## 1.10 Workers  
Assincronismo verdadeiro não paraleliza código, apenas evita bloqueio; quando é preciso CPU intenso sem travar a interface, usa-se Web Workers ou Worker Threads no Node. Esses isolados rodam em threads separadas e se comunicam por mensagens serializadas ou SharedArrayBuffer.
```js
// main.js
const w = new Worker('fib.js');
w.postMessage(40);
w.onmessage = e => console.log('fibonacci', e.data);

// fib.js
onmessage = e => {
  const fib = n => n < 2 ? n : fib(n - 1) + fib(n - 2);
  postMessage(fib(e.data));
};
```
## 1.11 Concorrência controlada  
Para limitar requisições simultâneas pode-se manter uma fila e liberar só quando um slot estiver livre ou empregar semáforos baseados em Promises.
```js
function limit(max) {
  let ativos = 0, fila = [];
  const libera = () => {
    ativos--;
    if (fila.length) fila.shift()();
  };
  return tarefa => new Promise((res, rej) => {
    const executar = () => {
      ativos++;
      tarefa().then(r => { libera(); res(r); }).catch(e => { libera(); rej(e); });
    };
    ativos < max ? executar() : fila.push(executar);
  });
}

const pool = limit(3);
urls.map(u => pool(() => fetch(u))).forEach(p => p.then(console.log));
```
## 1.12 Tratamento global de rejeições  
Se uma Promise é rejeitada e não existe catch, navegadores emitem o evento unhandledrejection e Node dispara warning. Adicionar listener nesse evento ajuda a registrar ou derrubar a aplicação de forma controlada.
```js
window.addEventListener('unhandledrejection', e => {
  console.error('Rejeição não tratada', e.reason);
});
```
## 1.13 Requisições a APIs  
Uma requisição HTTP vira uma operação assíncrona tão logo sai da thread principal; o navegador ou o runtime do Node delega a chamada ao subsistema de rede e devolve uma Promise que resolverá quando a resposta chegar. O mecanismo oficial hoje é o objeto global fetch; o padrão antigo XMLHttpRequest continua disponível, mas é raramente necessário porque fetch cobre streaming, cancelamento, credenciais e cabeçalhos de forma mais simples.
## 1.13.1 GET e transformação de JSON  
Uma chamada básica usa fetch com a URL; o método padrão é GET. O objeto Response oferece utilitários como json, text e blob que devolvem Promises com o corpo já convertido.
```js
async function listaProdutos() {
  const resp = await fetch('/api/produtos');
  if (!resp.ok) throw new Error('Falha ' + resp.status);
  const dados = await resp.json();   // converte corpo para objeto
  return dados;
}

listaProdutos()
  .then(console.log)
  .catch(console.error);
```
## 1.13.2 Envio de dados com POST  
Para criar ou atualizar recursos é preciso indicar o método e configurar o corpo e os cabeçalhos Content-Type adequados.
```js
async function criarProduto(produto) {
  const resp = await fetch('/api/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto)
  });
  if (!resp.ok) throw new Error('Erro ao criar');
  return resp.json();
}

criarProduto({ nome: 'Café', preco: 9.9 })
  .then(console.log);
```
## 1.13.3 Cabeçalhos personalizados, tokens e cookies  
fetch aceita um objeto Headers ou um literal simples para acrescentar informações como tokens de autenticação ou preferências de idioma. Quando o servidor usa cookies httpOnly, inclua credentials:'include'.
```js
const token = localStorage.getItem('jwt');
const resp = await fetch('/api/segura', {
  headers: { Authorization: 'Bearer ' + token }
});
```
## 1.13.4 Tratamento de erro baseado em status  
A propriedade ok é verdadeira apenas para 2xx; qualquer outro status deve ser verificado manualmente. Exceções de rede lançam TypeError antes mesmo de existir Response.
```js
try {
  const r = await fetch('/offline');
  if (!r.ok) throw new Error('Servidor devolveu ' + r.status);
} catch (e) {
  console.error('Erro de rede ou status', e);
}
```
## 1.13.5 Execução paralela e composição  
Várias requisições independentes podem ser lançadas juntas e sincronizadas com Promise.all. Isso poupa tempo mantendo o throughput de rede no limite.
```js
async function dashboard() {
  const [usuario, pedidos, notificacoes] = await Promise.all([
    fetch('/api/usuario').then(r => r.json()),
    fetch('/api/pedidos').then(r => r.json()),
    fetch('/api/notificacoes').then(r => r.json())
  ]);
  return { usuario, pedidos, notificacoes };
}
```
## 1.13.6 Retentativa com back-off exponencial  
Falhas transitórias (código 502 ou timeout) podem ser tratadas com um laço que aguarda cada vez mais antes de tentar de novo, limitando o número de tentativas.
```js
async function fetchComRetry(url, tentativas = 3) {
  let atraso = 500;
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return r;
      throw new Error('Status ' + r.status);
    } catch (e) {
      if (i === tentativas - 1) throw e;
      await new Promise(r => setTimeout(r, atraso));
      atraso *= 2;
    }
  }
}
```
## 1.13.7 Cancelamento com AbortController  
Quando o usuário navega para outra tela não faz sentido terminar uma requisição antiga; isso poupa banda e CPU. O sinal de abort é passado na configuração da chamada.
```js
const ctrl = new AbortController();
const promessa = fetch('/api/lento', { signal: ctrl.signal });
setTimeout(() => ctrl.abort(), 2000);   // cancela após 2 s
```
## 1.13.8 CORS e políticas de origem  
Se o front-end solicita um domínio diferente, o navegador bloqueia a resposta a menos que o servidor inclua cabeçalhos Access-Control-Allow-Origin apropriados. Esse comportamento é verificado na resposta, não no envio. Durante o desenvolvimento, use proxies reversos ou configure o servidor real para liberar a origem do site.
```
// resposta correta do servidor
Access-Control-Allow-Origin: https://meusite.com
```
## 1.13.9 Axios e outras bibliotecas  
Axios traz API similar ao fetch mas com interceptadores, transformação automática de JSON, cancelamento via AbortController desde a versão 1.x e suporte nativo a uploads multiparte, sendo popular em projetos React. A escolha entre ele e fetch é de conveniência: fetch cobre tudo na plataforma moderna, mas Axios poupa repetição em grandes bases de código.
```js
import axios from 'axios';
axios.get('/api/produtos')
     .then(r => console.log(r.data))
     .catch(console.error);
```
## 1.13.10 Streaming progressivo de resposta  
Quando a API devolve grandes downloads, use a propriedade body do Response, que é um ReadableStream. O for await…of consome blocos aos poucos, permitindo mostrar barra de progresso antes do fim do download.
```js
async function baixar(url, onChunk) {
  const r = await fetch(url);
  for await (const bloco of r.body) onChunk(bloco.length);
}
```
Com esses detalhes sobre GET, POST, cabeçalhos, erros, concorrência, cancelamento, política de mesma origem, bibliotecas e streaming, o panorama de assincronismo agora inclui toda a jornada de uma requisição a API, cobrindo do disparo ao manejo de falhas em aplicações JavaScript modernas.

# 11 Strict Mode, escopo, hoisting e contexto
## 1 Strict Mode  
## 1.1 Conceito. 
Strict Mode é um modo de execução opcional introduzido no ECMAScript 5 que muda diversas regras da linguagem para impedir erros silenciosos, tornar certos comportamentos letais na hora em vez de ocorrerem de modo furtivo e liberar o motor para otimizações. Ele é ativado inserindo a string literal `"use strict"` no topo de um arquivo ou no corpo de uma função.  
## 1.2 Regras e restrições. 
Quando o modo estrito está ativo é proibido criar variáveis implícitas no global, atribuir a propriedades somente-leitura, duplicar nomes de parâmetros, usar argumentos com nomes iguais, deletar variáveis ou parâmetros, capturar com `with`, acessar `this` em chamadas diretas de função obtendo o objeto global, além de tornar vários erros que antes eram silenciosos em exceções de tempo de execução. Muitos futuros recursos da linguagem foram especificados assumindo o modo estrito; por isso certos erros sintácticos já surgem como _early errors_ quando se tenta analisá-los.  
## 1.3 Exemplo de uso e efeito.
```js
"use strict";
function teste() {
  x = 10;          // ReferenceError: x is not defined
}
teste();
```
Se o modo estrito fosse removido a linha `x = 10` criaria uma nova propriedade global, causando vazamento de estado sem aviso.
## 2 Escopo  
## 2.1 Definição. 
Escopo é a região do código onde um identificador está visível e pode ser resolvido. JavaScript adota escopo léxico: a posição da declaração no código fonte determina a região de visibilidade.  
## 2.2 Escopo global. 
Qualquer variável declarada fora de funções ou blocos `let` / `const` fica disponível em todo o aplicativo, anexada ao objeto global (`globalThis`) quando se usa `var` ou atribuição implícita fora do modo estrito. 
## 2.3 Escopo de função. 
Cada invocação cria um ambiente próprio onde parâmetros e variáveis `var` vivem até o retorno. Funções internas fecham sobre variáveis desse ambiente formando closures.  
## 2.4 Escopo de bloco. 
A partir do ES2015 `let` e `const` introduziram visibilidade restrita entre chaves `{}` que inclui blocos simples, if, loops e switch. Isso elimina vazamentos comuns aos `var` que ignoram blocos e pertencem à função.  
## 2.5 Escopo de módulo. 
Em módulos ES, tudo é top-level mas não fica no global; cada arquivo módulo tem seu próprio espaço e precisa exportar explicitamente o que quer tornar público.  
## 2.6 Exemplo integrado.
```js
const g = "global";
function pai() {
  var interno = "função";
  if (true) {
    let bloco = "bloco";
    console.log(g, interno, bloco); // acessa todos
  }
  // console.log(bloco); // ReferenceError
}
pai();
```
## 3 Hoisting  
## 3.1 Ideia principal. 
Antes de executar o código o motor percorre o escopo atual e cria ligações para declarações de variáveis `var`, funções declaradas e classes. Esse levantamento é chamado hoisting. O identificador passa a existir desde o topo do escopo, mas com diferença de inicialização dependendo do tipo de declaração.  
## 3.2 Funções. 
Declarations completas são içadas com valor já atribuído; portanto podem ser chamadas antes da linha onde aparecem.  
## 3.3 Variáveis `var`. 
São içadas com valor `undefined`; ler antes da atribuição produz `undefined` e não erro, fonte comum de bugs.  
## 3.4 Variáveis `let` e `const`. 
Também são detectadas na fase de criação mas ficam num estado “temporal dead zone” até a linha de definição, e qualquer acesso anterior gera `ReferenceError`.  
## 3.5 Classes. 
Sofrem hoisting semelhante ao `let`: existem no ambiente mas não podem ser avaliadas antes da declaração.  
## 3.6 Exemplo comparativo.
```js
console.log(funcao()); // ok
// console.log(x);     // undefined
// console.log(y);     // ReferenceError

function funcao() { return "func"; }
var x = 1;
let y = 2;
```
## 4 Contexto (`this`)  
## 4.1 Natureza. 
Contexto é o valor associado à palavra-chave `this` na execução de uma função. Ele não é decidido na declaração mas sim na forma de chamada.  
## 4.2 Regras de resolução. 
Em modo não estrito uma chamada simples como `fn()` recebe `this` igual ao objeto global; em modo estrito recebe `undefined`. Quando a função é acionada como método `obj.met()`, `this` vale `obj`. Com `new`, o contexto é o objeto recém-instanciado. Métodos `call`, `apply` e `bind` forçam manualmente o contexto. Arrow functions não criam `this`; capturam o valor léxico do escopo onde foram definidas.  
## 4.3 Relação entre contexto e escopo. 
Embora frequentemente confundidos, escopo determina onde o identificador é procurado no código fonte, enquanto contexto determina a identidade que `this` referencia em tempo de execução. Escopo é fixo na escrita; contexto é dinâmico na chamada.  
## 4.4 Exemplo completo.
```js
function mostrar() {
  console.log(this.nome || "sem contexto");
}
const obj = { nome: "Ana", mostrar };

mostrar();                 // "sem contexto" (undefined no strict)
obj.mostrar();             // "Ana"
mostrar.call({ nome: "Lua" }); // "Lua"

const arrow = () => console.log(this);
arrow();                   // mesmo this do módulo ou da função envolvente
```
Dominar Strict Mode, escopo, hoisting e contexto traz clareza para entender por que variáveis parecem “subir”, por que certas referências falham, como confidenciar dados a blocos internos e de que maneira o valor de `this` muda ou permanece capturado, fornecendo base sólida para escrever código JavaScript robusto e livre de armadilhas de visibilidade e ligação.
# 12 Tratamento de erros e exceções
## 1 Erros em JavaScript  
Um erro é qualquer condição inesperada que interrompe a execução normal de um script. O motor divide tais condições em duas categorias: erros de compilação, chamados de erros de sintaxe, e erros em tempo de execução, disparados quando o código já está rodando. Quando ocorre um erro de sintaxe o arquivo nem chega a ser avaliado; o console mostra imediatamente a linha problemática. Já os erros de tempo de execução criam um objeto do tipo Error ou de algum subtipo como TypeError, ReferenceError, RangeError, SyntaxError (quando gerado manualmente), AggregateError ou DOMException no navegador. Todo objeto de erro possui as propriedades name, message e stack; a última contém a cadeia de chamadas que levou ao problema, sendo útil para depuração.
```js
console.log(naoExiste);        // ReferenceError disparado em tempo de execução
```
## 2 Lançando exceções manualmente  
Em certas situações é preferível detectar condições inválidas e interromper o fluxo conscientemente. A palavra-chave throw aceita qualquer valor, mas o costume moderno é instanciar Error ou uma subclasse, porque isso preserva a pilha e unifica o tratamento.
```js
function dividir(a, b) {
  if (b === 0) throw new RangeError('Divisão por zero');
  return a / b;
}
```
## 3 Capturando exceções com try, catch e finally  
Um bloco try envolve a parte do código sujeita a falha; se algo dentro dele lança, o motor pula imediatamente para o bloco catch seguinte. O parâmetro do catch contém a referência ao objeto lançado; a partir do ES2019 o identificador é opcional caso não seja necessário usá-lo. O bloco finally, quando presente, sempre roda depois, independentemente de ter ocorrido erro ou não, permitindo liberar recursos.
```js
try {
  console.log(dividir(4, 0));
} catch (e) {
  console.error('Falhou:', e.message);
} finally {
  console.log('Encerrando tentativa de divisão');
}
```
## 4 Propagação na pilha de chamadas  
Se uma função lança mas não possui try interno, o erro sobe para quem a chamou e assim sucessivamente até atingir o topo. Quando nenhuma camada trata, o comportamento final dependerá do ambiente: navegadores exibem a mensagem no console e abortam o script atual; no Node o processo exibe o stack trace e encerra com código de saída diferente de zero. Decidir onde estancar a exceção é parte do desenho da API; funções de baixo nível normalmente re-lançam e a camada superior de aplicação decide como responder.
```js
function nivelUm() { nivelDois(); }
function nivelDois() { throw new Error('Quebrou'); }
try { nivelUm(); } catch (e) { console.log(e.stack); }
```
## 5 Criando classes de erro específicas  
Para diferenciar problemas de negócio de falhas internas faz-se herdar de Error. O construtor chama super(message) e opcionalmente captura a pilha manualmente em engines que não o façam automaticamente.
```js
class ProdutoIndisponivelError extends Error {
  constructor(id) {
    super(`Produto ${id} sem estoque`);
    this.name = 'ProdutoIndisponivelError';
  }
}
function comprar(id, estoque) {
  if (!estoque[id]) throw new ProdutoIndisponivelError(id);
}
```
## 6 Erros em código assíncrono baseado em callbacks  
Historicamente funções de Node seguem o padrão err-first: o primeiro parâmetro do callback é reservado para um objeto de erro ou null. Quando o callback recebe um erro, a chamada não lança; em vez disso o fluxo assíncrono continua dentro do callback.
```js
fs.readFile('ausente.txt', (err, data) => {
  if (err) return console.error('Falhou', err);
  console.log(data.toString());
});
```
## 7 Erros e Promises  
Se dentro de um executor de Promise ocorre throw ou uma Promise rejeita, o estado muda para rejected. O método catch ou o segundo argumento de then capturam o motivo. Ausência de tratamento gera o evento global unhandledrejection.
```js
fetch('/api').then(r => r.json()).catch(console.error);
window.addEventListener('unhandledrejection', e => {
  console.error('Promise sem tratamento', e.reason);
});
```
## 8 Async / Await e exceções  
Dentro de funções marcadas com async, um throw se comporta como rejeição da Promise retornada. A palavra-chave await pausa até que a Promise resolva; se ela rejeitar o erro é lançado no ponto do await e pode ser envolvido por try/catch síncrono.
```js
async function carregar() {
  try {
    const dados = await fetch('/404').then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
    return dados;
  } catch (e) {
    console.log('Problema ao carregar', e.message);
  }
}
```
## 9 Tratamento global no Node  
Para falhas imprevistas usa-se process.on('uncaughtException', handler) e process.on('unhandledRejection', handler). O recomendável é registrar, limpar recursos e encerrar o processo, pois o estado pode ter ficado inconsistente.
```js
process.on('uncaughtException', err => {
  console.error('Erro fatal', err);
  process.exit(1);
});
```
## 10 Captura de stack sem lançar  
Criar new Error() apenas para inspecionar a pilha é prática válida em logs avançados. A instância pode ser preenchida com metadados adicionais antes de ser enviada a um serviço de monitoramento.
```js
function logTrace(msg) {
  const err = new Error(msg);
  enviarAoServidor({ mensagem: msg, stack: err.stack });
}
```
## 11 Re-lançamento e limpeza  
Às vezes um catch precisa realizar alguma ação e repassar a falha. Basta usar throw novamente sem argumento ou com o mesmo objeto; isso preserva a pilha original a partir do ponto de captura. O finally permanece útil para liberar locks ou fechar conexões mesmo nesse cenário.
```js
try {
  operar();
} catch (e) {
  registrar(e);
  throw e;           // propaga
} finally {
  liberarRecursos();
}
```
## 12 Boas práticas gerais de error handling  
Bibliotecas deveriam rejeitar em vez de lançar dentro de funções assíncronas; aplicações de camada superior devem converter erros inesperados em respostas HTTP apropriadas ou mensagens de interface coerentes. Não capture exceções genéricas apenas para esconder falhas; sempre forneça contexto ao logger, pois somente a mensagem pode não bastar. Em produção é comum manter um middleware de Express que converte qualquer erro não tratado em status 500 com rastreamento enviado a um agregador como Sentry, enquanto em desenvolvimento exibe stack trace completo no console ou na página. Dessa forma a aplicação permanece resiliente, informações sensíveis não vazam ao usuário final e a equipe de engenharia retém dados suficientes para corrigir o defeito.
# 13 Módulos ES
## 1 Introdução aos módulos ES  
Os módulos ES foram padronizados para fornecer um sistema nativo de organização de código que resolve o escopo no momento da análise, preserva variáveis vivas entre arquivos e permite carregamento assíncrono eficiente. Um navegador reconhece um módulo quando o HTML contém `<script type="module" src="main.js"></script>`, enquanto o Node executa arquivos com extensão `.mjs` ou qualquer `.js` dentro de um projeto cujo `package.json` traga `"type": "module"`. Tudo que está em um módulo permanece isolado do objeto global; só vira público aquilo que o autor exportar explicitamente.
```html
<!-- index.html -->
<script type="module" src="app.js"></script>
```
## 2 Exportações  
2.1 Exportação nomeada usa a palavra-chave export seguida da declaração; cada identificador exportado passa a fazer parte da interface do arquivo.
```js
// math.js
export const PI = 3.1416;
export function area(r) { return PI * r * r; }
```
2.2 Exportação default indica que o módulo fornece um valor principal; só pode existir uma por arquivo.
```js
// logger.js
export default function log(msg) { console.log(msg); }
```
2.3 Também é possível reunir símbolos já declarados em uma lista única ou renomeá-los na saída.
```js
const e = 2.718;
function exp(x) { return Math.pow(e, x); }
export { e as E, exp };
```
## 3 Importação  
3.1 Para obter símbolos nomeados basta citar-lhes dentro de chaves; alias opcional após a palavra as evita conflito de nomes locais.
```js
import { PI, area as circArea } from './math.js';
console.log(circArea(2));
```
3.2 O valor default chega sem chaves e pode receber qualquer nome local.
```js
import log from './logger.js';
log('iniciado');
```
3.3 O curinga `*` carrega tudo dentro de um objeto namespace, conveniente para bibliotecas vastas.
```js
import * as MathKit from './math.js';
console.log(MathKit.PI);
```
3.4 Um módulo pode reexportar itens de outro arquivo para compor APIs.
```js
// geometry/index.js
export * from './math.js';
export { default as log } from '../logger.js';
```
## 4 Vínculos vivos e hoisting  
Os nomes exportados não são simples cópias; representam ligações vivas que refletem mudanças posteriores. A análise sintática eleva (`hoist`) todas as exportações, permitindo dependências cíclicas com valores parcialmente iniciados.
```js
// counter.js
export let n = 0;
export function inc() { n++; }
```
```js
import { n, inc } from './counter.js';
console.log(n); // 0
inc();
console.log(n); // 1 (mudou dentro do importador)
```
## 5 Estrito por padrão e escopo isolado  
Todo módulo roda em modo estrito implicando erros imediatos para variáveis implícitas ou delete de nomes fixos. Variáveis declaradas no topo não vazam para `window`; o global explícito é acessível por `globalThis`.
```js
// modulo.js
x = 7;          // ReferenceError
```
## 6 Avaliação única e cache interno  
O motor executa cada módulo só na primeira importação e armazena o objeto de ligação em cache; importações subsequentes devolvem a mesma instância. Isso garante inicialização única de singletons e evita efeitos laterais repetidos.
```js
// side.js
console.log('executou');
// main.js
import './side.js'; // imprime uma vez
import './side.js'; // não imprime de novo
```
## 7 Resolução de caminho  
Especificadores podem ser relativos `./`, absolutos iniciados por `/` na web ou nomes puros (bare specifiers) que dependem de resolução via `node_modules` ou import maps em browsers. Node aplica sua lógica de pacotes e campos `exports`/`imports` do `package.json`, enquanto navegadores requerem import maps para mapear nomes curtos.
```json
{
  "imports": {
    "lodash": "/libs/lodash-es.js"
  }
}
```
## 8 Top-level await  
Em arquivos de módulo é permitido aguardar Promises na raiz; o carregamento de quem importa bloqueia até que essa espera termine.
```js
// config.js
export const cfg = await fetch('/config.json').then(r => r.json());
```
## 9 import() dinâmico  
A função import() devolve uma Promise que resolve com o módulo requisitado. Ela aceita expressões, possibilita carregamento sob demanda e divisão de código.
```js
if (botao.dataset.modal === 'on') {
  const { abrirModal } = await import('./ui/modal.js');
  abrirModal();
}
```
## 10 Dependências cíclicas  
Dois arquivos podem importar um ao outro porque as exportações são levantadas antes da execução; durante o ciclo cada lado enxerga a interface do outro como objeto incompleto que será preenchido posteriormente. Deve-se ler propriedades depois da inicialização de ambos para evitar `undefined`.
## 11 import.meta  
O objeto import.meta expõe metadados; a propriedade url contém a localização absoluta do módulo, útil para carregar recursos relativos.
```js
console.log(import.meta.url); // file:///.../m.js
```
## 12 Importação de JSON e outros tipos via assertions  
Desde 2024 é possível importar JSON nativamente quando a chamada traz `assert { type: 'json' }`. O módulo resulta no objeto já parseado. Extensões futuras seguirão a mesma mecânica.
```js
import dados from './dados.json' assert { type: 'json' };
```
## 13 Árvore de dependências, side-effects e tree shaking  
Porque a sintaxe é estática o empacotador consegue eliminar exportações não usadas, preservando apenas o código referenciado. Módulos que executam lógica global ao serem avaliados devem declarar `"sideEffects": false` ou listar arquivos com efeitos no `package.json` para orientar a ferramenta.
## 14 Comparação com CommonJS  
CommonJS avalia arquivos de cima para baixo, exporta com `module.exports`, importa com `require`, usa cópias de valores primitivos e não suporta top-level await nem live bindings. Um arquivo CommonJS executa imediatamente durante o require, enquanto ES Modules são assíncronos por natureza no navegador e opcionais no Node. Dual packages fornecem código duplicado para cada sistema declarando `main` para CommonJS e `module` para ES.
```js
// CommonJS
const lib = require('./lib.cjs');
module.exports = { soma };
```
## 15 Publicação de pacotes ES  
Para distribuir código em ESM basta definir `"type": "module"` e apontar `"exports": "./src/index.js"`. Quem consome no Node importar-á normalmente; navegadores usarão bundlers ou CDNs com modificação mínima. Alternativamente lança-se um pacote duplo declarando `"main": "dist/cjs/index.cjs"` e `"module": "dist/esm/index.js"`, de maneira que ferramentas antigas continuem funcionando.
# 14 Destructuring, spread/rest e template literals
## 1 Destructuring  
1.1 Conceito. Destructuring é a sintaxe que permite extrair valores de arrays ou propriedades de objetos diretamente para variáveis, copiando a estrutura de dados do lado direito para o padrão do lado esquerdo. Essa forma declarativa elimina etapas de indexação repetitiva ou leituras ponto a ponto, tornando o código mais conciso.  
1.2 Destructuring de arrays. Quando o lado direito é um iterable, colchetes indicam a posição de cada valor capturado. Elementos ausentes recebem undefined, posições podem ser ignoradas com vírgulas vazias e um rest element coleta o restante em um novo array.
```js
const coords = [12, 8, 4];
const [x, y] = coords;            // x 12, y 8
const [, , z = 0] = coords;       // z 4 (ou 0 se faltasse)
const [primeiro, ...outros] = coords; // 12 e [8, 4]
```
1.3 Destructuring de objetos. Chaves ditam o nome da propriedade buscada e criam variável local de mesmo identificador, podendo renomear com dois-pontos e atribuir valor padrão. A ordem não importa porque o mecanismo usa nomes, não posições.
```js
const usuario = { id: 7, nome: 'Ana', admin: true };
const { nome, id: codigo, ativo = false } = usuario; // nome 'Ana', codigo 7, ativo false
```
1.4 Destructuring aninhado e parâmetros de função. O padrão pode reproduzir objetos internos, unindo acessos profundos em uma só linha. Quando uma função recebe objeto grande, a desestruturação no cabeçalho funciona como “nomeação de argumentos”, reduzindo necessidade de lembrar ordem.
```js
function conectar({ host, porta, credenciais: { user, pass } }) {
  console.log(`Ligando em ${host}:${porta} como ${user}`);
}
conectar({ host: 'localhost', porta: 5432, credenciais: { user: 'root', pass: '123' } });
```
1.5 Erros e armadilhas. Desestruturar propriedades de algo potencialmente null ou undefined causa TypeError; use valores padrão ou encadeamento opcional. Em arrays, rest deve ser o último elemento.
## 2 Spread e Rest  
2.1 Conceito. O mesmo operador de reticências serve para espalhar (`spread`) elementos de um iterável onde múltiplos argumentos ou itens são esperados, e para reunir (`rest`) múltiplos valores em uma coleção única. O interpretador decide pelo contexto: em definicões de parâmetros e padrões de destructuring é rest; em chamadas de função, literais de array ou objeto é spread.  
2.2 Spread em chamadas de função e literais. Qualquer iterável expande seus elementos como argumentos posicionais; em arrays e objetos cria cópias rasas juntando conteúdo.
```js
const nums = [4, 7, 1];
console.log(Math.max(...nums));              // 7
const lista = [0, ...nums, 9];               // [0, 4, 7, 1, 9]
const origem = { a: 1, b: 2 };
const alvo = { ...origem, b: 99, c: 3 };     // { a:1, b:99, c:3 }
```
2.3 Rest em parâmetros de função. O último parâmetro de uma assinatura pode receber ...nome para capturar indefinido número de argumentos como array real, economizando a conversão de arguments.
```js
function soma(...valores) { return valores.reduce((t, n) => t + n, 0); }
soma(2, 3, 5); // 10
```
2.4 Rest em destructuring. Ao desestruturar arrays ou objetos, o rest coleta o que sobrar. No caso de objeto, as chaves listadas antes são removidas do pacote coletado.
```js
const dados = { id: 1, nome: 'Ana', senha: 'oculto', ativo: true };
const { senha, ...publico } = dados; // publico { id:1, nome:'Ana', ativo:true }
```
2.5 Limitações. Spread em objetos faz clone raso; propriedades que são objetos aninhados continuam apontando para mesma referência. Rest em objetos ignora propriedades da cadeia de protótipos.
## 3 Template Literals  
3.1 Conceito. Template literals são strings delimitadas por acentos graves (`) que suportam interpolação embutida e múltiplas linhas sem escapes explícitos. Entre` ${}` qualquer expressão JavaScript é avaliada e convertida em string.  
3.2 Interpolação simples e multilinha. Texto cru preserva quebras de linha; expressões produzem valores em tempo de execução.
```js
const nome = 'Maria';
const mensagem = `Olá, ${nome}
Seja bem-vinda!`;
```
3.3 Tags de template. Colocar uma função antes da string transforma a literal em chamada de processamento, recebendo primeiro um array com partes literais brutas e depois cada valor interpolado. Isso permite sanitização, internacionalização ou criação de DSLs.
```js
function raw(lits, ...vals) {
  return lits.raw[0] + vals.map((v, i) => v.toUpperCase() + lits.raw[i + 1]).join('');
}
const resultado = raw`Nome: ${'ana'} Idade: ${20}`; // "Nome: ANA Idade: 20"
```
3.4 String.raw. A função estática String.raw aplica a semântica “bruta” padrão da etapa de tagging, útil para evitar que barras invertidas viabilizem escapes indesejados.  
3.5 Expressões complexas e lazy evaluation. Como `${}` aceita qualquer expressão, pode chamar funções, operadores ternários ou até await em contexto assíncrono; a avaliação ocorre quando a literal é construída.
```js
async function banner(id) {
  return `<div>${await fetch(`/titulos/${id}`).then(r => r.text())}</div>`;
}
```
3.6 Diferença de desempenho. Template literals não concatenam em tempo de design; o motor constrói um array interno dos trechos literais e insere resultados, o que geralmente traz desempenho equiparável ao `+` mas com clareza superior.
# 15 Metaprogramação avançada
## 1 Metaprogramação em JavaScript  
Metaprogramar significa escrever código que observa, cria ou modifica outros trechos de código em tempo de execução. O motor expõe ganchos formais capazes de interceptar leitura de propriedades, criação de instâncias, coerção de valores, iteração, comparação e carregamento de módulos. Esses ganchos existem para que bibliotecas implementem recursos como validação automática, ORM, reatividade, mocks de teste, serialização personalizada e sandboxes de segurança.
### 1.1 Descritores de propriedade  
Todo atributo de objeto possui metadados que dizem se ele pode mudar, enumerar-se ou ser reconfigurado. A API Object.defineProperty permite ler e alterar tais metadados. Getter e setter são funções armazenadas nos descritores que substituem a leitura e escrita diretas.

```js
const user = {};
Object.defineProperty(user, 'nome', {
  value: 'Ana',
  writable: false,
  enumerable: true,
  configurable: false
});
console.log(user.nome);      // Ana
user.nome = 'Lu';            // silenciosamente ignorado em modo não estrito
```
### 1.2 Symbol  
Um Symbol é um identificador único que nunca colide com outro valor, logo pode criar chaves “invisíveis” em objetos. O padrão define símbolos bem-conhecidos que o motor consulta em operações nativas, permitindo mudar a semântica de operadores sem alterar a sintaxe.
```js
const oculto = Symbol('oculto');
const conf = { [oculto]: 123 };
console.log(Object.keys(conf));  // []
```
### 1.3 Símbolos de intrusão controlada  
O conjunto Symbol.hasInstance, Symbol.toPrimitive, Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.species e Symbol.match(dentre outros) habilita a personalização fina do comportamento nativo.
```js
class Intervalo {
  constructor(inicio, fim) { this.inicio = inicio; this.fim = fim }
  [Symbol.hasInstance](valor) { return typeof valor === 'number' && valor >= this.inicio && valor <= this.fim; }
}
console.log(7 instanceof new Intervalo(5,10)); // true
```
### 1.4 Protocolo de iteração e generators  
O motor busca a propriedade Symbol.iterator ao usar for…of, spread ou Array.from. Geradores facilitam escrever o método.
```js
class Contagem {
  *[Symbol.iterator]() {
    for (let i = 0; i < 3; i++) yield i;
  }
}
for (const n of new Contagem()) console.log(n); // 0 1 2
```
### 1.5 Reflect API  
Reflect reúne operações de baixo nível como get, set, apply e construct em um único objeto estático. Ele espelha a sintaxe de linguagem em forma de função e devolve booleanos em vez de lançar, proporcionando ponto único de interceptação para Proxy.
```js
const soma = (a, b) => a + b;
console.log(Reflect.apply(soma, null, [2, 3])); // 5
```
### 1.6 Proxy  
Proxy cria um wrapper em torno de qualquer alvo e permite interceptar quarenta tipos de operações via traps. É a pedra angular de Vue 3, MobX, Immer e inúmeras ferramentas de observabilidade.
```js
const alvo = { saldo: 100 };
const banco = new Proxy(alvo, {
  get(obj, prop) {
    console.log('lendo', prop);
    return Reflect.get(obj, prop);
  },
  set(obj, prop, val) {
    if (prop === 'saldo' && val < 0) throw new RangeError('Saldo negativo');
    return Reflect.set(obj, prop, val);
  }
});
banco.saldo = 50;        // ok
// banco.saldo = -1;     // RangeError
console.log(banco.saldo);
```
### 1.7 Proxies revogáveis  
Proxy.revocable devolve par { proxy, revoke }. Após a revogação qualquer acesso dispara TypeError, útil para expor objetos temporários a plugins ou workers.
```js
const { proxy, revoke } = Proxy.revocable({}, {});
proxy.x = 1;
revoke();
// proxy.x; // TypeError: revoked
```
### 1.8 Interceptando construção de classes  
Uma trap construct engatilha quando se usa new. Isso viabiliza fábricas, log de instância, contadores de alocação ou singletons transparentes.
```js
function Servico() {}
const Fab = new Proxy(Servico, {
  construct(alvo, args) {
    console.log('criando', alvo.name);
    return new alvo(...args);
  }
});
new Fab();
```
### 1.9 Símbolo species e cadeias de herança  
Métodos como map ou slice consultam Symbol.species para decidir qual construtor usar ao criar resultados derivados. Isso permite que subclasses retornem instâncias da classe-mãe ou outro tipo personalizado.
```js
class Colecao extends Array {
  static get [Symbol.species]() { return Array; }
}
const c = new Colecao(1, 2, 3).map(x => x * 2);
console.log(c instanceof Colecao); // false
```
### 1.10 Decorators (Stage 3 em 2025)  
Decorators são funções que operam sobre classes, métodos, campos ou acessores ainda na fase de definição, podendo trocar o descriptor, adicionar metadata ou substituir a implementação inteira.
```js
function logar(alvo, ctx) {
  const original = alvo[ctx.name];
  alvo[ctx.name] = function (...args) {
    console.log('↪', ctx.name, args);
    return original.apply(this, args);
  };
}
class Calc {
  @logar
  soma(a, b) { return a + b; }
}
new Calc().soma(2, 3);  // console exibe a interceptação
```
### 1.11 Tagged template literals avançados  
Uma função de tag recebe arrays de partes literais e valores interpolados, podendo construir ASTs ou sanitizar HTML, SQL, GraphQL e outras linguagens.
```js
function sql(lits, ...vals) {
  return lits.reduce((txt, seg, i) => txt + seg + (vals[i] ?? '?'), '');
}
const cidade = 'São Paulo';
console.log(sql`SELECT * FROM clientes WHERE cidade = ${cidade}`);
// SELECT * FROM clientes WHERE cidade = São Paulo
```
### 1.12 Avaliação dinâmica controlada  
O operador import() devolve Promise resolvendo em módulo isolado. É mais seguro que eval, respeita CORS, sandbox e permite tree-shaking. Se ainda for preciso interpretar texto como código, o construtor Function oferece escopo global isolado, diferente de eval que herda escopo léxico.
```js
const { formata } = await import('./intl.js');
console.log(formata(1234.5));
```
### 1.13 Instrumentação de pilha com Error.captureStackTrace  
Node expõe Error.captureStackTrace para anexar rastros de chamada a objetos personalizados sem lançar exceção imediata. Frameworks como Jest e Mocha usam isso para mostrar linhas exatas de falhas de teste.
```js
function Tracked() { Error.captureStackTrace(this, Tracked); }
console.log(new Tracked().stack);
```
### 1.14 FinalizationRegistry e WeakRef  
Esses construtos permitem registrar callbacks que rodam quando um objeto é coletado, útil para liberar handles nativos ou remover cache de forma preguiçosa. Por serem não determinísticos nunca devem controlar lógica essencial.
```js
const reg = new FinalizationRegistry(tok => console.log('coletado', tok));
(function () {
  const dado = { id: 1 };
  reg.register(dado, dado.id);
})();
global.gc && global.gc(); // se coletor explícito disponível
```
 
# 16 Armazenamento no cliente
## Panorama geral  
O navegador moderno oferece vários contêineres de dados persistentes ou semipersistentes, cada um pensado para um tipo de informação, tamanho máximo, escopo de segurança e modelo de acesso. O termo “armazenamento no cliente” cobre qualquer mecanismo que grave bytes no dispositivo do usuário sem precisar de rede. A escolha entre eles depende da volumetria, da granularidade de consulta, da política de expiração e da visibilidade entre abas ou sites.
### 1.1 Quotas, particionamento e políticas de limpeza  
Cada agente de usuário define cotas aproximadas baseadas em porcentagem do disco ou limites fixos; o StorageManager API (`navigator.storage.estimate()`) devolve uso e quota e permite solicitar espaço persistente (`navigator.storage.persist()`) que impede limpeza automática de dados inativos. Desde 2023 cookies, IndexedDB e afins são particionados por site‐de‐primeira e domínio do recurso de terceiros (Partitioned Storage), mitigando rastreamento entre origens.
## 2 Cookies  
### 2.1 Princípio de funcionamento  
Cookies são pares chave-valor anexados a cada requisição HTTP para o domínio que os definiu, até o limite de tamanho de cerca de 4 KB por cookie. JavaScript só lê cookies não marcados como `HttpOnly`. O atributo `SameSite` controla o envio em requisições de terceiros, `Secure` exige HTTPS e `Expires` ou `Max-Age` definem validade.
### 2.2 API de leitura e escrita  
O acesso é por `document.cookie`, uma string sem formatação de quebras, exigindo parsing manual:
```js
document.cookie = 'tema=escuro; Max-Age=3600; SameSite=Lax';
const obter = nome => document.cookie
  .split('; ')
  .find(p => p.startsWith(nome + '='))
  ?.split('=')[1];
console.log(obter('tema'));
```
Cookies são ideais para enviar tokens pequenos aos servidores, mas não para dados volumosos nem críticos no lado do cliente porque trafegam em cada requisição.
## 3 Web Storage  
### 3.1 localStorage  
É um dicionário de pares string-string com até cerca de 5–10 MB, disponível entre abas do mesmo domínio e persistente após fechar o navegador. As chaves podem ser observadas com o evento `storage` disparado em outras abas.

```js
localStorage.setItem('nome', 'Ana');
console.log(localStorage.getItem('nome'));
```
### 3.2 sessionStorage  
Mesma API, porém isolado à aba ou janela atual; desaparece quando a aba fecha e não é compartilhado entre guias. Usado para dados de navegação temporária como rascunhos e passos de wizard.
### 3.3 Sincronização e limites  
Gravações são síncronas e podem travar a thread se feitas com objetos grandes convertidos via `JSON.stringify`. Por isso não devem ser usadas em laços rápidos.
## 4 IndexedDB  
### 4.1 Natureza e modelo  
IndexedDB é um banco de dados NoSQL transacional dentro do navegador, capaz de gigabytes. Ele organiza dados em “object stores”, cada um com chaves primárias e índices secundários para busca eficiente. A API original é baseada em eventos assíncronos; desde 2020 a maioria dos navegadores suporta o wrapper `indexedDB.databases()` e bibliotecas como `idb` que devolvem Promises para simplificar.
### 4.2 Criação e interação
```js
const abrir = indexedDB.open('Loja', 1);
abrir.onupgradeneeded = e => {
  const db = e.target.result;
  db.createObjectStore('produtos', { keyPath: 'id' })
    .createIndex('porCategoria', 'categoria');
};
abrir.onsuccess = e => {
  const db = e.target.result;
  const tx = db.transaction('produtos', 'readwrite');
  tx.objectStore('produtos').put({ id: 1, nome: 'Café', categoria: 'Bebida' });
  tx.oncomplete = () => console.log('gravado');
};
```
### 4.3 Vantagens  
Suporta buscas por intervalo, cursores, blobs, versões com migração e transações atômicas. É a melhor escolha para apps offline complexos, caches estruturados ou arquivos grandes.
## 5 Cache Storage  
### 5.1 Integração com Service Workers  
`caches.open(nome)` devolve um objeto Cache que mapeia Requests em Responses. A API foi criada para service workers interceptarem `fetch` e responderem sem rede, mas pode ser usada na janela.
```js
const cache = await caches.open('estatico');
await cache.addAll(['/css/app.css', '/js/app.js']);
```
### 5.2 Política de invalidação  
O desenvolvedor define quando atualizar um recurso; cabe a ele escrever lógica de versionamento ou purga. Diferentemente do HTTP cache do navegador, o Cache Storage é scriptável e isolado por origem.
## 6 File System Access API  
### 6.1 Escopo e permissões  
Disponível em navegadores Chromium e outros via flag, fornece handles a arquivos e diretórios reais do usuário após consentimento, com sandbox opcional. O acesso é assíncrono, suporta streams e permite salvar alterações sem download manual.
```js
const handle = await window.showSaveFilePicker({ suggestedName: 'dados.json' });
const writable = await handle.createWritable();
await writable.write(JSON.stringify({ oi: 'mundo' }));
await writable.close();
```
## 7 Web Locks e concorrência  
`navigator.locks.request(nome, async cb)` garante exclusividade ao bloco crítico mesmo entre abas do mesmo site. Ajuda a evitar condições de corrida quando várias instâncias do app tentam gravar em IndexedDB ou Cache Storage simultaneamente.
## 8 Encriptação no lado cliente  
Os contêineres não criptografam por padrão. Para dados sensíveis usa-se Web Crypto API: gera-se uma chave, cifra-se o payload e armazena-se o resultado em qualquer mecanismo. A chave pode ser derivada de senha via PBKDF2 e guardada apenas em memória.
```js
const enc = new TextEncoder();
const chave = await crypto.subtle.importKey(
  'raw', enc.encode('senha'), { name: 'PBKDF2' }, false, ['deriveKey']
);
const salt = crypto.getRandomValues(new Uint8Array(16));
const derivada = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
  chave,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt', 'decrypt']
);
```
## 9 Estratégias híbridas  
Apps PWA costumam mesclar IndexedDB para dados estruturados, Cache Storage para assets, localStorage para preferências simples e cookies para token de sessão, todos coordenados por service workers que mantêm sincronização com o backend por Background Sync ou APIs de broadcast channel.
# 17 Web Workers e Service Workers
## 1 Web Workers  
### 1.1 Conceito 
Um Web Worker é um thread JavaScript separado que roda no mesmo origin mas fora do contexto da interface. Ele recebe seu próprio tempo de CPU e nunca toca o DOM diretamente, evitando congelar cliques ou animações enquanto executa cálculos pesados. O navegador cria o worker a partir de um arquivo externo ou de um blob contendo o script.  
### 1.2 Criação e canal de mensagem 
A página cria uma instância com `new Worker('calc.js')`. O objeto retornado tem duas pontes: `postMessage` para enviar dados ao worker e o evento `message` para receber respostas. Dentro do arquivo do worker a função global `postMessage` devolve resultados e o evento `onmessage` trata entradas.
```js
// main.js
const w = new Worker('calc.js');
w.postMessage({ n: 45 });
w.onmessage = e => console.log('fib', e.data);

// calc.js
onmessage = e => {
  const fib = n => (n < 2 ? n : fib(n - 1) + fib(n - 2));
  postMessage(fib(e.data.n));
};
```
### 1.3 Transferência de objetos 
Para evitar cópias caras é possível mover ArrayBuffers e outros tipos “transferíveis”. O segundo argumento de `postMessage` lista os buffers a serem transferidos; o lado remetente perde acesso a eles.
```js
const buf = new ArrayBuffer(1024);
w.postMessage(buf, [buf]); // agora buf.byteLength é 0 no thread principal
```
### 1.4 Tipos de workers 
O Dedicated Worker atende a apenas uma página que o criou. O Shared Worker aceita conexões de múltiplas abas do mesmo domínio por meio do objeto `SharedWorkerPort`, permitindo coordenar abas abertas. O Service Worker é outro tipo especial tratado a seguir.  
### 1.5 Encerramento e erros 
A página chama `worker.terminate()` para matar imediatamente. Dentro do worker `self.close()` faz o oposto. Qualquer exceção não capturada dispara o evento `error` no escopo pai para log ou fallback.  
### 1.6 Limitações 
Workers não acessam `document`, `window` ou `localStorage`. Podem usar IndexedDB, fetch, Web Crypto e outros módulos autocontidos. Se precisam devolver fragmentos de DOM devem enviar apenas dados e deixar o thread principal atualizar a interface.
## 2 Service Workers  
### 2.1 Propósito 
Um Service Worker é um proxy scriptável entre a página e a rede que vive além do ciclo de vida dos documentos. Ele permite interceptar requisições, servir respostas de cache, exibir notificações push, realizar sincronização de fundo e criar experiências PWA totalmente offline.  
### 2.2 Registro 
A página chama `navigator.serviceWorker.register('/sw.js')` normalmente no primeiro carregamento. O navegador instala o worker, executa o evento `install`, depois aguarda não haver páginas antigas do mesmo escopo para disparar `activate`.
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(r => console.log('registrado', r.scope));
}
```
### 2.3 Arquivo de worker e ciclo de vida 
Em `/sw.js` o código roda fora de janelas, possui `self` em vez de `window` e permanece parado até um evento chegar. Durante `install` é comum fazer pré-cache:
```js
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(c => c.addAll([
      '/', '/css/app.css', '/js/app.js'
    ]))
  );
});
```
Quando `activate` dispara o script exclui caches antigos e começa a controlar páginas já abertas.  
### 2.4 Interceptar fetch 
Toda requisição de origem cai no evento `fetch`. O script decide se devolve dados do cache, da rede ou uma combinação. Estratégia de rede-primeiro então cache:

```js
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(res => {
      const copia = res.clone();
      caches.open('dinamico').then(c => c.put(e.request, copia));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
```
### 2.5 Push e notificações 
Um push server envia payload ao navegador que aciona `push` no worker, mesmo com a página fechada. O script mostra a notificação com `self.registration.showNotification(título, opções)` e lida com o clique em `notificationclick`.  
### 2.6 Background Sync 
Em conexões instáveis a página pode enfileirar requisições e pedir `registration.sync.register('sync-dados')`. Quando a rede volta o worker recebe `sync` e processa pendências.  
### 2.7 Atualização 
Cada visita verifica o arquivo do worker; se mudou byte a byte, baixa-se uma nova versão que entra no estado “waiting”. Ela só assume quando nenhuma página usar a instância antiga. A página pode chamar `registration.waiting.postMessage({action:'skip'})` e dentro do worker `self.skipWaiting()` para trocar imediatamente.  
### 2.8 Escopo e segurança 
O escopo padrão é o diretório onde está o arquivo; solicitações abaixo dele são elegíveis para interceptação. Service Workers exigem HTTPS ou `localhost` devido ao poder de sequestro de tráfego.  
### 2.9 Comunicação com páginas 
`navigator.serviceWorker.controller.postMessage()` envia dados ao worker ativo. O worker usa `clients.matchAll()` para localizar janelas abertas e manda mensagens de volta com `client.postMessage`. Employa-se `MessageChannel` para resposta direcionada.
```js
// página
navigator.serviceWorker.ready.then(reg => {
  reg.active.postMessage({ cmd: 'ping' });
  navigator.serviceWorker.addEventListener('message', e => console.log(e.data));
});

// sw.js
self.addEventListener('message', e => {
  if (e.data.cmd === 'ping') e.source.postMessage('pong');
});
```
## 2.10 Limitações e boas práticas 
Service Workers não acessam DOM nem sincronia de localStorage. Deve-se manter cachês pequenos, usar versionamento de nomes para invalidar assets, tratar falhas de rede com timeouts e confirmar espaço usando `navigator.storage.estimate`. A depuração ocorre no painel Application das DevTools, onde se pode reiniciar, atualizar ou ver caches em tempo real.
## 3 Convergindo os workers  
A aplicação típica usa Web Workers para processamento numérico pesado em tempo real (por exemplo, decodificação de imagem, criptografia, IA local) e Service Workers para tornar a experiência offline, acelerar o carregamento e receber push. Ambos compartilham o modelo de mensagens e o escopo isolado, mas servem a propósitos distintos: o Web Worker vive enquanto a aba o quiser; o Service Worker persiste em segundo plano mesmo sem document aberto. Dominar essas APIs libera a interface principal e cria aplicações web responsivas, confiáveis e progressivas.