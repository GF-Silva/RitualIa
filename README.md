# RitualIa - Ritmo, Cultura, Alegria e IA

[![Demo](https://img.shields.io/badge/Demo-Ver_Projeto-blue?style=for-the-badge&logo=chrome)](http://ritualia.duckdns.org/)
[![English](https://img.shields.io/badge/Language-Open_English-blue?style=for-the-badge&logo=translate)](docs/en/readme_eng.md)

<img width="50%" height="auto" alt="image" src="https://github.com/user-attachments/assets/923bc5e8-1a3d-412b-8337-60a48e928c5e" />

O Ritualia é um sistema Web desenvolvido para quebrar a bolha músical gerado pelo algoritmo de plataformas de músicas.
Teste o acesso em <http://ritualia.duckdns.org/>

## Instalar

Os tutoriais para instalar, presentes para arch, ubuntu e windows, estão em [docs/install.md](docs/install.md)

## Como usar

**Rode com:**

``` Bash
flask --app main.py run
```

**Em um navegador de sua preferencia, acesse:** <http://localhost:5000/>

Com o site aberto, selecione um gênero músical no elemento principal (Cover-flow) com a foto dos gêneros navegando pelos elementos usandos cliques no desejado ou pressione na tela (Com mouse ou touch) para arrastar. Ao clicar em alguma e, na tela aberta, selecione uma emoção desejada. A música será aberta após a seleção.
Esse sistema tem suporte a navegação por teclado, para ativar clique TAB no teclado. Com o elemento principal Cover-flow selecionado, navegue por ele usando as setas da esquerda ou direita do teclado e enter para confirmar a escolha.

## Stack de tecnologias

**Backend:** Python + flask

**Frontend:** HTML + CSS + JS

## Integrações com IA

**Microsoft Azure (TTS):** API usada para gerar o áudio da explicação das músicas dado um texto

**Chatbots:** Foram usados chatbots como claude para tarefas de repetição (Ex: como coletar dados de músicas)

## Links

Documentação da API [docs/API.md](docs/API.md)
