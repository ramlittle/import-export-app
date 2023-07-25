export function addTitle(jsonData,payListTitle){
    let newList=[];

    for(let i=0;i<jsonData.length;i++){
        newList.push({...jsonData[i],title:payListTitle});
    }

    return newList
}

export function insertAfterSpecificKey(array, specificKey, newKey, newValue) {
    console.log('here is passed ',array)
    const index = array.findIndex(obj => obj['Total Earned'] === specificKey);
  
    // If the specific key is not found, return the original array
    if (index === -1) {
      return array;
    }
  
    // Insert the new key-value pair after the index of the specific key
    const updatedArray = [
      ...array.slice(0, index + 1),
      { [newKey]: newValue },
      ...array.slice(index + 1)
    ];
  
    return updatedArray;
  }