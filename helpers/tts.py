import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
import os

load_dotenv()

# 1. Configura o serviço de voz
speech_config = speechsdk.SpeechConfig(subscription=os.getenv("AZURE_SPEECH_API_KEY"), region="westus2")

# 2. Define a voz (Ex: pt-BR-FranciscaNeural ou pt-BR-AntonioNeural)
# Lista de vozes: https://aka.ms/csspeech/voicenames
speech_config.speech_synthesis_voice_name = "pt-BR-Thalita:DragonHDLatestNeural"

audio_config = speechsdk.audio.AudioOutputConfig(filename="saida.wav")
# 3. Cria o sintetizador (usando a saída de som padrão)
sintetizador = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)


texto = """
Serj Tankian, do System of a Down, nasceu no Líbano e revolucionou o metal alternativo. O hit Toxicity, lançado em 2001, captura o caos urbano e a alienação social daquela era. Musicalmente, a faixa brilha pela alternância entre versos melódicos e refrões explosivos, marcados por guitarras pesadas e batidas sincopadas. Ao abordar a toxicidade das relações humanas, a música tornou-se um hino de angústia e resistência para toda uma geração. Com indicações ao Grammy, o tema consolidou seu legado como um pilar essencial e atemporal do rock moderno.
"""

# 4. Executa a síntese de forma síncrona
sintetizador.speak_text_async(texto).get()
