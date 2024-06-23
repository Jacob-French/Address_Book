function mergeSort(list, compare){
    const length = list.length;

    if(length <= 1){
        return list;
    }
    else{
        const middle = Math.floor(length / 2);
        let left = list.slice(0, middle);
        let right = list.slice(middle, length);

        if(left.length > 1){left = mergeSort(left, compare)}
        if(right.length > 1){right = mergeSort(right, compare)}

        return merge(left, right, compare);
    }
}

function merge(left, right, compare){
    let leftIndex = 0, rightIndex = 0;
    let result = [];

    while(leftIndex < left.length && rightIndex < right.length){
        const leftItem = left[leftIndex];
        const rightItem = right[rightIndex];
        
        if(compare.comparisonFunction(leftItem, rightItem, compare.comparisonSettings)){
            result.push(leftItem);
            leftIndex ++;
        }
        else{
            result.push(rightItem);
            rightIndex ++;
        }
    }

    return result.concat(left.slice(leftIndex).concat(right.slice(rightIndex)));
}

function ComparisonObject(comparisonFunction, comparisonSettings){
    this.comparisonFunction = comparisonFunction;
    this.comparisonSettings = comparisonSettings;
}

function compareNumeric(left, right){
    if(left < right){
        return true;
    }
    else{
        return false;
    }
}

function compareAlphabetical(left, right, comparisonSettings){
    const direction = comparisonSettings.direction;
    const name = comparisonSettings.name;

    let leftName;
    let rightName;

    if(name == "firstname"){
        leftName = left.firstName;
        rightName = right.firstName;
    }
    else if(name == "lastname"){
        leftName = left.lastName;
        rightName = right.lastName;
    }
    else{
        leftName = left.getFullName();
        rightName = right.getFullName();
    }

    if(leftName.localeCompare(rightName) == direction){
        return true;
    }
    else{
        return false;
    }
}