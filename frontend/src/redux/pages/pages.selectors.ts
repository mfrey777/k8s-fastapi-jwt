import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';
// import { PagesState } from './pages.slice';

// working version
const selectSlice = (state: RootState) => state.pages;

export const selectPages = createSelector(selectSlice, (slice) => slice.pages);

// export const selectPage = createSelector(
//   selectSlice,
//   (_: any, pageId: string) => pageId,
//   (slice: PagesState, pageId) => slice.pages[pageId]
// );

export const createSelectPage = (pageId: string) =>
  createSelector(selectSlice, (slice) => slice.pages[pageId]);

// export const Page = ({ id: any }) => {
//   const selectPage = React.useMemo(() => createSelectPage(id), [id]);
//   const page = useSelector(selectPage);
// };

// Cleaner version
// function createParameterSelector(selector: any) {
//   return (_: any, params: any) => selector(params);
// }

// const getPageIdParam = createParameterSelector((params: any) => params.pageId);

// const selectSlice = (state: RootState) => state.pages;

// export const selectPage = createSelector(
//   selectSlice,
//   getPageIdParam,
//   (slice: PagesState, pageId: string) => slice.pages[pageId]
// );
