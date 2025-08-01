# 1 O que é TypeScript
TypeScript é uma linguagem de programação desenvolvida pela Microsoft que funciona como um superset do JavaScript, ou seja, tudo o que é válido em JavaScript também é válido em TypeScript, mas ele adiciona recursos extras, sendo o mais importante a tipagem estática. A tipagem estática permite que você defina os tipos de variáveis, parâmetros e retornos de funções, o que ajuda a prevenir erros comuns em tempo de desenvolvimento, já que o compilador identifica inconsistências antes mesmo de o código ser executado no navegador ou servidor. Isso aumenta a segurança e a robustez do código, tornando-o mais previsível e fácil de manter. Além disso, o TypeScript oferece suporte aprimorado a conceitos modernos de Programação Orientada a Objetos (OOP), como classes, interfaces, herança e modificadores de acesso, o que facilita a construção de aplicações complexas e escaláveis. Outro ponto positivo é a integração nativa com editores de código como VS Code, que fornece autocompletar, verificação de tipos em tempo real e refatorações inteligentes. Como o TypeScript não é entendido diretamente pelos navegadores, ele precisa passar por um processo chamado transpilação, feito pelo compilador oficial `tsc`, que converte os arquivos `.ts` em arquivos `.js` compatíveis com qualquer ambiente JavaScript. Para começar a usar o TypeScript, é necessário instalá-lo globalmente com o comando `npm i -g typescript` e, em seguida, compilar seus arquivos `.ts` utilizando o comando `tsc nome-do-arquivo.ts`, o que gerará um arquivo JavaScript pronto para execução.
# 2 Configuração
- **`tsc --init` e criação do `tsconfig.json`**  
    Executar `tsc --init` na raiz do projeto gera um arquivo `tsconfig.json` com todas as opções comentadas. A partir desse momento bastará rodar `tsc` (ou `tsc --watch` para modo contínuo), porque o compilador lerá as preferências diretamente desse arquivo.
- **`target` – versão de JavaScript emitida**  
    Define o conjunto de recursos de linguagem que o código de saída deverá usar.
    - `"ES2022"` preserva `class fields`, `optional chaining`, `nullish coalescing` e `async/await` nativos.
    - `"ES5"` converte classes em funções construtoras e gera helpers para features modernas, garantindo compatibilidade com navegadores antigos. A escolha altera tamanho, performance e necessidade de polyfills.
- **`module` – sistema de módulos gerado**  
    Controla como `import`/`export` viram JavaScript.
    - `"ESNext"` deixa a sintaxe intacta (ideal para bundlers modernos ou execução direta em Node 20+ / browsers com `type="module"`).
    - `"CommonJS"` produz `require`/`module.exports`, próprio do Node clássico.
    - `"AMD"` ou `"System"` atendem a cenários específicos (RequireJS, SystemJS).  
        O valor deve refletir o ambiente onde o JS final rodará.
- **`strict` – modo de checagem rígida**  
    Ativar `"strict": true` liga simultaneamente regras como:
    - `strictNullChecks` (proíbe acesso a `null`/`undefined` sem verificação),
    - `noImplicitAny`, `noImplicitThis`, `alwaysStrict` e mais.  
        O código ganha segurança estática forte, ao custo de advertências adicionais que exigem ajustes.
- **`rootDir` e `outDir` – organização de pastas**
    - `"rootDir"` aponta para onde ficam **os arquivos fonte** (`.ts`, `.tsx`).
    - `"outDir"` indica a pasta de **saída** dos `.js`, mapas de fonte e declarações `.d.ts`.  
    Exemplo prático:
    ```json
    {
      "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
      }
    }
    ```
Com isso `src/app/main.ts` vira automaticamente `dist/app/main.js`, mantendo a hierarquia.
- **Estrutura básica recomendada**
    ```
    meu-projeto/
      src/
        index.ts
        util/
          math.ts
      dist/           ← gerada pelo TypeScript
      tsconfig.json
      package.json
    ```
Todo o código editável fica em `src/`; nada é escrito manualmente em `dist/`.
- **Exemplo mínimo de `tsconfig.json` para projeto “puro”**
    ```json
    {
      "compilerOptions": {
        "target": "ES2019",
        "module": "ESNext",
        "strict": true,
        "rootDir": "./src",
        "outDir": "./dist"
      },
      "include": ["src/**/*"]
    }
    ```
- **Fluxo de trabalho típico**
    1. `tsc --init` → cria `tsconfig.json`.
    2. Ajuste `target`, `module`, `strict`, `rootDir`, `outDir` conforme necessidade.
    3. Escreva código em `src/`.
    4. Compile uma vez com `tsc` ou deixe em hot-reload com `tsc --watch`.
    5. Execute ou sirva os arquivos gerados em `dist/`.
