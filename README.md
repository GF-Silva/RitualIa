<img width="50%" height="auto" alt="image" src="https://github.com/user-attachments/assets/923bc5e8-1a3d-412b-8337-60a48e928c5e" />

[![Demo URL](http://ritualia.duckdns.org/)

# RitualIa - Ritmo, Cultura, Alegria e IA
=========================================================

O Ritualia é um sistema Web desenvolvido para quebrar a bolha músical gerado pelo algoritmo de plataformas de músicas.

**Notice:** This guide was written in portuguese and just portuguese, if u speak another language, please use the translator build-in your browser, appreciate.

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
