const getFilterData = (data, date, ignore) => {
  let ignoreOBJ = {
      "museum":"",
      "visitors":""
  }
  let filterData = data.filter((e) => {
    return e.month == date;
  });
  try{
      delete filterData[0].month;
    }catch(e){
        return 
    }
  if (typeof ignore == "string") {
      if(filterData[0][ignore]){
        ignoreOBJ.visitors = filterData[0][ignore]
        ignoreOBJ.museum = ignore
    }else{
          ignoreOBJ = ""
      }
    delete filterData[0][ignore];
  }else{
      ignoreOBJ = ""
  }
  let dataObj = filterData[0];
  let sortable = [];
  for (let el in dataObj) {
    sortable.push([el, dataObj[el]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  if(ignoreOBJ){
    return {sortable, ignoreOBJ};
  }else{
      return {sortable};
  }
};

module.exports = { getFilterData: getFilterData };
