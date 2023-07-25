export function addTitle(jsonData,payListTitle){
    let newList=[];

    for(let i=0;i<jsonData.length;i++){
        newList.push({...jsonData[i],title:payListTitle});
    }
    return newList
}