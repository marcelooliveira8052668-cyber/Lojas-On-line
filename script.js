let carrinho = [];
let totalBase = 0;

// Adiciona o produto à lista e atualiza o total base
function adicionar(nome, preco, categoria) {
    carrinho.push({ nome, preco, categoria });
    totalBase += preco;
    atualizarInterfaceCarrinho();
}

// Atualiza a lista visual na tela
function atualizarInterfaceCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    lista.innerHTML = "";

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
    });

    document.getElementById("total").innerText = totalBase.toFixed(2);
}

// Faz os cálculos de impostos e descontos
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione itens ao carrinho primeiro!");
        return;
    }

    let valorComTaxas = 0;
    let totalTaxas = 0;

    // 1. Calcula taxas individuais por categoria
    carrinho.forEach(item => {
        let porcentagemTaxa = 0;
        
        if (item.categoria === "ELETRONICO") porcentagemTaxa = 0.15;
        if (item.categoria === "VESTUARIO") porcentagemTaxa = 0.05;
        if (item.categoria === "ALIMENTO") porcentagemTaxa = 0;

        let taxaItem = item.preco * porcentagemTaxa;
        totalTaxas += taxaItem;
        valorComTaxas += item.preco + taxaItem;
    });

    // 2. Lógica do Cupom (SÓ desconta se marcar SIM e total for > 100)
    let temCupom = document.getElementById("cupom").value === "sim";
    let desconto = 0;

    if (temCupom && valorComTaxas < 100) {
        desconto = 10;
    }

    let valorFinal = valorComTaxas - desconto;

    // 3. Mostra o bloco de resultado com os valores
    exibirResultado(totalBase, totalTaxas, desconto, valorFinal);
}

// Preenche as informações no HTML
function exibirResultado(base, taxas, desc, final) {
    const divRes = document.getElementById("resultado");
    divRes.style.display = "block";

    document.getElementById("precoFinal").innerText = `Produtos: R$ ${base.toFixed(2)}`;
    document.getElementById("taxasFinal").innerText = `Impostos (+): R$ ${taxas.toFixed(2)}`;
    document.getElementById("descontoFinal").innerText = `Desconto (-): R$ ${desc.toFixed(2)}`;
    document.getElementById("valorTotalFinal").innerText = `Total a Pagar: R$ ${final.toFixed(2)}`;
}

// Zera o carrinho para uma nova compra
function limparCarrinho() {
    carrinho = [];
    totalBase = 0;
    atualizarInterfaceCarrinho();
    document.getElementById("resultado").style.display = "none";
    alert("Carrinho limpo! Pode escolher novos produtos.");
}
