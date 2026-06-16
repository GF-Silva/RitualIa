-- Inserção de músicas
INSERT INTO songs (title, artist, source_id, explication_source) VALUES
-- Rock 
('Dias de Luta, Dias de Glória', 'Charlie Brown Jr.', '6eEOegzrwJg', 'Dias_de_luta_dias_de_gloria_zmfji7.mp3'), 
('Tempo Perdido', 'Legião Urbana', 'LqmRIG1plVU', 'tempo_perdido_zqc8pw.mp3'), 
('Por Você', 'Barão Vermelho', 'JhwJ7_h0i-M', 'Por_voce_aplmbg.mp3'), 
-- MPB 
('Andar com Fé', 'Gilberto Gil', 'kyy4SqIw-EY', 'Andar_com_fé_lduoix.mp3'),
('Cálice', 'Chico Buarque & Gilberto Gil', '9y2xB90A0CY', 'Calice_vyxyls.mp3'), 
('Oceano', 'Djavan', 'P-lxOj0XpEE', 'Oceano_g6rnzn.mp3'), 
-- Sertanejo 
('Amanhã Sei Lá', 'Marcos & Belutti', 'tu5bpM3CcUw', 'Amanha_sei_lá_t3i80f.mp3'),
('Romaria', 'Renato Teixeira', 'OYCS6SJtHvI', 'Romaria_v19kxx.mp3'), 
('Evidências', 'Chitãozinho & Xororó', 'ePjtnSPFWK8', 'evidencias_pqjro3.mp3'); 

INSERT INTO genres (name) VALUES
('MPB'),
('Sertanejo'),
('Rock');

INSERT INTO emotions (name) VALUES
('Esperança'),
('Reflexão'),
('Saudade');

INSERT INTO songs_genres (song_id, genre_id) VALUES
-- Rock
(1, 3),
(2, 3),
(3, 3),
-- MPB
(4, 1),
(5, 1),
(6, 1),
-- Sertanejo
(7, 2),
(8, 2),
(9, 2);

INSERT INTO songs_emotions (song_id, emotion_id) VALUES
-- Rock
(1, 1),
(2, 2),
(3, 3),
-- MPB
(4, 1),
(5, 2),
(6, 3),
-- Setanejo
(7, 1),
(8, 2),
(9, 3);

INSERT INTO national_teams(name, anthem_source_id, explication_source) VALUES 
("brasil", "Z7pFwsX6UVc", "Brasil_nsuay7.wav"), 
("canada", "RidIw0OXs9U", "Canada_sbu0lv.wav"), 
("colômbia", "yPSL78YDyZY", "Colombia_ysfnsi.wav"), 
("Espanha", "BsWFAEytD24", "Espanha_rg4xxk.wav"), 
("franca", "YLi5A7BiBVk", "Franca_cstqjd.wav"), 
("Inglaterra", "xianOAFljbs", "Inglaterra_ntug23.wav"), 
("Japão", "tkXDCs8qX8Y", "Japao_rxyuwe.wav"), 
("mexico", "oZkTymsI7eI", "M%C3%A9xico_sw1kiv.wav"), 
("portugal", "DdOEpfypWQA", "Portugal_nmuuhx.wav"), 
("usa", "LroNerBwIV4", "EUA_supfbt.wav"), 
("argentina", "2zJ8UsfLa9I", "Argentina_zyowxx.wav"), 
("alemanha", "-k07t4WsXtU", "Alemanha_za09q8.wav"), 
("holanda", "S1J1St_rU90", "Holanda_c6orvm.wav"); 

INSERT INTO brazilian_songs(name, source_id, explication_source) VALUES
('A Taça do Mundo É Nossa', 'hJAriHOh1Jg', 'A_Ta%C3%A7a_do_Mundo_%C3%89_Nossa_pznbtz.wav'),
('Frevo do Bi', '6z1jZ0oq7mo', 'Frevo_do_Bi_gnmx74.wav'),
('Pra Frente Brasil', 'LbxtNtGlZxE', 'Para_a_Frente_Brasil_mgzbhb.wav'),
('Voa Canarinho Voa', 'FSelnob-HIs', 'Voa_Canarinho_Voa_rw8ia1.wav'),
('Coração Verde e Amarelo', 'vghnSY7IdJg', 'Cora%C3%A7%C3%A3o_Verde_e_Amarelo_ryc65o.wav'),
('La La La (Brasil 2014)', '-befR4wHsjQ', 'La_La_La_Brasil_2014_ttzie9.wav'),
('Mostra tua força', 'VasURheNUOM', 'Mostra_tua_for%C3%A7a_pcct0p.wav'),
('Hino do Penta', 'SS14L3soacs', 'Hino_do_Penta_utngee.wav'),
('País do Futebol', '801gN8_X39E', 'Pa%C3%ADs_do_Futebol_m966ox.wav'),
('A Escola de Feola', 'MELfSGXA9Ds', 'Escola_de_Feola_dprgvv.wav'),
('Waka waka', 'pRpeEdMmmQ0', 'Waka_waka_ok7qg7.wav'),
('Você chegou', '0NXEDQqILUE', 'Voc%C3%AA_chegou_b0had0.wav'),
('Juntos Num Só Ritmo', 'rCy06HY6L_4', 'Juntos_Num_S%C3%B3_Ritmo_vlo1jd.wav'),
('We Are One (Ole Ola)', 'TGtWWb9emYI', 'We_Are_One_Ole_Ola_wpb1x1.wav'),
('Bate no Peito (clipe oficial)', 'lXupnGzEMZs', 'Bate_no_Peito_clipe_oficial_ciz7tz.wav'),
('Essa É a Nossa Copa', 'w2zvtviqAU0', 'Essa_%C3%89_a_Nossa_Copa_usvx7g.wav');
