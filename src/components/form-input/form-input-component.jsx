import "./form-input.styles.scss";

const FormInput = ({ labelValue, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {labelValue && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {labelValue}
        </label>
      )}
    </div>
  );
};

export default FormInput;
