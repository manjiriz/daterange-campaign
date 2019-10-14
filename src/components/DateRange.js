import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "./DateRange.css";
import * as moment from 'moment/moment';
import CampaignList from "./CampaignList";
import { connect } from "react-redux";
import {addCampaigns} from "../store/actions"
import store from '../store';

var AddCampaigns = function(inptArr) {
   store.dispatch(addCampaigns(inptArr));
};

window.AddCampaigns = AddCampaigns;
  
class DateRange extends Component {
    state = {
        startDate : "",
        endDate: "",
        isStartDateSelected: false,
        isEndDateSelected: false,
        searchResult: [],
        campaignData:[]
    };
    
    handleStartDateChange = date => {
        this.setState({
          startDate: date,
          isStartDateSelected: true
        });
    };

    handleEndDateChange = date => {
        this.setState({
          endDate: date,
          isEndDateSelected: true
        });
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            campaignData: nextProps.campaigns
        })
    }

    filterList(e){
        let updateList = this.state.campaignData;
        updateList = updateList.filter(item => {
          return item.name.toLowerCase().search(
            e.target.value.toLowerCase()
            ) !== -1;
        });
    
        this.setState({
            searchResult: updateList
        });
    }


    render() {

        return (
            <div>
                <div className="Date-range-div">
                    <span>Start Date:  </span>
                    <span>
                        <DatePicker id="startDatePicker" 
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                        />
                    </span>
                    <span className="Date-range-endSpan">End Date:  </span>
                    <span>
                        <DatePicker id="endDatePicker"
                            selected={this.state.endDate}
                            minDate={this.state.startDate}
                            onChange={this.handleEndDateChange}
                        />
                    </span>
                    <span className="Date-range-endSpan">
                        <input type="text" onChange={e => this.filterList(e)} placeholder="Search"/>
                        <i id="filtersubmit" className="fa fa-search filtersubmit"></i>
                    </span>
                </div>
                <br />
                <br />
                {!(this.state.campaignData.length) ? (
                    <div>Please insert data to be displayed by using exposed function 'AddCampaigns'. Use browser console to access function.</div>
                 ) : 
                (<CampaignList startDate={this.state.startDate} endDate={this.state.endDate} isStartDateSelected={this.state.isStartDateSelected} isEndDateSelected={this.state.isEndDateSelected} searchResult={this.state.searchResult} campaignData={this.state.campaignData} />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    campaigns: state.campaigns
});

const mapDispatchToProps = (dispatch) => ({
   
    addCampaigns: (campaignData) => {
        dispatch(addCampaigns(campaignData));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateRange);