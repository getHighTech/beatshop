
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

const styles = theme => ({
  root: {
    width: "75%",
    [theme.breakpoints.down('sm')]: {
       marginLeft: 0,
       width: "100%"
      },
  },
});

function ProductCarousel(props) {
  const { classes, imgs } = props;
  return (
            <Carousel className={classes.root} showThumbs={false}>
                {
                  imgs!==undefined?
                    imgs.map((img, index)=>{
                        return <div key={index}>
                                <img src={img} alt="产品图片，版权所有" />
                            </div>
                    })
                    :
                    null
                }
               
            </Carousel>
  );
}

ProductCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCarousel);