// 2C = Two of Clubs (Treboles)
// 2D = two od Diamonds (Diamantes)
// 2H = Two of Hearts (Corazones)
// 2S = Two of Spades (Espadas)

//Crar el Array de cartas con cada nombre ABCD y los sumeros del 1 al 10 ademas de las cartas especiales
const miModulo = (() => {
    //El use strict te permite generar mas restricciones, es frecomentable activarlo
    'use strict';


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnStop'),
        btnReset = document.querySelector('#btnReset'),
        points = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');


    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        points.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }

        //Revolvcer el Array
        // console.log(deck);
        // console.log(deck);
        return _.shuffle(deck);
    };



    //Esta funcion permite tomar cartas

    const pedirCarta = () => {
        //SI YA NO HAY CARTAS MANDA ERROR
        if (deck.length === 0) {
            throw 'No hay cartas en el Deck'
        }
        // console.log(deck);
        // console.log(carta);
        return deck.pop();
    };

    // Definir el valor de cada carta
    const valorCarta = (carta) => {
            const valor = carta.substring(0, carta.length - 1);
            return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10 :
                valor * 1

            //MANERA DE HACERLO :
            // console.log(valor);

            // if (isNaN(valor)) {
            //     puntos = (valor === 'A') ? 11 : 10;
            // } else {
            //     puntos = valor * 1;
            // }
            // console.log(puntos);
        }
        // turno 0 = primer jugador , ultimo es la pc
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        points[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `../assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {
            const [puntosMinimos, puntosComputer] = puntosJugadores;
            setTimeout(() => {
                if (puntosComputer === puntosMinimos) {
                    alert('Empate');
                } else if (puntosMinimos > 21) {
                    alert('Gana la IA')
                } else if (puntosComputer > 21) {
                    alert('Jugador gana');
                } else {
                    alert('gana IA');
                }
            }, 100)

        }
        //Turno de la PC
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputer = 0;
        do {
            const carta = pedirCarta();
            puntosComputer = acumularPuntos(carta, puntosJugadores.length - 1)

            crearCarta(carta, puntosJugadores.length - 1);
            // Crear elemento
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `../assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // computadoraCartas.append(imgCarta);
        } while ((puntosComputer < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }



    // const valor = valoraCarta(pedirCarta())
    // console.log({ valor });

    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        // Crear elemento
        crearCarta(carta, 0);
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `../assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // jugadorCartas.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Losser');
            //Inhabilitar un boton  
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Cassi ganas We :V');
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    btnReset.addEventListener('click', () => {

        inicializarJuego();

        // deck = [];
        // deck = crearDeck();

        // puntosJugador = 0;
        // puntosComputer = 0;
        // points[0].innerText = 0;
        // points[1].innerText = 0;

        // computadoraCartas.innerHTML = '';
        // jugadorCartas.innerHTML = '';
        // btnPedir.disabled = false;
        // btnDetener.disabled = false;
    });


    return {
        nuevoJuego: inicializarJuego,
    }
})();