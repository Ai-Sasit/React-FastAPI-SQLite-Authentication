import * as React from 'react';
import {register} from './../service/auth';
import {
    Button,
    Grid,
    Paper,
    Stack,
    styled,
    TextField,
    Typography,
  } from "@mui/material";
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: theme.spacing(0),
    color: theme.palette.text.secondary,
  }));

  function SignUp(){
      const [user, setUser] = React.useState("");
      const [pass, setPass] = React.useState("");
      const [email, setEmail] = React.useState("");

      const handleRegistration = () => {
          let payload = {
              username: user,
              email: email,
              is_superuser: false,
              password: pass,
          }
          register(payload);
      }

      return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", backgroundColor: "#282c34" }}
      >
        <Stack
          spacing={0}
          style={{ backgroundColor: "#ffffff95" }}
          sx={{ p: 2, width: "60vh" }}
        >
          <Item>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              align="center"
              mt={3}
            >
              Sign Up
            </Typography>
          </Item>
          <Item>
            <TextField
              sx={{ width: "90%" }}
              label="Username"
              variant="outlined"
              size="small"
              onChange={e => {setUser(e.target.value)}}
              defaultValue={user}
            />
          </Item>
          <Item>
            <TextField
              sx={{ width: "90%" }}
              type="email"
              label="Email"
              variant="outlined"
              size="small"
              onChange={e => {setEmail(e.target.value)}}
              defaultValue={email}
            />
          </Item>
          <Item>
            <TextField
              sx={{ width: "90%" }}
              type="password"
              label="Password"
              variant="outlined"
              size="small"
              onChange={e => {setPass(e.target.value)}}
              defaultValue={pass}
            />
          </Item>
          <Item>
            <Button variant="contained" color="secondary" onClick={handleRegistration}>
                Register
            </Button>
          </Item>
          <Item></Item>
        </Stack>
      </Grid>
      )
  }

  export default SignUp;