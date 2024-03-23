


export const startSession = (user) => {
    sessionStorage.setItem("usuario", user.usuario)
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("accessToken", user.accessToken);
   
    console.log(user.accessToken,user.usuario)
  }
  
  
  export const getSession = () => {
    return {
      usuario: sessionStorage.getItem("usuario"),
      email: sessionStorage.getItem("email"),
      accessToken: sessionStorage.getItem("accessToken"),
    }
  }
  
  export const endSession = () => {
    sessionStorage.clear();

  }
  
  export const isLogin = () => {
    console.log(getSession().accessToken);
  }

