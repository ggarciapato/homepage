import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Paper,
  Button,
  MobileStepper,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@material-ui/core";

import { 
  KeyboardArrowLeft, 
  KeyboardArrowRight 
} from "@material-ui/icons";
  
import { useTheme } from "@material-ui/styles";
import useStyles from "../styles";
import SwipeableViews from "react-swipeable-views";
  

export function Slideshow(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [activeStep, setActiveStep] = useState(0);
  const content = props.content;
  const maxSteps = content.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step) => {
      setActiveStep(step);
  };
  return (
    <Box 
      className={classes.slideBox}
      // sx={{
      //   maxWidth: 400,
      //   flexGrow: 1
      // }}
    >
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {content.map(function(step, index) {
          return (
            <Grid
              container
              key={`${step.type} ${index}`}
              className={classes.slide}
              component={Card}
              // sm={12} xs={12} md={6} lg={6}
            >
              {Math.abs(activeStep - index) <= 2 
                ? (
                  step.type === "image" && (
                    <Grid 
                      item 
                      sm={12} xs={12} md={4} lg={4}
                    > 
                      <CardMedia
                        className={classes.slideImage}
                        component="img"
                        src={ `data:image/png;base64, ${step.image}` }
                      />
                    </Grid>
                )) : null}
                <Grid 
                  item
                  sm={12} xs={12} md={5} lg={5}
                >
                  <CardContent
                    elevation={0}
                    className={classes.slideText}
                  >
                    <ReactMarkdown>
                      {step.text.join(' ')} 
                    </ReactMarkdown>
                  </CardContent>
                  </Grid>
                </Grid>
              );
            })}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button 
              size="small" 
              onClick={handleBack} 
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
  );
}
  
  