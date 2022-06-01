const request = require("request");
let { getFilterData } = require("../util/index");
let { getApiUrl } = require("../config/index");
let { getPayloadJSON } = require("../payload/responseData");
let resBody = getPayloadJSON();
const getMuseumData = async (req, res, next) => {
  let { date, ignore } = req.query;
  if (date && parseInt(date)) {
    const getData = await getMuseumDataAPI();
    date = new Date(parseInt(date)).toISOString().replace("Z", "");
    let absoluteData = getFilterData(getData, date, ignore);
    if (!absoluteData) {
      return res.status(403).json({ message: "No record found !  " });
    }
    resBody.attendance.year = date.split("-")[0];
    resBody.attendance.month = date.split("-")[1];
    resBody.attendance.highest.museum = absoluteData.sortable[0][0];
    resBody.attendance.highest.visitors = absoluteData.sortable[0][1];
    resBody.attendance.lowest.museum =
      absoluteData.sortable[absoluteData.sortable.length - 1][0];
    resBody.attendance.lowest.visitors =
      absoluteData.sortable[absoluteData.sortable.length - 1][1];
    if (absoluteData.ignoreOBJ) {
      resBody.attendance.ignore = absoluteData.ignoreOBJ;
      resBody.attendance.total = (
        parseInt(resBody.attendance.highest.visitors) +
        parseInt(resBody.attendance.lowest.visitors) +
        parseInt(resBody.attendance.ignore.visitors)
      ).toString();
    } else {
      resBody.attendance.total = (
        parseInt(resBody.attendance.highest.visitors) +
        parseInt(resBody.attendance.lowest.visitors)
      ).toString();

      delete resBody.attendance.ignore;
    }
    res.status(200).json({
      data: resBody,
    });
  } else {
    res
      .status(403)
      .json({ message: "Please provide valid date in millisecond." });
  }
};

const getMuseumDataAPI = () => {
  return new Promise((resolve, reject) => {
    try {
      return request(getApiUrl(), (err, data, _body) => {
        if (err) {
          console.error("error in http call to third party", err);
          reject(err);
        } else {
          resolve(_body);
        }
      });
    } catch (err) {
      console.log("Something went wrong:", err);
    }
  });
};

module.exports = { getMuseumData: getMuseumData };
