let numJogadas = 0;
let numDiscos = 3;
let timer;
let startTime;
let isTimerRunning = false;

// Função para criar as torres de Hanói na página
function criarTorres() {
    numJogadas = 0;
    document.getElementById('contadorJogadas').innerText = numJogadas;

    resetTimer();

    const torreA = document.getElementById('torreA');
    const torreB = document.getElementById('torreB');
    const torreC = document.getElementById('torreC');

    torreA.innerHTML = '';
    torreB.innerHTML = '';
    torreC.innerHTML = '';

    // Inicializa a torre A com os discos
    for (let i = numDiscos; i > 0; i--) {
        const disco = document.createElement('div');
        disco.className = `disco disco-${i}`;
        disco.draggable = true;
        torreA.appendChild(disco);
    }

    // Adiciona eventos de arrastar e soltar
    const torres = [torreA, torreB, torreC];
    torres.forEach(torre => {
        torre.addEventListener('dragover', permitirSoltar);
        torre.addEventListener('drop', soltarDisco);
    });

    const discos = document.querySelectorAll('.disco');
    discos.forEach(disco => {
        disco.addEventListener('dragstart', arrastarDisco);
    });

    document.getElementById('reiniciarJogo').style.display = 'none';
}

// Funções de arrastar e soltar
let discoArrastado = null;

function arrastarDisco(event) {
    discoArrastado = event.target;

    // Iniciar o timer na primeira vez que um disco for arrastado
    if (!isTimerRunning) {
        startTimer();
        isTimerRunning = true;
    }
}

function permitirSoltar(event) {
    event.preventDefault(); // Necessário para permitir soltar
}

function soltarDisco(event) {
    event.preventDefault();
    const torreDestino = event.target.closest('.torre');
    const discoTopo = torreDestino.lastElementChild;

    // Verifica se a torre está vazia ou se o disco a ser movido é menor que o disco do topo
    if (!discoTopo || discoArrastado.clientWidth < discoTopo.clientWidth) {
        torreDestino.appendChild(discoArrastado); // Move o disco para a nova torre
        discoArrastado = null;

        numJogadas++;
        document.getElementById('contadorJogadas').innerText = numJogadas;

        // Verifica se o jogo foi vencido
        verificarVitoria();
    }
}

function verificarVitoria() {
    const torreC = document.getElementById('torreC');
    if (torreC.childElementCount === numDiscos) {
        alert(`Parabéns! Você venceu o jogo em ${numJogadas} jogadas e ${formatTime(Date.now() - startTime)}!`);
        document.getElementById('reiniciarJogo').style.display = 'block';
        clearInterval(timer); // Para o timer
    }
}

// Função para iniciar o timer
function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        document.getElementById('timer').innerText = formatTime(elapsedTime);
    }, 1000);
}

// Função para formatar o tempo (mm:ss)
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Função para resetar o timer
function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer').innerText = '00:00';
    isTimerRunning = false;
}

// Inicializa o jogo com o número selecionado de discos
document.getElementById('iniciarJogo').addEventListener('click', () => {
    numDiscos = parseInt(document.getElementById('numDiscos').value);
    criarTorres();
});

// Reinicia o jogo
document.getElementById('reiniciarJogo').addEventListener('click', () => {
    criarTorres();
});

// Inicializa o jogo pela primeira vez com 3 discos
criarTorres();