Seguindo essa organização o projeto permanece claro, o JavaScript gerado fica separado dos fontes TypeScript e o compilador fornece o máximo de segurança estática sem depender de bundlers externos.

# 3 Tipos Primitivos e Tipagem Básica
- **Tipos primitivos**  
TypeScript reconhece os mesmos sete valores primitivos que o JavaScript – `string`, `number`, `boolean`, `null`, `undefined`, `symbol` e `bigint`. Cada variável declarada sem anotação explícita herda o tipo do primeiro valor atribuído.
```ts
let titulo = 'TypeScript';          // inferido como string
let contador = 42;                  // inferido como number
let ativo = true;                   // inferido como boolean
let id: symbol = Symbol('id');      // anotação manual
let saldo: bigint = 9007199254740991n;
```
A diferença entre `null` e `undefined` é conceitual: `undefined` significa “valor ainda não definido”, enquanto `null` expressa ausência deliberada de valor. No modo `strictNullChecks` o compilador impede atribuir `null` ou `undefined` a variáveis que não os aceitam.
```ts
function busca(): string | null {
    return Math.random() > 0.5 ? 'ok' : null;
}
const resultado = busca();
if (resultado !== null) console.log(resultado.length); // seguro
```
- **Inferência versus anotação**  
Sempre que puder, o TypeScript deriva o tipo automaticamente. Entretanto, anote manualmente quando:
    1. a variável inicia sem valor;
    2. a função precisa de assinatura pública clara;
    3. o tipo só deve aceitar subconjunto de valores.
```ts
let proximoId: number;        // sem valor inicial → precisa anotação
function somar(a: number, b: number): number {
    return a + b;
}
```
- **`any` – contêiner sem controle**  
`any` desativa a verificação estática sobre a variável, convertendo‐a num escape hatch para integração com bibliotecas antigas ou dados cuja forma ainda é desconhecida. Deve ser última opção, pois degrada segurança de todo ponto onde se propaga.
```ts
// integração com JSON sem schema
const bruto: any = JSON.parse(texto);
console.log(bruto.foobar.qux); // permitido, mas perigoso
```
- **`unknown` – caixa-preta segura**  
Ao contrário de `any`, `unknown` exige checagem antes de usar o valor. Isso impede erros acidentais e preserva type-safety.
```ts
function carregar(): unknown {
    return Math.random() > 0.5 ? 3 : 'três';
}
const dado = carregar();
if (typeof dado === 'number') console.log(dado.toFixed(1));
```
- **`void` – ausência de retorno**  
Funções que executam efeito colateral e não produzem valor explícito retornam `void`. No JavaScript real elas devolvem `undefined`, mas o tipo `void` impede depender desse valor.
```ts
function logar(msg: string): void {
    console.log(msg);
}
```
- **`never` – execução que não chega ao fim**  
Uma função cujo fluxo não retorna (lança erro ou entra em laço infinito) recebe tipo `never`. Isso ajuda o compilador a provar que ramos exaustivos foram cobertos.
```ts
function erro(msg: string): never {
    throw new Error(msg);
}
```
- **Arrays tipados**  
Duas sintaxes equivalentes definem listas homogêneas.
```ts
const nomes: string[] = ['Ana', 'João'];
const pontuacoes: Array<number> = [10, 18];    
```
- **Tuplas**  
Tupla é um array de comprimento fixo com posições tipadas individualmente.
```ts
const par: [string, number] = ['idade', 30];
```
Com `readonly` a estrutura vira imutável:
```ts
const ponto: readonly [number, number] = [3, 4];// ponto[0] = 5; // erro
```
- **Tipos literais**  
Literais restringem um valor a um conjunto finito, funcionando como enum leve.
```ts
type Estado = 'on' | 'off' | 'indefinido';
let luz: Estado = 'on';
// luz = 'desconhecido'; // erro: não faz parte de Estado
```
Combine‐os com type inference para garantir correção em APIs:
```ts
function setModo(destino: 'dark' | 'light') { /* ... */ }
 setModo('dark'); // ok
```
Esses blocos cobrem os fundamentos da tipagem primitiva em TypeScript, dos valores básicos até recursos especiais de segurança, passando por arrays genéricos, tuplas fixas e restrições literais que exprimem intenções precisas sem dependência de “any”.

