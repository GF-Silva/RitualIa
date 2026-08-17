# API

## Overview

A API conecta o backend flask + database com o frontend.
Url base: <http://localhost:5000/> (No futuro sera  /api/)
Formata as respostas apenas em JSON

## Quick Start

Com o servidor rodando, teste quais rotas existem com:
comando pra rota...

## Referência de cada endpoint

### GET /songs

Retorna todas as músicas que atendam os params

**Parâmetros de Query**
| Nome    | Tipo   | Obrigatório | Descrição               |
|----------------------------------------------------------|
| genre   | str    | Não         | Gênero para buscar      |
| emotion | str    | Não         | Emotion para buscar     |
| limit   | int    | Não         | Tamanho limite de busca |

**Request de exemplo:**

```bash
curl http://localhost:5000/songs?genre=Rock
```

**Responde de sucesso (200):**

``` json
[
  {
    "artist": "Queen",
    "explication_source": "explication_source/we_will_rock_you.wav",
    "id": 25,
    "source_id": "-tJYN-eG1zk",
    "title": "We Will Rock You"
  }
]
```

### GET /songs/genres

Retorna todos os genres salvos no database

**Request de exemplo:**

ADICIONAR LIMITE AQUI

```bash
curl http://localhost:5000/songs/genres
```

**Responde de sucesso (200):**

``` json
[
  [
    1,
    "MPB",
    "genres/mpb.png"
  ],
  [
    2,
    "Sertanejo",
    "genres/sertanejo.png"
  ],
  [
    3,
    "Rock",
    "genres/rock.png"
  ],
]
```

### GET /songs/emotions

Retorna todas emotions salvos no database

**Request de exemplo:**

ADICIONAR LIMITE AQUI

```bash
curl http://localhost:5000/songs/emotions
```

**Responde de sucesso (200):**

``` json
[
  [
    14,
    "Acolhimento"
  ],
  [
    21,
    "Alegria"
  ],
]
```

## Tratamento de erros

O sistema responde erros em JSON na estrutura:

``` json
{
    "error": "nome_do_erro",
    "detail": "menssagem_do_erro"
}

// Exemplo:
{
    "error": "Not Found",
    "detail": "Nenhuma música encontrada pra essa combinação"
}
```
