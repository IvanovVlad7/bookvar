import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cart from '../../pages/Cart/Cart';
import Favorites from '../../pages/Favorites/Favorites';
import SignIn from '../../pages/SignIn/SignIn';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getUser } from '../../store/selectors/selector';
import { unsetUser } from '../../store/slices/userSlice';
import Button from '../Button/Button';
import ButtonCancel from '../ButtonCancel/Buttoncancel';
import Icon from '../Icon/Icon';
import {
  StyledButton,
  StyledClose,
  StyledCloseContainer,
  StyledLink,
  StyledMenu,
  StyledMenuContainer,
  StyledMenuNav,
  StyledSearch,
  StyledInput,
} from './MenuStyles';
interface IData {
  caption: string;
}
interface IMenu {
  handleClose: () => void;
  isOpen: boolean;
}
export const Menu = ({ handleClose, isOpen }: IMenu) => {
  const { isAuth } = useAppSelector(getUser);
  const { register, handleSubmit } = useForm<IData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = (data: IData) => {
    navigate(`search/${data.caption}/1`);
  };

  const handleAuth = () => {
    if (isAuth) {
      dispatch(unsetUser());
    } else {
      navigate(`/${SignIn.URL}`);
    }
  };
  return (
    <StyledMenu open={isOpen}>
      <StyledMenuContainer>
        <StyledMenuNav>
          <StyledCloseContainer>
            <StyledClose onClick={handleClose}>
              <ButtonCancel />
            </StyledClose>
          </StyledCloseContainer>
          <StyledSearch>
            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledInput placeholder="Search" type="text" {...register('caption')} />
              <Icon id="search" />
            </form>
          </StyledSearch>
          {isAuth && <StyledLink to={`/${Favorites.URL}`}>FAVORITES</StyledLink>}
          {isAuth && <StyledLink to={`/${Cart.URL}`}>CART</StyledLink>}
          <StyledButton onClick={handleAuth}>
            <Button text={isAuth ? 'LOG OUT' : 'SIGN IN'} />
          </StyledButton>
        </StyledMenuNav>
      </StyledMenuContainer>
    </StyledMenu>
  );
};

export default Menu;
