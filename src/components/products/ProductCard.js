import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    display: 'flex',
    marginTop:5,
    marginRight:5,
    marginLeft:5
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'right',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  price:{
    marginTop:10
  }
});

class ProductCard extends React.Component{
  render(){
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.card}>
          <CardMedia
              className={classes.cover}
              image="/imgs/webwxgetmsgimg.jpeg"
              title="Live from space album cover"
            />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="subheading">万人车汇黑卡万人车汇黑卡</Typography>
              <Typography variant="caption" color="primary" className={classes.price}>
                  <span>价格:365</span> <span style={{marginLeft:'40%'}}>佣金:28.8</span>
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton className={classes.button} aria-label="Delete"  color="primary">
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" style={{marginLeft:'40%'}} className={classes.button} aria-label="Add an alarm">
                <Icon>share</Icon>
              </IconButton>
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
