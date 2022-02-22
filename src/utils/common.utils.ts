export const ERROR_RESPONSE = ( message="")=> {
    return { success: false, message};
}

export const SUCCESS_RESPONSE = ( message="",data= null)=> {
    return {success:true, data: data, message};
}

export const SUCCESS_RESPONSE_WITH_TOKEN = ( message="",data= null, token)=> {
    return {success:true, data: data, message, token};
}