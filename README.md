# RitualIa

## 🛠️ Stack de Tecnologias

### Backend - FastAPI + Python
**FastAPI** é um framework web moderno para construir APIs REST com Python.

**Por que FastAPI?**
- ⚡ **Alta Performance**: Uma das frameworks mais rápidas do Python, comparável a Node.js e Go
- 📚 **Documentação Automática**: Gera automaticamente documentação interativa (Swagger UI) em `/docs`
- ✅ **Type Hints Nativos**: Suporte integrado a type hints do Python para validação automática de dados
- 🔍 **Validação de Dados**: Usa Pydantic para validar entrada de dados automaticamente
- 🚀 **Async/Await**: Suporte nativo a requisições assíncronas para melhor performance
- 📖 **Comunidade Ativa**: Comunidade crescente com muito suporte

**Alternativas Consideradas:**
- Flask: Mais leve, mas requer mais código manual e menos features built-in
- Django: Muito pesado para uma API simples, melhor para aplicações full-stack
- Fastapi foi escolhido por ser o balanço perfeito entre performance, facilidade e features

### Frontend - Flask + Python
**Flask** é um microframework web leve para construir aplicações web com Python.

**Por que Flask?**
- 🪶 **Leve e Minimalista**: Perfeito para aplicações simples com interface web
- 🎨 **Flexível**: Deixa você escolher as ferramentas que quer usar
- 📝 **Fácil de Aprender**: Sintaxe simples e direta
- 🔗 **Integração com Backend**: Mantém a stack Python unificada
- 📦 **HTML/CSS/JavaScript Nativo**: Renderiza templates HTML tradicional

**Alternativas Consideradas:**
- React/Vue.js: Mais complexo, requer build tools e separação de linguagens
- Streamlit: Mais orientado para data science, não ideal para design customizado
- Flask foi escolhido para manter simplicidade e usar Python em todo o projeto

### Banco de Dados - MySQL
**MySQL** é um sistema gerenciador de banco de dados relacional.

**Por que MySQL?**
- 🔒 **ACID Compliance**: Garante integridade dos dados com transações
- 📊 **Relacionamentos**: Suporta chaves estrangeiras para dados estruturados
- ⚙️ **Amplamente Usado**: Tecnologia consolidada e confiável
- 💰 **Open Source**: Gratuito e com comunidade grande
- 🚀 **Performance**: Bom desempenho para aplicações de médio porte

**Alternativas Consideradas:**
- PostgreSQL: Mais robusto, mas overkill para este projeto
- MongoDB: NoSQL, não ideal para dados estruturados e relacionados
- SQLite: Bom para prototipagem, mas não escalável para produção
- MySQL foi escolhido pelo balanço entre simplicidade, performance e confiabilidade

### Package Manager - UV
**UV** é um gerenciador de pacotes Python super rápido, escrito em Rust.

**Por que UV?**
- ⚡ **10-100x Mais Rápido**: Muito mais rápido que pip e Poetry
- 🔒 **Lock File Determinístico**: Garante reprodutibilidade entre ambientes
- 📦 **Compatibilidade Total**: Funciona com PyPI e requirements.txt
- 🛠️ **Virtual Environment Integrado**: Cria e gerencia venv automaticamente
- 🚀 **Performance**: Implementado em Rust para máxima velocidade

**Alternativas Consideradas:**
- Pip: Padrão, mas mais lento e menos features
- Poetry: Bom, mas mais lento que UV
- UV foi escolhido pela velocidade e experiência do desenvolvedor

---

## 🚀 Como Rodar

### Backend
```bash
cd backend
uv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
uv sync
fastapi dev main.py
```
Acesse: `localhost:8000/docs`

### Frontend
```bash
cd frontend
uv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
uv sync
python app/main.py
```
Acesse: `localhost:5000` (importante abrir em localhost para o embed funcionar)

---

## 📋 Requisitos do Sistema
- Python >= 3.14
- MySQL
- Navegador moderno

---

## 🎯 Resumo Técnico
- **Backend API**: FastAPI (Python) + MySQL
- **Frontend Web**: Flask (Python)
- **Package Manager**: UV
- **Arquitetura**: Client-Server com API REST
