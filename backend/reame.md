# TODO: Ver quantas vezes a msc foi acessada (feito)
# TODO: Ver o tempo atual e final da musica (feito)
# TODO: Suporte a selecionar temas da musica

Micro Sd de 32GB

Waveshare 15.6inch HDMI LCD (H) 1920x1080 Touch

Alto falantes

Fontes de energia

Cabo Micro-HDMI (Type D) macho → HDMI Type A macho

# Tabela de requisições (feito)
| - Relacional
# Tabela de estilos (feito)

# Adicionar uma descricao de cada func, rota e class
* Estrutura:
@router.get('/get-music-access', summary="Retorna o número de acessos de uma música")
def get_music_access(music_id: int):
    """Retorna o total de acessos de uma música pelo seu ID."""
    return database.get_music_access(music_id)