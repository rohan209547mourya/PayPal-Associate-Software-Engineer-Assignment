import Cookies from 'js-cookie'


const setJwtToken = (token) => {
    if (token) {
        Cookies.set('user-session-token', token, {expires : 7})
    }
}

const getjwtToken = Cookies.get('user-session-token');


export {setJwtToken, getjwtToken}

