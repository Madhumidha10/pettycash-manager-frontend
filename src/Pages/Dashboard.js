import React,{useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCharts from "../components/AddCharts";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { grey } from "@mui/material/colors";
import CompanyInfo from "../components/CompanyInfo";
import AddExpenses from "../components/AddExpenses";
import Reports from "../components/Reports";
import { useLocation } from "react-router-dom";
import ListItems from "../components/ListItems";
import AddIncome from "../components/AddIncome";
import Settings from "../components/Settings";
import IncomeList from "../components/IncomeList";
import ExpenseList from "../components/ExpenseList";
import jwt from 'jwt-decode'
var currDate = new Date();
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var monthName = months[currDate.getMonth()];
var year = currDate.getFullYear();

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    mode: "dark",
    // palette values for dark mode
    primary: grey,
    divider: grey[700],
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});

function DashboardContent() {
 
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
 
  //based on history location to rendering the components
  const renderChilds = () => {
    switch (location.pathname) {
      case "/dashboard/company":
        return <CompanyInfo />;
      case "/dashboard/openbalance":
        return <Settings />;
      case "/dashboard/addout":
        return <AddExpenses />;
      case "/dashboard/addin":
        return <AddIncome />;
      case "/dashboard/reports":
        return <Reports />;
      case "/dashboard/incomelist":
        return <IncomeList />;
      case "/dashboard/expenselist":
        return <ExpenseList />;

      default:
        return <AddCharts />;
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {/* {monthName}-{year} Dashboard */}
              Dashboard
            </Typography>
            Welcome {jwt(localStorage.getItem('token')).name}
          </Toolbar>
          
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <CurrencyExchangeIcon sx={{ marginRight: "auto" }} /> Petty cash
              Manager
            </Typography>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {<ListItems />}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {renderChilds()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  
  return <DashboardContent />
}
