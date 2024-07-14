import Button from "react-bootstrap/esm/Button";
import banner from "../../assets/banner.jpg"
import "./Banner.css"
import { Link } from "react-router-dom";

const Banner = () => {
    return (
      <div id="banner">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="banner_contents_left w-50">
              <h3 className="text-uppercase">
                Welcome To SMART FLUID TECH's CRM
              </h3>
              <p className="mt-3 w-75">
                CRM for centralize data, improve service, streamline sales,
                automate marketing, enhance retention, offer analytics, boost
                productivity, and provide insights.
              </p>
              <Link to="/register">
                <Button className="btn-custom fw-bold text-capitalize">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="banner_contents_right w-50 text-end">
              <img className="img-fluid" src={banner} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;