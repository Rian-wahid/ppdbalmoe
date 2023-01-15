
const secrets=[
    "9b1145a47be21839acd508b3166955f",
    "c30b3e60ace05fba3ae0f6b116ef6a5",
    "a12ce1ed89c656f3c466779e2a26bb2",
    "c8eb4304b42817697f92148e9ee2f59"
]
const combinations =[
    [0,1],[0,2],[0,3],
    [1,0],[1,2],[1,3],
    [2,0],[2,2],[2,3],
    [3,0],[3,1],[3,2]
]
class CsrfTokenManager {
    static token(){
        let random = Math.floor(Math.random()*combinations.length);
        let combination = combinations[random];
        let left = combinations[combination[0]]+combinations[combination[1]];
        random = Math.floor(Math.random()*combinations.length);
        combination = combinations[random];
        let right = combinations[combination[0]]+combinations[combination[1]];
        return left+right;
    }
    static validate(token){
        const  valid = false;
        for(let i=0; i<combinations.length; i++){
            let combination = combinations[i];
            let left = combinations[combination[0]]+combinations[combination[1]];
            let right;
            for(let j=0; j<combinations.length; j++){
                combination = combinations[j];
                right = combinations[combination[0]]+combinations[combination[1]];
                if(left+right===token){
                    valid=true;
                    break;
                }
            }
            if(left+right===token){
                break;
            }
        }
        return valid;
    }

    
}