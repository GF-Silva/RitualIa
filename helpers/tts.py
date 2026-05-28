import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
import os

load_dotenv()

# 1. Configura o serviço de voz
speech_config = speechsdk.SpeechConfig(subscription=os.getenv("AZURE_SPEECH_API_KEY"), region="westus2")

# 2. Define a voz (Ex: pt-BR-FranciscaNeural ou pt-BR-AntonioNeural)
# Lista de vozes: https://aka.ms/csspeech/voicenames
speech_config.speech_synthesis_voice_name = "pt-BR-Thalita:DragonHDLatestNeural"

nome = input("Digite o nome da música: ")
audio_config = speechsdk.audio.AudioOutputConfig(filename=f"{nome}.wav")
# 3. Cria o sintetizador (usando a saída de som padrão)
sintetizador = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

texto = input("Digite o conteudo do texto: ")

# 4. Executa a síntese de forma síncrona
sintetizador.speak_text_async(texto).get()
