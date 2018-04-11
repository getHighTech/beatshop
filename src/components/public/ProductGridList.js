import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import ProductCard from './ProductCard';
const styles = theme => ({
  root: {
    color: "white",
    position: "relative",
    width: "100%",
    textAlign: "center",
    top: "-675px",
    
    [theme.breakpoints.down('md')]: {
        top: "-20px",
        backgroundColor: "black",
        width: "100%",
        paddingLeft: "5px",
        paddingRight: "5px"
        
      },
  },
  gridList: {
    width: "100%",
    height: "auto",
    margin: "0px",
    justifyContent: "center",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
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
          <Subheader component="header" style={{  color: "white", textDecoration: "underline", fontSize: "25px",backgroundColor: "rgba(4, 4, 4, 0.69)" }}>主打商品</Subheader>
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