import './Register.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import toast, { Toaster } from 'react-hot-toast';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LuUnlock } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
  const [captchaVal, setCaptchaVal] = useState(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
    position: '',
    photo: null,
  });
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', form.username);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('cpassword', form.cpassword);
    data.append('position', form.position);
    data.append('photo', form.photo);

    try {
      if (form.password.length < 6) {
        toast.error('Password should be more than 6 characters');
      } else if (form.password !== form.cpassword) {
        toast.error('Passwords do not match!');
      } else if (form.position === '') {
        toast.error('Select your position');
      } else if (!captchaVal) {
        toast.error('Fill the Captcha');
      } else {
        await axios.post('http://localhost:8000/register', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Registration successful!');
        setTimeout(()=> {
            navigate('/login');
        }, 2000)
        

      }
    } catch (e) {
      console.log(e);
      toast.error('An error occurred during registration');
    }
  };

  return (
    <div id="register">
      <Toaster />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="login_card">
          <div className="card_title d-flex justify-content-center">
            <div className="login_lock">
              <LuUnlock />
            </div>
            <div className="login_text mt-2">
              <h4 className="text-dark fw-medium fs-4 m-0">Register</h4>
              <small className="text-dark fw-medium mt-0 p-0">
                Please enter your data to register.
              </small>
            </div>
          </div>
          <Form
            action="POST"
            method="/register"
            className="p-3"
            onSubmit={submit}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicusername">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    required
                    value={form.username}
                    type="text"
                    placeholder="iamsobahan"
                    name="username"
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    Your user name to app
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    value={form.email}
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    Your unique email address to app
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    value={form.password}
                    type="password"
                    name="password"
                    placeholder="*******"
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    Your strong password
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control
                    required
                    value={form.cpassword}
                    name="cpassword"
                    type="password"
                    placeholder="*******"
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    Please repeat your password
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Select
                  value={form.position}
                  name="position"
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  required
                >
                  <option value="">Select One</option>
                  <option value="Managing Director">Managing Director</option>
                  <option value="Ceo">Ceo</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Finance Member">Finance Member</option>
                  <option value="Sales Member">Sales Member</option>
                  <option value="Marketing Member">Marketing Member</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  Select your position
                </Form.Text>
              </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    required
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                  />
                  <Form.Text className="text-muted">
                    Upload your photo (optional)
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <ReCAPTCHA
              sitekey="6LfxbQ8qAAAAAJ8WLcCEgX_b4Ju7xUpXpDhDKKXd"
              onChange={(value) => setCaptchaVal(value)}
            />
            <br />
            <small className="me-2">Already a user?</small>
            <Link to="/login">
              <Form.Text className="text-primary fs-5">Login</Form.Text>
            </Link>
            <br />
            <Button
              size="lg"
              className="custom-bg mt-2 border-0 fs-5 fw-medium"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
