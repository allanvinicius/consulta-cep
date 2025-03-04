# 📌 Consulta de Endereços via CEP

## 📋 Sobre o Projeto

Este projeto é uma aplicação em **React com TypeScript** que permite ao usuário consultar endereços via **API do ViaCEP**, armazená-los localmente e listá-los. A aplicação também implementa um sistema de cache para evitar requisições desnecessárias.

---

## 🚀 Tecnologias Utilizadas

- React com TypeScript
- Tailwind CSS para estilização
- localStorage para persistência de endereços

---

## 🛠 Instalação e Execução

### 🔧 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- npm (gerenciador de pacotes do Node.js)

### 📦 Instalando as dependências

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse o diretório do projeto
cd consulta-cep

# Instale as dependências
npm install
```

### ▶️ Executando o projeto

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# O projeto estará disponível em http://localhost:5173
```

---

## 🤔 Decisões Técnicas

### 📌 Consulta ao ViaCEP

A aplicação consome a API pública do [ViaCEP](https://viacep.com.br/ws/) para obter informações de endereço a partir do CEP inserido pelo usuário.

### 📌 Persistência de Dados

Os endereços consultados são armazenados no **localStorage**, permitindo que fiquem disponíveis mesmo após o recarregamento da página.

### 📌 Implementação de Cache

Para evitar consultas desnecessárias à API do ViaCEP, a aplicação verifica se um CEP já foi buscado anteriormente e, caso positivo, reutiliza os dados salvos no cache local.

### 📌 Estilização

Utilizamos **Tailwind CSS** para garantir um design responsivo e modular.

---

## 📄 Licença

Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.
