import "./Login.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LuUnlock } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from "react";

const Login = () => {
  const [captcha, setCaptcha] = useState(false)
    return (
      <div id="login">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="login_card">
            <div className="card_title d-flex justify-content-center">
              <div className="login_lock">
                <LuUnlock />
              </div>
              <div className="login_text mt-2">
                <h4 className="text-dark fw-medium fs-4 m-0">Login</h4>
                <small className="text-dark fw-medium mt-0 p-0">
                  Please enter your credentials to login.
                </small>
              </div>
            </div>
            <Form action="POST" method="/login" className="p-3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="example@gmail.com" />
                <Form.Text className="text-muted">
                  Your unique email address to app
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="*******" />
                <Form.Text className="text-muted">
                  Your strong password
                </Form.Text>
              </Form.Group>
              <div className="d-flex align-items-center">
                <Link>
                  <Form.Text className="text-primary me-3">
                    Forget you password?
                  </Form.Text>
                </Link>
                <Link to="/register">
                  <Form.Text className="text-primary fs-5">
                    create new account
                  </Form.Text>
                </Link>
              </div>
              <ReCAPTCHA sitekey="6LfxbQ8qAAAAAJ8WLcCEgX_b4Ju7xUpXpDhDKKXd"/>
              
              <Link to="/register" className="me-3"></Link>
              <Link to="/login" className="me-3">
                <Button
                  size="lg"
                  className="custom-bg mt-3 border-0 fs-5 fw-medium"
                  type="submit"
                >
                  Submit
                </Button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
};

export default Login;