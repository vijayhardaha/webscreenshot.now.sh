const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const links = [
    {
      id: "twitter",
      name: "Twitter",
      label: "Follow on Twitter",
      url: "https://twitter.com/vijayhardaha",
    },
    {
      id: "github",
      name: "Github",
      label: "Follow on Github",
      url: "https://github.com/vijayhardaha/",
    },
    {
      id: "pph",
      name: "Hire Me",
      label: "Hire me through PeoplePerHour",
      url: "https://pph.me/vijayhardaha/",
    },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-inner">
              <div className="copyright">
                <p>
                  &copy;&nbsp;{year}&nbsp;
                  <a
                    href="https://twitter.com/vijayhardaha"
                    target="_blank"
                    title="Vijay Hardaha"
                    aria-label="Contact Vijay Hardaha on Twitter"
                    data-microtip-position="top"
                    role="tooltip"
                  >
                    Vijay Hardaha
                  </a>
                </p>
              </div>
              <div className="social-links">
                <ul>
                  {links.map(({ id, name, label, url }, i) => {
                    return (
                      <li key={`social-link-${id}-${i}`}>
                        <a
                          href={url}
                          target="_blank"
                          title={name}
                          aria-label={label}
                          data-microtip-position="top"
                          role="tooltip"
                        >
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
