import React from 'react';
import Axios from 'axios';
import { getStore } from '../../tools/localStorage';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import serverConfig from '../../config/server';
import App from '../../config/app.json';
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
    thName:{
      padding:0,
      margin:0,
      textAlign:'left',
      width:50
    },
    loadMore:{
      textAlign:'center',
      marginTop:20,
      marginBottom:20
    },
    tableHeader:{
      backgroundColor:'#2196f3',
    },
    time:{
      color:'white'
    },
    incomeNumber:{
      textAlign:'center'
    },
    cardItem:{
      marginLeft:10
    },
    itemBox:{
      display:'flex',
      marginBottom:5
    }
  
  })
class Statics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            today: 0,
            week: 0,
            month: 0
        }
    }

    componentWillMount(){
        let userId = getStore("userId");
        Axios.get(`${serverConfig.server_url}/api/stat`,{
          params: {
            userId,
            appName: App.name
          }
        }).then(rlt=>{
            console.log(rlt.data)
            this.setState({
                today: rlt.data.yestodayTotalAmount,
                week: rlt.data.weekTotalAmount,
                month: rlt.data.monthsTotalAmount,
            })
            
        }).catch(err=>{
            console.log(err);
            
        })

    }

    render(){

        const {classes} = this.props;
        const { today, week, month} = this.state;
        return (
            
            <Typography variant="headline" component="div">
            <Table className={classes.table}>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.time} >今日</TableCell>
                  <TableCell className={classes.time} >一周</TableCell>
                  <TableCell  className={classes.time} >30天</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.row}>
                  <TableCell className={classes.incomeNumber} numeric>{ today.length> 0 ? today[0].total/100 : 0}</TableCell>
                  <TableCell className={classes.incomeNumber} numeric>{ week.length> 0 ? week[0].total/100 : 0}</TableCell>
                  <TableCell className={classes.incomeNumber} numeric>{ month.length> 0 ? month[0].total/100 : 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Typography>
        )
    }
}

export default withStyles(styles)(Statics)