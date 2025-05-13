const  ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    ASK_QUESTION: '/ask-question',
    PROFILE: (id: string) => `/profile/${id}`,
    QUESTION: (id: string) => `/question/${id}`,
    TAG: (tag: string) => `/tag/${tag}`,
}

export default ROUTES;