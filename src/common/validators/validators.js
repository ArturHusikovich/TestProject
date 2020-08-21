export const required = (value) => {
    if(value) return undefined;
    else return "Field is empty";
}

export const maxLength = (max) => (value) => {
    if(value.length > max) return "Too long message!"
    else return undefined;
}