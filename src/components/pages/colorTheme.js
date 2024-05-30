import { createTheme } from "@mui/material/styles";

const colorTheme = createTheme({
  palette: {
    primary: {
      light: "#fafafa",
      main: "##9e9e9e",
      dark: "#212121",
      //contrastText: '#fff',
    },
    secondary: {
      main: "#e71625",
      //contrastText: '#000',
    },
  },
});

export default colorTheme;