# 4 Funções e Tipagem Avançada
- **4.1 Funções tipadas**  
Uma função tipada é a pedra-fundamental da segurança de tipos em TypeScript, porque o compilador passa a verificar não só o corpo da função, mas também tudo o que é chamado a partir dela.  
_O que é_: a junção de **parâmetros anotados** e **tipo de retorno declarado** ou inferido.  
_Para que serve_: impedir que a função seja invocada com dados errados e garantir, para quem a consome, qual valor sairá dela.  
_Como aplicar_: declare o tipo de cada argumento depois de dois-pontos e finalize com o tipo de retorno após a lista de parâmetros.
```ts
function converterCelsius(c: number): number {
    return c * 9/5 + 32;
}
```
**Parâmetros opcionais** usam `?` logo após o nome; o compilador obriga o chamador a lidar com a possibilidade de `undefined`.
```ts
function alerta(msg: string, titulo?: string) {
    console.log((titulo ?? 'Aviso') + ': ' + msg);
}
alerta('Falta salvar');       // usa título padrão
alerta('Erro crítico', 'ERRO'); // título customizado
```
**Valores padrão** resolvem a ausência internamente e dispensam checagem externa:
```ts
function juros(valor: number, taxa = 0.05): number {
    return valor + valor * taxa;
}
```
**Rest parameters** (`...`) capturam um número indefinido de argumentos no fim da lista. O tipo deve ser sempre um array:
```ts
function media(...notas: number[]): number {
    return notas.reduce((t, n) => t + n, 0) / notas.length;
}
```
- **4.2 Funções anônimas e arrow functions**  
_O que são_: funções sem nome (expressões) e funções “seta” (`=>`) que mantêm sintaxe curta e capturam o `this` léxico.  
_Para que servem_: escrever callbacks, mapeamentos e lógica curta sem criar verbosidade extra ou confusão com o contexto de execução.  
_Como aplicar_:
**Tipagem automática em callbacks**  
Quando você passa uma função inline para um método já tipado (por exemplo `Array.map`), o TypeScript deduz os tipos dos parâmetros.
```ts
const nomes = ['Ana', 'João'];
const tamanhos = nomes.map(n => n.length); // 'n' inferido como string
```
**Tipagem explícita quando a inferência não basta**  
    Em callbacks genéricos (p. ex. APIs DOM) você pode precisar declarar manualmente:
```ts
btn.addEventListener('click', (e: MouseEvent) => console.log(e.button));
```
**Arrow functions e o `this` léxico**  
Uma arrow não cria novo `this`; isso evita erros clássicos em OOP com manipuladores de evento:
```ts
class Formulario {
    private clicks = 0;
    // 'this' dentro da arrow é a instância de Formulario
    enviar = () => { this.clicks++; console.log(this.clicks); };
}
```
- **4.3 Overloads de função**  
_O que é_: a possibilidade de expor **várias assinaturas** para a mesma implementação, permitindo chamadas distintas com validação estática.  
_Para que serve_: criar API intuitiva sem exigir que o usuário passe tipos união ou objetos opções quando, conceitualmente, ele está fazendo coisas diferentes (por exemplo juntar strings ou somar números).  
_Como aplicar_:
    1. Escreva uma ou mais **assinaturas de sobrecarga** (apenas cabeçalhos, sem corpo).
    2. Logo abaixo, forneça **uma única implementação** capaz de lidar com todos os casos; os parâmetros da implementação precisam ser compatíveis com o conjunto de assinaturas, portanto geralmente usam tipos mais amplos (`unknown`, `any` ou união).
    3. Dentro do corpo faça _type guards_ para agir corretamente para cada combinação.
```ts
 // assinaturas disponíveis ao usuário
function combinar(a: string, b: string): string;
function combinar(a: number, b: number): number;
    
// implementação interna
function combinar(a: unknown, b: unknown) {
    if (typeof a === 'string' && typeof b === 'string') return a + b;
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    throw new Error('Tipos incompatíveis');
}
const texto = combinar('foo', 'bar');  // texto é string
const total = combinar(10, 25);        // total é number
// combinar('foo', 1);                 // erro de compilação
```
Overloads tornam a interface da função exaustiva e auto-documentada; o editor autocompleta cada forma válida e o compilador rejeita combinações não previstas, sem obrigar o chamador a tratar `typeof` ou `if` manuais.
Com esses blocos — funções tipadas com opcionais, padrões e rest; callbacks com tipagem natural ou explícita e arrow functions que fixam `this`; e sobrecargas fornecendo múltiplas assinaturas — você domina o arsenal de tipagem avançada de funções em TypeScript, escrevendo APIs claras, seguras e expressivas.
# 5 Objetos e Interfaces
- **5.1 Objetos tipados**  
Um objeto tipado é a primeira linha de defesa contra discrepâncias de estrutura. Ao declarar o formato esperado, o compilador verifica a presença, o tipo e a mutabilidade de cada propriedade.  
_Criação com obrigatórios e opcionais_
```ts
const livro: { titulo: string; paginas: number; isbn?: string } = {
    titulo: 'Clean Code',
    paginas: 464
    // isbn pode ficar ausente
};
 ```
