const mutations = {
    setUserInfo(state, params) {
        state.userInfo = JSON.stringify(params);
        sessionStorage.setItem('userInfo', JSON.stringify(params))
    }
};

export default mutations;
