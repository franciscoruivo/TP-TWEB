var btnnav = document.getElementById('navbtn')
var btnclose = document.getElementById('closebtn')
var z1 = document.getElementById("precozona1")
var z2 = document.getElementById("precozona2")
var z3 = document.getElementById("precozona3")
var d = document.getElementById("resultSimulacao")


z1.addEventListener("mouseover", function(){
    document.getElementById("detalhesZonas1").style.display = "block"
})
z1.addEventListener("mouseout", function(){
    document.getElementById("detalhesZonas1").style.display = "none"
})

z2.addEventListener("mouseover", function(){
    document.getElementById("detalhesZonas2").style.display = "block"
})
z2.addEventListener("mouseout", function(){
    document.getElementById("detalhesZonas2").style.display = "none"
})

z3.addEventListener("mouseover", function(){
    document.getElementById("detalhesZonas3").style.display = "block"
})
z3.addEventListener("mouseout", function(){
    document.getElementById("detalhesZonas3").style.display = "none"
})


//Funcao responsavel pela animacao da navbar 'mobile'
function navbtn() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closebtn(){
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

//Função responsavel pela simulacao do calculo das areas
function calculoZonas() {
/*Variaveis Internas*/
var precozona1 = 1200 //aldeia
var precozona2 = 2000 //vila
var precozona3 = 2500 //cidade

var areaUtil = document.getElementById("areaUtil").value
var idadeImovel = document.getElementById("idadeImovel").value
var tipologia = document.getElementById("tipologia").value
var garagem = document.getElementById("garagem").value
var tpublicos = document.getElementById("tpublicos").value



if(areaUtil == "" || idadeImovel == "default" || tipologia == "default" || garagem == "default" || tpublicos == "default"){
    alert("Por Favor introduza todos os campos!")
}else{

    /*********************************
        Calculo das zonas
        ->Zona1 = aldeia
        ->Zona2 = Vila
        ->Zona3 = Cidade
        
    **********************************/

    var totalZona1 = precozona1*areaUtil*idadeImovel*garagem*tpublicos // Preço total para a Zona1 
    var totalZona2 = precozona2*areaUtil*idadeImovel*garagem*tpublicos // Preço total para a Zona2
    var totalZona3 = precozona3*areaUtil*idadeImovel*garagem*tpublicos // Preço total para a Zona3 

    //Apresenta os dados nas tags html
    document.getElementById("precozona1").innerHTML = totalZona1+" €"
    document.getElementById("precozona2").innerHTML = totalZona2+" €"
    document.getElementById("precozona3").innerHTML = totalZona3+" €"

    document.getElementById("detalhesZonas1").innerHTML = " <hr class='divisao'>"+
    " <b>€/m²:</b><p>"+precozona1+"€</p> "+
    " <b>área:</b><p>"+areaUtil+" m²</p> "+
    "  <b>Tipologia</b><p id='tipologia'>"+tipologia+"</p>"

    document.getElementById("detalhesZonas2").innerHTML = " <hr class='divisao'>"+ 
            " <b>€/m²:</b><p>"+precozona2+"€</p> "+ 
            " <b>área:</b><p>"+areaUtil+" m²</p> "+
            "  <b>Tipologia</b><p id='tipologia'>"+tipologia+"</p>"

    document.getElementById("detalhesZonas3").innerHTML = " <hr class='divisao'>"+
            " <b>€/m²:</b><p>"+precozona3+"€</p> "+
            " <b>área:</b><p>"+areaUtil+" m²</p> "+
            "  <b>Tipologia</b><p id='tipologia'>"+tipologia+"</p>"


    document.getElementById("resultPesquisa").style.display = "block"

    document.getElementById("btn-financiamento").addEventListener("click",function(){selectionFunction(totalZona1,totalZona2,totalZona3)}) 
}

}

function selectionFunction(totalZona1,totalZona2,totalZona3){

//descodificação da value para criar o parametro de chamada da funcao
var selection = document.getElementById("financiamento").value
var parametro = 0

if(selection == "default"){
    alert("Adicione uma zona a sua simulação")
}
if(selection == 1){
    parametro = totalZona1
    

}else if(selection == 2){
    parametro = totalZona2
  

}else if(selection == 3){
    parametro = totalZona3
   
}
financiamento(parametro)

}
//funcao financiamento
function financiamento(preco){
    
var emprestimo = document.getElementById("emprestimo").value
var anos = document.getElementById("anos").value
var meses = anos*12
var entradaInicial = document.getElementById("entrada").value

var spread1 = Math.random() *(0.04 + 0.01)
var spread2 = Math.random() *(0.04 + 0.01)
var spread3 = Math.random() *(0.04 + 0.01)

var taxaJuro1 = 0.05*Math.round(spread1, 2)
var taxaJuro2 = 0.05*Math.round(spread2, 2)
var taxaJuro3 = 0.05*Math.round(spread3, 2)

var consult = emprestimo-entradaInicial

var totalEmprestimo1 = consult+(taxaJuro1*emprestimo)
var totalEmprestimo2 =  consult+(taxaJuro2*emprestimo)
var totalEmprestimo3 =  consult+(taxaJuro3*emprestimo)

var valorMensal1 = totalEmprestimo1/meses
var valorMensal2 = totalEmprestimo2/meses
var valorMensal3 = totalEmprestimo3/meses 


document.getElementById("s1").innerHTML = "<hr class='divisao'>"+
" <p><b>Valor da casa:&nbsp;</b>"+preco+"€</p> "+
" <p><b>Montante do Emprestimo:&nbsp;</b>"+emprestimo+" €</p> "+
" <p><b>Taxa Juro:&nbsp;</b>"+Math.round(taxaJuro1*100,2)+"%</p>"+
" <p><b>Spread:&nbsp;</b>"+Math.round(spread1*100,2)+"%</p>"+
" <p><b>Entrada Inicial:&nbsp;</b>"+entradaInicial+"€</p>"+
" <p><b>Mensalidade prestação:&nbsp;</b>"+Math.round(valorMensal1,2)+"€</p>"

document.getElementById("s2").innerHTML = "<hr class='divisao'>"+
" <p><b>Valor da casa:&nbsp;</b>"+preco+"€</p> "+
" <p><b>Montante do Emprestimo:&nbsp;</b>"+emprestimo+" €</p> "+
" <p><b>Taxa Juro:&nbsp;</b>"+Math.round(taxaJuro2*100,2)+"%</p>"+
" <p><b>Spread:&nbsp;</b>"+Math.round(spread2*100,2)+"%</p>"+
" <p><b>Entrada Inicial:&nbsp;</b>"+entradaInicial+"€</p>"+
" <p><b>Mensalidade prestação:&nbsp;</b>"+Math.round(valorMensal2,2)+"€</p>"

document.getElementById("s3").innerHTML = "<hr class='divisao'>"+
" <p><b>Valor da casa:&nbsp;</b>"+preco+"€</p> "+
" <p><b>Montante do Emprestimo:&nbsp;</b>"+emprestimo+" €</p> "+
" <p><b>Taxa Juro:&nbsp;</b>"+Math.round(taxaJuro3*100,2)+"%</p>"+
" <p><b>Spread:&nbsp;</b>"+Math.round(spread3*100,2)+"%</p>"+
" <p><b>Entrada Inicial:&nbsp;</b>"+entradaInicial+"€</p>"+
" <p><b>Mensalidade prestação:&nbsp;</b>"+Math.round(valorMensal3,2)+"€</p>"



if(d.style.display = "none" && document.getElementById("btn-financiamento").click){
    d.style.display = "block"
}else{
    d.style.display = "none"
}
 

}

//Round improve
var _round = Math.round;
Math.round = function(number, decimals)
{
if (arguments.length == 1)
    return _round(number);
var multiplier = Math.pow(10, decimals);
return _round(number * multiplier) / multiplier;
}