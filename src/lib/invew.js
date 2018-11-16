module.exports =  (obj) => {
    if (!obj||!obj.nodeType) {
        return
    }
    let bound = obj.getBoundingClientRect()
    let top = bound.top;
    let bottom = bound.top+bound.height
    let viewHeight = window.innerHeight;
    return (top>0&&top<viewHeight)||(bottom>0&&bottom<viewHeight)
}