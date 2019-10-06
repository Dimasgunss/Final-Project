import axios from 'axios'

export const onLoginUser = (USERNAME, PASSWORD) => {

    return (dispatch) => {

        axios.get(
            'http://localhost:2001/auth/login',
            {
                params: {
                    username: USERNAME,
                    password: PASSWORD
                }
            }
        ).then(res => {
            if(res.data.length === 0){
                console.log('User tidak ditemukan');
                
            }else{
                let{id, username} = res.data[0]

                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, username})
                )

                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id,username
                        }
                    }
                )
            }
        })
    }
}

export const onLogoutUser = () => {
    localStorage.removeItem('userData')

    return {
        type: 'LOGOUT_SUCCESS'
    }
}