const display =document.querySelector('.display');

const key = document.querySelector('.keypad');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDispaly();

function updateDispaly(){
    display.value=displayValue;
}

key.addEventListener('click', function(e){
    const element=e.target;

    if(!element.matches("button")) return;

    if(element.classList.contains('opr')){
        handleoperator(element.value);
        updateDispaly();
        return;
    }

    if(element.classList.contains('dec')){
        inputDecimal();
        updateDispaly();
        return;
    }

    if(element.classList.contains('clean')){
        clean();
        updateDispaly();
        return;
    }

    if(element.classList.contains('delete')){
        //console.log('delete', element.value);
        delet();
        updateDispaly();
        return;
    }

    

    //console.log(element);

    inputNumber(element.value);
    updateDispaly();
});

function inputNumber(num){
    if(waitingForSecondValue){
        displayValue =num;
        waitingForSecondValue=false;
    }
    else{
        displayValue = displayValue ==='0'?num:displayValue+num;
    }
}

function inputDecimal(){
    if(!displayValue.includes(",")){
        displayValue+= ",";
    }
}

function clean(){
    displayValue="0";
}

function delet(){
    var sayi= displayValue.split("");
    console.log(sayi);
    sayi.pop();
    console.log(sayi);
    sayi=sayi.join("");
    console.log(sayi);
    displayValue=sayi;
    console.log(displayValue);
}

function handleoperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator =nextOperator;
        return;
    }

    if(firstValue==null){
       firstValue = value; 
    }
    else if(operator){
        const result=calculate(firstValue, value, operator);
        displayValue=String(result);
        firstValue=result;
    }
    waitingForSecondValue=true;
    operator= nextOperator;
}

function calculate(first, second, operator){
    if(operator === '+'){
        return first+second;
    }
    else if(operator === '-'){
        return first-second;
    }
    else if(operator === '*'){
        return first*second;
    }
    else if(operator === '/'){
        if(second==='0'){
            alert("geçersiz işlem");
        }
        return first/second;
    }
    else if(operator==='^'){

        return Math.pow(first,second);
    }
    else if(operator ==='%'){
        return ((first*second)/100)
    }
    else if(operator === '='){
        return first;
    }

    return second;
}