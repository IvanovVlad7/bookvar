import React from "react";
import Button from "../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getUser } from "../../store/selectors/selector";
import { unsetUser } from "../../store/slices/userSlice";
import {
  StyledAccount,
  StyledButton,
  StyledSubtitle,
  StyledTitle,
} from "./AccountStyles";

const Url = 'account';

const Account = () => {
  const { email } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(unsetUser());
  };
  return (
    <StyledAccount>
      <StyledTitle>ACCOUNT</StyledTitle>


    <StyledSubtitle>
      Your email: <span>{email}</span>
    </StyledSubtitle>
    <StyledButton onClick={handleLogOut}>
      <Button text="Log out" />
    </StyledButton>
  </StyledAccount>
  );
};

Account.URL = Url;

export default Account;
