# Como rodar o projeto

- Baixe a última versão LTS do [NodeJS](https://nodejs.org/en)
- Abra o terminal do seu computador na pasta raíz do projeto, recomendo abrir pelo vscode com o atalho `Ctrl + J`
- Baixe e instale o expo cli com o comando no terminal `npx expo install -- -g`
- Na pasta raíz do projeto rode o comando no terminal `npm install`
- Baixa no servidor do discord um arquivo chamado `env`, ele possuirá as chaves de acesso ao banco de dados do Supabase. Salve-o na pasta raiz do projeto como .env e atualize sempre antes de fazer alterações com `git pull origin`
- Para iniciar o projeto rode o comando no terminal `npx expo start`
- Você pode escolher como rodar o projeto, em seu celular pessoal (recomendado) ou em um simulador
    -   No celular pessoal, baixe o aplicativo expo go e conecte o computador e o celular na mesma rede, então, aponte o leitor de QR code do aplicativo para o QR Code que aparecerá no terminal. Você pode rodar o projeto localmente via cabo USB, para isso, habilite as configurações de desenvolvedor no seu aparelho e ative a depuração USB, caso opte por essa abordagem você pode iniciar o projeto com o comando `expo start --localhost --android`.
    -   Para rodar o projeto em um simulador siga as instruções de configuração do Android Studio da documentação oficial do [React Native](https://reactnative.dev/docs/environment-setup?guide=native)
- Cole o json da pasta `.vscode/config` nas configurações do seu vscode, para abrir as configurações do vscode digite o atalho `Ctrl + Shift + P` e procure por Preferences: Open settings (JSON) ou no bom português(chora elon musk) Preferências: Abrir configurações (JSON)

# Dicas

- Sempre que salvar um arquivo o prettier formatará o projeto, então não se assuste :)
- **NUNCA** ignore os avisos do ESLINT! Sempre que você ver um warning dele, provavelmente seu código tem um problema :)
- O Expo pode ser meio bugado, as vezes vale a pena fechar o expo go, ir no terminal e reiniciar o App :(

# Estrutura do projeto

.
└── src
    ├── components
    ├── context
    ├── helpers
    ├── routes
    ├── shared
    └── screens

- **components**: Os componentes que representam a mínima parte de uma estrutura de UI
- **context**: Todos os estados compartilhados da aplicação
- **helpers**: Arquivos com funções de utilidade
- **routes**: Rotas das aplicação
- **shared**: arquivos de informaçoes compartilhadas
- **screens**: Componentes de tela

## Links úteis

- [Expo](https://docs.expo.dev)
- [React docs](https://react.dev)
- [React Native docs](https://reactnative.dev/docs/environment-setup)
- [Designs de páginas de login do Dribble](https://dribbble.com/tags/login)
- [Testar paleta de cores](https://realtimecolors.com/?colors=000000-ffffff-4685ff-f2f2f2-ffb084)
