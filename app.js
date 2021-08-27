const seletores = {
    mensagemErro: document.querySelector("#mensagemErro"),
    cepbusca: document.querySelector("#cep"),
    logradouro: document.querySelector("#logradouro"),
    bairro: document.querySelector("#bairro"),
    localidade: document.querySelector("#localidade"),
    uf: document.querySelector("#uf"),
    btnBuscar: document.querySelector("#botao_buscar"),
    btnLimpar: document.querySelector("#botao_limpar"),
    btnSalvar: document.querySelector("#botao_salvar"), 
} 
const { mensagemErro , cepbusca , logradouro , bairro , localidade , uf , btnBuscar , btnLimpar , btnSalvar } = seletores;
let endereco;


btnBuscar.addEventListener('click', (e) => {
    e.preventDefault(); 
    try{
        validaCEP();
    }catch(erro){
        mensagemErro.innerHTML = erro.message;
    }
});

btnLimpar.addEventListener('click', () => {
    limparCampos();
});

btnSalvar.addEventListener('click', () => {
    alert("Dados salvos com sucesso!!!");
    limparCampos();
});

function preencheCampos(endereço){
    for(const campo in endereço){
        if(document.querySelector('#' + campo)){
            document.querySelector('#' + campo).value = endereço[campo];
        };
    };
};

function buscaEndereco(){
    fetch(`https://viacep.com.br/ws/${cepbusca.value}/json/`)
        .then((resposta)=>{
            return resposta.json();
        })
        .then((endereço)=>{
            preencheCampos(endereço);
        })
        .catch((erro)=>{
            console.error(erro);
        })
};

function validaCEP(){
    const regex = /^\d{8}$/
    if(regex.test(cepbusca.value)){
        buscaEndereco();
    }else {
        throw new Error('Cep invalido!')
    }
};

function limpaCampos(){
    cepbusca.value = "";
    logradouro.value = "";
    bairro.value = "";
    localidade.value = "";
    uf.value = "";
    mensagemErro.innerHTML = "";
};



