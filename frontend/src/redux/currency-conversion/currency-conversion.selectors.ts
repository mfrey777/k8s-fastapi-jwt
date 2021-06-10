import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

// input selector
const selectCurrencyConversion = (state: RootState) => state.currencyConversion;
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

export const selectConvertedData = createSelector(
  [selectCurrencyConversion],
  (field) => field.converted_data
);

// export const selectConvertedDataHeader = createSelector(
//   [selectConvertedDataFields],
//   (field) => field.mame
// );
