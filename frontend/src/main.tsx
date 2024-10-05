import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// @ts-ignore
import App from "./App.tsx";
// @ts-ignore
import {Modal, ModalProvider} from "./context/modal.tsx";
import configStore from "./store/index.ts";
import { Provider } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import { router } from './router';


function Root() {
    return (
        <ModalProvider>
            <Provider store={configStore}>
                <RouterProvider router={router}>
                    {/*<App />*/}
                    {/*<Modal />*/}
                </RouterProvider>
            </Provider>
        </ModalProvider>
    );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root/>
  </StrictMode>,
)
