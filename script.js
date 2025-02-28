async function buscaEndereco(cep) {
    var msgErro = document.getElementById('erro');
    msgErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPJson = await consultaCEP.json();
        if (consultaCEPJson.erro) {
            throw Error('CEP não encontrado');
        }
        var cidade = document.getElementById('cidade');
        var logr = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPJson.localidade;
        logr.value = consultaCEPJson.logradouro;
        estado.value = consultaCEPJson.uf;
        bairro.value = consultaCEPJson.bairro;

        return consultaCEPJson;
    } catch (erro){
        msgErro.innerHTML = `<p> Cep inválido.`
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));