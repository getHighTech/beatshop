import React, { Component } from 'react';
import EditDatas from '../../components/my/EditDatas';
import { connect } from 'react-redux';

class EditData extends Component {
  render(){
    console.log(this.props)
    return(
      <EditDatas {...this.props}/>
    )
  }
}




const mapUserToState = state => {
  return {
    user: state.AppUser.user,
    layout: state.AppInfo.layout
  }
} 

export default connect(mapUserToState)(EditData);
