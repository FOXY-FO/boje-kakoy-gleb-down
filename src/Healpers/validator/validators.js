export const required = value =>{
    if(value) return undefined;
    return "Пустое поле";
}

export const maxLengthCreator = (maxLength) => value =>{
    if(value && value.length > maxLength) return "Максимальная длина коментария";
    return undefined;
}
