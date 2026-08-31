import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
from slugify import slugify
from pathvalidate import sanitize_filename
import json

# 1. Carrega as variáveis de ambiente e configura o Azure
load_dotenv()

speech_config = speechsdk.SpeechConfig(
    subscription=os.getenv("AZURE_SPEECH_API_KEY"), 
    region="westus2"
)
speech_config.speech_synthesis_voice_name = "pt-BR-Thalita:DragonHDLatestNeural"

def generate_audios(lista_itens: list):
    """
    Processa os itens de uma lista de listas [[nome, conteudo]] e os salva na pasta 'audios'.
    O loop para assim que a lista esvaziar.
    """
    # Cria a pasta 'audios' se ela não existir
    pasta_saida = "audios"
    if not os.path.exists(pasta_saida):
        os.makedirs(pasta_saida)
        print(f"📁 Pasta '{pasta_saida}' criada com sucesso.")

    print(f"🤖 Iniciando processamento de {len(lista_itens)} itens...\n")

    # O loop roda enquanto houver itens na lista principal
    while len(lista_itens) > 0:
        # Remove e retorna a primeira sublista da lista principal
        item = lista_itens.pop(0)
        
        # Validação básica para garantir que o item tem os dois elementos necessários
        if not isinstance(item, list) or len(item) < 2:
            print("⚠️ Item inválido encontrado (deve ser uma lista com [nome, conteudo]). Pulando...")
            continue
            
        # Acessa os dados pelas posições da lista
        nome = item[0]
        conteudo = item[1]
        
        # Define o caminho completo dentro da pasta 'audios'
        caminho_arquivo = os.path.join(pasta_saida, f"{sanitize_filename(slugify(nome, separator="_"))}.wav")
        print(f"🎙️ Gerando áudio para: {nome}...")
        
        # Configura o arquivo de saída
        audio_config = speechsdk.audio.AudioOutputConfig(filename=caminho_arquivo)
        sintetizador = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
        
        # Executa a síntese de forma síncrona
        resultado = sintetizador.speak_text_async(conteudo).get()
        
        # Valida se a geração deu certo
        if resultado.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print(f"✅ Salvo em: {caminho_arquivo}")
        else:
            print(f"❌ Erro ao gerar '{nome}': {resultado.reason}")
        
        print(f"📊 Itens restantes na fila: {len(lista_itens)}\n")

    print("🏁 Todos os itens da lista foram processados. Helper finalizado!")

# --- EXEMPLO DE USO ---
if __name__ == "__main__":
    # Sua lista de dados (estrutura: nome, conteudo)

    musics = []

    with open('musics.json', 'r', encoding='utf-8') as f:
        for music in json.load(f):
            musics += [[f"{music['name']} - {music['author']}", music['content']]]
            
    # Executa o helper passando a lista
    generate_audios(musics)