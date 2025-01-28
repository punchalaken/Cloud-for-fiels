import { Button, Form } from "react-bootstrap";

export default function LoginForm() {
  return (
    <Form
      className="position-absolute border border-info-subtle rounded-4 shadow fs-6"
      style={{ width: 300 }}

    >
      <Form.Group className="m-3 mb-0">
        <Form.Label className="">Login</Form.Label>
        <Form.Control type="text" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="m-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="d-flex justify-content-end">
        <Button variant="primary" type="submit" className="m-3">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
