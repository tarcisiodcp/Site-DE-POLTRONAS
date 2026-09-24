# Landing Page — Locação de Poltronas para Pós-Operatório

Projeto estático em HTML5, CSS3 e JavaScript puro.

## Estrutura

- `index.html` — estrutura semântica da página.
- `css/style.css` — identidade visual, layout e responsividade.
- `js/script.js` — configurações da empresa, WhatsApp, menu mobile e galeria.
- `images/products/` — imagens dos produtos.
- `images/logo/` — logotipo.
- `images/testimonials/` — fotos de depoimentos, se houver autorização.
- `images/backgrounds/` — imagens auxiliares.
- `README.md` — este documento.

## Configuração rápida

Abra `js/script.js` e altere o objeto `COMPANY`:

```js
const COMPANY = {
  name: "Nome da empresa",
  phone: "",
  whatsapp: "55XXXXXXXXXXX",
  address: "Endereço não informado",
  city: "Cidade/UF não informado",
  hours: "Horário não informado",
  instagram: ""
};
```

### WhatsApp

- `whatsapp`: número completo com código do país e DDD, somente números.
- `WHATSAPP_MESSAGE`: mensagem inicial pré-preenchida.

O site não cria link de WhatsApp válido enquanto o número permanecer como `55XXXXXXXXXXX`.

## Imagens

Substitua os arquivos:

- `images/products/poltrona-principal.jpg`
- `images/products/poltrona-eletrica.jpg`
- `images/products/poltrona-lift.jpg`
- `images/products/poltrona-premium.jpg`

As imagens devem ser fotografias reais ou imagens devidamente licenciadas. Evite inserir textos, selos ou especificações nas próprias fotos.

## Depoimentos

A área de prova social está deliberadamente sem avaliações fictícias. Antes da publicação:

1. cadastre somente avaliações reais;
2. mantenha a fidelidade ao texto original;
3. informe a fonte quando apropriado;
4. use foto e nome somente com autorização.

## Produtos

Para adicionar ou editar modelos, altere os cards de produto no `index.html` e o array `GALLERY` no `js/script.js`.

Não adicione especificações técnicas que não tenham sido confirmadas pela empresa.

## Cores

As principais variáveis estão no início de `css/style.css`, dentro de `:root`:

- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-background`
- `--color-text`
- `--color-muted`

## SEO

Antes de publicar, ajuste:

- `<title>`
- meta description
- Open Graph
- textos de cidade/região
- URLs reais de Política de Privacidade e Termos de Uso
- imagens e respectivos `alt`

## Checklist antes de colocar no ar

- [ ] Nome da empresa
- [ ] Telefone
- [ ] WhatsApp
- [ ] Endereço
- [ ] Cidade/UF
- [ ] Horário de atendimento
- [ ] Instagram
- [ ] Imagens reais/licenciadas
- [ ] Modelos e características confirmados
- [ ] Área de atendimento confirmada
- [ ] Higienização descrita conforme procedimento real
- [ ] Entrega/instalação confirmadas
- [ ] Formas de pagamento confirmadas
- [ ] Depoimentos reais
- [ ] Política de Privacidade
- [ ] Termos de Uso
- [ ] Teste dos links de WhatsApp
- [ ] Teste em celular
- [ ] Teste de teclado e foco
- [ ] Revisão final de ortografia

## Observação

O projeto foi estruturado para não inventar preço, endereço, telefone, CNPJ, certificações, quantidade de clientes ou avaliações. Os campos dependentes da operação real ficam editáveis.
