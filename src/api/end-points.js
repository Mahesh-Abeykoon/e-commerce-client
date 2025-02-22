export const END_POINTS = {
    AUTH: {
        SIGN_UP: '/api/users/register',
        SIGN_IN: '/api/users/login',
        LOGOUT: '/api/users/logout',
        LOGOUT_ALL: '/api/users/logoutAll',
        PROFILE: '/api/users/profile'
    },
    ITEMS: {
        CREATE: '/api/items',
        GET_ALL: '/api/items',
        GET_BY_ID: '/api/items/:id',
        UPDATE: '/api/items/:id',
        DELETE: '/api/items/:id',
      },
    CART: {
        GET: '/api/cart',
        ADD: '/api/cart/add',
        UPDATE: '/api/cart/update',
        REMOVE: '/api/cart/remove/:productId',
        CLEAR: '/api/cart/clear',
      },
};