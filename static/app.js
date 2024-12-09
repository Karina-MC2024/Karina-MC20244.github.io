const COCOMO_CONSTANTS = {
    organico: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
    semi_aplicado: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
    acoplado: { a: 3.6, b: 1.20, c: 2.5, d: 0.32 },
};

document.getElementById("calcular").addEventListener("click", () => {
    const entrada = parseFloat(document.getElementById("entrada").value);
    const salida = parseFloat(document.getElementById("salida").value);
    const factorOrganico = parseFloat(document.getElementById("factor_organico").value);
    const factorSemiAplicado = parseFloat(document.getElementById("factor_semi_aplicado").value);
    const factorAcoplado = parseFloat(document.getElementById("factor_acoplado").value);
    const tipoProyecto = document.getElementById("tipo_proyecto").value;
    const salario = parseFloat(document.getElementById("salario").value);

    if (!entrada || !salida || !factorOrganico || !factorSemiAplicado || !factorAcoplado || !salario) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const total = entrada + salida;
    let ldc;

    if (tipoProyecto === "organico") ldc = factorOrganico * total;
    else if (tipoProyecto === "semi_aplicado") ldc = factorSemiAplicado * total;
    else ldc = factorAcoplado * total;

    const mldc = ldc / 1000;
    const { a, b, c, d } = COCOMO_CONSTANTS[tipoProyecto];
    const esfuerzo = a * Math.pow(mldc, b);
    const td = c * Math.pow(esfuerzo, d);
    const cp = Math.round(esfuerzo / td);
    const p = Math.round(ldc / esfuerzo);
    const costo = (esfuerzo * salario).toFixed(2);
    const costoLdc = (costo / ldc).toFixed(2);

    document.getElementById("resultados").style.display = "block";
    document.getElementById("total").innerText = total;
    document.getElementById("ldc").innerText = ldc;
    document.getElementById("mldc").innerText = mldc.toFixed(2);
    document.getElementById("esfuerzo").innerText = `${Math.round(esfuerzo)} PERSONAS MES`;
    document.getElementById("td").innerText = `${Math.round(td)} MESES DE TRABAJO`;
    document.getElementById("cp").innerText = `${cp} PERSONAS`;
    document.getElementById("p").innerText = `${p} LDC CADA MES`;
    document.getElementById("costo").innerText = `${costo}`;
    document.getElementById("costo_ldc").innerText = `${costoLdc}`;
});
