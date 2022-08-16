import React from "react";
import "./Favorites.scss";
import { useNavigate } from "react-router-dom";
import FavoriteBook from "../../components/FavoriteBook/FavoriteBook";
import Icon from "../../components/Icon/Icon";
import { useAppSelector } from "../../store/hooks/hooks";
import { getFavoriteBooks } from "../../store/selectors/selector";

import {
  StyledBackButton,
  StyledFavorites,
  StyledText,
  StyledTitle,
} from "./FavoritesStyles";

interface IFavoriteBook {
  image: string;
  title: string;
  authors: string;
  year: string;
  price: string;
  isbn13: string;
  rating: string;
}

const Url = 'favorites';

const Favorites = () => {
  const navigate = useNavigate();
  const favoriteBooks: IFavoriteBook[] = useAppSelector(getFavoriteBooks);


  const handleBack = () => {
    navigate(-1);
  };
  return (
    <StyledFavorites>
      <StyledBackButton onClick={handleBack}>
        <Icon id="back" />
      </StyledBackButton>
      <StyledTitle>FAVORITES</StyledTitle>
      {favoriteBooks.length === 0 ? (
        <StyledText>You have not favorite books!</StyledText>
      ) : (
        favoriteBooks.map((book) => (
          <FavoriteBook key={book.isbn13} book={book} />
        ))
      )}
    </StyledFavorites>
  );
};

Favorites.URL = Url;
export default Favorites;
