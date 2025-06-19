  export const checkAdminRole = ()=>{
    const token = localStorage.getItem('token');
    if(!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));//JWT состоит из 3 частей, разделённых точками: header.payload.signature
        //token.split('.')[1] - берёт вторую часть (payload)
        //atob() - декодирует Base64 строку в обычную строку
        //JSON.parse() - преобразует JSON-строку в объект
        return payload.role === 'admin';
    } catch (error) {
        return false;
    }
  }