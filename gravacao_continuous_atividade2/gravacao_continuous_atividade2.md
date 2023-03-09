# Serviço de gravação contínua - Atividade 2

## Melhorias
- **Tipagem dos dados:** como a proposta do TypeScript é trazer recursos que o JavaScript não tem, como retorno de funções, tipagem de dados e parâmetros, seria interessante não deixar os dados com o tipo `any` e tipar os dados. Exemplo:
    - No arquivo validator.ts, o `req` que é um objeto a requisição, poderia ter sido tipado incluindo o `@types/express` no projeto e importando o tipo `Request`:

<!-- 
- [x] Update a base
- [x] Delete a base
- [x] Rent a base
- [x] List all bases or list bases with parameters through query string
- [x] Thunder client requests collection  -->
