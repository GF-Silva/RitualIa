import requests
from slugify import slugify
from pathvalidate import sanitize_filename

musicas = [
    ("Dias de Luta, Dias de Glória", "Charlie Brown Jr.", "6eEOegzrwJg", "Dias_de_luta_dias_de_gloria_zmfji7.mp3"),
    ("Tempo Perdido", "Legião Urbana", "LqmRIG1plVU", "tempo_perdido_zqc8pw.mp3"),
    ("Por Você", "Barão Vermelho", "JhwJ7_h0i-M", "Por_voce_aplmbg.mp3"),
    ("Andar com Fé", "Gilberto Gil", "kyy4SqIw-EY", "Andar_com_fé_lduoix.mp3"),
    ("Cálice", "Chico Buarque & Gilberto Gil", "9y2xB90A0CY", "Calice_vyxyls.mp3"),
    ("Oceano", "Djavan", "P-lxOj0XpEE", "Oceano_g6rnzn.mp3"),
    ("Amanhã Sei Lá", "Marcos & Belutti", "tu5bpM3CcUw", "Amanha_sei_lá_t3i80f.mp3"),
    ("Romaria", "Renato Teixeira", "OYCS6SJtHvI", "Romaria_v19kxx.mp3"),
    ("Evidências", "Chitãozinho & Xororó", "ePjtnSPFWK8", "evidencias_pqjro3.mp3"),
    ("Apesar de Você", "Chico Buarque", "bGAJlOwUgHY", "Apesar_de_Voc%C3%AA_-_Chico_Buarque_rf3rap.wav"),
    ("Alegria, Alegria", "Caetano Veloso", "he_ghOAXbSM", "Alegria_Alegria_-_Caetano_Veloso_fuke3t.wav"),
    ("Aquele Abraço", "Gilberto Gil", "zFGMLQ3q15c", "Aquele_Abra%C3%A7o_-_Gilberto_Gil_r0iudd.wav"),
    ("O Bêbado e a Equilibrista", "Elis Regina", "oCcREJdgRXM", "O_B%C3%AAbado_e_a_Equilibrista_-_Elis_Regina_nsgks2.wav"),
    ("Coração de Estudante", "Milton Nascimento", "pI734oE7iUw", "Cora%C3%A7%C3%A3o_de_Estudante_-_Milton_Nascimento_pm12ox.wav"),
    ("Blowin’ in the Wind", "Bob Dylan", "MMFj8uDubsE", "Blowin_in_the_Wind_-_Bob_Dylan_dyyhbh.wav"),
    ("We Shall Overcome", "Joan Baez", "nM39QUiAsoM", "We_Shall_Overcome_-_Joan_Baez_t25lyp.wav"),
    ("The Sound of Silence", "Simon & Garfunkel", "NAEppFUWLfc", "The_Sound_of_Silence_-_Simon_Garfunkel_qqgwvo.wav"),
    ("Feeling Good", "Nina Simone", "oHRNrgDIJfo", "Feeling_Good_-_Nina_Simone_vag5zy.wav"),
    ("Imagine", "John Lennon", "VOgFZfRVaww", "Imagine_-_John_Lennon_mgftz5.wav"),
    ("Epitáfio", "Titãs", "cvznde5nc_s", "Epit%C3%A1fio_-_Tit%C3%A3s_ry2m0q.wav"),
    ("Sociedade Alternativa", "Raul Seixas", "CfgYcLBP9lI", "Sociedade_Alternativa_-_Raul_Seixas_eimj8y.wav"),
    ("Alagados", "Os Paralamas do Sucesso", "r6esToXGQJM", "Alagados_-_Os_Paralamas_do_Sucesso_kh4sc0.wav"),
    ("Pro Dia Nascer Feliz", "Barão Vermelho", "sQzT4VObtZs", "Pro_Dia_Nascer_Feliz_-_Bar%C3%A3o_Vermelho_ddbxyy.wav"),
    ("Hey Jude", "The Beatles", "A_MjCqQoLLA", "Hey_Jude_-_The_Beatles_ebnfuk.wav"),
    ("We Will Rock You", "Queen", "-tJYN-eG1zk", "We_Will_Rock_You_-_Queen_syf0tf.wav"),
    ("Sunday Bloody Sunday", "U2", "Iqlzoz_jH3c", "Sunday_Bloody_Sunday_-_U2_v53kzk.wav"),
    ("Another Brick in the Wall", "Pink Floyd", "qs35t2xFqdU", "Another_Brick_in_the_Wall_-_Pink_Floyd_psuohj.wav"),
    ("Smells Like Teen Spirit", "Nirvana", "hTWKbfoikeg", "Smells_Like_Teen_Spirit_-_Nirvana_so9xwr.wav"),
    ("As Rosas Não Falam", "Cartola", "5j3QjEk-6c0", "As_Rosas_N%C3%A3o_Falam_-_Cartola_bqbtuv.wav"),
    ("Com Que Roupa?", "Noel Rosa", "CUo6DLq_F0E", "Com_Que_Roupa_-_Noel_Rosa_tfsny0.wav"),
    ("O Mar Serenou", "Clara Nunes", "drGewMyo00A", "O_Mar_Serenou_-_Clara_Nunes_tjfmiq.wav"),
    ("Canta, Canta Minha Gente", "Martinho da Vila", "X4Tp_TmjHRs", "Canta_Canta_Minha_Gente_-_Martinho_da_Vila_na5lsl.wav"),
    ("Foi um Rio que Passou em Minha Vida", "Paulinho da Viola", "DFBBy0RY8p0", "Foi_um_Rio_que_Passou_em_Minha_Vida_-_Paulinho_da_Viola_zbuzbk.wav"),
    ("Sodade", "Cesária Évora", "ku_WZoTtT8Q", "Sodade_-_Ces%C3%A1ria_%C3%89vora_okornd.wav"),
    ("Pata Pata", "Miriam Makeba", "JBJVVhn7iuo", "Pata_Pata_-_Miriam_Makeba_i6bwoo.wav"),
    ("Chan Chan", "Buena Vista Social Club", "tGbRZ73NvlY", "Chan_Chan_-_Buena_Vista_Social_Club_rxrjz1.wav"),
    ("Clandestino", "Manu Chao", "TyA-oz7lSrc", "Clandestino_-_Manu_Chao_dwi292.wav"),
    ("7 Seconds", "Youssou N'Dour & Neneh Cherry", "wqCpjFMvz-k", "7_Seconds_-_Youssou_N_Dour_Neneh_Cherry_wcwtbe.wav"),
    ("Festa", "Ivete Sangalo", "h2xU3E6kePw", "Festa_-_Ivete_Sangalo_nwmxri.wav"),
    ("Show das Poderosas", "Anitta", "FGViL3CYRwg", "Show_das_Poderosas_-_Anitta_nuwhjl.wav"),
    ("Ainda Bem", "Marisa Monte", "Pmt01TGsGGA", "Ainda_Bem_-_Marisa_Monte_x97aqc.wav"),
    ("Quando Você Passa (Turu Turu)", "Sandy & Junior", "tCvLOhusfwM", "Quando_Voc%C3%AA_Passa_Turu_Turu_-_Sandy_Junior_two2td.wav"),
    ("Heal the World", "Michael Jackson", "BWf-eARnf6U", "Heal_the_World_-_Michael_Jackson_zvd7n3.wav"),
    ("Halo", "Beyoncé", "bnVUHWCynig", "Halo_-_Beyonc%C3%A9_lq1cdf.wav"),
    ("Viva La Vida", "Coldplay", "dvgZkm1xWPE", "Viva_La_Vida_-_Coldplay_hjobaa.wav"),
    ("Someone Like You", "Adele", "hLQl3WQQoQ0", "Someone_Like_You_-_Adele_ab5cus.wav"),
    ("Shape of You", "Ed Sheeran", "JGwWNGJdvx8", "Shape_of_You_-_Ed_Sheeran_ws4hzo.wav"),
    ("Bachianas Brasileiras nº 5", "Heitor Villa||Lobos", "pUCuEd1tjCg", "Bachianas_Brasileiras_n%C2%BA_5_-_Heitor_Villa_Lobos_pl6n4s.wav"),
    ("Odeon", "Ernesto Nazareth", "bEfRtR12Y4k", "Odeon_-_Ernesto_Nazareth_jqxjfw.wav"),
    ("Garota de Ipanema", "Tom Jobim & Vinicius de Moraes", "KJzBxJ8ExRk", "Garota_de_Ipanema_-_Tom_Jobim_Vinicius_de_Moraes_a3rtmj.wav"),
    ("Ode to Joy", "Ludwig van Beethoven", "-kcOpyM9cBg", "Ode_to_Joy_-_Ludwig_van_Beethoven_sicxrr.wav"),
    ("Eine Kleine Nachtmusik", "Wolfgang Amadeus Mozart", "oy2zDJPIgwc", "Eine_Kleine_Nachtmusik_-_Wolfgang_Amadeus_Mozart_ku5h1s.wav"),
    ("What a Wonderful World", "Louis Armstrong", "rBrd_3VMC3c", "What_a_Wonderful_World_-_Louis_Armstrong_eu7gv6.wav"),
    ("Billie Jean", "Michael Jackson", "Zi_XLOBDo_Y", "Billie_Jean_-_Michael_Jackson_jkarwc.wav"),
    ("Like a Prayer", "Madonna", "79fzeNUqQbQ", "Like_a_Prayer_-_Madonna_ac3uef.wav"),
    ("Born This Way", "Lady Gaga", "wV1FrqwZyKw", "Born_This_Way_-_Lady_Gaga_nwwm3w.wav"),
    ("Levitating", "Dua Lipa", "TUVcZfQe-Kw", "Levitating_-_Dua_Lipa_fogdxt.wav"),
    ("Bohemian Rhapsody", "Queen", "fJ9rUzIMcZQ", "Bohemian_Rhapsody_-_Queen_kuigs3.wav"),
    ("Satisfaction", "The Rolling Stones", "nrIPxlFzDi0", "Satisfaction_-_The_Rolling_Stones_qmuipo.wav")
]

for music in musicas:
    explication_source = music[3]

    if "mp3" in explication_source:
        name = sanitize_filename(slugify(music[0], separator="_"))
        filename = f'{name}.mp3'
    else:
        name = sanitize_filename(slugify(music[0], separator="_"))
        filename = f'{name}.wav'
    
    print(f"('{music[0]}', '{music[1]}', '{music[2]}', 'explication_source/{filename}'),")