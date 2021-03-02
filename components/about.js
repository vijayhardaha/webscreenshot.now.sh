const About = () => {
  return (
    <section id="about-section" className="about">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <h1 className="section-title">About</h1>
              <div className="section-content">
                <p>
                  Web Screenshot is a free tool that offers you to capture
                  beautiful and high-quality screenshot images of any web page
                  on the internet. It also offers to capture Twitter tweets that
                  are publicly visible.
                </p>
                <p>
                  This tool will not be able to capture any pages that required
                  login or any kind of security validation. Also if any website
                  has Dynamic content such as GoogleMaps, Youtube Or Flash
                  content then it might be not able to give you the best result.
                </p>
                <p>
                  You can choose your interested media device from option or can
                  set custom media size and also can choose the image quality if
                  you need high-resolution images for your work.
                </p>
                <p>
                  This tool is using{" "}
                  <a href="https://github.com/puppeteer/puppeteer">puppeteer</a>{" "}
                  package for generating the screenshot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
