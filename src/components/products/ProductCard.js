import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeAgencyProducts } from '../../actions/products'
import {wechatShare} from '../../helper/wechatShare.js'
const styles = theme => ({
  cardContent:{
    padding:8,
    display:'flex'
   },
   productName:{
     fontSize:14,
     color:'#424242'
   },
   productPrice:{
    color:'#ff5722',
    fontWeight:500,
    display:'flex',
    justifyContent:'space-between',
    paddingRight:'4%',
    fontSize: 14
   },
   card:{
     marginTop:10,
    },
    share:{
      display:'flex',
      justifyContent:'space-between',
      paddingRight:'4%',
    },
    a:{
      textDecoration:'none',
      color:'none'
    },
    loadMore:{
      textAlign:'center',
      marginTop:20,
      marginBottom:20
    },
    leftContent:{
      width:'30%',
      justifyContent:'center',
      alignItems:'center',
      display:'flex',

    },
    rightContent:{
      width:'70%',
      paddingTop:10
    },
    subProductName:{
      fontSize:14,
      color:'#9E9E9E'
    }
});

class ProductCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {  }
  }
  onClick(){
    console.log('------------------------------------');
    console.log('点击了商品标题');
    console.log('------------------------------------');
  }
  share(id){
    const { history } = this.props
      wechatShare();
    console.log('------------------------------------');
    history.push('/share/'+id)
    console.log('------------------------------------');
  }
  delete = (shopId,productId) =>{
    console.log('------------------------------------');
    console.log(`shopId: ${shopId},productId: ${productId}`)
    this.props.dispatch(removeAgencyProducts(shopId,productId))
    console.log('------------------------------------');
  }
  render(){
    const { classes, _id,name_zh,cover,endPrice, agencyLevelPrices,brief,shopId } = this.props;
    console.log(`来了`)
    console.log(this.props)
    return(
      <div>
        <Card className={classes.card}>
          <div className={classes.cardContent}>
              <div className={classes.leftContent}>
                  <img src={cover} alt='商品图片'style={{height:80,width:80}}/>
              </div>
              <div className={classes.rightContent}>
                <a  onClick={this.onClick.bind(this)} className={classes.a}>
                  <div className={classes.productName}>{name_zh}</div>
                  <div className={classes.subProductName}>{brief}</div>
                </a>
                <div className={classes.cardBottom}>
                  <div className={classes.productPrice}>
                    <div>价格:¥{endPrice/100}</div>
                    <div>佣金:¥{agencyLevelPrices.length>0 ? agencyLevelPrices[0]/100 : 0}</div>
                  </div>
                  <div className={classes.share}>
                  <IconButton className={classes.button} onClick={()=>this.delete(shopId,_id)} aria-label="Delete"  color="secondary">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="secondary"  onClick={() => this.share(_id)} className={classes.button} aria-label="Add an alarm">
                      <Icon>share</Icon>
                    </IconButton>
                  </div>
                </div>
              </div>
          </div>
        </Card>
      </div>
    )
  }
}
ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default withStyles(styles, { withTheme: true })(ProductCard);
