let listaNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

let tentativas = 1;
function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
exibirMensagemInicial();
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoTela('h1','Acertou!!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoTela('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    }else{
        if(chute > numeroSecreto){
            exibirTextoTela('p','O número secreto é menor!')
        }else{
            exibirTextoTela('p','O númro secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
} 
function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * 10 + 1);
    let quantidadeDeElementosNaLista = listaNumeroSorteado.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumeroSorteado = [];
    }
    if(listaNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroSorteado.push(numeroEscolhido);
        console.log(listaNumeroSorteado);
        return numeroEscolhido;
    }
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);

}
function exibirMensagemInicial() {
    exibirTextoTela('h1','Jogo do número secreto');
    exibirTextoTela('p','Escolha um número entre 1 e 10!!');
}