A marca `?` deixa a chave opcional; ao ler `livro.isbn`, o valor será `string | undefined`, exigindo uma checagem.  
_Propriedades `readonly`_ impedem reatribuição depois da construção:
```ts
const usuario: { readonly id: number; nome: string } = { id: 3, nome: 'Ana' };
// usuario.id = 4; // erro – id é imutável
 ```
- **5.2 Interfaces**  
    _O que são_ – contratos nomeados que descrevem a forma de um objeto, separados da implementação.
    _Para que servem_ – padronizar estruturas entre módulos, permitir polimorfismo e habilitar autocompletar.  
    _Como aplicar_
```ts
    interface Produto {
      id: number;
      descricao: string;
      preco?: number;
    }
    function mostrar(p: Produto) {
      console.log(p.descricao);
    }
```
_Extensão de interfaces_ ocorre com a palavra‐chave `extends`, promovendo herança múltipla sem duplicar código:
```ts
interface Vendavel {
    preco: number;
    moeda: string;
}
interface Livro extends Produto, Vendavel {
    autor: string;
}
const guia: Livro = { id: 1, descricao: 'TS', autor: 'Jane', preco: 29, moeda: 'BRL' };
```
_Interfaces funcionais_ descrevem a assinatura de uma função:
```ts
interface Transformador {
    (entrada: string): string;
}
const upper: Transformador = txt => txt.toUpperCase();
```
- **5.3 Tipos (`type`) versus Interfaces**  
    _Diferenças principais_
    - `interface` é sempre aberta – outra declaração com o mesmo nome se funde (merging).
    - `type` é fechado – declarar duas vezes o mesmo nome causa erro.
    - `type` pode usar operadores de tipo (`union`, `intersection`, `conditional`), enquanto `interface` não aceita união direta.  
    _Quando escolher_
    - Use **interface** para **modelar objetos e classes públicas**, pois oferece extensão e declaração incremental (útil em bibliotecas).
    - Use **type** para **alias de primitivas, tuplas, uniões complexas ou resultados de mapeamento**.  
        _Interseções e combinações_  
        Você pode fundir requisitos com `&`, criando um super-tipo:
