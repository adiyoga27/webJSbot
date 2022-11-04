export const successResponse = function(res:any){
    return res.status(200).json({
        status : true,
        message : "Success"
    })
}
export const successResponseData = function(res:any, data:any){
    return res.status(200).json({
        status : true,
        message :"Success",
        data : data
    })
}

export const errorResponse = function(res:any, error:any){
    return res.status(400).json({
        status : false,
        message : error ?? "Server Error"
    })
}

export const errorValidationResponse = function(res:any, error:any){
    return res.status(422).json({
        status : false,
        message: error.array()[0]["msg"] ?? "Error Validator !!",
        data: error.array(),
    })
}