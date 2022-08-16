import { useEffect } from 'react';
import BookCart from '../BookCart/BookCart';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getNewBooks, getNewBooksStatus } from '../../store/selectors/selector';
import { fetchNewBooks } from '../../store/slices/newBooksSlice';
import Loading from '../Loading/Loading';
import { StyledBooks, StyledNewBooks, StyledTitle } from './NewBookStyles';
const NewBooks = () => {
  const newBooks = useAppSelector(getNewBooks);
  const status = useAppSelector(getNewBooksStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNewBooks());
  }, []);
 

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <div>Error: </div>;
  }

  return (
    <StyledNewBooks>
      <StyledTitle>NEW RELEASES BOOKS</StyledTitle>
      <StyledBooks className="list-group">
        {newBooks.books.map((book) => <BookCart key={book.isbn13} book={book} />)}
      </StyledBooks>
    </StyledNewBooks>
  );
};

export default NewBooks;