```ts
type Identificado = { id: string };
type Datado = { criadoEm: Date };
type Registro = Identificado & Datado;
const item: Registro = { id: 'x1', criadoEm: new Date() };
```
Se precisar de união fixa de possibilidades, opte por `type`:
```ts
 type Status = 'aberto' | 'fechado';
```
Esses recursos—objetos tipados com chaves opcionais e imutáveis, interfaces extensíveis para padronizar dados e a diferença conceitual entre `type` e `interface`—formam a base para modelar domínios complexos em TypeScript, garantindo coerência, reuso e segurança de tipo em toda a aplicação.
# 6 Classes e Programação Orientada a Objetos
# 7 Classes Tipadas
## 7.1 Classes Tipadas
Em TypeScript, as classes permitem definir **propriedades** e **métodos** com tipos específicos, oferecendo mais segurança e legibilidade no código.  
Ao declarar propriedades, podemos especificar o tipo explicitamente e usar **modificadores de acesso** para controlar a visibilidade delas.
### Modificadores de acesso
- **public**: acesso permitido em qualquer lugar. É o padrão se nenhum modificador for declarado.
- **private**: acesso permitido apenas dentro da própria classe.
- **protected**: acesso permitido dentro da classe e de suas subclasses.
### Exemplo
```typescript
class Pessoa {
  public nome: string;       // Acessível em qualquer lugar
  private idade: number;     // Acessível apenas na própria classe
  protected endereco: string; // Acessível na classe e subclasses

  constructor(nome: string, idade: number, endereco: string) {
    this.nome = nome;
    this.idade = idade;
    this.endereco = endereco;
  }

  public apresentar(): string {
    return `Olá, meu nome é ${this.nome}`;
  }

  private mostrarIdade(): string {
    return `Tenho ${this.idade} anos`;
  }
}

const pessoa = new Pessoa("Ana", 30, "Rua A");
// pessoa.idade -> Erro: propriedade privada
console.log(pessoa.apresentar());
```
## 7.2 Construtores e Parâmetros
O construtor é um método especial chamado automaticamente quando criamos uma instância da classe.  
Em TypeScript, é possível **tipar os parâmetros** do construtor e inicializar automaticamente propriedades, tornando o código mais conciso.
### Exemplo
```typescript
class Produto {
  constructor(
    public nome: string,
    public preco: number,
    private estoque: number
  ) {}

  public exibirDetalhes(): string {
    return `Produto: ${this.nome}, Preço: R$${this.preco}`;
  }

  public alterarEstoque(novoEstoque: number): void {
    this.estoque = novoEstoque;
  }
}

const produto = new Produto("Notebook", 3500, 10);
console.log(produto.exibirDetalhes());
produto.alterarEstoque(20);
```
## 7.3 Herança
Herança permite que uma classe **reaproveite** propriedades e métodos de outra usando `extends`.  
O método `super()` é usado para chamar o construtor da classe pai dentro do construtor da classe filha.  
Também podemos sobrescrever métodos utilizando a anotação `override` para deixar claro que estamos substituindo um método herdado.
### Exemplo
```typescript
class Animal {
  constructor(public nome: string) {}

  public emitirSom(): string {
    return `${this.nome} faz um som.`;
  }
}

class Cachorro extends Animal {
  constructor(nome: string, public raca: string) {
    super(nome);
  }

  public override emitirSom(): string {
    return `${this.nome} (raça ${this.raca}) late: Au au!`;
  }
}

const cachorro = new Cachorro("Rex", "Labrador");
console.log(cachorro.emitirSom());
```
## 7.4 Classes Abstratas
Classes abstratas servem como **modelos** que não podem ser instanciados diretamente, apenas estendidos.  
Elas podem ter métodos implementados e **métodos abstratos** (sem corpo) que as subclasses são obrigadas a implementar.
### Exemplo
```typescript
abstract class Forma {
  constructor(public cor: string) {}

  abstract calcularArea(): number; // Método obrigatório nas subclasses

  public descrever(): string {
    return `Esta é uma forma de cor ${this.cor}`;
  }
}

class Circulo extends Forma {
  constructor(cor: string, public raio: number) {
    super(cor);
  }

  public calcularArea(): number {
    return Math.PI * this.raio ** 2;
  }
}

const circulo = new Circulo("vermelho", 5);
console.log(circulo.descrever());
console.log(`Área: ${circulo.calcularArea()}`);
```
## 7.5 Implementação de Interfaces
Uma classe pode **implementar interfaces** para garantir que siga um contrato de propriedades e métodos definidos pela interface.  
É possível implementar **múltiplas interfaces** em uma mesma classe.
### Exemplo
```typescript
interface Vendavel {
  preco: number;
  vender(): void;
}

interface Transportavel {
  peso: number;
  transportar(): void;
}

class Celular implements Vendavel, Transportavel {
  constructor(
    public preco: number,
    public peso: number,
    public modelo: string
  ) {}

  public vender(): void {
    console.log(`Vendendo celular ${this.modelo} por R$${this.preco}`);
  }

  public transportar(): void {
    console.log(`Transportando celular ${this.modelo} com peso de ${this.peso}g`);
  }
}

const celular = new Celular(2500, 300, "iPhone 15");
celular.vender();
celular.transportar();
```
# 8 Tipos Avançados
Aqui está uma explicação **completa, aprofundada e prática** de cada tópico dos **Tipos Avançados** no TypeScript, com **conceitos, usos e exemplos detalhados**:
## **8. Tipos Avançados em TypeScript**
Tipos avançados permitem criar definições de tipo mais **flexíveis e reutilizáveis**, mantendo **segurança de tipo** e facilitando **escalabilidade** em projetos complexos.
### **8.1 Union e Intersection Types**
#### **Union Types (União)**
- **O que é:**  
    Permite que uma variável ou parâmetro aceite **mais de um tipo possível**.  
    Usa o operador `|` (OU).
- **Por que usar:**  
    Útil quando um valor pode ser de tipos diferentes, mas ainda precisa ser validado.
- **Exemplo:**
```typescript
type ID = number | string;

function getUserId(id: ID) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(2);
}

console.log(getUserId(123));      // "123.00"
console.log(getUserId("abc123")); // "ABC123"
```
#### **Intersection Types (Interseção)**
- **O que é:**  
    Combina **múltiplos tipos em um só**, exigindo que o valor satisfaça **todos os tipos ao mesmo tempo**.
    Usa o operador `&` (E).
- **Por que usar:**  
    Útil para criar tipos compostos que mesclam propriedades de múltiplos objetos.
- **Exemplo:**
```typescript
type Person = { name: string };
type Employee = { company: string };

type Worker = Person & Employee;

const worker: Worker = {
  name: "Alice",
  company: "Tech Corp"
};

console.log(worker.name);    // "Alice"
console.log(worker.company); // "Tech Corp"
```
### **8.2 Generics**
#### **O que são:**
- São **parâmetros de tipo** que permitem criar funções, classes e interfaces que **funcionam com qualquer tipo** sem perder segurança de tipo.
- Definidos com `<T>` (pode ser qualquer nome, mas `T` é padrão).
#### **Funções genéricas**
```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Olá"));  // "Olá"
console.log(identity<number>(123));    // 123
```
- Aqui, `T` é inferido com base no argumento passado.
#### **Classes genéricas**
```typescript
class Box<T> {
  content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }
}

const stringBox = new Box<string>("Texto");
console.log(stringBox.getContent()); // "Texto"
```
#### **Interfaces genéricas**
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

