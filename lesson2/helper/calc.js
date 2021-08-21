
const calc = (n1,n2,operation)=>{
       switch (operation) {
        case '+':
            return  n1+n2;
        case '-':
            return  n1-n2;
        case '*':
            return  n1*n2;
        case '/':
            if (!n2) {return 'division by zero is impossible'}
            return n1/n2;
        default:
            return
    }
};
module.exports=calc
