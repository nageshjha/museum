
 let apiUrl = ()=>{
 let options = {
    url: "https://data.lacity.org/resource/trxm-jn3c.json",
    method: "get",
    json: true,
 }
 return options
}

module.exports = {getApiUrl:apiUrl}