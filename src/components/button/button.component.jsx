import "./button.styles.scss";

const button_type_classes = {
  google: "google_sign_in",
  inverted: "inverted",
};

const Button = ({ children, button_type, ...otherProps }) => {
  return (
    <button
      className={`button_container ${button_type_classes[button_type]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
