import {combineReducers} from 'redux'

const init = {
    id: 0,
    username: "",
    role: ""
}

const initSearch = {
    keyword: ""
}

const initCart = {
    addProductCart: [],
    qty: 0
}

const searchNavs = (state = initSearch, action) => {
    switch(action.type) {
        case 'SEARCH_SUCCESS': 
            return{...state,keyword: action.payload.keyword}
        default: 
                return state
    }
}

const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // Akan menyalin property di state untuk kemudian di ubah 'id' dan 'username'
            return {...state,id: action.payload.id, username: action.payload.username, role: action.payload.role }

            // Hilangkan id dan username
        case 'LOGOUT_SUCCESS':
            return {...state,id: "", username: "", role: "" }

        default:
            return state
    }
}

const cartReducer = (state = initCart, action) => {
    switch(action.type) {
        case "PLUS_ORDER" :
            return {...state, qty : action.payload.totalQty}
        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: AuthReducer,
        search: searchNavs,
        cartReduc: cartReducer    

    }
)

export default reducers