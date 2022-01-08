const queryOk= (array)=>{
    for (let query of array){
        if (((typeof query) ==="undefined") || query === null){
            return false
        }
    }
    return true;
}

module.exports = queryOk