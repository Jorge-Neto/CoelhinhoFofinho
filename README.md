# CoelhinhoFofinho

### Requisitos:

- Yarn 1.22.22 ou superior
- Node 18 ou superior

### Execução do projeto:

Para instalar as dependências, abra terminal e execute o comando
`yarn`

Depois, execute o projeto com
`yarn start --clear`

Para gerar o APK da aplicação
`eas build --platform android --profile preview`

Para gerar o AAB da aplicação
`eas build -p android --clear-cache`

Para gerar o app para iOS (necessário conta de desenvolvedor):
`eas build --platform ios --profile preview`
