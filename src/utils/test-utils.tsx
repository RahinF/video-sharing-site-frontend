import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppStore, RootState, setupStore } from '../app/store';
import { GlobalProvider } from '../context/GlobalContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <GlobalProvider>{children}</GlobalProvider>
        </Provider>
      </BrowserRouter>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
