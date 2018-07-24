import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });

class Team extends React.Component{
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setAppLayout(
        {
            isBack: true,
            backTo: "/",
            title: "我的团队",
            hasCart: false,
            hasBottomNav: true,
            hasGeoLoc: false,
            hasEditor: false,
            hasSearch: false,
        }
    ));


    
  }


  render() {
      const { classes } = this.props;
      return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <CustomTableCell>Dessert (100g serving)</CustomTableCell>
                    <CustomTableCell numeric>Calories</CustomTableCell>
                    <CustomTableCell numeric>Fat (g)</CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
              
                    <TableRow className={classes.row} >
                        <CustomTableCell component="th" scope="row">
                        123
                        </CustomTableCell>
                        <CustomTableCell numeric>123</CustomTableCell>
                        <CustomTableCell numeric>123</CustomTableCell>
                    </TableRow>
               
                </TableBody>
            </Table>
        </Paper>
      )
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Team))