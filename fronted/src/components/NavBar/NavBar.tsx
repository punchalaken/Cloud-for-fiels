import { Image, Nav, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import LoginForm from "../LoginForm.tsx/LoginForm.tsx";

export default function NavBar() {
    const [isSignIn, setIsSignIn] = useState(false);


  const clickSignInBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    return setIsSignIn(!isSignIn);
  };


  return (
    <Nav
      variant="pills"
      className="navigation d-flex justify-content-around align-items-center p-3 fs-3"
    >
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          <Stack direction="horizontal" gap={3}>
            <div>
              <Image src={logo} alt="" style={{ display: "block" }} />
            </div>

            <div className="fs-2 fw-bold">Cloud Storage</div>
          </Stack>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav variant="tabs" className="border-0">
          <Nav.Item className="position-relative">
            <Nav.Link onClick={clickSignInBtn}>Sign in</Nav.Link>
            {isSignIn && <LoginForm/>}
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/signup">Sign up</Nav.Link>
          </Nav.Item>
        </Nav>
      </Nav.Item>
    </Nav>
  );
}
