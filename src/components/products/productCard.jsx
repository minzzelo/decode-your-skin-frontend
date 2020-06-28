import React from "react";
import {Card, CardHeader, CardActions, CardContent, CardMedia, Typography, Button} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    border: '1px solid #f47b8f', 

    '&:hover' : {
      cursor: 'pointer', 
      border: '3px solid #f3aabb', 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)', 
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
    }, 
  }, 

  media: {
    
    height: 150, 
    width: 130, 
    margin: "auto",
  },

});

 export function ProductCard(props) {
  const classes = useStyles();
  const { product } = props;

  function remove() {
    console.log("remove button clicked");
  }

    return (
    
        <Card className={(classes.root)} variant="outlined">
          <CardHeader
            title={product.productName.toUpperCase()}
          />
          <CardMedia className={classes.media} image={product.imageURL}/>
          <CardContent>
            <Typography variant="body2" component="p">
              {product.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={remove}>
              Remove
            </Button>
          </CardActions>
      </Card>
    );
  }

