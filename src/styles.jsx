import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#1c1d25"
  },
  mainHeader: {
    direction: "row"

  },
  projectTitle: {
    padding: theme.spacing(5, 5, 3), 
    display: "flex",
    justifyContent: "space-between"
  },
  container: {
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 5, 6), 
    display: "flex",
    justifyContent: "space-between"
  },
  socials: {
    padding: theme.spacing(2, 0, 2),
    justifyContent: "flex-end", 
    alignItems: "flex-end",
    flexDirection: "column",
    width: "50px",
    marginRight: "10px"
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
  }
}));

export default useStyles;