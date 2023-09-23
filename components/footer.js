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
			label: "Hire me",
			url: "https://pph.me/vijayhardaha/",
		},
	];

	return (
		<footer className="site-footer">
			<div className="container">
				<div className="row">
					<div className="col-12 col-lg-10 offset-lg-1">
						<div className="footer-inner">
							<div className="copyright">
								<p>
									&copy;&nbsp;{year}&nbsp;
									<a
										href="https://twitter.com/vijayhardaha"
										target="_blank"
										rel="noopener noreferrer"
										title="Vijay Hardaha"
									>
										Vijay Hardaha
									</a>
								</p>
							</div>
							<div className="social-links">
								<ul>
									{links.map(
										({ id, name, label, url }, i) => {
											return (
												<li
													key={`social-link-${id}-${i}`}
												>
													<a
														href={url}
														target="_blank"
														title={label}
														rel="noopener noreferrer"
													>
														{name}
													</a>
												</li>
											);
										}
									)}
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
