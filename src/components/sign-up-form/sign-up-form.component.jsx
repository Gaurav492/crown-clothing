import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input-component";
import "./sign-up-form.styles.scss";

const form_fields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(form_fields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(form_fields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Your Password Does Not Match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email Already Exists");
      } else {
        console.log("User Creation encountered error ", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have an account?</h2>
      <span>Sign up with Email and password</span>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            labelValue="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
        </div>
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
        <div>
          <FormInput
            labelValue="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
