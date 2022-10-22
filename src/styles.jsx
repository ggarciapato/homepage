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
  socials: {
    display: "flex",
    // padding: theme.spacing(.5, 0, .5),
    justifyContent: "flex-end", 
    alignItems: "flex-end",
    flexDirection: "column",
    flexGrow: 1,
    width: "30vw",
    // marginRight: "10px"
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
  footer: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
    color: "#fff",
    backgroundColor: "#1c1d25",
    height: "30px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  slideBox: {        
    display: "block",
    // maxWidth: 400,
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'space-around',
    bgcolor: "background.default"
  },
  slideText: {
    // display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1, 1, 1),
    // height: 100,
    pl: 2,
    bgcolor: 'background.default',
    // maxWidth: "300px"
  },
  slideImage: {
    width: "100%"
  },
  slide: {
    padding: theme.spacing(2, 0, 2),
    display: 'flex',
    // flexDirection: 'column',
    // flexWrap: "wrap",
    // alignItems: 'space-around',
    justifyContent: 'center',
    flexGrow: 1,
    // minWidth: '40vw',
    minHeight: "55vh",
    maxHeight: "50vh",
    //maxWidth: '600px'
  }
}));

export default useStyles;