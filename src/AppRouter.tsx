import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";

import Search from "./pages/Search/Search";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import DetailsBook from "./pages/DetailsBook/DetailsBook";
import { useAppSelector } from "./store/hooks/hooks";
import { getUser } from "./store/selectors/selector";

function SecuredRoute(props:any) {
  const { isAuth, } = useAppSelector(getUser);
  if (isAuth) {
    return props.children;
  }
  return <Navigate replace to={`/${SignUp.URL}`} />;
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path={Home.URL} element={<Home />}></Route>
          <Route path={SignIn.URL} element={<SignIn />}></Route>
          <Route path={SignUp.URL} element={<SignUp />}></Route>
          <Route path={Search.URL} element={<Search />}></Route>
          <Route path={DetailsBook.URL} element={<DetailsBook />}></Route>
          <Route path={Favorites.URL} element={<SecuredRoute><Favorites /></SecuredRoute>}></Route>
          <Route path={Cart.URL} element={<SecuredRoute><Cart /></SecuredRoute>}></Route>
          <Route path={Account.URL} element={<SecuredRoute><Account /></SecuredRoute>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
