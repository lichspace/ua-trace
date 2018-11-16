/**
 * 去抖函数
 * @param func
 * @param millisecond
 */
module.exports = (func, millisecond)=>{
    //let timeId
    let running = false
    function debounced() {
        if(running) return
        running = true
        setTimeout(()=>{
            func.apply(null,arguments)
            running = false
        },millisecond)
    }
    return debounced
}