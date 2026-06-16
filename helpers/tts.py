import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv

# 1. Carrega as variáveis de ambiente e configura o Azure
load_dotenv()

speech_config = speechsdk.SpeechConfig(
    subscription=os.getenv("AZURE_SPEECH_API_KEY"), 
    region="westus2"
)
speech_config.speech_synthesis_voice_name = "pt-BR-Thalita:DragonHDLatestNeural"

def processar_lista_de_audios(lista_itens):
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
        caminho_arquivo = os.path.join(pasta_saida, f"{nome}.wav")
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
    
    lista = [
        ["A Taça do Mundo É Nossa", "Composta dias após o primeiro título brasileiro na Suécia, foi uma celebração espontânea feita por jingleiros da época. Gravada pelos Titulares do Ritmo, caiu imediatamente no gosto popular com seu ritmo de marcha e letra exaltando o futebol-samba."],
        ["Frevo do Bi", "Cantada por Jackson do Pandeiro, um dos maiores nomes do forró e baião. A letra já projetava a vitória antes mesmo do torneio no Chile, citando Didi, Garrincha e Pelé — mesmo com o Rei se lesionando no segundo jogo, o Brasil foi bicampeão."],
        ["Para a Frente Brasil", "Venceu um concurso promovido pela Rede Globo para escolher o hino oficial do escrete no México. Virou o maior símbolo musical da seleção da história — e também foi apropriada pela ditadura militar como propaganda do regime, numa das irônicas tensões da época."],
        ["Voa Canarinho Voa", "Popularizada pelo jogador Júnior, a música acompanhou a campanha do Brasil na Copa de 1982 na Espanha. Embora o Brasil tenha sido eliminado sem perder uma partida (a famosa Tragédia do Sarriá), a canção ficou para sempre ligada àquela geração brilhante de Sócrates, Zico e Falcão."],
        ["Coração Verde e Amarelo", "Composição de Tavito e Aldir Blanc para a Copa dos EUA, onde o Brasil conquistou o tetra após 24 anos de jejum. Com o refrão 'é taça na raça, Brasil!', tornou-se o jingle da Rede Globo mais duradouro da história esportiva — usado até hoje nas transmissões."],
        ["La La La (Brasil 2014)", "Shakira regravou seu hit 'Dare' com nova letra temática de futebol, participação de Carlinhos Brown e clipe com jogadores famosos. Apresentada na cerimônia de encerramento no Maracanã, rivalizou com a música oficial em popularidade dentro e fora do Brasil."],
        ["Mostra tua força", "Música motivacional adotada pelo Itaú como campanha de Copa, que ganhou vida própria entre os torcedores. Voltou em edições seguintes do torneio com versões atualizadas, tornando-se uma das trilhas publicitárias mais duradouras ligadas à seleção brasileira."],
        ["Hino do Penta", "Letrista Aldir Blanc disse, com humor, que assim como o Cafu participou de três finais consecutivas, sua música também entrou em campo. Gravada originalmente pela Aerobanda, o hino acompanhou as finais de 1994, 1998 e 2002, tornando-se trilha do maior ciclo vitorioso da seleção."],
        ["País do Futebol", "MC Guimê e Emicida criaram o hino não-oficial mais querido da Copa em casa. Lançado em 2013, ganhou força com o clipe estrelado por Neymar. A letra toca na relação das periferias com o futebol e os sonhos de ascensão — um retrato genuíno do Brasil real na Copa."],
        ["Escola de Feola", "Composta por Luiz Queiroga em homenagem ao técnico Vicente Feola, que liderou o Brasil ao bicampeonato. A música 'escalava' nominalmente cada jogador da seleção que derrotou a Suécia em Estocolmo — Pelé, Garrincha, Didi e companhia."],
        ["Waka waka ", "Shakira e o grupo sul-africano Freshlyground criaram a música de Copa mais vista de todos os tempos — mais de 3,8 bilhões de visualizações no YouTube. Baseada em um ritmo tradicional camaronês, celebrou a África do Sul como sede e se tornou símbolo de Copa para uma geração inteira."],
        ["Você chegou", "Faixa produzida no contexto da Copa em casa, com clima festivo e celebratório. Circulou nas plataformas e em ações da Copa de 2014, dentro do universo de músicas que tentavam capturar o espírito de receber o mundo no Brasil — um país que vivia ao mesmo tempo euforia e contradições."],
        ["Juntos Num Só Ritmo", "Versão em português do tema oficial da FIFA para 2014, adaptada para o público brasileiro com artistas locais. A letra reforçava a ideia de união global e diversidade cultural que a FIFA buscava projetar no maior evento esportivo do planeta em solo brasileiro."],
        ["We Are One (Ole Ola)", "Música oficial da FIFA para a Copa no Brasil, com Pitbull, Jennifer Lopez e Claudia Leitte. Gerou polêmica pelo destaque pequeno dado a artistas brasileiros. Apresentada na abertura na Arena Corinthians, dominou rádios durante o torneio apesar das críticas."],
        ["Bate no Peito (clipe oficial)", "Música oficial da Seleção para a Copa de 2026 (EUA, México e Canadá), produzida por Papatinho com Ludmilla, João Gomes, Samuel Rosa, Veigh e Zeca Pagodinho — que deu voz ao Penta em 2002. Lançada no evento de convocação de Carlo Ancelotti, une funk, sertanejo, rock e samba numa declaração de orgulho nacional."],
        ["Essa É a Nossa Copa", "Produzida para embalar a atmosfera do Brasil como país-sede. Com refrão de fácil memorização e tom festivo, circulou amplamente em transmissões e eventos promocionais ao longo do torneio, compondo o cenário sonoro da Copa mais aguardada da história recente do país."]
    ]

    
    # Executa o helper passando a lista
    processar_lista_de_audios(lista)