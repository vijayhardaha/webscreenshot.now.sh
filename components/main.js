/**
 * Internal dependancies
 */
import Header from "./header";
import Form from "./form";

const Main = () => {
  return (
    <main id="main" className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className="content">
              <Header />
              <div className="divider"></div>
              <Form />
              <div className="divider"></div>
              <div className="alert alert-primary" role="alert">
                <h2 className="fw-bold mb-3">Important Notes:</h2>
                <ul className="mb-0">
                  <li>{`If you are using tweets url, then only "Format" setting will work, set will be ignored.`}</li>
                  <li>{`There is 10 seconds timeout, if screenshot job is taking more then 10 seconds it will fail.`}</li>
                  <li>{`Use JPG in most cases, PNG will throw error many times`}</li>
                  <li>{`If using full screen then use only JPG, PNG will throw error`}</li>
                  <li>{`If trying to screenshot a slow website then time limit will throw error.`}</li>
                  <li>{`If website has ads the chances of failing are high.`}</li>
                  <li>{`Use HD Quality only on small screen sizes`}</li>
                </ul>
              </div>
              <div className="divider"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
