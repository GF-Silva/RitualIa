from groq import Groq
import json
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

system_prompt = """
Você é um curador musical que amplia o repertório de jovens e crianças.
Dado o nome de uma música e seu artista, escreva um texto em português
com no máximo 70 palavras sobre ela.

ANTES DE ESCREVER: use web_search para verificar dados reais
(ano de lançamento, álbum, contexto de criação).

REGRAS:
1. Escolha UM ângulo por música: fato histórico, curiosidade de produção,
   significado da letra ou impacto cultural.
2. Varie o ângulo entre músicas — não repita o mesmo tipo de abertura.
3. Nunca comece com o nome do artista ou da música.
4. Evite a estrutura "X foi lançada em Y e fala sobre Z".
5. Tom vibrante e direto — como alguém contando um segredo legal,
   não um professor dando aula.
6. O objetivo é enriquecer quem ouve, não resumir a música.

EXEMPLO DE OUTPUT (para "Thriller" de Michael Jackson):
"Antes de virar o clipe mais famoso da história, essa faixa quase não
teve o solo de Vincent Price — o ator gravou sua parte em menos de uma
hora e achou que o cachê era alto demais para tão pouco trabalho.
Spoiler: valeu cada centavo."
"""

response = client.chat.completions.create(
    model="groq/compound",
    messages=[
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": "Cant Stop - RHCP"
        }
    ],
    temperature=1,
    top_p=1,

)

# Final output
print(response.choices[0].message.content)

# Reasoning + internal tool calls
# print(response.choices[0].message.reasoning)

# Search results from the tool calls
# if response.choices[0].message.executed_tools:
#     print(response.choices[0].message.executed_tools[0].search_results)
