# ⚡ Ecomobi Garage – Site Institucional

Site institucional da **Ecomobi Garage Veículos Elétricos**, oficina especializada em manutenção de motos e scooters elétricas localizada no Tatuapé, São Paulo.

---

## 📁 Estrutura do Repositório

```
ecomobi-garage/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Todos os estilos
├── js/
│   └── main.js         ← Toda a interatividade
├── images/
│   └── logo.png        ← Logotipo da empresa
└── README.md
```

---

## 🚀 Como publicar no GitHub Pages

### Passo 1 — Criar o repositório no GitHub
1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"**
3. Nome sugerido: `ecomobi-garage` (ou `ecomobigarage.github.io` para URL mais limpa)
4. Deixe como **Public**
5. **Não** marque "Add a README" (já temos um)
6. Clique em **"Create repository"**

### Passo 2 — Fazer upload dos arquivos
**Opção A — Pela interface do GitHub (mais fácil):**
1. Na página do repositório criado, clique em **"uploading an existing file"**
2. Arraste todos os arquivos e pastas de uma vez (`index.html`, `css/`, `js/`, `images/`, `README.md`)
3. Clique em **"Commit changes"**

**Opção B — Via Git (linha de comando):**
```bash
git init
git add .
git commit -m "feat: site Ecomobi Garage"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/ecomobi-garage.git
git push -u origin main
```

### Passo 3 — Ativar o GitHub Pages
1. No repositório, vá em **Settings** (engrenagem)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **"Deploy from a branch"**
4. Em **Branch**, selecione **`main`** e pasta **`/ (root)`**
5. Clique em **Save**
6. Aguarde 1–2 minutos

### Passo 4 — Acessar o site
Seu site ficará disponível em:
```
https://SEU_USUARIO.github.io/ecomobi-garage/
```

> 💡 **Dica:** Se nomear o repositório como `SEU_USUARIO.github.io`, a URL será simplesmente `https://SEU_USUARIO.github.io/`

---

## 🌐 Domínio personalizado (opcional)

Para usar um domínio próprio como `ecomobigarage.com.br`:

1. Compre o domínio (ex: Registro.br, GoDaddy, etc.)
2. Nas configurações DNS do domínio, adicione os registros:
   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   CNAME www SEU_USUARIO.github.io
   ```
3. No GitHub Pages (Settings → Pages), em **Custom domain**, coloque `ecomobigarage.com.br`
4. Marque **"Enforce HTTPS"**

---

## 🔧 Como editar o conteúdo

| O que mudar | Onde editar |
|---|---|
| Textos e seções | `index.html` |
| Cores e layout | `css/style.css` |
| Funções e formulário | `js/main.js` |
| Logo | Substitua `images/logo.png` |
| Número de WhatsApp | Buscar `5511968100730` em todos os arquivos |
| Endereço | Seção `#orcamento` no `index.html` |

---

## 📞 Informações da Empresa

| Campo | Valor |
|---|---|
| Empresa | Ecomobi Garage Veículos Elétricos |
| CNPJ | 40.253.713/0001-81 |
| WhatsApp | (11) 96810-0730 |
| Instagram | @ecomobigarage |
| Endereço | R. Prof. Pedreira de Freitas, 1064 – Tatuapé, SP |
| Horário | Seg–Sex 8h–18h · Sáb 8h–13h |
| Fundação | 2021 |

---

## ✅ Funcionalidades

- [x] Design responsivo (mobile, tablet, desktop)
- [x] Menu hambúrguer para mobile
- [x] Scroll suave entre seções
- [x] Animações de entrada ao rolar
- [x] Formulário de orçamento com validação
- [x] Integração com WhatsApp (formulário → mensagem automática)
- [x] Galeria com lightbox (clique para ampliar)
- [x] Botão flutuante do WhatsApp
- [x] Botão "voltar ao topo"
- [x] SEO básico (meta tags, Open Graph)
- [x] Acessibilidade (aria-labels, roles, navegação por teclado)
- [x] Ano do footer atualizado automaticamente

---

*Feito com ⚡ para o futuro elétrico*
