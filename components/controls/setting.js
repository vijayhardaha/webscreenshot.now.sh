/**
 * External dependancies
 */
import classnames from "classnames";
import PropTypes from "prop-types";

const SettingRow = ({ id, className, label, desc, children }) => {
	const classNames = classnames("form-field", id, className);
	return (
		<div className={classNames}>
			<div>
				<label className="label">{label}</label>
				<p className="desc">{desc.length && desc}</p>
			</div>
			<div>{children}</div>
		</div>
	);
};

SettingRow.defaultProps = {
	id: "",
	className: "",
	label: "",
	desc: "",
};

SettingRow.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string,
};

export default SettingRow;
