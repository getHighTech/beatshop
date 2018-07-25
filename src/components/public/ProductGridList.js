import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ProductCard from './ProductCard';

const styles = theme => ({
  root: {
    color: "white",
    position: "relative",
    width: "100%",
    textAlign: "center",
    top: "-675px",
    
    [theme.breakpoints.down('md')]: {
        top: 17,
        width: "100%",

        
      },
  },
  gridList: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    marginTop:36
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  solgon:{
    width:'100%',
  }
});




function ProductGridList(props) {
  const { classes, products, history } = props;

  return (
    <Grid
    container
    spacing={16}
    className={classes.root}
    alignItems="center"
    direction="row"
    justify="center"
   >
      <div className={classes.solgon}>
        <img alt="新品上市"  style={{width:'100%',height:'auto'}} src={require("../imgs/new_products.jpeg")}/>
      </div>
    
      <GridList 
        cellHeight={180} className={classes.gridList}>

        {products.map((product,index) => (
          <ProductCard key={product._id} product={product} history={history} />
        ))}
      </GridList>
   </Grid>
  );
}

ProductGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductGridList);