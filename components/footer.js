const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const links = [
    {
      id: "twitter",
      name: "Twitter",
      url: "https://twitter.com/vijayhardaha",
    },
    {
      id: "github",
      name: "Github",
      url: "https://github.com/vijayhardaha/",
    },
    {
      id: "pph",
      name: "Hire Me",
      url: "https://pph.me/vijayhardaha/",
    },
  ];

  return (
    <>
      <svg
        className="footer-svg"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1152 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-144 224L-122.2 208C-100.4 192 -57 160 -13 138.7C30.5 117 74 107 118 128C161.5 149 205 203 249 208C292.4 213 336 171 380 160C423.3 149 467 171 511 181.3C554.2 192 598 192 641 197.3C685.1 203 729 213 772 192C816 171 860 117 903 122.7C946.9 128 991 192 1034 192C1077.8 192 1121 128 1165 101.3C1208.7 75 1252 85 1274 90.7L1296 96V320H1274.2C1252.4 320 1209 320 1165 320C1121.5 320 1078 320 1034 320C990.5 320 947 320 903 320C859.6 320 816 320 772 320C728.7 320 685 320 641 320C597.8 320 554 320 511 320C466.9 320 423 320 380 320C336 320 292 320 249 320C205.1 320 161 320 118 320C74.2 320 31 320 -13 320C-56.7 320 -100 320 -122 320H-144V224Z"
          fill="#2D8FFA"
        />
      </svg>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-inner">
                <div className="copyright">
                  <p>&copy; {`2020-${year} Vijay Hardaha`}</p>
                </div>
                <div className="social-links">
                  <ul>
                    {links.map(({ id, name, url }, i) => {
                      return (
                        <li key={`social-link-${id}-${i}`}>
                          <a href={url} target="_blank" title={name}>
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
    </>
  );
};

export default Footer;
