import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';

// input selector
const selectSlice = (state: RootState) => state.cashFlow;
// const selectConvertedDataFields = (state: RootState) =>
//   state.currencyConversion.converted_data.schema.fields;

// memoized selector
// export const selectAllCurrencyConversion = createSelector(
//     [selectState],
//     (field) => field.currencyConversion
// );

// export const selectAllCurrencyConversion2 = createSelector(
//     [selectCurrencyConversion],
//     (field) => field
// );

export const selectCalculatedData = createSelector(
  [selectSlice],
  (field) => field.data
);

export const selectCalculatedDataHtml = createSelector(
  [selectSlice],
  (field) => field.data_html
);

// export const selectConvertedDataHeader = createSelector(
//   [selectConvertedDataFields],
//   (field) => field.mame
// );
