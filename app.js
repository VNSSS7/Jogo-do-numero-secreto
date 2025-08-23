let listaDeNumerosSorteados = [];
let numerolimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, Texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = Texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(Texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "JOGO DO NUMERO ALEATORIO");
    exibirTextoNaTela("p", "ESCOLHA ENTRE UM NUMERO DE 1 A 10!");
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector("input").value;
    
    if(chute == numeroAleatorio) {
        exibirTextoNaTela("h1", "ACERTOU!!!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemtentativas = `Parabens! Voce acertou o numero secreto com ${tentativas} ${palavraTentativa}!!!!`;
        exibirTextoNaTela("p", mensagemtentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if(chute>numeroAleatorio) {
            exibirTextoNaTela("p", "O numero secreto é menor!!");
        } else {
            exibirTextoNaTela("p", "O numero secreto é maior!!");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numerolimite + 1);
    let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;
    
    if(quantidadeDeNumerosNaLista == 3) {
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true)
}