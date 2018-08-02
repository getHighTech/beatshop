import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import ProductCard from './ProductCard';
import styled from 'styled-components';

function ProductGridList(props) {
  const {  products, history } = props;

  return (
      <ReGrid
      container
      spacing={16}
      alignItems="center"
      direction="row"
      justify="center"
    >

      <Banner>
        <BannerImg alt="新品上市"   src={require("../imgs/WechatIMG18.jpeg")}/>
      </Banner>
    
      <REGridList
        cellHeight={180} >
        {products.map((product,index) => (
          <ProductCard key={product._id} product={product} history={history} />
        ))}
      </REGridList>
   </ReGrid>
  );
}

const ReGrid = styled(Grid)`
  color: white；
  position: relative；
  width: 100%；
  text-align: center；
  top: -675px；
`

const Banner = styled.div`
  width: 100%;
  margin-top: -34;
`

const BannerImg = styled.img`
  width:100%;
  height:auto;
`

const REGridList = styled(GridList)`
  width: 100%;
  height: auto;
  justify-tontent: center;
  margin-top:36;
`

ProductGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ProductGridList;