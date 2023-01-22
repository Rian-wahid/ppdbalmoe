class TypeCheck{
    constructor(to_check,targetType){
        this._targetType =targetType
        this._to_check=to_check
        this._min=null
        this._max=null
        this._nullable=false
        this._pattern=null
       

    }

    nullable(){
        this._nullable=true
        return this
    }

    min(num){
        this._min=num
        return this
    }
    max(num){
        this._max=num
        return this
    }
    pattern(regex){
        this._pattern =regex;
        return this
    }

   
    
    check(){
       
        if(this._nullable ===false){
            if(this._to_check ===null || this._to_check === undefined){
                return false
            }
        }
        
        if(typeof this._to_check !== this._targetType){
            return false
        }
        
        if(this._targetType === "string"){
            if(this._min != null){
                if(this._to_check.length < this._min){
                    return false
                }
            }
            if(this._max!=null){
                if(this._to_check.length > this._max){
                    return false
                }
            }
            if(this._pattern!=null && this._to_check!=""){
                if(!this._pattern.test(this._to_check)){
                    return false;
                }
            }
        }

        if(this._targetType==="number"){
            if(this._min != null){
                if(this._to_check < this._min){
                    return false
                }
            }
            if(this._max!=null){
                if(this._to_check > this._max){
                    return false
                }
            }
            
        }
        return true
    }
    static test(to_check,targetType){
        return new TypeCheck(to_check,targetType)
    }
}

module.exports=TypeCheck