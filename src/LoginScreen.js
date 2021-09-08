import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoginScreen({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(JSON.stringify({ username, password }));
    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setErrorMessage(json.error);
          setLoading(false);
          return;
        }
        if (json.errors) {
          setErrorMessage(
            "An error occurred while trying to login, please try again later"
          );
          setLoading(false);
          return;
        }
        setUser(json);
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setLoading(false);
      });
  };

  return (
    <Container className="login-wrapper">
      <h1>Login</h1>
      <form className="login-form" autoComplete="on">
        <FormControl className="login-form-control" fullWidth={true}>
          <TextField
            id="username"
            type="text"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl className="login-form-control" fullWidth={true}>
          <TextField
            id="password"
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {errorMessage ? (
          <span className="login-error">
            <i>{errorMessage}</i>
          </span>
        ) : (
          ""
        )}

        <Button
          variant="contained"
          color="primary"
          className="login-button"
          onClick={submit}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader loading={isLoading} size={10} /> : "Login"}
        </Button>
      </form>
    </Container>
  );
}
