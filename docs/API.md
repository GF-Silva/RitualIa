### Rotas

#### GET /songs

Busca as músicas no database que atendam os params passados.
Por default ele pega qualquer música no database, cada param é um filtro (where) adicionado na busca.

#### Casos de erro

**Se ele não encontrar nada para os filtros:**

``` json
{
  "detail": "Nenhuma música encontrada pra essa combinação",
  "error": "Not Found"
}
```

**Se ele não achar a emotion ou genre especificado:**

``` json
{
    "detail": "{param} {Valor do param} não encontrado.",
    "error": "Nome do tipo do erro"
}

// Exemplo de erro
// songs?genre=AlgumGeneroDesconhecido
{
  "detail": "Genero 'AlgumGeneroDesconhecido' nao encontrado.",
  "error": "Not Found"
}
```

#### Params

- genre: str = null     - Nome do gênero para buscar
- emotion: str = null   - Nome da emotion para buscar
- limit: int = 1        - Quantas músicas vai buscar no máximo

#### Testes

``` bash
# Sem params
❯ curl localhost:5000/songs
[
  {
    "artist": "Lady Gaga",
    "explication_source": "explication_source/born_this_way.wav",
    "id": 56,
    "source_id": "wV1FrqwZyKw",
    "title": "Born This Way"
  }
]

# Especificando genre
❯ curl localhost:5000/songs?genre=MPB
[
  {
    "artist": "Marisa Monte",
    "explication_source": "explication_source/ainda_bem.wav",
    "id": 41,
    "source_id": "Pmt01TGsGGA",
    "title": "Ainda Bem"
  }
]

# Especificando emotion
❯ curl localhost:5000/songs?emotion=Paz
[
  {
    "artist": "John Lennon",
    "explication_source": "explication_source/imagine.wav",
    "id": 19,
    "source_id": "VOgFZfRVaww",
    "title": "Imagine"
  }
]

# Especificando emotion + genre
❯ curl localhost:5000/songs?emotion=Rebeldia&genre=Rock
[
  {
    "artist": "Pink Floyd",
    "explication_source": "explication_source/another_brick_in_the_wall.wav",
    "id": 27,
    "source_id": "qs35t2xFqdU",
    "title": "Another Brick in the Wall"
  }
]

```
