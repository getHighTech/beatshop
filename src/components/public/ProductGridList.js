import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import ProductCard from './ProductCard';
import deepOrange from 'material-ui/colors/deepOrange'

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
  subheader:{
    color:deepOrange[500],
    fontSize:20,
    marginTop:-113,
    height:165
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
    
      <GridList 
        cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="header" className={classes.subheader} >
            <img alt="主 / 打 / 商 / 品" src={require("../imgs/recommend.svg")}/>
          </Subheader>
        </GridListTile>
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