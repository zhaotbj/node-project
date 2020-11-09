const getters = {
  userInfo: (state) => {
    if(!state.userInfo) {
      return ''
    } else {
      return JSON.parse(state.userInfo)
    }
  }
};
export default getters;