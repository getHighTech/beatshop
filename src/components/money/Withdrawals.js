import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  card:{
    width:'92%',
    marginLeft:'4%',
    marginTop:'4%',
    borderRadius:8
  },
  th:{
    padding:0,
    margin:0,
    textAlign:'center'
  },
  table:{
    padding:0
  },
});

class Withdrawals extends React.Component{
  componentDidMount(){
    
  }
    render(){
      const { classes} = this.props;
      return (
        <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.thName} >提现金额</TableCell>
                      <TableCell  className={classes.th} numeric>到账金额</TableCell>
                      <TableCell  className={classes.th} numeric>时间</TableCell>
                      <TableCell  className={classes.th} numeric>状态</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.withdrawData.map(n => {
                      return (
                        <TableRow key={n.id}>
                          <TableCell className={classes.thName} component="th" scope="row">
                            {n.withdraw}
                          </TableCell>
                          <TableCell className={classes.th} numeric>{n.arrival}</TableCell>
                          <TableCell className={classes.th} numeric>{n.time}</TableCell>
                          <TableCell className={classes.th} numeric>{n.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
        </Table>
      )
    }
}

export default withStyles(styles)(Withdrawals);
