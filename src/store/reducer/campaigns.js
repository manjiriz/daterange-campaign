import moment from "moment";
const campaigns = (state = [], action) => {
    switch (action.type) {
      case 'ADD_CAMPAIGNS': 
        return [
          ...state,
          ...action.data
        ];
      default:
        return state
    }
  }
  
export default campaigns;