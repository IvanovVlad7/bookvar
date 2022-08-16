import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/slices/userSlice";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  StyledContainer,
  StyledError,
  StyledErrorLabel,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledSign,
  StyledTab,
  StyledTabs,
} from "./SignInStyles";
import Account from "../Account/Account";
import SignUp from "../SignUp/SignUp";

interface ISignIn {
  email: string;
  password: string;
}

const Url = "sign-in";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    mode: "onChange",
  });
  const onSubmit = (data: ISignIn) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential: { user: { email: any; }; }) => {
        dispatch(setUser(userCredential.user.email));
        navigate(`/${Account.URL}`);
      })
      .catch((error: { code: any; }) => {
        const errorCode = error.code;

        if (errorCode === "auth/wrong-password") {
          setError("The password you entered is incorrect! Please try again.");
        }
        if (errorCode === "auth/user-not-found") {
          setError("The email you entered is incorrect! Please try again.");
        }
      });
  };
  return (
    <StyledSign>
    <StyledTabs>
      <StyledTab>SIGN IN</StyledTab>
      <StyledTab onClick={() => navigate(`/${SignUp.URL}`)}>
        SIGN UP
      </StyledTab>
    </StyledTabs>
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {error && <StyledError>{error}</StyledError>}
      <StyledContainer>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <StyledInput
          {...register("email", {
            required: "Email is require field!",
            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter valid email!",
            },
          })}
          placeholder="Your email"
          id="email"
        />
        {errors?.email && (
          <StyledErrorLabel>
            {errors?.email?.message || "Error"}
          </StyledErrorLabel>
        )}
      </StyledContainer>
      <StyledContainer>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          {...register("password", {
            required: "Password is require field!",
            minLength: {
              value: 6,
              message: "Minimum 8 characters!",
            },
          })}
          placeholder="Your password"
          id="password"
          type="password"
        />
        {errors?.password && (
          <StyledErrorLabel>
            {errors?.password?.message || "Error"}
          </StyledErrorLabel>
        )}
      </StyledContainer>
      <Button text="SIGN IN" />
    </StyledForm>
  </StyledSign>
);
};

SignIn.URL = Url;

export default SignIn;
