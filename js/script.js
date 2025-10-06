// ESTADOS DOS BOTÕES
const states = { convertDecimal: false, convertHexadecimal: false, convertOctal: false, convertBinario: false };

// EVENTO PARA CLICAR NOS BOTÕES
const buttons = document.querySelectorAll('.convert-button');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        states[target] = !states[target]; // alterna ativo/inativo
        btn.classList.toggle('active'); // muda estilo visual
    });
});

// FUNÇÃO PRINCIPAL DE CONVERSÃO 
function converter() {
    const inputValue = document.getElementById('inputValue').value; // pega valor do input
    const inputBase = document.getElementById('inputBase').value; // pega base selecionada
    const output = document.getElementById('output');

    // Valida entrada 
    if (!validarEntrada(inputValue, inputBase)) {
        alert('Por favor, insira um número válido para a base selecionada.');
        return;
    }

    // Converte para decimal
    const decimalValue = parseInt(
        inputValue,
        inputBase === 'hexadecimal' ? 16 :
            inputBase === 'octal' ? 8 :
                inputBase === 'binario' ? 2 : 10
    );

    let outputHTML = '';

    // Adiciona resultados conforme botões ativos
    if (states.convertDecimal) outputHTML += `<div class="resultado"><b>Decimal:</b> ${decimalValue}</div>`;
    if (states.convertHexadecimal) outputHTML += `<div class="resultado"><b>Hexadecimal:</b> ${decimalValue.toString(16).toUpperCase()}</div>`;
    if (states.convertOctal) outputHTML += `<div class="resultado"><b>Octal:</b> ${decimalValue.toString(8)}</div>`;
    if (states.convertBinario) outputHTML += `<div class="resultado"><b>Binário:</b> ${decimalValue.toString(2)}</div>`;

    output.style.display = 'block';
    output.innerHTML = outputHTML; // atualiza saída
}

// FUNÇÃO DE VALIDAÇÃO
function validarEntrada(inputValue, inputBase) {
    let validChars = '';
    if (inputBase === 'decimal') validChars = '0123456789';
    else if (inputBase === 'hexadecimal') validChars = '0123456789ABCDEFabcdef';
    else if (inputBase === 'octal') validChars = '01234567';
    else if (inputBase === 'binario') validChars = '01';

    for (let i = 0; i < inputValue.length; i++)
        if (validChars.indexOf(inputValue[i]) === -1) return false;

    return true;
}