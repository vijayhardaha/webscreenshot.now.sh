/**
 * External dependancies
 */
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectInput = ({ id, options, onChange, className, value, ...props }) => {
  const classNames = classnames("input-control", "select-control", className);
  return (
    <select id={id} type={type} onChange={onChange} className={classNames} />
  );
};

SelectInput.defaultProps = {
  type: "text",
  className: "",
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default SelectInput;