const userResponse: ApiResponse<{ name: string }> = {
  data: { name: "Lucas" },
  status: 200
};
```
#### **Constraints (Restrições com extends)**
Permite **limitar** quais tipos podem ser usados em `T`.
```typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("texto")); // 5
console.log(getLength([1, 2, 3])); // 3
```
### **8.3 Utility Types**
São **tipos prontos do TypeScript** que transformam outros tipos.
#### **Partial**
- Torna **todas as propriedades opcionais**.
```typescript
interface User {
  name: string;
  age: number;
}

const partialUser: Partial<User> = {
  name: "Ana" // age é opcional agora
};
```
#### **Required**
- Torna **todas as propriedades obrigatórias**.
```typescript
interface Config {
  theme?: string;
  language?: string;
}

const config: Required<Config> = {
  theme: "dark",
  language: "pt"
};
```
#### **Readonly**
- Torna **todas as propriedades imutáveis**.
```typescript
interface Point {
  x: number;
  y: number;
}

const p: Readonly<Point> = { x: 10, y: 20 };
// p.x = 15; // Erro: propriedade é somente leitura
```
#### **Pick<T, K>**
- Cria um novo tipo escolhendo **apenas algumas propriedades**.
```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonNameAge = Pick<Person, "name" | "age">;

const person: PersonNameAge = { name: "João", age: 25 };
```
#### **Omit<T, K>**
- Cria um novo tipo **removendo certas propriedades**.
```typescript
type PersonWithoutAddress = Omit<Person, "address">;

const personNoAddress: PersonWithoutAddress = { name: "Maria", age: 30 };
```
#### **Record<K, T>**
- Cria um **objeto com chaves específicas e tipo fixo para valores**.
```typescript
type Roles = "admin" | "user" | "guest";

const permissions: Record<Roles, boolean> = {
  admin: true,
  user: true,
  guest: false
};
```
### **8.4 Mapped Types**
#### **O que são:**
- Permitem criar tipos **dinâmicos**, transformando **todas as propriedades** de outro tipo.
- Usam a sintaxe `[Key in Type]`.
#### **Exemplo básico:**
```typescript
type User = {
  name: string;
  age: number;
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};

const user: OptionalUser = {
  name: "Carlos" // age é opcional
};
```
#### **Exemplo com `readonly`:**
```typescript
type ReadonlyUser = {
  [K in keyof User]: Readonly<User[K]>;
};

const u: ReadonlyUser = { name: "Ana", age: 20 };
// u.age = 30; // Erro
```
### **8.5 Conditional Types**
#### **O que são:**
- Permitem criar **tipos condicionais**, que mudam com base em uma verificação.
- Sintaxe: `T extends U ? X : Y`
#### **Exemplo básico:**
```typescript
type IsString<T> = T extends string ? "É string" : "Não é string";

type Test1 = IsString<string>; // "É string"
type Test2 = IsString<number>; // "Não é string"
```
#### **Inferência com `infer`**
- O `infer` permite **capturar** um tipo dentro de um contexto condicional.
##### **Exemplo com Promise:**
```typescript
type ExtractPromise<T> = T extends Promise<infer U> ? U : T;

type Result = ExtractPromise<Promise<number>>; // number
```
##### **Exemplo com tupla:**
```typescript
type FirstElement<T> = T extends [infer First, ...any[]] ? First : never;

type Example = FirstElement<[string, number, boolean]>; // string
```
## **Resumo prático**
- **Union (`|`)**: Alternativas de tipos.
- **Intersection (`&`)**: Combina todos os tipos.
- **Generics (`<T>`)**: Tipos dinâmicos e reutilizáveis.
- **Utility Types**: Tipos prontos (Partial, Required, etc.).
- **Mapped Types**: Criação de tipos dinâmicos baseados em outros.
- **Conditional Types**: Tipos que mudam conforme condições (`T extends U ? X : Y`).

# 9 Namespaces e Módulos
Segue a **explicação completa e aprofundada** do tópico **8. Namespaces e Módulos** no TypeScript, com **conceitos, aplicações, exemplos práticos e boas práticas**:
## **8. Namespaces e Módulos**
O TypeScript fornece duas formas principais de **organizar e encapsular código**: **Namespaces** e **Módulos ES**.  
Embora ambos sirvam para **modularidade**, possuem diferenças importantes na forma como são utilizados e no suporte em projetos modernos.
### **8.1 Namespaces**
#### **O que são Namespaces**
- Um **namespace** é uma forma de **agrupar código relacionado dentro de um único escopo**.
- Evita poluir o **escopo global** e ajuda a **organizar grandes aplicações**.
#### **Quando usar**
- Antes do ES6, namespaces eram muito usados para modularização interna.
- Hoje são menos comuns, pois o **padrão moderno é usar módulos ES**.
- Porém, ainda aparecem em **bibliotecas legadas ou projetos antigos**.
#### **Sintaxe básica**
```typescript
namespace Utilidades {
  export function somar(a: number, b: number): number {
    return a + b;
  }

