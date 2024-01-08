# BackEnd - Neoo

## Rotas

**1. [Sobre](#rotas-sobre)**


* [Retornar Versão](#retornar-versão)
* [Retorna Conteúdos](#retornar-conteúdos)
* [Retornar Páginas](#retorna-páginas)


**2. [Feed](#rotas-feed)**


* [Retornar Posts](#retornar-posts)
* [Retornar Pesquisa](#retornar-pesquisa)
* [Retornar Quiz](#retornar-quiz)
* [Retornar Quizes Pendentes](#retornar-quizes-pendentes)
* [Atualizar Posts](#atualizar-posts)
* [Retornar Comentários](#retornar-comentários)
* [Inserir Posts](#inserir-posts)
* [Deletar Posts](#deletar-posts)
* [Reportar Posts](#reportar-posts)
* [Inserir Quiz](#inserir-quiz)
* [Retornar Temas do Quiz](#retornar-temas-do-quiz)
* [Responder Quiz](#responder-quiz)
* [Inserir Comentários](#inserir-comentários)
* [Promover Posts](#promover-posts)
* [Retornar Quem Promoveu](#retornar-quem-promoveu)
* [Retornar Workspaces](#retornar-workspaces)
* [Visualizar Post](#visualizar-post)


**3. [Perfil](#rotas-perfil)**

* [Retornar Perfil](#retornar-perfil)
* [Retornar Perfil Hashtag](#retornar-perfil-hashtag)
* [Retornar Perfil Workspace](#retornar-perfil-workspace)
* [Seguir Usuario](#seguir-usuário)
* [Solicita Conexão](#solicita-conexão)
* [Deleta Conexão](#deleta-conexão)
* [Aceita Solicitação](#aceita-solicitação)

**4. [Administração](#rotas-administração)**

* [Retornar Configuração](#retornar-configuração)
* [Editar Configuração](#editar-configuração)
* [Retornar Workspace](#retornar-workspace)
* [Retornar Usuários da Workspace](#retornar-usuarios-da-workspace)
* [Inserir Workspace](#inserir-workspace)
* [Alterar Workspace](#alterar-workspace)
* [Desativar Workspace](#deletar-workspace)
* [Atribuir Usuários](#atribuir-usuários)
* [Retornar Usuários](#retornar-usuários)
* [Inserir Usuários](#inserir-usuários)
* [Editar Usuários](#editar-usuários)
* [Remover Usuário](#remover-usuários)
* [Retornar Informacoes Usuário](#retornar-informacoes-usuários)


**5. [Upload](#rotas-upload)**

* [Realizar Uploads](#realizar-uploads)

## Rotas Sobre

### Retornar Versão

> Retorna a versão da aplicação

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Retorna_Versao```

##### Link Requisição: 

```
http://35.247.231.34:4000/sobre/retornaVersao?loginUsuario=davi.bacalhau
```

##### JSON Retorno: 

```
[
    {
        "versao": "v2021.10.14A"
    }
]
```
##


### Retornar Conteúdos

> Retorna os conteúdos enviados pela BRT

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Retorna_Conteudos```

##### Link Requisição: 

```
http://35.247.231.34:4000/sobre/retornaConteudos?loginUsuario=teylor.alencar
```

##### JSON Retorno: 

```
[
    {
        "nome": "manual da plataforma",
        "codigo": 1
    }
]
```
##


### Retornar Páginas

> Retorna as paginas dos conteúdos enviados pela BRT

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Retorna_Conteudo_Paginas```

##### Link Requisição: 

```
http://35.247.231.34:4000/sobre/retornaConteudos?loginUsuario=teylor.alencar&cConteudo=1
```

##### JSON Retorno: 

```
[
    {
        "codigo": 1
        "cConteudo": 1
        "url": "url.teste.png"
    }
]
```
##

## Rotas Feed


####   [⬆ Voltar ao topo ⬆](#rotas)
### Retornar Posts

> Retorna os posts para o feed. Retorna em outra rota os comentários dos posts e as workspaces de cada post.

##### Tipo Requisição: GET

##### Nomes da procedures: ```dbo.s_WorkMedia_Retorna_Post_v3```, ```dbo.s_WorkMedia_Feed_Retorna_Comentario```, ```dbo.s_Retorna_Post_Workspaces```, ```s_Retorna_Post_Hashtags```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/retornaPosts?loginUsuario=davi.bacalhau&top=1&ultimoCodigoPost=0&usuario=-1&cWorkspace=-1&cHashtag=-1
```

##### JSON Retorno: 

```
[
  {
    "codigo": 1,
    "cWorkspace": 4,
    "nomeWorkspace": "Geral",
    "tipoPost": "imagem",
    "isPromoted": 0,
    "loginUsuario": "davi.bacalhau",
    "usuario": "Bacalhau",
    "urlImagemPerfil": "",
    "legenda": "post normal",
    "urlMidiaPost": "http://35.247.231.34/NeoMobile/WorkMedia/profileimages/098CBE2A-A41E-4B64-9552-7C610F2273B2.jpg",
    "dataCriacao": "14 de Setembro",
    "ultimaData": "2021-09-14 11:30:36",
    "qtdPromocoes": "0",
    "qtdComentarios": "2",
    "hashtags": "",
    "comentarios": [
      {
        "codigo": 3,
        "codigoPost": 1,
        "loginUsuario": "gabriel.demenjour",
        "usuario": "Demenjour",
        "urlImagemPerfil": "",
        "comentario": "abcd",
        "dataCriacao": "14 de Setembro"
      }
    ],
    "workspaces": [
        {
            "codigo":4,
            "nome":"Geral"
        }
    ]    
  }
]
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)
### Retornar Pesquisa

> Retorna as sugestoes de pesquisa.

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Feed_Retorna_Pesquisa```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/retornaPesquisa?loginUsuario=davi.bacalhau&pesquisa
```

##### JSON Retorno: 

```
[
    {
        "nome": "Neoo",
        "codigo": 12,
        "urlImagemPerfil": "",
        "tipo": "login"
    }
]
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)
### Retornar Quiz

> Retorna o quiz para o post.

##### Tipo Requisição: GET

##### Nomes da procedures: ```dbo.s_WorkMedia_Retorna_Quiz```, ```dbo.s_WorkMedia_Retorna_Quiz_Perguntas```, ```dbo.s_WorkMedia_Retorna_Quiz_Respostas```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/retornaPostQuiz?loginUsuario=davi.bacalhau&cPost=105
```

##### JSON Retorno: 

```
[
  {
    "codigo": 11,
    "titulo": "Neosyx",
    "respAnonimas": false,
    "tema": "Pesquisa",
    "perguntas": [
      {
        "codigo": 10,
        "pergunta": "Qual o melhor artefato da neosyx",
        "cResposta": null,
        "respostas": [
          {
            "codigo": 18,
            "resposta": "Roupa de Kart",
            "respostaCorreta": true
          },
          {
            "codigo": 19,
            "resposta": "Boné NSX",
            "respostaCorreta": true
          }
        ]
      }
    ]
  }
]
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)
### Retornar Quizes pendentes

> Retorna os quizes na tela que não foram respondidos pelo usuário.

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Retorna_Quizes_Pendentes```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/retornaQuizesPendentes?loginUsuario=davi.bacalhau
```

##### JSON Retorno: 

```
[
    1,
    7,
    8,
    10,
    14,
    17,
    18
]
```
##


####   [⬆ Voltar ao topo ⬆](#rotas)

### Atualizar Posts

> Retorna os posts mais recentes.

##### Tipo de Requisição: GET

##### Nomes da procedures: ```dbo.s_WorkMedia_Retorna_Post```, ```dbo.s_WorkMedia_Feed_Retorna_Comentario```, ```dbo.s_Retorna_Post_Workspaces```

##### Link Requisição:

```
http://35.247.231.34:4000/feed/atualizaPosts?loginUsuario=teylor.alencar&top=30&primeiroCodigoPost=1
```

##### JSON Retorno:

```
[
    {
        "codigo": 1,
        "cWorkspace": 4,
        "nomeWorkspace": "Geral",
        "tipoPost": "imagem",
        "isPromoted": 0,
        "loginUsuario": "davi.bacalhau",
        "usuario": "Bacalhau",
        "urlImagemPerfil": "",
        "legenda": "post normal",
        "urlMidiaPost": "http://35.247.231.34/NeoMobile/WorkMedia/profileimages/098CBE2A-A41E-4B64-9552-7C610F2273B2.jpg",
        "dataCriacao": "14 de Setembro",
        "ultimaData": "2021-09-14 11:30:36",
        "qtdPromocoes": "0",
        "qtdComentarios": "2",
        "hashtags": "",
        "comentarios": [
            {
                "codigo": 3,
                "codigoPost": 1,
                "loginUsuario": "gabriel.demenjour",
                "usuario": "Demenjour",
                "urlImagemPerfil": "",
                "comentario": "abcd",
                "dataCriacao": "14 de Setembro"
            }
        ],
        "workspaces": [
            {
                "codigo":4,
                "nome":"Geral"
            }
        ]
    }
]
```

## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Comentários

> Retorna comentários de um post. (TALVEZ SEJA DESCARTADA A ROTA DELA)

##### Tipo de Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Feed_Retorna_Comentario```

##### Link Requisição:

```
http://35.247.231.34:4000/feed/retornaComentarios?loginUsuario=teylor.alencar&codigoPost=1
```

##### JSON Retorno:

```
[
    {
        "codigo": 3,
        "codigoPost": 1,
        "loginUsuario": "gabriel.demenjour",
        "usuario": "Demenjour",
        "urlImagemPerfil": "",
        "comentario": "abcd",
        "dataCriacao": "14 de Setembro"
    },
]
```

##


####   [⬆ Voltar ao topo ⬆](#rotas)

### Inserir Posts

> Insere post no feed

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Post_Insere_Post```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/inserePost
```

##### JSON Parâmetros:

```
{
       "loginUsuario": "teylor.alencar",
       "cWorkspaces": [1|2|3],
       "hashtags" : [#1|#2]
       "legenda": "Texto do post",
       "urlMidia": "http://...",
       "cTipoPost": 2
}
```

##### JSON Retorno: 

```
{
    "codigo": 1,
    "nome": "Texto",s
    "url": "",
    "resultado": false
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Deletar Posts

> Deleta post no feed

##### Tipo Requisição: DELETE

##### Nome da procedure: ```dbo.s_WorkMedia_Post_Deleta_Post```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/deletaPost
```

##### JSON Parâmetros:

```
{
       "loginUsuario": "teylor.alencar",
       "cPost": 2
}
```

##### JSON Retorno: 

```
{
    "result": 1,
    "msg": "Sucesso"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Reportar Posts

> Reporta post no feed

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Post_Insere_Report```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/reportaPost
```

##### JSON Parâmetros:

```
{
       "loginUsuario": "teylor.alencar",
       "cPost": 2,
       "mensagem": ''
}
```

##### JSON Retorno: 

```
{
    "resultado": 1
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Inserir Quiz

> Insere quiz no post

##### Tipo Requisição: POST

##### Nomes da procedures: ```dbo.s_WorkMedia_Insere_Quiz```, ```dbo.s_WorkMedia_Insere_Quiz_Perguntas```, ```dbo.s_WorkMedia_Insere_Quiz_Respostas```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/insereQuiz
```

##### JSON Parâmetros:

```
{
      loginUsuario: teylor.alencar,
      titulo: 'Titulo do Quiz',
      cTema: 1,
      cWorkspaces: 1
      respAnonimas: true,
      dataInicial: '2021-11-18 13:53:05.313',
      dataFinal: '2021-11-29 14:00:00.000'
      perguntas: [{
         codigo: 1,
         pergunta: 'Pergunta 1',
         respostas:[
            { 
               codigo: 1,
               resposta:'Resposta 1',
               correta: false
             },
             {
               codigo: 2,
               resposta:'Resposta 2',
               correta: true
             },
         ]
      }]
}
```

##### JSON Retorno: 

```
{
    "result": 1,
    "msg": "Sucesso"
}
```

##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Temas do Quiz

> Retorna lista de Temas para criação de Quizes

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Quiz_Tema```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/retornaQuizTema?loginUsuario=davi.bacalhau
```

##### JSON Retorno: 

```
[
    
    {
        "value": 4,
        "label": "Interesse"
    },
    {
        "value": 2,
        "label": "Pesquisa"
    },
    {
        "value": 3,
        "label": "Satisfação"
    }
]
```

## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Responder Quiz

> Insere resposta do usuário no quiz

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Insere_Quiz_Resposta_Login```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/respondeQuiz
```

##### JSON Parâmetros:

```
{
   loginUsuario: teylor.alencar,
   cResposta: 1
}
```

##### JSON Retorno: 

```
{
    "result": 1,
    "msg": "Sucesso"
}
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Inserir Comentários

> Insere comentários do post

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Feed_Insere_Comentario```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/insereComentario
```

##### JSON Parâmetros:

```
{
   loginUsuario: 'teylor.alencar',
   texto: 'textoComentario',
   cPost: 1
}
```

##### JSON Retorno: 

```
{
    "resultado": "1",
    "qtdComentario": 3,
    "mensagem": "Sucesso!"
}
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Promover Posts

> Promove Posts

> Caso parâmetro "Promoveu" for true, insere a promoção, Caso contrário, deleta.

##### Tipo Requisição: POST

##### Nomes da procedures: ```dbo.s_WorkMedia_Feed_Insere_Promocao``` e 
```dbo.s_WorkMedia_Feed_Deleta_Promocao```

##### Link Requisição: 

```
http://35.247.231.34:4000/feed/promover
```

##### JSON Parâmetros:

```
{
   "loginUsuario": "teylor.alencar",
   "cPost": 1,
   "promoveu": true
}
```

##### JSON Retorno: 

```
{
    "resultado": "1",
    "qtdPromocao": "1"
}
```

## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar quem Promoveu

> Retorna lista de usuários que promoveram um post.

##### Tipo de Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Quem_Promoveu```

##### Link Requisição:

```
http://35.247.231.34:4000/feed/retornaQuemPromoveu?loginUsuario=teylor.alencar&cPost=150
```

##### JSON Retorno:

```
[
    {
    "codigo":4,
    "nome":"Teylor Alencar",
    "cargoTrabalho":"Fullstack Dev6",
    "urlImagemPerfil":"http://35.247.231.34/NeoMobile/BRT_WorkMedia/imagefiles/09f66079-d22a-4579-bcce-bf4d7b16f53c.jpg"
    },
    {"codigo":6,
    "nome":"TATIANNE DE SOUZA SILVA SARAIVA",
    "cargoTrabalho":"ESPECIALISTA GENTE E CULTURA","urlImagemPerfil":""
    }
]
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Workspaces

> Retorna lista de Workspaces para criação de post.

##### Tipo de Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Workspaces_Usuario```

##### Link Requisição:

```
http://35.247.231.34:4000/feed/retornaWorkspacesUsuario?loginUsuario=teylor.alencar
```

##### JSON Retorno:

```
[
    {
        "value": 2,
        "label": "WORK TESTE"
    },
    {
        "value": 4,
        "label": "Geral"
    }
]
```
##


####   [⬆ Voltar ao topo ⬆](#rotas)

### Visualizar Posts

> Contabiliza Visualização quando o usuário abre um vídeo ou imagem em um post

##### Tipo de Requisição: GET

##### Nome da procedure: ```dbo.s_Visualiza_Post```

##### Link Requisição:

```
http://35.247.231.34:4000/feed/visualizaPost?loginUsuario=teylor.alencar&cPost=150
```

##### JSON Retorno:

```
conferir com teylor e bacalhau depois
```
##

## Rotas Perfil


####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Perfil

> Retorna o perfil do usuário.

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Perfil```

##### Link Requisição: 

```
http://35.247.231.34:4000/perfil/retornaPerfil?loginUsuario=teylor.alencar&usuario=davi.bacalhau
```

##### JSON Retorno: 

```
{
    "nome": "Davi Bacalhau",
    "login": "davi.bacalhau",
    "email": "davi.bacalhau@neosyx.com",
    "telefone": "-",
    "cargo": "Delphi Dev",
    "urlImagemPerfil": "",
    "qtdPosts": 1,
    "qtdSeguindo": 0,
    "qtdSeguidores": 1,
    "seguindo": false
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Perfil Hashtag

> Retorna o perfil de uma hashtag

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Perfil_Hashtag```

##### Link Requisição: 

```
http://35.247.231.34:4000/perfil/retornaPerfilHashtag?loginUsuario=teylor.alencar&cHashtag=10
```

##### JSON Retorno: 

```
{
    "nome": "#vasco"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Perfil Workspace

> Retorna o perfil de uma workspace

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Perfil_Workspace```

##### Link Requisição: 

```
http://35.247.231.34:4000/perfil/retornaPerfilWorkspace?loginUsuario=teylor.alencar&cWorkspace=3
```

##### JSON Retorno: 

```
{
    "nome": "WORK TESTE",
    "descricao: "isto é uma descricao da workspace",
    "urlimagem": "",
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Seguir Usuário

> Segue o perfil do usuário

> Caso parâmetro "Seguiu" for true, Segue o usuário, Caso contrário, deixa de seguir.

##### Tipo Requisição: POST

##### Nomes da procedures: ```dbo.s_WorkMedia_Profile_Insere_Seguidor```
e ```dbo.s_WorkMedia_Profile_Deleta_Seguidor```

##### Link Requisição:

```
http://35.247.231.34:4000/perfil/seguirUsuario
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "usuario": "davi.bacalhau",
    "seguiu": true
}
```

##### JSON Retorno

```
{
    "result": "1",
    "msg": "Sucesso"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Solicita Conexão

> Solicita Conexão de um usuário

> Caso parâmetro "solicitou" for true, Cria a solicitação, Caso contrário, remove.

##### Tipo Requisição: POST

##### Nomes da procedures: ```dbo.s_WorkMedia_Profile_Insere_Solicitacao_Conexao```
e ```dbo.s_WorkMedia_Profile_Deleta_Solicitacao_Conexao_Unica```

##### Link Requisição:

```
http://35.247.231.34:4000/perfil/solicitaConexao
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "usuario": "davi.bacalhau",
    "solicitou": true
}
```

##### JSON Retorno

```
{
    "resultado": "1",
    "mensagem": "Sucesso"
}
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### deleta Conexão

> Deleta conexão entre dois usuários

##### Tipo Requisição: DELETE

##### Nome da procedure: ```dbo.s_WorkMedia_Profile_Deleta_Conexao```

##### Link Requisição:

```
http://35.247.231.34:4000/perfil/deletaConexao
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "usuario": "davi.bacalhau"
}
```

##### JSON Retorno

```
{
    "resultado": "1",
    "mensagem": "Sucesso"
}
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Aceita Solicitação

> Aceita/Rejeita Solicitação de uma conexão do usuário.

> Caso parâmetro "solicitou" for true, Aceita a Solicitação, Caso contrário, rejeita.

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Profile_Aceita_Conexao```
e ```dbo.s_WorkMedia_Profile_Rejeita_Solicitacao_Conexao```

##### Link Requisição:

```
http://35.247.231.34:4000/perfil/aceitaSolicitacao
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "usuario": "davi.bacalhau",
    "solicitou": true
}
```

##### JSON Retorno

```
{
    "resultado": "1",
    "mensagem": "Sucesso"
}
```
## 

## Rotas Administração

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Configuração

> Retorna Configurações do usuário

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Configuracao_Retorna_Perfil_Usuario```

##### Link Requisição: 

```
http://35.247.231.34:4000/administracao/retornaConfiguracoes?loginUsuario=teylor.alencar
```

##### JSON Retorno: 

```
{
    "login":"teylor.alencar",
    "nome":"Teylor Alencar",
    "cargo":"Android/Web Dev",
    "telefone":"-",
    "email":"teylor.alencar@neosyx.com",
    "urlImagemPerfil":"",
    "cEscolaridade":1
    "nomeSocial":"",
    "sobreMim":"",
    "formacao":""
}

```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Editar Configuração

> Edita configurações do usuário

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_Configuracao_Edita_Perfil_Usuario```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/editaConfiguracoes
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "urlImagem": "http://googleimagens.com/cavalo.png",       
    "nome": "Teylor Alencar",
    "cargo": "dev",  
    "telefone": "40028922", 
    "senha": "12345678",
    "novaSenha": "12345678",
    "email": "teylor.alencar@neosyx.com",
    "cEscolaridade":1
    "nomeSocial":"",
    "sobreMim":"",
    "formacao":""
}
```

##### JSON Retorno

```
{
    "result": "1",
    "msg": "Sucesso"
}
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Workspace

> Retorna as Workspaces na plataforma.

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/workspaces/retornaWorkspace?loginUsuario=teylor.alencar&pesquisa=
```


##### JSON Retorno

```
{
    "codigo": 1,
    "nome": "Geral",
    "nomeCriador": "Teylor Alencar",
    "": "16/09/2021",
    "descricao": "-"
}
```
##


####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Usuários da Workspace

> Retorna os usuários de uma Workspace da plataforma.

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_WorkMedia_Retorna_Usuarios_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/workspaces/retornaWorkspaceUsuarios?loginUsuario=teylor.alencar&cWorkspace=2
```


##### JSON Retorno

```
{
    "codigo" : "",
    "urlImagemPerfil" : "",
    "incluso" : 1
}
```

####   [⬆ Voltar ao topo ⬆](#rotas)

### Inserir Workspace

> Cria uma workspace na plataforma

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Insere_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/workspaces/insereWorkspace
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "nome": "Workspace teste 123",
    "urlImagem": "http://googleimagens.com/cavalo.png",       
    "descricao": "teste workspace"
}
```

##### JSON Retorno

```
{
    "result": "1",
    "msg": "Sucesso"
}
```
## 

####   [⬆ Voltar ao topo ⬆](#rotas)

### Alterar Workspace

> Altera uma workspace na plataforma.

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Altera_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/workspaces/alteraWorkspace
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "cWorkspace": "5",
    "nome": "Workspace teste 4567",
    "urlImagem": "http://googleimagens.com/cavalo.png",       
    "descricao": "teste workspace"
}
```

##### JSON Retorno

```
{
    "result": "1",
    "msg": "Sucesso"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Desativar Workspace

> Desativa/ativa uma workspace na plataforma

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Deleta_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/workspaces/desativaWorkspace
```

##### JSON Parâmetros:

```
{
    "loginUsuario": "teylor.alencar",
    "cWorkspace": "7"
}
```

##### JSON Retorno

```
{
    "result": "1",
    "msg": "Sucesso"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Atribuir Usuários

> Atribui um usuário a uma workspace

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_WorkMedia_Atribui_Usuario_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/workspaces/atribuiUsuario
```

##### JSON Parâmetros:

```
{
    "loginUsuario" : "teylor.alencar",
    "cWorkspace" : "2",
    "cLogin" : [4,5,6,7]
}
```

##### JSON Retorno

```
{
    "result": "1",
    "msg": "Sucesso"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Usuários

> Retorna um usuário da plataforma, permitindo alterar ou deletar este usuário através de outras rotas

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Cadastro_Usuario_Retorna_Relatorio_Usuario_BRT_v2```, ```s_WorkMedia_Retorna_Usuarios_Workspace_BRT```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/cadastroUsuarios/retornaUsuario?loginUsuario=teylor.alencar&pesquisa=
```


##### JSON Retorno

```
{
    "cLogin": 1,
    "nome": "Gabriel Quites",
    "login": "gabriel.quites",
    "matricula": null,
    "dataNascimento": null,
    "dataAdmissao": null,
    "email": "gabriel.quites@neosyx.com",
    "telefone": "(21)965490528",
    "cargo": "Gerente de Desenvolvimento",
    "cPerfil": null,
    "cResponsavel": null,
    "cEsteira": null,
    "cArea": null,
    "cStatus": null,
    "urlImagemPerfil": "http://35.247.231.34/NeoMobile/BRT_WorkMedia/imagefiles/9a1df21c-9dea-4191-a8bd-deec9f8a83b5.jpg",
    "cEscolaridade": null
    "nomeSocial" : "",
    "sobreMim" : "",
    "formacao" : ""
}
```
##


####   [⬆ Voltar ao topo ⬆](#rotas)

### Inserir Usuários

> Insere um usuário na plataforma.

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_Cadastro_Usuario_Insere_Usuario_BRT_v2```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/cadastroUsuarios/insereUsuario
```

##### JSON Parâmetros:

```
{ 
    "loginUsuario": "teylor.alencar",
    "nome": "Isaac Oliveira",
    "login": "isaac.oliveira",
    "matricula": null,
    "dataNascimento": null,
    "dataAdmissao": null,
    "email": "isaac.oliveira@neosyx.com",
    "telefone": "(21)912345678",
    "cargo": "Estagiário",
    "cPerfil": null,
    "cResponsavel": null,
    "cEsteira": null,
    "cArea": null,
    "cStatus": null,
    "cEscolaridade" : 1,
    "urlImagemPerfil": "teste",
    "nomeSocial" : "",
    "sobreMim" : "teste 123",
    "formacao" : "técnico"
}
```

##### JSON Retorno

```
{
    "result": 1,
    "msg": "Usuário cadastrado com sucesso!"
}
```
##


####   [⬆ Voltar ao topo ⬆](#rotas)

### Editar Usuários

> Edita os registros de um usuário na plataforma.

##### Tipo Requisição: POST

##### Nome da procedure: ```dbo.s_Cadastro_Usuario_Edita_Usuario_BRT_v2```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/cadastroUsuarios/editaUsuario
```

##### JSON Parâmetros:

```
    { 
        "loginUsuario": "teylor.alencar",
        "cLogin": 15,
        "nome": "Isaac Oliveira",
        "login": "isaac.oliveira",
        "matricula": "-",
        "dataNascimento": "27-05-2003",
        "dataAdmissao": "01-05-2021",
        "email": "teste123@neosyx.com",
        "telefone": "(21)987654321",
        "cargo": "Estagiário",
        "cPerfil": 1,
        "cResponsavel": 1,
        "cEsteira": 1,
        "cArea": 1,
        "cStatus": 1,
        "cEscolaridade" : 1,
        "urlImagemPerfil": "teste.png",
        "nomeSocial" : "",
        "sobreMim" : "teste 123",
        "formacao" : "técnico"
    }
```

##### JSON Retorno

```
{
    "result": 1,
    "msg": "Usuário cadastrado com sucesso!"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Remover Usuários

> Remove os registros de um usuário na plataforma.

##### Tipo Requisição: DELETE

##### Nome da procedure: ```dbo.s_Cadastro_Usuario_Remove_Usuario_BRT_v2```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/cadastroUsuarios/removeUsuario
```

##### JSON Parâmetros:

```
{ 
    "loginUsuario": "teylor.alencar",
    "cLoginUsuario": 15
}
```

##### JSON Retorno

```
{
    "result": 1,
    "msg": "Usuário removido com sucesso!"
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

### Retornar Informacoes Usuário

> Retorna demais informações de um usuário da plataforma.

##### Tipo Requisição: GET

##### Nome da procedure: ```dbo.s_Cadastro_Usuario_Retorna_Escolaridades```, ```dbo.s_Cadastro_Usuario_Retorna_Perfil```, ```dbo.s_Cadastro_Usuario_Retorna_Area```, ```dbo.s_Cadastro_Usuario_Retorna_Responsavel```, ```dbo.s_Cadastro_Usuario_Retorna_Esteira```, ```dbo.s_Cadastro_Usuario_Retorna_Status```

##### Link Requisição:

```
http://35.247.231.34:4000/administracao/retornaListaInformacoes?loginUsuario=teylor.alencar
```


##### JSON Retorno

```
{
   "escolaridade": 1,
   "perfil": 1,
   "area": 1,
   "responsavel": 1,
   "esteira": 1,
   "status": 1,
}
```
##

####   [⬆ Voltar ao topo ⬆](#rotas)

## Rotas Upload

### Realizar Uploads

> Realiza uploads de arquivos

##### Tipo Requisição: POST

##### Link Requisição: 

```
http://35.247.231.34:4000/uploader/upload, ObjUpload
```

##### JSON Parâmetros:

```
Imagem.png, Imagem.jpg, Video.mp4, Video.webm...
```

##### JSON Retorno: 

```
{
    http://35.247.231.34/NeoMobile/WorkMedia/profileimages/BE83FE0B-5884-4FFD-878D-9422EC01E1A0.jpg
}
```

## 







