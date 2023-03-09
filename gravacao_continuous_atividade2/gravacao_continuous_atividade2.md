# Serviço de gravação contínua - Atividade 2

## Melhorias
- **Tipagem dos dados:** como a proposta do TypeScript é trazer recursos que o JavaScript não tem, como retorno de funções, tipagem de dados e parâmetros, seria interessante não deixar os dados com o tipo `any` e tipar os dados. Exemplo:
    - Em alguns arquivos como validator.ts e plataform.route.ts, `req` que é um objeto a requisição, poderia ter sido tipado incluindo o `@types/express` na aplicação e importando o tipo `Request` no arquivo:
      <div>
        <img src="https://user-images.githubusercontent.com/98347928/224040769-9a2e40b6-aeaa-42d2-8084-765a27454f50.png" width=375px />
        <img src="https://user-images.githubusercontent.com/98347928/224045049-42eccabb-c832-4a69-b03c-01b2264d8461.png" width=400px />
     </div>
 
- **Criação de arquivos e funções com responsabilidades diferentes:** 
    - o arquivo `plataform.route.ts` possui muitas responsabilidades. Ficaria mais organizado se fossem criadas outras camadas e cada uma ficasse responsável por exemplo por lidar com os objetos de requisição `(controllers)`, por fazer o gerenciamento dos endpoints `(routes)`, para lidar com as regras de negócio `(services)`, para acessar o banco de dados `(repositories)`...
     O arquivo plataform.routes com uma função:
     ![route request22](https://user-images.githubusercontent.com/98347928/224052907-4482927c-7995-4e51-81f7-3295cc4e9697.png)
     Todas as outras funções foram exportadas em um novo arquivo (plataform.controller.ts) localizado em uma nova pasta chamada `controller`.
   -  O ideal é que funções também tenham uma única responsabilidade. A função **handlePutCameraDiaId** (que agora está na camada de controller) além de lidar com os objetos de requisição, está fazendo várias validações relacionadas às regras de negócios. Seria interessante criar uma outra camada para lidar com essas regras.
     ![route request2f2](https://user-images.githubusercontent.com/98347928/224057428-52b6fa2d-749e-4de9-936c-b62737cf61d6.png)
     
- **Pasta __mocks__:** Geralmente o ato de mockar alguma função está relacionado aos testes da aplicação. Acredito que faria sentido mover a pasta `__mocks__` que se encontra na pasta `utils` para a pasta de testes 
   - ![Screenshot from 2023-03-09 12-01-17](https://user-images.githubusercontent.com/98347928/224064861-eb074f4e-0293-400e-9a59-f7261e2c0abc.png)

<!-- 
- [x] Update a base
- [x] Delete a base
- [x] Rent a base
- [x] List all bases or list bases with parameters through query string
- [x] Thunder client requests collection 
 
    <div align=left margin-left=130px>
        <img src="https://user-images.githubusercontent.com/98347928/224048833-204377e5-7b44-4a8c-a1cc-d4757933e245.png" width=375px />
        <img src="https://user-images.githubusercontent.com/98347928/224048846-2f824ea0-b06c-4b65-a8c7-4ff131c6ceb6.png" width=375px />
     </div>
-->
