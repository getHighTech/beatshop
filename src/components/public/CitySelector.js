import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import {connect} from 'react-redux';
import { setAppCity } from '../../actions/app';

class CitySelector extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event, city) => {
      const { dispatch } = this.props;
      dispatch(setAppCity(city));
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}

          style={{color: this.props.color}}
        >
            {this.props.currentCity}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={(event)=>this.handleClose(event, "成都市")}>成都市</MenuItem>
          <MenuItem onClick={(event)=>this.handleClose(event, "北京市")}>北京市</MenuItem>
        </Menu>
      </div>
    );
  }
}

function mapToState(state){
    return {
        currentCity: state.AppInfo.currentCity
    }
}
export default connect(mapToState)(CitySelector);