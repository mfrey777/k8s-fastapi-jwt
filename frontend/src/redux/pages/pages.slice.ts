// Ideas
// https://stackoverflow.com/questions/48978394/redux-state-shape-for-managing-multiple-react-component-instances

import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

// function uuidv4() {
//   return String(1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// }

export interface PageInfo {
  title: string;
  key: string;
  component: string;
  props: Record<string, string | number>;
}

export interface AddNewPage {
  id: string;
  page: PageInfo;
}

export interface RemovePage {
  id: string;
}

export interface PagesState {
  // pages: Record<string, PageInfo> | undefined;
  pages: Record<string, PageInfo>;
  status: string;
}

export interface addPageMessage {
  title: string;
  key: string;
  component: string;
  props: Record<string, string | number>;
}

const initialState: PagesState = {
  pages: {
    '1': {
      title: 'tab 1',
      key: '1',
      component: 'test',
      props: {},
    },
    '2': {
      title: 'tab 2',
      key: '2',
      component: 'dummy',
      props: { text: 'dummy tab 2 prop' },
    },
    '3': {
      title: 'tab 3',
      key: '3',
      component: 'dummy',
      props: { text: 'dummy tab 3 prop' },
    },
    '4': {
      title: 'tab 4',
      key: '4',
      component: 'dummy',
      props: { text: 'dummy tab 4 prop' },
    },
    '5': {
      title: 'tab 5',
      key: '5',
      component: 'report',
      props: {},
    },
  },
  // pages: <Record<string, PageInfo>>{},
  status: 'inital',
};

const pages = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage(state, action: PayloadAction<AddNewPage>) {
      state.status = 'added';
      state.pages[action.payload.id] = action.payload.page;
    },
    removePage(state, action: PayloadAction<RemovePage>) {
      state.status = 'removed';
      delete state.pages[action.payload.id];
    },
  },
});

export const protectedApiStart = createAction<addPageMessage>(
  'pages/addPageStart'
);

export const { addPage, removePage } = pages.actions;

export default pages.reducer;
