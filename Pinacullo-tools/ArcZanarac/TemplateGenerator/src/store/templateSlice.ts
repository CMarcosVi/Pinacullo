import { configureStore, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

/* ---------- Tipos ---------- */
export interface SectionCode {
  html: string;
  css: string;
  js: string;
  php: string;
}

export interface SelectedItem {
  id: string;
  group: string;
  name: string;
  code: SectionCode;
}

interface TemplateState {
  selectedSections: SelectedItem[];
}

const initialState: TemplateState = {
  selectedSections: [],
};

/* ---------- Slice ---------- */
const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    // Adiciona uma nova seção com id gerado
    addSection: {
      reducer: (state, action: PayloadAction<SelectedItem>) => {
        state.selectedSections.push(action.payload);
      },
      prepare: (payload: Omit<SelectedItem, 'id'>) => ({
        payload: {
          ...payload,
          id: nanoid(),
        },
      }),
    },

    // Atualiza uma seção pelo ID
    updateSection: (state, action: PayloadAction<{ id: string; updates: Partial<SelectedItem> }>) => {
      const section = state.selectedSections.find(sec => sec.id === action.payload.id);
      if (section) {
        Object.assign(section, action.payload.updates);
      }
    },

    // Remove seção por índice (posição)
    removeSection: (state, action: PayloadAction<number>) => {
      state.selectedSections.splice(action.payload, 1);
    },

    // Mover para cima
    moveSectionUp: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i > 0) {
        [state.selectedSections[i - 1], state.selectedSections[i]] =
          [state.selectedSections[i], state.selectedSections[i - 1]];
      }
    },

    // Mover para baixo
    moveSectionDown: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i < state.selectedSections.length - 1) {
        [state.selectedSections[i + 1], state.selectedSections[i]] =
          [state.selectedSections[i], state.selectedSections[i + 1]];
      }
    },

    // Limpa todas as seções
    clearSections: (state) => {
      state.selectedSections = [];
    },
  },
});

export const templateActions = templateSlice.actions;

/* ---------- Store ---------- */
export const store = configureStore({
  reducer: {
    template: templateSlice.reducer,
  },
});

/* ---------- Hooks Tipados ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
