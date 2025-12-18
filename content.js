let observer;

function calcularPontosEHoras() {
    const listas = document.querySelectorAll('[data-testid="list"]');

    listas.forEach(lista => {
        let totalPontos = 0;
        let totalHoras = 0;

        const cartoes = lista.querySelectorAll('[data-testid="card-name"]');

        cartoes.forEach(cartao => {
            // IGNORA cartões filtrados (invisíveis)
            if (cartao.offsetParent === null) return;

            const texto = cartao.innerText.trim();

            // Pontos [n]
            const pontosMatch = texto.match(/\((\d+)\)/);
            if (pontosMatch) {
                totalPontos += parseInt(pontosMatch[1], 10);
            }

            // Horas (n)
            const horasMatch = texto.match(/\[(\d+)\]/);
            if (horasMatch) {
                totalHoras += parseInt(horasMatch[1], 10);
            }
        });

        const tituloLista = lista.querySelector('[data-testid="list-name"]');
        if (!tituloLista) return;

        // Remove contador antigo
        const antigo = tituloLista.querySelector('.trello-points-hours');
        if (antigo) antigo.remove();

        // Cria contador
        const span = document.createElement('span');
        span.className = 'trello-points-hours';
        span.style.marginLeft = '8px';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '12px';
        span.textContent = `🧮${totalPontos} pts  ⏳${totalHoras} h`;

        tituloLista.appendChild(span);
    });
}

// ---- OBSERVER COM CONTROLE ----

function iniciarObserver() {
    observer = new MutationObserver(() => {
        observer.disconnect();

        setTimeout(() => {
            calcularPontosEHoras();
            iniciarObserver();
        }, 300);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Execução inicial
calcularPontosEHoras();
iniciarObserver();
