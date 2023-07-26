export function addTitle(jsonData, payListTitle) {
  let newList = [];

  for (let i = 0; i < jsonData.length; i++) {
    newList.push({ ...jsonData[i], title: payListTitle });
  }

  return newList
}

export function insertAfterSpecificKey(array) {
  let keyValues;
  let newArray = [];
  let newObj;
  for (let i = 0; i < array.length; i++) {
    keyValues = Object.entries(array[i]);
    console.log('keyvalue', i, keyValues)
    for (let j = 0; j < keyValues.length; j++) {
      console.log('ito', keyValues[j])
      if (keyValues[j][0] == 'Total Earned') {
        keyValues.splice(j+1, 0, ["LESS DEDUCTIONS", ""]);
        break;
      }
    }
    newObj = Object.fromEntries(keyValues);
    newArray.push(newObj)
  }
  console.log('heres new arara', newArray)
  return newArray

}

export function knowDivider(excelData){
  console.log('heres excel Data',excelData[0])
  const keys=Object.keys(excelData[0])
  console.log('keys here', keys)
  for(let i=0;i<keys.length;i++){
    if(keys[i]==='LESS DEDUCTIONS'){
      console.log('heres obtained index of less deduction',i)
      return i;
    }
  }
}