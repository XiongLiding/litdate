module.exports = (date = new Date()) => {
    if (typeof date == "number") {
        date = new Date(date);
    }

    const DAY = 86400000;

    const zero = n => `0${n}`.substr(-2);

    const weekdateoffset = date0101 => {
        const N = date0101.getDay();
        const offset = N <= 4 ? N - 1 : N - 8;
        return offset;
    };

    const j = date.getDate();
    const d = zero(j);
    const w = date.getDay();
    const N = w == 0 ? 7 : w;
    let date0101 = new Date(date.getTime());
    date0101.setMonth(0);
    date0101.setDate(1);
    const z = (date.getTime() - date0101.getTime()) / DAY;
    const Z = z + 1;

    const n = date.getMonth() + 1;
    const m = zero(n);

    const Y = date.getFullYear();
    const y = `${Y}`.substr(2);
    const L = (Y % 4 == 0 && Y % 100 != 0) || Y % 400 == 0 ? 1 : 0;
    const t = [31, 28 + L, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];

    const tsMonday = date.getTime() - (N - 1) * DAY;
    const tsFirstMonday = date0101.getTime() - weekdateoffset(date0101) * DAY;

    let W = (tsMonday - tsFirstMonday) / DAY / 7 + 1;
    let o = new Date(tsMonday).getFullYear();
    if (W == 0) {
        let prev0101 = new Date(date0101.getTime());
        prev0101.setYear(o);
        const tsPrevFirstMonday =
            prev0101.getTime() - weekdateoffset(prev0101) * DAY;
        W = (tsMonday - tsPrevFirstMonday) / DAY / 7 + 1;
    } else {
        const next0101 = new Date(
            Math.round(date0101.getTime() + DAY * (365 + L))
        );
        const tsNextFirstMonday =
            next0101.getTime() - weekdateoffset(next0101) * DAY;
        if (tsMonday >= tsNextFirstMonday) {
            W = 1;
            o = Y + 1;
        }
    }
    const e = W;
    W = zero(W);

    const G = date.getHours();
    const g = G % 12 ? G % 12 : 12;
    const H = zero(G);
    const h = zero(g);
    const a = G > 11 ? "pm" : "am";
    const A = G > 11 ? "PM" : "AM";
    const I = date.getMinutes();
    const i = zero(I);
    const S = date.getSeconds();
    const s = zero(S);

    const obj = {
        d,
        j,
        N,
        w,
        z,
        Z,
        W,
        e,
        m,
        n,
        t,
        L,
        o,
        Y,
        y,
        a,
        A,
        g,
        G,
        h,
        H,
        i,
        I,
        s,
        S
    };

    obj.format = str =>
        str
            .split("")
            .map(a => (typeof obj[a] != "undefined" ? obj[a] : a))
            .join("");

    return obj;
};
