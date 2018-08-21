import React from 'react';
import Axios from 'axios';
import { getStore } from '../../tools/localStorage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import serverConfig from '../../config/server';

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

  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
class Incomes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            page: 1,
            incomes: [],
        }
    }

    loadMore=()=>{
        if(this.state.loading){
            return 0;
        }
        this.setState({
            loading: true,
        })
        let incomes = this.state.incomes;
        let userId = getStore("userId");
        Axios.get(
            serverConfig.server_url+"/api/v0/my_incomes?userId="+userId+"&page="+(this.state.page+1)+"&pagesize=10"
        ).then(rlt=>{
            console.log("请求收入数据", rlt.data);
            
            this.setState({
                loading: false,
                page: this.state.page+1,
                incomes: incomes.concat(rlt.data.balance_incomes),
            })
            
        }).catch(err=>{
            this.setState({
                loading: true,
                page: 1,
                incomes: [],
            })
            console.log(err);
            
        })
    }

    componentWillMount(){
        let userId = getStore("userId");
        Axios.get(serverConfig.server_url+"/api/v0/my_incomes?userId="+userId).then(rlt=>{
            console.log("请求收入数据", rlt.data);
            
            this.setState({
                loading: false,
                page: 1,
                incomes: rlt.data.balance_incomes,
            })
            
        }).catch(err=>{
            this.setState({
                loading: true,
                page: 1,
                incomes: [],
            })
            console.log(err);
            
        })

    }

    render(){

        const {classes} = this.props;
        const {incomes, loading} = this.state;
        return (
            
            <TabContainer >
            <div className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.thName} >商品名称</TableCell>
                    <TableCell  className={classes.th} numeric>购买者</TableCell>
                    <TableCell  className={classes.th} numeric>我的收入</TableCell>
                    <TableCell  className={classes.th} numeric>时间</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { incomes && incomes.length===0 ?
                    <div style={{
                      width: 339,
                      height: 60,
                      top: -87,
                      position: "relative",
                      background: "white"
                    }}> 暂无数据 </div> :
                    incomes.map((n, index) => {
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className={classes.thName} component="th" scope="row">
                          { n.productId? n.productId.name_zh: n.product? n.product.name_zh : "测试数据缺失"} 
                        </TableCell>
                        <TableCell className={classes.th} numeric>{n.agency? n.agency.username: n.buyer? n.buyer.username: "测试数据缺失"}</TableCell>
                        <TableCell className={classes.th} numeric>{"￥"+n.amount/100}</TableCell>
                        <TableCell className={classes.th} numeric>{moment(n.createdAt).fromNow()}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
              <div className={classes.loadMore}>
             
                
                <Button onClick={this.loadMore} disabled={loading}  color="primary" className={classes.button} >
                    {loading? "正在加载": "加载更多"}
                </Button>
              
              </div>
            </div>
          </TabContainer>
        )
    }
}

export default withStyles(styles)(Incomes)