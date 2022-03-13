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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
