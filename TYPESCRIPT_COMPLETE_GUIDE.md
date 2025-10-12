# 🎯 Guia Completo de Tipagem TypeScript

## 📚 Índice

1. [Tipos Básicos](#1-tipos-básicos)
2. [Tipos de Objetos e Interfaces](#2-tipos-de-objetos-e-interfaces)
3. [Arrays e Tuplas](#3-arrays-e-tuplas)
4. [Union Types e Literal Types](#4-union-types-e-literal-types)
5. [Funções e Métodos](#5-funções-e-métodos)
6. [Classes e Herança](#6-classes-e-herança)
7. [Generics](#7-generics)
8. [Utility Types](#8-utility-types)
9. [Type Guards](#9-type-guards)
10. [Tipos Avançados](#10-tipos-avançados)
11. [Exemplos Práticos do Projeto](#11-exemplos-práticos-do-projeto)

---

## 1. Tipos Básicos

### 🎪 Tipos Primitivos

```typescript
// ✅ Tipos básicos
let nome: string = "João";
let idade: number = 25;
let ativo: boolean = true;
let indefinido: undefined = undefined;
let nulo: null = null;
let qualquerCoisa: any = "pode ser qualquer coisa"; // ⚠️ Evite usar!

// 🎯 Inferência de tipos (TypeScript adivinha o tipo)
let nomeInferido = "Maria"; // TypeScript sabe que é string
let idadeInferida = 30; // TypeScript sabe que é number

// 🔄 Const vs Let
const PI = 3.14159; // Tipo literal: 3.14159
let raio = 5; // Tipo: number
```

### 🎨 Exemplos do seu projeto:

```typescript
// Do seu arquivo Group.ts
export class Group {
  public readonly id?: string; // string opcional
  public readonly name: string; // string obrigatória
  public participantsCount: number; // number
  public isActive: boolean; // boolean
  public readonly createdAt: Date; // Date (objeto)
}
```

---

## 2. Tipos de Objetos e Interfaces

### 🏗️ Interfaces

```typescript
// ✅ Interface básica
interface Usuario {
  id: number;
  nome: string;
  email: string;
  idade?: number; // Opcional (pode não existir)
  readonly criado: Date; // Somente leitura
}

// ✅ Usando a interface
const usuario: Usuario = {
  id: 1,
  nome: "Ana",
  email: "ana@email.com",
  criado: new Date(),
  // idade é opcional, não precisa definir
};

// ❌ Erro: não pode modificar propriedade readonly
// usuario.criado = new Date();
```

### 🎯 Interfaces vs Types

```typescript
// Interface (pode ser estendida)
interface Animal {
  nome: string;
  especie: string;
}

interface Cachorro extends Animal {
  raca: string;
  latir(): void;
}

// Type (mais flexível)
type Posicao = {
  x: number;
  y: number;
};

type Cor = "vermelho" | "azul" | "verde";

// ✅ Combinando types
type PontoColorido = Posicao & {
  cor: Cor;
};
```

### 🏆 Exemplo do seu projeto:

```typescript
// Do seu types/index.ts
interface GroupData {
  id?: string; // Opcional
  name: string; // Obrigatório
  description?: string; // Opcional
  createdBy: string; // Obrigatório
  participantsCount?: number; // Opcional com valor padrão
  whatsappGroupInviteLink?: string | null; // Opcional, pode ser null
  isActive?: boolean; // Opcional
  createdAt?: Date; // Opcional
}
```

---

## 3. Arrays e Tuplas

### 📊 Arrays

```typescript
// ✅ Arrays de tipos específicos
let numeros: number[] = [1, 2, 3, 4, 5];
let nomes: string[] = ["Ana", "João", "Maria"];
let ativo: boolean[] = [true, false, true];

// ✅ Sintaxe alternativa
let idades: Array<number> = [25, 30, 35];

// ✅ Arrays de objetos
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

let produtos: Produto[] = [
  { id: 1, nome: "Notebook", preco: 2500 },
  { id: 2, nome: "Mouse", preco: 50 },
];

// ✅ Array de tipos mistos (Union)
let misto: (string | number)[] = ["João", 25, "Maria", 30];
```

### 🎯 Tuplas (Arrays com tipos fixos)

```typescript
// ✅ Tupla: posição e tipo específicos
let coordenada: [number, number] = [10, 20];
let pessoa: [string, number, boolean] = ["João", 25, true];

// ✅ Tupla com nomes (mais legível)
type Coordenada = [x: number, y: number];
let ponto: Coordenada = [15, 25];

// ✅ Tupla opcional
type Resposta = [sucesso: boolean, dados?: any, erro?: string];
let resultado: Resposta = [true, { id: 1 }];
```

### 🏆 Exemplo do seu projeto:

```typescript
// Paginação retorna array de grupos
interface PaginatedResponse<T> {
  data: T[]; // Array genérico
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Uso:
const grupos: PaginatedResponse<Group> = {
  data: [grupo1, grupo2, grupo3], // Array de Group
  pagination: { page: 1, limit: 10, total: 50, totalPages: 5 },
};
```

---

## 4. Union Types e Literal Types

### 🎭 Union Types (ou/or)

```typescript
// ✅ Pode ser string OU number
let id: string | number;
id = "abc123"; // ✅ Válido
id = 12345; // ✅ Válido
// id = true;   // ❌ Erro!

// ✅ Função que aceita múltiplos tipos
function formatarId(id: string | number): string {
  return `ID: ${id}`;
}

// ✅ Union com null/undefined
let nome: string | null = null;
let idade: number | undefined = undefined;
```

### 🎨 Literal Types (valores exatos)

```typescript
// ✅ Apenas estes valores específicos
type Status = "ativo" | "inativo" | "pendente";
type Tamanho = "P" | "M" | "G" | "GG";
type Cores = "#FF0000" | "#00FF00" | "#0000FF";

let statusUsuario: Status = "ativo"; // ✅ OK
// let statusUsuario: Status = "outro";  // ❌ Erro!

// ✅ Literal numbers
type DiasSemana = 1 | 2 | 3 | 4 | 5 | 6 | 7;
let hoje: DiasSemana = 3; // ✅ OK
```

### 🎯 Discriminated Unions

```typescript
// ✅ União discriminada (cada tipo tem uma propriedade única)
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: any;
}

interface ErrorState {
  status: "error";
  message: string;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function handleState(state: ApiState) {
  switch (state.status) {
    case "loading":
      console.log("Carregando...");
      break;
    case "success":
      console.log("Dados:", state.data); // TypeScript sabe que tem 'data'
      break;
    case "error":
      console.log("Erro:", state.message); // TypeScript sabe que tem 'message'
      break;
  }
}
```

### 🏆 Exemplo do seu projeto:

```typescript
// Do seu projeto
interface ApiResponse<T = any> {
  success: boolean;
  data?: T; // Opcional
  message?: string; // Opcional
  error?: string; // Opcional
}

// Uso em diferentes contextos:
const sucessoResponse: ApiResponse<Group[]> = {
  success: true,
  data: [grupo1, grupo2],
};

const erroResponse: ApiResponse = {
  success: false,
  error: "Grupo não encontrado",
};
```

---

## 5. Funções e Métodos

### 🎪 Tipagem de Funções

```typescript
// ✅ Função com tipos explícitos
function somar(a: number, b: number): number {
  return a + b;
}

// ✅ Arrow function
const multiplicar = (a: number, b: number): number => a * b;

// ✅ Parâmetros opcionais
function cumprimentar(nome: string, sobrenome?: string): string {
  return sobrenome ? `Olá, ${nome} ${sobrenome}!` : `Olá, ${nome}!`;
}

// ✅ Parâmetros com valor padrão
function criarUsuario(nome: string, idade: number = 18): object {
  return { nome, idade };
}

// ✅ Rest parameters
function somatoria(...numeros: number[]): number {
  return numeros.reduce((sum, num) => sum + num, 0);
}
```

### 🎯 Tipos de Função

```typescript
// ✅ Definindo tipo de função
type OperacaoMatematica = (a: number, b: number) => number;

const somar: OperacaoMatematica = (a, b) => a + b;
const subtrair: OperacaoMatematica = (a, b) => a - b;

// ✅ Interface para função
interface Comparador<T> {
  (a: T, b: T): boolean;
}

const compararNumeros: Comparador<number> = (a, b) => a > b;
const compararStrings: Comparador<string> = (a, b) => a.length > b.length;
```

### 🎨 Overloads (Sobrecarga)

```typescript
// ✅ Múltiplas assinaturas para a mesma função
function formatar(valor: string): string;
function formatar(valor: number): string;
function formatar(valor: boolean): string;
function formatar(valor: string | number | boolean): string {
  return String(valor).toUpperCase();
}

// Uso:
formatar("hello"); // ✅ string
formatar(123); // ✅ number
formatar(true); // ✅ boolean
// formatar([]);      // ❌ Erro!
```

### 🏆 Exemplo do seu projeto:

```typescript
// Do seu GroupController.ts
export class GroupController {
  // Método async com tipos explícitos
  async createGroup(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, createdBy }: CreateGroupRequest = req.body;

      const group = await this.createGroupUseCase.execute({
        name,
        description,
        createdBy,
      });

      res.status(201).json({
        success: true,
        data: group.toJSON(),
        message: "Group created successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  }
}
```

---

## 6. Classes e Herança

### 🏗️ Classes Básicas

```typescript
// ✅ Classe com tipagem
class Pessoa {
  // Propriedades com tipos
  private _id: number; // Privada
  protected nome: string; // Protegida (herdeiros podem acessar)
  public idade: number; // Pública
  readonly cpf: string; // Somente leitura

  constructor(id: number, nome: string, idade: number, cpf: string) {
    this._id = id;
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
  }

  // Método público
  public apresentar(): string {
    return `Olá, eu sou ${this.nome} e tenho ${this.idade} anos`;
  }

  // Getter
  get id(): number {
    return this._id;
  }

  // Setter com validação
  set idade(novaIdade: number) {
    if (novaIdade >= 0) {
      this.idade = novaIdade;
    }
  }
}
```

### 🎯 Herança e Polimorfismo

```typescript
// ✅ Classe filha
class Funcionario extends Pessoa {
  private salario: number;
  private cargo: string;

  constructor(
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    cargo: string,
    salario: number
  ) {
    super(id, nome, idade, cpf); // Chama construtor da classe pai
    this.cargo = cargo;
    this.salario = salario;
  }

  // Override (sobrescrever método)
  public apresentar(): string {
    return `${super.apresentar()} e trabalho como ${this.cargo}`;
  }

  // Método específico
  public calcularSalarioAnual(): number {
    return this.salario * 12;
  }
}
```

### 🎨 Classes Abstratas

```typescript
// ✅ Classe abstrata (não pode ser instanciada)
abstract class Animal {
  protected nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  // Método concreto
  public dormir(): void {
    console.log(`${this.nome} está dormindo`);
  }

  // Método abstrato (deve ser implementado pelas filhas)
  abstract emitirSom(): string;
}

class Cachorro extends Animal {
  // Implementação obrigatória
  emitirSom(): string {
    return "Au au!";
  }
}

class Gato extends Animal {
  emitirSom(): string {
    return "Miau!";
  }
}
```

### 🏆 Exemplo do seu projeto:

```typescript
// Do seu Group.ts
export class Group {
  // Propriedades com diferentes modificadores
  public readonly id?: string; // Público, somente leitura, opcional
  public readonly name: string; // Público, somente leitura
  public readonly description?: string; // Público, somente leitura, opcional
  public readonly createdBy: string; // Público, somente leitura
  public participantsCount: number; // Público, mutável
  public whatsappGroupInviteLink: string | null; // Público, pode ser null
  public isActive: boolean; // Público, boolean

  constructor(data: GroupData) {
    this.validateInput(data); // Validação privada

    // Inicialização com valores padrão usando nullish coalescing
    this.id = data.id;
    this.name = data.name;
    this.participantsCount = data.participantsCount ?? 0;
    this.isActive = data.isActive ?? true;
  }

  // Método privado para validação
  private validateInput(data: GroupData): void {
    if (!data.name || typeof data.name !== "string") {
      throw new Error("Group name is required and must be a string");
    }
  }

  // Método público
  public addParticipant(): void {
    this.participantsCount += 1;
    this.updatedAt = new Date();
  }

  // Método que retorna interface tipada
  public toJSON(): GroupData {
    return {
      id: this.id,
      name: this.name,
      // ... outros campos
    };
  }
}
```

---

## 7. Generics

### 🎪 Generics Básicos

```typescript
// ✅ Generic simples
function primeiro<T>(array: T[]): T | undefined {
  return array[0];
}

// Uso:
const numeros = [1, 2, 3];
const primeiroNumero = primeiro(numeros); // Tipo: number | undefined

const nomes = ["Ana", "João"];
const primeiroNome = primeiro(nomes); // Tipo: string | undefined

// ✅ Generic com constraint (restrição)
interface TemComprimento {
  length: number;
}

function logComprimento<T extends TemComprimento>(item: T): T {
  console.log(`Comprimento: ${item.length}`);
  return item;
}

logComprimento("Hello"); // ✅ string tem length
logComprimento([1, 2, 3]); // ✅ array tem length
// logComprimento(123);         // ❌ number não tem length
```

### 🎯 Generic Classes

```typescript
// ✅ Classe genérica
class Repositorio<T> {
  private itens: T[] = [];

  adicionar(item: T): void {
    this.itens.push(item);
  }

  buscarPorId(id: number): T | undefined {
    return this.itens[id];
  }

  listar(): T[] {
    return [...this.itens];
  }

  filtrar(predicate: (item: T) => boolean): T[] {
    return this.itens.filter(predicate);
  }
}

// Uso:
interface Usuario {
  id: number;
  nome: string;
}

const repoUsuarios = new Repositorio<Usuario>();
repoUsuarios.adicionar({ id: 1, nome: "Ana" });

const usuarios = repoUsuarios.filtrar((u) => u.nome.includes("A"));
```

### 🎨 Generic Avançados

```typescript
// ✅ Múltiplos generics
interface Par<T, U> {
  primeiro: T;
  segundo: U;
}

const coordenada: Par<number, number> = { primeiro: 10, segundo: 20 };
const nomeIdade: Par<string, number> = { primeiro: "João", segundo: 25 };

// ✅ Generic conditional
type TipoRetorno<T> = T extends string ? string[] : number[];

type A = TipoRetorno<string>; // string[]
type B = TipoRetorno<number>; // number[]

// ✅ Generic keyof
function obterPropriedade<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave];
}

const pessoa = { nome: "Ana", idade: 25, ativo: true };
const nome = obterPropriedade(pessoa, "nome"); // Tipo: string
const idade = obterPropriedade(pessoa, "idade"); // Tipo: number
```

### 🏆 Exemplo do seu projeto:

```typescript
// Do seu types/index.ts
interface PaginatedResponse<T> {
  data: T[];                    // Generic array
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ApiResponse<T = any> {  // Generic com valor padrão
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Do seu repositório
interface IGroupRepository {
  findAll(pagination: PaginationParams): Promise<PaginatedResponse<Group>>;
  //                                                                 ^^^^^^
  //                                              Generic especificando que retorna Groups
}

// Uso prático:
async findAll(pagination: PaginationParams): Promise<PaginatedResponse<Group>> {
  // ... lógica do banco

  return {
    data: groups,           // TypeScript sabe que é Group[]
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages: Math.ceil(total / pagination.limit)
    }
  };
}
```

---

## 8. Utility Types

### 🛠️ Utility Types Essenciais

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
  criadoEm: Date;
}

// ✅ Partial - Todas as propriedades opcionais
type UsuarioAtualizar = Partial<Usuario>;
const atualizar: UsuarioAtualizar = {
  nome: "Novo nome", // Só preciso das que quero atualizar
};

// ✅ Required - Todas as propriedades obrigatórias
type UsuarioCompleto = Required<Usuario>;

// ✅ Pick - Selecionar apenas algumas propriedades
type UsuarioPublico = Pick<Usuario, "id" | "nome" | "email">;
const publico: UsuarioPublico = {
  id: 1,
  nome: "Ana",
  email: "ana@email.com",
  // senha e outras não são necessárias
};

// ✅ Omit - Excluir propriedades
type UsuarioSemSenha = Omit<Usuario, "senha">;
const semSenha: UsuarioSemSenha = {
  id: 1,
  nome: "Ana",
  email: "ana@email.com",
  ativo: true,
  criadoEm: new Date(),
  // senha foi removida
};

// ✅ Record - Criar objeto com chaves específicas
type StatusCount = Record<"ativo" | "inativo" | "pendente", number>;
const contadores: StatusCount = {
  ativo: 10,
  inativo: 5,
  pendente: 2,
};
```

### 🎯 Utility Types Avançados

```typescript
// ✅ Exclude - Remover tipos de union
type Cores = "vermelho" | "azul" | "verde" | "amarelo";
type CoresFrias = Exclude<Cores, "vermelho" | "amarelo">; // "azul" | "verde"

// ✅ Extract - Extrair tipos de union
type CoresQuentes = Extract<Cores, "vermelho" | "amarelo">; // "vermelho" | "amarelo"

// ✅ NonNullable - Remover null e undefined
type PossivString = string | null | undefined;
type SempreString = NonNullable<PossivString>; // apenas string

// ✅ ReturnType - Tipo de retorno de função
function criarUsuario() {
  return { id: 1, nome: "Ana" };
}

type TipoUsuario = ReturnType<typeof criarUsuario>; // { id: number; nome: string; }

// ✅ Parameters - Tipos dos parâmetros de função
function login(email: string, senha: string): boolean {
  return true;
}

type LoginParams = Parameters<typeof login>; // [string, string]
```

### 🏆 Exemplo do seu projeto:

```typescript
// No seu GroupController.ts
export class GroupController {
  // Usando Partial para updates
  async updateGroup(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData: Partial<Group> = req.body; // Só campos que queremos atualizar

    const updatedGroup = await this.groupRepository.update(id, updateData);
    // ...
  }
}

// No seu repositório
interface IGroupRepository {
  // Usando Partial para permitir atualizações parciais
  update(id: string, groupData: Partial<Group>): Promise<Group>;
  //                           ^^^^^^^^^^^^^^^
  //                          Só os campos que serão atualizados
}

// Tipos específicos para requests
type CreateGroupRequest = Pick<GroupData, "name" | "description" | "createdBy">;
//                        ^^^^
//                       Só os campos necessários para criar

type UpdateGroupRequest = Partial<
  Pick<GroupData, "name" | "description" | "isActive">
>;
//                        ^^^^^^^
//                       Campos opcionais para atualização
```

---

## 9. Type Guards

### 🛡️ Type Guards Básicos

```typescript
// ✅ typeof guard
function processarValor(valor: string | number) {
  if (typeof valor === "string") {
    // TypeScript sabe que aqui é string
    console.log(valor.toUpperCase());
  } else {
    // TypeScript sabe que aqui é number
    console.log(valor.toFixed(2));
  }
}

// ✅ instanceof guard
class Cachorro {
  latir() {
    console.log("Au au!");
  }
}

class Gato {
  miar() {
    console.log("Miau!");
  }
}

function fazerSom(animal: Cachorro | Gato) {
  if (animal instanceof Cachorro) {
    animal.latir(); // TypeScript sabe que é Cachorro
  } else {
    animal.miar(); // TypeScript sabe que é Gato
  }
}

// ✅ in operator guard
interface Carro {
  rodas: number;
  acelerar(): void;
}

interface Barco {
  velas: number;
  navegar(): void;
}

function mover(veiculo: Carro | Barco) {
  if ("rodas" in veiculo) {
    veiculo.acelerar(); // TypeScript sabe que é Carro
  } else {
    veiculo.navegar(); // TypeScript sabe que é Barco
  }
}
```

### 🎯 Custom Type Guards

```typescript
// ✅ Função type guard customizada
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Admin extends Usuario {
  permissoes: string[];
}

// Função que verifica se é Admin
function isAdmin(usuario: Usuario | Admin): usuario is Admin {
  return "permissoes" in usuario;
}

function processarUsuario(usuario: Usuario | Admin) {
  if (isAdmin(usuario)) {
    // TypeScript sabe que é Admin
    console.log("Permissões:", usuario.permissoes);
  } else {
    // TypeScript sabe que é Usuario comum
    console.log("Usuário comum:", usuario.nome);
  }
}

// ✅ Type guard para null/undefined
function isNotNull<T>(valor: T | null | undefined): valor is T {
  return valor !== null && valor !== undefined;
}

const numeros = [1, 2, null, 4, undefined, 6];
const numerosValidos = numeros.filter(isNotNull); // Tipo: number[]
```

### 🎨 Assertion Functions

```typescript
// ✅ Função que garante o tipo ou lança erro
function assertIsNumber(valor: unknown): asserts valor is number {
  if (typeof valor !== "number") {
    throw new Error("Valor deve ser um número");
  }
}

function processarNumero(valor: unknown) {
  assertIsNumber(valor);
  // Deste ponto em diante, TypeScript sabe que valor é number
  console.log(valor.toFixed(2));
}

// ✅ Assertion para propriedades
function assertHasId(obj: any): asserts obj is { id: number } {
  if (!obj || typeof obj.id !== "number") {
    throw new Error("Objeto deve ter propriedade id do tipo number");
  }
}
```

### 🏆 Exemplo do seu projeto:

```typescript
// No seu BroadcastController.ts
export class BroadcastController {
  async sendBroadcast(req: Request, res: Response): Promise<void> {
    try {
      const broadcastData: BroadcastData = req.body;
      const result = await this.sendBroadcastUseCase.execute(broadcastData);
      res.status(200).json(result);
    } catch (error) {
      // Type guard para Error
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      //                   ^^^^^^^^^^^^^^^^^^^^^^^^
      //                   Type guard verificando se é Error
      res.status(400).json({ success: false, error: errorMessage });
    }
  }
}

// Type guard customizado para validação
function isValidGroupData(data: any): data is GroupData {
  return (
    data &&
    typeof data === "object" &&
    typeof data.name === "string" &&
    typeof data.createdBy === "string"
  );
}

// Uso no controller:
if (!isValidGroupData(req.body)) {
  return res.status(400).json({
    success: false,
    message: "Invalid group data",
  });
}
// Daqui em diante, TypeScript sabe que req.body é GroupData
```

---

## 10. Tipos Avançados

### 🎪 Mapped Types

```typescript
// ✅ Criando tipos baseados em outros
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

// Tornar todas as propriedades opcionais
type UsuarioOpcional = {
  [K in keyof Usuario]?: Usuario[K];
};

// Tornar todas as propriedades readonly
type UsuarioReadonly = {
  readonly [K in keyof Usuario]: Usuario[K];
};

// Criar versão string de todas as propriedades
type UsuarioStrings = {
  [K in keyof Usuario]: string;
};

// ✅ Mapped type condicional
type NullableKeys<T> = {
  [K in keyof T]: T[K] | null;
};

type UsuarioNullable = NullableKeys<Usuario>;
// Resultado: { id: number | null; nome: string | null; email: string | null; }
```

### 🎯 Template Literal Types

```typescript
// ✅ Template literals em tipos
type Prefixo = "get" | "set";
type Propriedade = "Nome" | "Idade" | "Email";

type MetodoNome = `${Prefixo}${Propriedade}`;
// Resultado: "getNome" | "setNome" | "getIdade" | "setIdade" | "getEmail" | "setEmail"

// ✅ Extração de padrões
type EventoNome = "onClick" | "onMouseOver" | "onKeyPress";
type AcaoNome = EventoNome extends `on${infer T}` ? T : never;
// Resultado: "Click" | "MouseOver" | "KeyPress"

// ✅ Validação de formato
type Email = `${string}@${string}.${string}`;
let emailValido: Email = "user@example.com"; // ✅ OK
// let emailInvalido: Email = "invalid-email"; // ❌ Erro!
```

### 🎨 Conditional Types

```typescript
// ✅ Tipos condicionais
type TipoArray<T> = T extends any[] ? T[number] : T;

type A = TipoArray<string[]>; // string
type B = TipoArray<number>; // number

// ✅ Conditional com infer
type RetornoPromise<T> = T extends Promise<infer U> ? U : T;

type C = RetornoPromise<Promise<string>>; // string
type D = RetornoPromise<number>; // number

// ✅ Distributed conditional types
type ExcluirNull<T> = T extends null ? never : T;

type Resultado = ExcluirNull<string | number | null>; // string | number
```

### 🎯 Module Augmentation

```typescript
// ✅ Estender tipos de módulos existentes
declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Agora podemos usar:
const texto = "hello world";
console.log(texto.capitalize()); // "Hello world"

// ✅ Estender Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

// Agora req.user tem tipos!
```

### 🏆 Exemplo do seu projeto:

```typescript
// Tipo avançado para validação de middleware
type MiddlewareWithValidation<T> = (
  req: Request & { pagination?: T },
  res: Response,
  next: NextFunction
) => void;

// Mapped type para configuração de database
type DatabaseConfig = {
  readonly [K in keyof Required<{
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  }>]: K extends "port" ? number : string;
};

// Template literal para rotas
type ApiRoute = `/api/v1/${string}`;
type GroupRoutes = `/api/v1/groups${"" | `/${string}`}`;

// Conditional type para responses
type ApiResponse<T> = T extends Group
  ? { success: true; data: GroupData; message: string }
  : T extends Group[]
  ? { success: true; data: GroupData[]; pagination: PaginationParams }
  : { success: boolean; data?: T; message?: string; error?: string };
```

---

## 11. Exemplos Práticos do Projeto

### 🏆 Análise Completa do Seu Código

Vamos analisar alguns arquivos do seu projeto para entender como a tipagem está sendo aplicada:

#### 📁 `types/index.ts` - Hub de Tipos

```typescript
// ✅ Interface para dados do grupo
export interface GroupData {
  id?: string; // Opcional: pode não existir em criação
  name: string; // Obrigatório: nome do grupo
  description?: string; // Opcional: descrição
  createdBy: string; // Obrigatório: criador
  participantsCount?: number; // Opcional: com padrão 0
  whatsappGroupInviteLink?: string | null; // Opcional: pode ser null
  whatsappGroupId?: string | null; // Opcional: pode ser null
  isActive?: boolean; // Opcional: com padrão true
  isFull?: boolean; // Opcional: com padrão false
  createdAt?: Date; // Opcional: com padrão new Date()
  updatedAt?: Date; // Opcional: atualizado automaticamente
}

// ✅ Interface para criação (apenas campos necessários)
export interface CreateGroupRequest {
  name: string; // Só os campos obrigatórios
  description?: string;
  createdBy: string;
}

// ✅ Generic para paginação
export interface PaginatedResponse<T> {
  data: T[]; // Array genérico - pode ser Group[], User[], etc.
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ✅ Generic para responses da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T; // Dados opcionais, tipo genérico
  message?: string; // Mensagem opcional
  error?: string; // Erro opcional
}
```

#### 📁 `Group.ts` - Entidade com Tipagem Robusta

```typescript
import { GroupData } from "../../../types";

export class Group {
  // ✅ Modificadores de acesso e readonly
  public readonly id?: string; // Público, só leitura, opcional
  public readonly name: string; // Público, só leitura, obrigatório
  public readonly description?: string; // Público, só leitura, opcional
  public readonly createdBy: string; // Público, só leitura, obrigatório
  public participantsCount: number; // Público, mutável
  public whatsappGroupInviteLink: string | null; // Union type
  public whatsappGroupId: string | null; // Union type
  public isActive: boolean; // Boolean
  public isFull: boolean; // Boolean
  public readonly createdAt: Date; // Date, só leitura
  public updatedAt: Date; // Date, mutável

  // ✅ Constructor com tipagem e validação
  constructor(data: GroupData) {
    this.validateInput(data); // Validação com types

    // ✅ Nullish coalescing operator (??) para valores padrão
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.createdBy = data.createdBy;
    this.participantsCount = data.participantsCount ?? 0; // Padrão 0
    this.whatsappGroupInviteLink = data.whatsappGroupInviteLink ?? null;
    this.whatsappGroupId = data.whatsappGroupId ?? null;
    this.isActive = data.isActive ?? true; // Padrão true
    this.isFull = data.isFull ?? false; // Padrão false
    this.createdAt = data.createdAt ?? new Date(); // Padrão agora
    this.updatedAt = new Date();
  }

  // ✅ Método privado com void return
  private validateInput(data: GroupData): void {
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length === 0
    ) {
      throw new Error("Group name is required and must be a non-empty string");
    }

    if (data.name.length > 100) {
      throw new Error("Group name cannot exceed 100 characters");
    }

    if (!data.createdBy || typeof data.createdBy !== "string") {
      throw new Error("Group creator is required and must be a string");
    }
  }

  // ✅ Método público com void return
  public addParticipant(): void {
    this.participantsCount += 1;
    this.updatedAt = new Date();
  }

  // ✅ Método que retorna interface tipada
  public toJSON(): GroupData {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdBy: this.createdBy,
      whatsappGroupId: this.whatsappGroupId,
      isActive: this.isActive,
      isFull: this.isFull,
      participantsCount: this.participantsCount,
      whatsappGroupInviteLink: this.whatsappGroupInviteLink,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
```

#### 📁 `PostgresGroupRepository.ts` - Repository Pattern

```typescript
import { Group } from "../../../../domain/entities/Group";
import { IGroupRepository } from "../../../../domain/repositories/interfaces";
import { PaginationParams, PaginatedResponse } from "../../../../../types";
import pool from "../../../../../shared/config/database";

// ✅ Interface para linha do banco
interface GroupRow {
  id: string;
  name: string;
  description?: string;
  created_by: string; // Snake_case do banco
  participants_count: number;
  whatsapp_group_invite_link?: string;
  whatsapp_group_id?: string;
  is_active: boolean;
  is_full: boolean;
  created_at: Date;
  updated_at?: Date;
}

// ✅ Implementação de interface
export class PostgresGroupRepository implements IGroupRepository {
  // ✅ Método async com tipos explícitos
  async create(group: Group): Promise<Group> {
    const query = `
      INSERT INTO groups (name, description, created_by, participants_count, whatsapp_group_invite_link, whatsapp_group_id, is_active, is_full)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      group.name,
      group.description,
      group.createdBy,
      group.participantsCount,
      group.whatsappGroupInviteLink,
      group.whatsappGroupId,
      group.isActive,
      group.isFull,
    ];

    const result = await pool.query(query, values);
    return this.mapToEntity(result.rows[0]); // Tipo específico retornado
  }

  // ✅ Method com union type de retorno
  async findById(id: string): Promise<Group | null> {
    const query = "SELECT * FROM groups WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null; // Explicitamente null
    }

    return this.mapToEntity(result.rows[0]); // Ou Group
  }

  // ✅ Generic method com paginação
  async findAll(
    pagination: PaginationParams
  ): Promise<PaginatedResponse<Group>> {
    const offset = (pagination.page - 1) * pagination.limit;

    // Count query
    const countQuery = "SELECT COUNT(*) FROM groups";
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    // Data query
    const query = `
      SELECT * FROM groups 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [pagination.limit, offset]);

    // ✅ Map com tipagem explícita
    const groups = result.rows.map((row: GroupRow) => this.mapToEntity(row));

    // ✅ Return com generic type
    return {
      data: groups,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  // ✅ Partial type para updates
  async update(id: string, groupData: Partial<Group>): Promise<Group> {
    const updates: string[] = [];
    const values: any[] = []; // any[] para valores dinâmicos
    let paramCount = 0;

    // ✅ Type guards para verificar propriedades
    if (groupData.name !== undefined) {
      paramCount++;
      updates.push(`name = $${paramCount}`);
      values.push(groupData.name);
    }

    if (groupData.participantsCount !== undefined) {
      paramCount++;
      updates.push(`participants_count = $${paramCount}`);
      values.push(groupData.participantsCount);
    }

    // Always update timestamp
    paramCount++;
    updates.push(`updated_at = $${paramCount}`);
    values.push(new Date());

    paramCount++;
    values.push(id);

    const query = `
      UPDATE groups 
      SET ${updates.join(", ")} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Group not found");
    }

    return this.mapToEntity(result.rows[0]);
  }

  // ✅ Private method para mapeamento
  private mapToEntity(row: GroupRow): Group {
    // ✅ Type guards para validação
    if (!row.name) {
      console.error("❌ Missing name in database row:", row);
      throw new Error("Database row missing required name field");
    }

    if (!row.created_by) {
      console.error("❌ Missing created_by in database row:", row);
      throw new Error("Database row missing required created_by field");
    }

    // ✅ Mapeamento snake_case -> camelCase com tipos
    return new Group({
      id: row.id,
      name: row.name,
      description: row.description,
      createdBy: row.created_by, // Snake para camel
      participantsCount: row.participants_count,
      whatsappGroupInviteLink: row.whatsapp_group_invite_link,
      whatsappGroupId: row.whatsapp_group_id,
      isActive: row.is_active,
      isFull: row.is_full,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
```

#### 📁 `GroupController.ts` - Express com TypeScript

```typescript
import { Request, Response } from "express";
import { CreateGroupUseCase } from "../../../core/domain/use-cases/CreateGroupUseCase";
import { DeleteGroupUseCase } from "../../../core/domain/use-cases/DeleteGroupUseCase";
import { IGroupRepository } from "../../../core/domain/repositories/interfaces";
import { CreateGroupRequest, PaginationParams } from "../../../types";

// ✅ Extending Request interface
interface RequestWithPagination extends Request {
  pagination: PaginationParams;
}

export class GroupController {
  // ✅ Dependency injection com tipos
  constructor(
    private createGroupUseCase: CreateGroupUseCase, // Private shorthand
    private deleteGroupUseCase: DeleteGroupUseCase,
    private groupRepository: IGroupRepository
  ) {}

  // ✅ Express handler com async/await
  async createGroup(req: Request, res: Response): Promise<void> {
    try {
      // ✅ Destructuring com tipagem
      const { name, description, createdBy }: CreateGroupRequest = req.body;

      // ✅ Type guard para validação
      if (!name || !createdBy) {
        res.status(400).json({
          success: false,
          message: "Name and createdBy are required",
        });
        return; // Early return
      }

      // ✅ Use case com tipagem
      const group = await this.createGroupUseCase.execute({
        name,
        description,
        createdBy,
      });

      // ✅ Response tipada
      res.status(201).json({
        success: true,
        data: group.toJSON(), // Método que retorna GroupData
        message: "Group created successfully",
      });
    } catch (error) {
      console.error("Error creating group:", error);
      // ✅ Type guard para Error
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  }

  // ✅ Handler com interface customizada
  async getGroups(req: RequestWithPagination, res: Response): Promise<void> {
    try {
      // ✅ Destructuring com defaults
      const { page = 1, limit = 10 } = req.pagination || { page: 1, limit: 10 };

      const pagination: PaginationParams = {
        page: Number(page),
        limit: Number(limit),
      };

      // ✅ Repository call com generic
      const result = await this.groupRepository.findAll(pagination);

      res.status(200).json({
        success: true,
        data: result.data.map((group) => group.toJSON()), // Array mapping
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Error fetching groups:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  }

  // ✅ Handler com union return type
  async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // string by default
      const group = await this.groupRepository.findById(id);

      // ✅ Type guard para null
      if (!group) {
        res.status(404).json({
          success: false,
          message: "Group not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: group.toJSON(),
      });
    } catch (error) {
      console.error("Error fetching group:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  }
}
```

### 🎯 Principais Padrões de Tipagem Identificados

1. **Interfaces vs Types**: Interfaces para estruturas de dados, types para unions
2. **Generics**: Amplamente usado para reutilização (PaginatedResponse<T>, ApiResponse<T>)
3. **Union Types**: Para valores que podem ser de tipos diferentes (string | null)
4. **Optional Properties**: Uso extensivo de `?` para campos opcionais
5. **Readonly**: Para propriedades imutáveis
6. **Type Guards**: Para validação runtime com garantias de tipo
7. **Async/Await**: Com tipos Promise explícitos
8. **Dependency Injection**: Com private shorthand no constructor
9. **Error Handling**: Com instanceof type guards
10. **Mapping**: Entre diferentes representações de dados

---

## 🎓 Exercícios Práticos

### Exercício 1: Criar Sistema de Usuários

```typescript
// Crie interfaces para:
// - Usuario (id, nome, email, senha, role)
// - Admin extends Usuario (permissoes: string[])
// - CreateUserRequest (apenas campos necessários)
// - UpdateUserRequest (campos opcionais)

// Implemente:
// - Classe User com validação
// - Repository interface
// - Controller methods
```

### Exercício 2: Sistema de Notificações

```typescript
// Crie um sistema tipado para:
// - NotificationType = "email" | "sms" | "push"
// - Notification com generic para payload
// - Different payload types por tipo de notificação
// - Service para envio com overloads
```

### Exercício 3: API Response Wrapper

```typescript
// Crie um wrapper tipado que:
// - Normalize todas as responses da API
// - Suporte paginação quando aplicável
// - Tenha error handling consistente
// - Use generics para type safety
```

---

## 🏆 Resumo e Melhores Práticas

### ✅ **Do's (Faça)**

1. **Use inferência quando possível**: `const name = "João"` (não `const name: string = "João"`)
2. **Prefira interfaces para objetos**: Mais flexível para extensão
3. **Use types para unions e computados**: `type Status = "active" | "inactive"`
4. **Seja específico com tipos**: `string | null` em vez de `any`
5. **Use readonly para imutabilidade**: `readonly id: string`
6. **Validação com type guards**: Para runtime safety
7. **Generics para reutilização**: `Repository<T>`, `Response<T>`
8. **Optional chaining**: `user?.profile?.name`
9. **Nullish coalescing**: `value ?? defaultValue`
10. **Strict null checks**: Configure no tsconfig.json

### ❌ **Don'ts (Não faça)**

1. **Evite `any`**: Use `unknown` quando necessário
2. **Não ignore erros do TypeScript**: Resolva ou use `@ts-ignore` com parcimônia
3. **Não over-engineer tipos**: Simplicidade primeiro
4. **Evite type assertions desnecessárias**: `as any`, `as SomeType`
5. **Não misture conventions**: camelCase vs snake_case
6. **Evite mutação de readonly**: TypeScript não impede em runtime
7. **Não abuse de overloads**: Use union types quando possível
8. **Evite circular dependencies**: Entre tipos e módulos
9. **Não ignore null/undefined**: Use strict checks
10. **Evite tipos muito complexos**: Se não consegue ler, simplifique

### 🎯 **Configuração Recomendada (tsconfig.json)**

```json
{
  "compilerOptions": {
    "strict": true, // Máximo rigor
    "noImplicitAny": true, // Não permita any implícito
    "strictNullChecks": true, // Controle null/undefined
    "strictFunctionTypes": true, // Controle tipos de função
    "noImplicitReturns": true, // Todas as paths devem retornar
    "noUnusedLocals": true, // Detecta variáveis não usadas
    "noUnusedParameters": true, // Detecta parâmetros não usados
    "exactOptionalPropertyTypes": true // Diferencia undefined de ausente
  }
}
```

---

## 🚀 Próximos Passos

1. **Pratique com seu projeto**: Adicione mais tipos específicos
2. **Explore utility types**: Partial, Pick, Omit em cenários reais
3. **Implemente validação runtime**: Com bibliotecas como Zod
4. **Aprenda sobre branded types**: Para tipos mais específicos
5. **Estude conditional types avançados**: Para casos complexos
6. **Configure ESLint com TypeScript**: Para melhor qualidade de código
7. **Teste com Jest + TypeScript**: Para testes tipados
8. **Explore decorators**: Para metadata em classes

TypeScript é uma jornada! Comece com o básico e vá evoluindo conforme a necessidade. O importante é ter type safety sem sacrificar produtividade. 🎯
