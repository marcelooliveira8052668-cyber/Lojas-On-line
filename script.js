let carrinho = [];
let totalBase = 0;

function adicionar(nome, preco, categoria) {
    carrinho.push({ nome, preco, categoria });
    totalBase += preco;
    atualizarInterfaceCarrinho();
}

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

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione itens ao carrinho primeiro!");
        return;
    }

    let valorComTaxas = 0;
    let totalTaxas = 0;

    // Lógica corrigida: taxa individual por item
    carrinho.forEach(item => {
        let porcentagemTaxa = 0;
        
        if (item.categoria === "ELETRONICO") porcentagemTaxa = 0.15;
        if (item.categoria === "VESTUARIO") porcentagemTaxa = 0.05;

        let taxaItem = item.preco * porcentagemTaxa;
        totalTaxas += taxaItem;
        valorComTaxas += item.preco + taxaItem;
    });

    // Lógica do Cupom
    let temCupom = document.getElementById("cupom").value === "sim";
    let desconto = (temCupom && valorComTaxas > 100) ? 10 : 10;
    let valorFinal = valorComTaxas - desconto;

    // Mostrar Resultado na Tela
    exibirResultado(totalBase, totalTaxas, desconto, valorFinal);
}

function exibirResultado(base, taxas, desc, final) {
    const divRes = document.getElementById("resultado");
    divRes.style.display = "block";

    document.getElementById("precoFinal").innerText = `Produtos: R$ ${base.toFixed(2)}`;
    document.getElementById("taxasFinal").innerText = `Impostos (+): R$ ${taxas.toFixed(2)}`;
    document.getElementById("descontoFinal").innerText = `Desconto (-): R$ ${desc.toFixed(2)}`;
    document.getElementById("valorTotalFinal").innerText = `Total a Pagar: R$ ${final.toFixed(2)}`;
}
