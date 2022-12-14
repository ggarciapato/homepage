import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#1c1d25", 
    position: "sticky"
  },
  mainHeader: {
    display: "flex",
    flexDirection: "column",
    direction: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2, 0, 2),
    gutterBottom: "true"
    
  },
  projectTitle: {
    padding: theme.spacing(4, 5, 2), 
    display: "flex",
    justifyContent: "space-between"
  },
  container: {
    height: "80vh",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 5, 6), 
    display: "flex",
    justifyContent: "space-between"
  },
  containerToolbar: {
    // padding: theme.spacing(2, 0, 2),
    // justifyContent: "flex-end", 
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between"
    // width: "50px",
    // marginRight: "10px"
  }, 
  icon: {
    marginRight: "20px"
  },
  buttons: {
    marginTop: "40px"
  }, 
  cardGrid: {
    padding: "20px 20px",
  }, 
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  }, 
  cardContent: {
    flexGrow: 1
  },
  headshot: {
    marginRight: "20px"
  },
  socials: {
    display: "flex",
    // padding: theme.spacing(.5, 0, .5),
    justifyContent: "center", 
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    width: "30vw",
    // marginRight: "10px"
  }, 
  footer: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
    color: "#fff",
    backgroundColor: "#1c1d25",
    height: "50px",
    alignItems: "space-around",
    display: "flex",
    justifyContent: "center"
  },
  slideBox: {        
    display: "block",
    justifyContent: 'center',
    alignItems: 'space-around',
    bgcolor: "background.default"
  },
  slideText: {
    // display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1, 1),
    pl: 2,
    bgcolor: 'background.default',
  },
  slideImage: {
    width: "100%"
  },
  slide: {
    padding: theme.spacing(2, 0, 2),
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    minHeight: "55vh",
    maxHeight: "50vh",
    overflow: "scroll"
  }
}));

export default useStyles;