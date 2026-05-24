import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# 1. Definição da ferramenta de busca
tools = [
    {
        "type": "function",
        "function": {
            "name": "browser_search",
            "description": "Pesquisa informações sobre músicas, artistas e contextos históricos na web.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Termo de busca (ex: 'contexto da música Help Beatles')",
                    }
                },
                "required": ["query"],
            },
        },
    }
]

# 2. Seu System Prompt Criativo
system_prompt = "Curador musical para jovens. Texto narrativo curto (30s/70 words). Use 'browser_search' para fatos. Sem templates; varie o foco (letra/história/som) sempre."

def gerar_texto_musical(musica_artista):
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": musica_artista}
    ]

    # Chamada inicial
    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        tools=tools,
        tool_choice="auto", # O modelo decide quando buscar
        temperature=0.85,
        max_tokens=250
    )

    return response.choices[0].message.content

# Exemplo de uso
resultado = gerar_texto_musical("Hype Boy - NewJeans")
print(resultado)