  export const PI = 3.14;

  export class Circulo {
    constructor(public raio: number) {}
    area() {
      return Utilidades.PI * this.raio ** 2;
    }
  }
}

console.log(Utilidades.somar(2, 3)); // 5
const c = new Utilidades.Circulo(5);
console.log(c.area()); // 78.5
```
#### **Export dentro de namespace**
- Para que algo dentro do namespace seja acessível **fora dele**, é necessário usar `export`.
```typescript
namespace Auth {
  export function login(user: string) {
    return `Usuário ${user} logado`;
  }

  function privateHelper() {
    // Função interna, não exportada
  }
}

console.log(Auth.login("João")); // Ok
// console.log(Auth.privateHelper()); // Erro
```
#### **Namespaces aninhados**
- É possível criar **namespaces dentro de outros** para organização mais granular.
```typescript
namespace App {
  export namespace Models {
    export interface User {
      name: string;
    }
  }

  export namespace Services {
    export function getUser(): Models.User {
      return { name: "Maria" };
    }
  }
}

const user = App.Services.getUser();
console.log(user.name);
```
### **8.2 Módulos ES (ECMAScript Modules)**
#### **O que são módulos**
- Cada arquivo `.ts` é tratado como um **módulo separado**.
- Usa **`import` e `export`** para compartilhar código entre arquivos.
- É o **padrão moderno e recomendado** para TypeScript.
#### **Export e Import**
##### **Export nomeado**
```typescript
// math.ts
export function somar(a: number, b: number) {
  return a + b;
}

export const PI = 3.14;
```
```typescript
// main.ts
import { somar, PI } from "./math";

console.log(somar(2, 3)); // 5
console.log(PI); // 3.14
```
##### **Export default**
- Cada arquivo pode ter **um único export default**.
- Importado sem chaves `{}`.
```typescript
// calculadora.ts
export default function multiplicar(a: number, b: number) {
  return a * b;
}
```
```typescript
// main.ts
import multiplicar from "./calculadora";

console.log(multiplicar(2, 5)); // 10
```
##### **Re-exportação**
- Permite **reexportar** módulos para centralizar importações.
```typescript
// utils.ts
export function log(msg: string) {
  console.log(msg);
}

// index.ts
export * from "./utils";
```
```typescript
// main.ts
import { log } from "./index";

