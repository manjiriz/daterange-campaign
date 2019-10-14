import React, {Component} from 'react';
import "./CampaignList.css";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import filterData from "../utils/filterData"

const moment = extendMoment(Moment);

export default class CampaignList extends Component {

    state = {
        filteredTableData:[],
        startDate:"",
        endDate:"",
        isStartDateAfter: false
    };

    componentWillReceiveProps(nextProps){
        if(this.state.startDate !== nextProps.startDate || this.state.endDate !== nextProps.endDate) {
            this.setState({
                startDate: nextProps.startDate,
                endDate:nextProps.endDate
            });
        }

        if(nextProps.isStartDateSelected && nextProps.isEndDateSelected) {
            var isAfter = Moment(nextProps.isStartDateSelected).isAfter(nextProps.isEndDateSelected);
            if(isAfter) {
                this.setState({
                    isStartDateAfter: true
                });
            }
            let result = filterData(nextProps.startDate, nextProps.endDate, nextProps.campaignData);
            this.setState({
                filteredTableData: result
            });
        } else if(nextProps.searchResult.length > 0) {
            this.setState({
                filteredTableData: nextProps.searchResult
            });
        } else {
            this.setState({
                filteredTableData: nextProps.campaignData
            });
        }
    }

    componentDidMount() {
        if(this.props.isStartDateSelected && this.props.isEndDateSelected) {
            let result = filterData(this.props.startDate, this.props.endDate, this.props.campaignData);
            this.setState({
                filteredTableData: result
            });
        } else {
            this.setState({
                filteredTableData: this.props.campaignData
            });
        }
    }

    createTable = () => {
        let tableData = [...this.state.filteredTableData];
        let table = [];
        let tHeadData = [
            <td width="35%" className="table-th-td" key="name">
                {"Name"}
            </td>,
            <td width="15%" className="table-th-td" key="strDate">
                {"Start Date"}
            </td>,
            <td width="15%" className="table-th-td" key="endDate">
                {"End Date"}
            </td>,
            <td width="30%" className="table-th-td" key="active">
                {"Active"}
            </td>,
            <td width="35%" className="table-th-td" key="budget">
                {"Budget"}
            </td>
        ];
        table.push(
            <thead className="table-th-td theadClass" key="theadData">
                <tr>{tHeadData}</tr>
            </thead>
        );
        for (let i = 0; i < tableData.length; i++) {
            let children = [];
            children.push(<td className="table-th-td">{tableData[i].name ? `${tableData[i].name}` : ""}</td>);
            children.push(
                <td className="table-th-td">{tableData[i].startDate ? `${tableData[i].startDate}` : ""}</td>
            );

            children.push(<td className="table-th-td">{tableData[i].endDate ? `${tableData[i].endDate}` : ""}</td>);
            
            let target = Moment().format('M/DD/YYYY');
            let start = Moment(tableData[i].startDate).format('M/DD/YYYY');
            let end = Moment(tableData[i].endDate).format('M/DD/YYYY');
            let res = Moment(target).isBetween(start, end, null, '[]') 
            children.push(<td className="table-th-td">{res ? <p><span><i className="fa fa-circle" style={{fontSize:"15px", color:"green"}} ></i></span><span>  Active</span></p> : <p><span><i className="fa fa-circle" style={{fontSize:"15px", color:"red"}} ></i></span><span>  Inactive</span></p>}
            
            </td>);
        
            children.push(<td className="table-th-td">{tableData[i].Budget ? `${tableData[i].Budget}` : ""}</td>);
            table.push(<tbody><tr>{children}</tr></tbody>);
        }

        return table;
    }
    render() {
        return (
            <div>
                {this.state.isStartDateAfter ? <p style={{color:"red"}}>End date should be greater than Start date</p> :
                <table className="tableClass table-th-td">
                    {this.createTable()}
                </table>
                 }
            </div>
        );
    }
}