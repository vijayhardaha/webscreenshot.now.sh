/**
 * External dependancies
 */
import classnames from "classnames";
import PropTypes from "prop-types";

const TextInput = ({
  id,
  type,
  placeholder,
  onChange,
  className,
  value,
  ...props
}) => {
  const classNames = classnames("input-control", className, {
    "text-input": type === "text",
    "number-input": type === "number",
  });
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={classNames}
    />
  );
};

TextInput.defaultProps = {
  type: "text",
  className: "",
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  type: PropTypes.oneOf(["text", "number"]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default TextInput;
