import { Button, Form } from "react-bootstrap";
import SignUpFormElement from "./SignUp.props";
import moment from "moment-with-locales-es6";

import { setEmailOrLogin } from "../../redux/slices/fieldsCheckInDBSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { UsedLogin } from "../../interface/interface";

export default function SignupPage() {
  const dispatch = useAppDispatch();

  const [loginIsValid, setLoginIsValid] = useState("");
  const [emailIsValid] = useState(true);

  const [loginIsUsed, setLoginIsUsed] = useState<"none" | "block">("none");

  const {
    login: { login },
    email: { email },
    password: { password },
  } = useAppSelector((state) => state.checkFields);

  const fetchLoginIsUsed = async (login: string) => {
    try {
      const response = await fetch(`/api/signup?login=${login}`);
      const data: UsedLogin = await response.json();

      if (response.status === 200) {
        if (data.status === "Success") setLoginIsUsed("none");
        else setLoginIsUsed("block");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (login === "") {
      setLoginIsValid("");
      setLoginIsUsed("none");
    } else {
      const loginLength = login.length;
      const reg = /^[A-Z][a-zA-Z\d]*$/gm;

      if (loginLength >= 4 && loginLength <= 20) {
        fetchLoginIsUsed(login);

        if (reg.test(login)) {
          setLoginIsValid("font-green");
        } else setLoginIsValid("font-red");
      } else setLoginIsValid("");
    }
  }, [login]);

  useEffect(() => {}, [password]);

  useEffect(() => {
    console.log(import.meta.env.VITE_EMAIL_REGEXP);
  }, [email]);

  // useEffect((
  //   if (loginIsUsed)
  // ) => {}, [loginIsUsed]);

  const submitHandler = (e: React.FormEvent<SignUpFormElement>): void => {
    e.preventDefault();

    const fetchCreateUser = async (data: string) => {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: data,
        });

        if (response.status === 201) {
          console.log("ok");
        }
      } catch (e) {
        console.log(e);
      }
    };

    const userInformation = {
      first_name: e.currentTarget.elements.formName.value,
      last_name: e.currentTarget.elements.formLastName.value,
      login: e.currentTarget.elements.formName.value,
      email: e.currentTarget.elements.formName.value,
      password: e.currentTarget.elements.formName.value,
      created_at: moment(Date.now()).format("YYYY-MM-DD"),
    };

    fetchCreateUser(JSON.stringify(userInformation));
  };

  const changeInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "login" | "email"
  ): void => {
    const value = e.currentTarget.value;

    if (field === "login") {
      dispatch(
        setEmailOrLogin({
          value,
          field,
        })
      );
    }

    dispatch(
      setEmailOrLogin({
        value,
        field,
      })
    );
  };

  const loginHelpText = (
    <Form.Text id="loginHelpBlock">
      <div className={`${loginIsValid}`}>
        Цифры и латинские буквы, длина 4-20 символов, первый символ заглавная
        буква
      </div>
    </Form.Text>
  );

  const passwordHelpText = (
    <Form.Text id="loginHelpBlock">
      <div className={`${loginIsValid ? "font-green" : ""}`}>
        Только цифры и буквы длинной от 4 до 20 символов
      </div>
    </Form.Text>
  );

  const emailHelpText = (
    <Form.Text id="emailHelpBlock">
      <div style={{ display: emailIsValid ? "none" : "block" }}>
        Неверный email
      </div>
    </Form.Text>
  );

  return (
    <Form
      id="signup-form"
      className="ms-auto me-auto mt-5 p-3 border rounded-4"
      style={{ width: 500 }}
      onSubmit={submitHandler}
    >
      <Form.Group className="m-3" controlId="formName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="John" />
      </Form.Group>

      <Form.Group className="m-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" />
      </Form.Group>

      <Form.Group className="m-3 mb-0" controlId="formLogin">
        <Form.Label className="">Login</Form.Label>
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="JohnDoe"
          aria-describedby="loginHelpBlock"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeInputHandler(e, "login")
          }
        />
        <Form.Text id="loginHelpBlock">
          <div style={{ display: loginIsUsed }}>Логин уже используется</div>
        </Form.Text>
        {loginHelpText}
      </Form.Group>

      <Form.Group className="m-3 mb-0" controlId="formEmail">
        <Form.Label className="">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="john.jivanovich@example.com"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeInputHandler(e, "email")
          }
        />
        {emailHelpText}
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          aria-describedby="passwordHelpBlock"
        />
        {passwordHelpText}
      </Form.Group>

      <Form.Group className="m-3" controlId="formRepeatPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group
        className="d-flex justify-content-end"
        controlId="formBtnSubmit"
      >
        <Button variant="primary" type="submit" className="w-25 m-3">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
