import moment from "moment";

export default function filterData(startDate, endDate, campaignData) {
    let start = moment(startDate).format('M/DD/YYYY');
    let end = moment(endDate).format('M/DD/YYYY');
    let resultedFilteredData = [];
    for(let i=0; i < campaignData.length; i++) {
        let formatStartDate = moment(campaignData[i].startDate).format('M/DD/YYYY');
        let formatEndDate = moment(campaignData[i].endDate).format('M/DD/YYYY');
        let startRes = moment(formatStartDate).isBetween(start, end, null, '[]');
        let endRes = moment(formatEndDate).isBetween(start, end, null, '[]');
        if(startRes || endRes) {
            resultedFilteredData.push(campaignData[i]);
        }

    }
    return resultedFilteredData;
}