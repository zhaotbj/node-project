let storage = {
    //存储
    set(key, value) {
        localStorage.setItem(key,value)
    },
    //取出数据
    get(key) {
        return localStorage.getItem(key)
    },
    // 删除数据
    remove(key) {
        localStorage.removeItem(key)
    }

}

export default storage