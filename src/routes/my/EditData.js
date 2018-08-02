import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import EditDatas from '../../components/my/EditDatas';

class EditData extends Component {
  render(){
    return(
      <EditDatas/>
    )
  }
}
function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}


export default connect(mapToState)(EditData);
