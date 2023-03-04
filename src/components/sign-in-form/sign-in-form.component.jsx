import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input-component";
import "./sign-in-form.styles.scss";

const form_fields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  };

  const [formFields, setFormFields] = useState(form_fields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(form_fields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password!");
          break;
        case "auth/user-not-found":
          alert("No user assocciated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with Email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            labelValue="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
        </div>
        <div>
          <FormInput
            labelValue="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>
        <div className="buttons_container">
          <Button type="submit">Sign in</Button>
          <Button type="button" button_type="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
