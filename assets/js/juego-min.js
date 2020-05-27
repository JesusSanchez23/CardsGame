const miModulo = (() => {
    "use strict";
    let e = [];
    const t = ["C", "D", "H", "S"],
        n = ["A", "J", "Q", "K"];
    let r = [];
    const s = document.querySelector("#btnPedir"),
        a = document.querySelector("#btnStop"),
        l = document.querySelector("#btnReset"),
        o = document.querySelectorAll("small"),
        c = document.querySelectorAll(".divCartas"),
        d = (t = 2) => {
            e = i(), r = [];
            for (let e = 0; e < t; e++) r.push(0);
            o.forEach(e => e.innerText = 0), c.forEach(e => e.innerText = ""), s.disabled = !1, a.disabled = !1
        },
        i = () => {
            e = [];
            for (let n = 2; n <= 10; n++)
                for (let r of t) e.push(n + r);
            for (let r of t)
                for (let t of n) e.push(t + r);
            return _.shuffle(e)
        },
        u = () => { if (0 === e.length) throw "No hay cartas en el Deck"; return e.pop() },
        f = (e, t) => (r[t] = r[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), o[t].innerText = r[t], r[t]),
        h = (e, t) => {
            const n = document.createElement("img");
            n.src = `../assets/cartas/${e}.png`, n.classList.add("carta"), c[t].append(n)
        },
        b = e => {
            let t = 0;
            do {
                const e = u();
                t = f(e, r.length - 1), h(e, r.length - 1)
            } while (t < e && e <= 21);
            (() => {
                const [e, t] = r;
                setTimeout(() => { t === e ? alert("Empate") : e > 21 ? alert("Gana la IA") : t > 21 ? alert("Jugador gana") : alert("gana IA") }, 100)
            })()
        };
    return s.addEventListener("click", () => {
        const e = u(),
            t = f(e, 0);
        h(e, 0), t > 21 ? (console.warn("Losser"), s.disabled = !0, a.disabled = !0, b(t)) : 21 === t && (console.warn("Cassi ganas We :V"), a.disabled = !0, s.disabled = !0, b(t))
    }), a.addEventListener("click", () => { s.disabled = !0, a.disabled = !0, b(r[0]) }), l.addEventListener("click", () => { d() }), { nuevoJuego: d }
})();