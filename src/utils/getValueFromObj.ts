export const getValueFromObj = (obj: any, value: any)=>{
    return Object.keys(obj).find((key)=>{
        return obj[key] === value;
    })
}