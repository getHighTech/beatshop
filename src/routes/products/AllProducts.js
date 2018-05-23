import React from 'react'
import { loadOneOrder } from '../../actions/orders';
import { setAppLayout } from '../../actions/app';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root:{
    width:'100%'
  },
  button:{
    marginRight:5,
    height:10,
  },  
  loadMore:{
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  },
});

class AllProducts extends React.Component{
  state = {
    productsTotle:8,
    Products:[],
    open: false
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadMoreProductData(){
    let Products = [
      {
        img:'/imgs/b1.png',
        title:'万人车汇黑卡',
        price:356.11,
      },
      {
        img:'/imgs/b2.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b3.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b4.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b5.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b6.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/background3.jpg',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/webwxgetmsgimg.jpeg',
        title:'万人车汇黑卡',
        price:356,
      },
    ]
    this.setState({Products:Products})
  }
  loadFirstPageData(){
    let Products = [
      {
        img:'/imgs/b1.png',
        title:'万人车汇黑卡',
        price:356.11,
      },
      {
        img:'/imgs/b2.png',
        title:'万人车汇黑卡',
        price:356,
      },
      {
        img:'/imgs/b3.png',
        title:'万人车汇黑卡',
        price:356,
      },
    ]
    this.setState({
      Products:Products
    })
  }

  componentDidMount(){
    const { dispatch, match, layout } = this.props;
    console.log(this.props);
    
    if(layout.title!=='万人车汇商品库'){
        dispatch(setAppLayout(
            {
                isBack: true, 
                backTo: "/my", 
                title: "万人车汇商品库", 
                hasCart: false, 
                hasBottomNav: false, 
                hasGeoLoc: false,
                hasEditor: false, 
                hasSearch: false,
            }
        ));
    }
    this.loadFirstPageData()
  }
  render(){
    const { classes } = this.props;


    return(
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {this.state.Products.map(tile => {
            return (
            
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<div><span>价: ¥{tile.price}</span><span> 佣: ¥{tile.price}</span></div>}
                actionIcon={
                  <Button variant="fab" mini color="primary" onClick={this.handleClickOpen} aria-label="add" className={classes.button}>
                  <AddIcon />
                </Button>

                }
              />
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"确定代理这件商品吗?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    代理文案bilibala代理文案bilibala代理文案bilibala代理文案bilibala代理文案bilibala代理文案bilibala
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    取消
                  </Button>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    确认
                  </Button>
                </DialogActions>
              </Dialog>
            </GridListTile>
            )
          }
          )}
        </GridList>
        <div className={classes.loadMore}>
          {this.state.Products.length === this.state.productsTotle?

            <Button color="primary" className={classes.button} >
            没有数据啦
            </Button>:
            <Button color="primary" className={classes.button} onClick={this.loadMoreProductData.bind(this)}>
            加载更多
            </Button>
          }
        </div>
      </div>
    )
  }
}

AllProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
  return {
    orderShow: state.OrderShow,
    user: state.AppUser,
    layout: state.AppInfo.layout
  }
}

export default connect(mapToState)(withStyles(styles)(AllProducts));