log("Olá mundo");
```
#### **Configuração de paths no `tsconfig.json`**
- Com `paths`, é possível criar **atalhos** para imports mais limpos.
##### **Exemplo de `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@models/*": ["models/*"],
      "@services/*": ["services/*"]
    }
  }
}
```
##### **Uso nos arquivos:**
```typescript
// src/main.ts
import { User } from "@models/User";
import { login } from "@services/Auth";

const user: User = { name: "João" };
login(user);
```
### **Comparação Namespaces x Módulos*
- **Namespaces**
    - Útil para organização interna (mesmo arquivo ou global).
    - Mais comum em projetos antigos ou libs legadas.
- **Módulos ES**
    - Padrão moderno e recomendado.
    - Suporta **tree-shaking**, lazy loading e melhor integração com bundlers.
### **Boas práticas**
1. Prefira **Módulos ES** em novos projetos.
2. Use **Namespaces** apenas em cenários legados ou quando não for possível modularizar via arquivos.
3. Sempre organize arquivos por **domínio ou funcionalidade** (ex.: `models/`, `services/`).
4. Configure `paths` no `tsconfig.json` para imports mais limpos e escaláveis.

# 10. Recursos Avançados
Esses recursos são utilizados em **projetos complexos**, oferecendo **metaprogramação, extensibilidade e tipagem avançada**. Embora não sejam tão comuns no dia a dia, são fundamentais para **frameworks (Angular, NestJS)** e bibliotecas **customizadas**.
### **13.1 Decorators (Experimental)**
#### **O que são Decorators**
- **Decorators** são funções especiais que **modificam o comportamento** de classes, métodos, propriedades ou parâmetros.
- São baseados no padrão **metaprogramação** (alterar ou estender código em tempo de execução).
- **Status:** Recurso **experimental** no TypeScript, ativado com:
```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

---

#### **Tipos de Decorators**
1. **Decorator de Classe (`@class`)**
2. **Decorator de Método (`@method`)**
3. **Decorator de Propriedade (`@property`)**
4. **Decorator de Parâmetro (`@parameter`)**
#### **Exemplo 1: Decorator de Classe**
```typescript
function LogClasse(construtor: Function) {
  console.log("Classe carregada:", construtor.name);
}

@LogClasse
class Usuario {
  constructor(public nome: string) {}
}
```
**O que acontece:** Ao carregar a classe `Usuario`, a função `LogClasse` é executada.
#### **Exemplo 2: Decorator de Método**
```typescript
function LogMetodo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Chamando ${propertyKey} com argumentos:`, args);
    return metodoOriginal.apply(this, args);
  };
}

class Calculadora {
  @LogMetodo
  somar(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculadora();
console.log(calc.somar(2, 3)); // Log + resultado
```
#### **Exemplo 3: Decorator de Propriedade**
```typescript
function Imutavel(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class Configuracao {
  @Imutavel
  versao = "1.0";
}

const cfg = new Configuracao();
// cfg.versao = "2.0"; // Erro: propriedade imutável
```
#### **Exemplo 4: Decorator de Parâmetro**
```typescript
function LogParametro(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parâmetro no índice ${parameterIndex} do método ${propertyKey}`);
}

class Service {
  saudacao(@LogParametro nome: string) {
    return `Olá, ${nome}`;
  }
}
```
#### **Uso comum de Decorators**
- **Frameworks** como **Angular e NestJS** usam decorators para:
    - Definir **injeção de dependência** (`@Injectable`)
    - Declarar **rotas** (`@Controller`, `@Get`)
    - Configurar **módulos** (`@Module`)
### **13.2 Declaration Merging**
#### **O que é**
- Permite **mesclar múltiplas declarações** de uma mesma interface, enum ou namespace.
- Útil para **extender tipos de bibliotecas** ou **adicionar funcionalidades dinamicamente**.
#### **Exemplo: Mesclando Interfaces**
```typescript
interface Usuario {
  nome: string;
}

interface Usuario {
  idade: number;
}

// Resultado final
const user: Usuario = {
  nome: "Ana",
  idade: 30
};
```
#### **Exemplo prático: Extender Bibliotecas**
```typescript
// Tipagem original
interface Window {
  minhaFuncao?: () => void;
}

// Extensão via merging
window.minhaFuncao = () => console.log("Função adicionada!");
```
#### **Exemplo com Namespaces**
```typescript
namespace Biblioteca {
  export interface Config {
    tema: string;
  }
}

namespace Biblioteca {
  export interface Config {
    idioma: string;
  }
}

// Resultado final
const cfg: Biblioteca.Config = {
  tema: "dark",
  idioma: "pt-BR"
};
```
### **13.3 Ambient Declarations**
#### **O que são**
- **Declarações "ambientais"** são usadas para **tipar bibliotecas externas** (JS puro, CDN) ou **códigos sem tipagem**.
- Criadas em arquivos `.d.ts` (Declaration Files).
- Informam ao TypeScript **"essas variáveis/funções existem e têm tais tipos"**.
#### **Quando usar**
- Ao usar bibliotecas sem tipos (ex.: libs customizadas ou antigas).
- Para definir **tipos globais** sem alterar o código-fonte da lib.
#### **Exemplo simples**
Arquivo `global.d.ts`:
```typescript
declare var VERSAO_API: string;
declare function logMensagem(msg: string): void;
```
Uso no código:
```typescript
console.log(VERSAO_API);
logMensagem("Sistema iniciado");
```
#### **Exemplo para bibliotecas externas**
Se você usar uma lib sem suporte a TypeScript:
```typescript
// api.d.ts
declare module "minha-biblioteca" {
  export function conectar(url: string): void;
}
```
```typescript
// main.ts
import { conectar } from "minha-biblioteca";

conectar("http://localhost");
```
#### **Exemplo com tipos globais para Window**
```typescript
// globals.d.ts
declare global {
  interface Window {
    appVersion: string;
  }
}

export {};
```
Uso:
```typescript
window.appVersion = "1.0.0";
console.log(window.appVersion);
```
## **Resumo prático**
- **Decorators**: Funções especiais para **metaprogramação** (usados em frameworks modernos).
- **Declaration Merging**: Permite **mesclar interfaces ou namespaces** dinamicamente.
- **Ambient Declarations**: Usados para **tipar bibliotecas externas** ou variáveis globais (arquivos `.d.ts`).
