/**
 * External dependancies
 */
import classnames from "classnames";
import PropTypes from "prop-types";

const SwitchInput = ({ id, checked, className, onChange, ...props }) => {
  const classNames = classnames("switch-input", className, {
    "is-checked": checked,
  });
  const btnClasses = classnames("btn", {
    "btn-success": checked,
    "btn-light": !checked,
  });
  return (
    <div className={classNames}>
      <input
        key={`checkbox-input-switch-${id}`}
        id={id}
        className="checkbox-input"
        type="checkbox"
        onChange={onChange}
      />
      <label className={btnClasses} htmlFor={id}>
        {checked ? "Yes" : "No"}
      </label>
    </div>
  );
};

SwitchInput.defaultProps = {
  id: "",
  className: "",
  checked: false,
};

SwitchInput.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SwitchInput;
