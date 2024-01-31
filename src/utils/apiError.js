class apiError extends Error {
    constructor(
        statusCode,
        message= "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode= statusCode
        this.data = null // set this property if you want to attach additional data to the error
        this.success = false //set this property according to the nature of the error
        this.errors = errors

        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
    
}

export {apiError}
