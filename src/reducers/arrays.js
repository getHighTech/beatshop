export function insertItem(array, action) {
    return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index)
    ]
}

export function removeItem(array, action) {
    return array.filter( (item, index) => index !== action.index);
}


export function updateObjectInArray(array, action) {
    return array.map( (item, index) => {
        if(index !== action.index) {
            // 这不是我们关心的项-保持原来的值
            return item;
        }

        // 否则, 这是我们关心的-返回一个更新的值
        return {
            ...item,
            ...action.item
        };    
    });
}