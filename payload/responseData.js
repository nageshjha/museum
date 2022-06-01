let payloadJSON = ()=>{ 
let  payload = { 
  attendance: {
    month: "",
    year: "",
    highest: {
      museum: "",
      visitors: "",
    },
    lowest: {
      museum: "",
      visitors: "",
    },
    ignore: {
      museum: "",
      visitors: "",
    },
    total: "",
  }
}
  return payload

}

module.exports = {getPayloadJSON:payloadJSON}