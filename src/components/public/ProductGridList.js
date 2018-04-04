import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import bg1 from '../imgs/b1.png';
import bg2 from '../imgs/b2.png';
import bg3 from '../imgs/b3.png';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import AddShoppingCart from 'material-ui-icons/AddShoppingCart';
const styles = theme => ({
  root: {
    color: "white",
    position: "relative",
    width: "67%",
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
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});


  const tileData = [
    {
      img: bg1,
      title: 'VIRIDI',
      author: '程序员的福音',
    },
    {
        img: bg2,
        title: 'Image2',
        author: 'author3',
      },
     
  ];

function ProductGridList(props) {
  const { classes } = props;

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
          <Subheader component="div" style={{  color: "white", textDecoration: "underline" }}>主打商品</Subheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<h3>{tile.author}<br/></h3>}
              titlePosition="bottom"
              actionIcon={
                  <div>
                <Button variant="fab" color="primary" mini={true}>
                    <AddShoppingCart />
                </Button>
                <Button variant="fab" color="primary" mini={true}>
                    <AddShoppingCart />
                </Button>
                </div>
              }
            />
          </GridListTile>
        ))}
      </GridList>
   </Grid>
  );
}

ProductGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductGridList);