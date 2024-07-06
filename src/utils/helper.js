//@ts-check
import Cookies from 'js-cookie';

const getToken = () => {
    const token = Cookies.get('token');
    return token?.length ? token : null;
}

export { getToken }