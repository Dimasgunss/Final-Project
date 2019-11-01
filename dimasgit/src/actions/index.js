import axios from 'axios'
import Swal from 'sweetalert2'

export const onLoginUser = (USERNAME, PASSWORD) => {

    return (dispatch) => {

        
        axios.get('http://localhost:2001/auth/login', {
            params : {
                username: USERNAME,
                password: PASSWORD
            }
        }).then(res => {
            console.log(res.data)
            if(res.data.length === 0){
                console.log('User tidak ditemukan');
                Swal.fire({
                    type: 'error',
                    title: 'Login Failed',
                    text: 'User Tidak Ditemukan',
                    timer: '1500'
                })
            }else{
                let{id, username} = res.data[0]

                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, username})
                )

                Swal.fire({
                    type: 'success', 
                    title: 'Login Success!',
                    text: 'User Berhasil Login',
                    timer: '1500'

                })

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