//essa é a tela inicial, quando clicar em REGISTRAR ela te leva para a tela de cadastro
class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-password-validate', 
            'data-email-validate'
        ]
                
    }

    //iniciar a validação de todos os campos
    validate(form){

        //resgatar todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        };

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transforma o que foi recebido acima, que é um HTML Collection em Array
        let inputsArray = [...inputs];

        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i ; i++){

                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    //limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method] (input,value);
                };
            };
        },this);
    };

        //validar emails
        emailvalidate(input){
            let re = /\S+@\S+\.\S+/;
            let email = input.value;
            let errorMessage = `Insira um e-mail no padrão exemplo@gmail.com`;
            
            if(!re.test(email)){
                this.printMessage(input, errorMessage);
            };
        };


        //valida o campo de senha 
        passwordvalidate(input){
            let charArr = input.value.split("");
            let uppercases = 0;
            let numbers = 0;

            for (let i=0; charArr.length > i; i++){
                if (charArr[i] === charArr[i] .toUpperCase() && isNaN(parseInt(charArr[i]))){
                    uppercases++;
                }else if (!isNaN(parseInt(charArr[i]))){
                    numbers++;
                };
            };
            if(uppercases === 0 || numbers === 0){
                let errorMessage = `A senha precisa de pelo menos um caractere maiusculo e um número.`;
                this.printMessage(input, errorMessage);
            };
        };
        //metodo para imprimir mensagens de erro na tela
        printMessage(input, msg){
            //quantidade de erros
            let errorQtd = input.parentNode.querySelector('.error-validation');

        if(errorQtd === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        };
    };
    //verificar se o input é requirido(exigido)
    required(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo é de preenchimento obrigatório.`;
            
            this.printMessage(input, errorMessage);
        };
    };

    cleanValidations(validations){
        validations.forEach(el => el.remove())
    };
};
//pegar os dados do formulário e do botão
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

//iniciando o objeto Validator
let validator = new Validator();

//evento que vai disparar as validações
submit.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(form);
});           

  
