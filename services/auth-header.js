const authHeader = ()=>{
    const user = JSON.parse(localStorage.getItem('WM_User'));
    if(user&&user.token){
        return {Authorization :`Bearer ${user.token}`};
    }
    return {};
}

export default authHeader;