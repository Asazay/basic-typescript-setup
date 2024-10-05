import React from 'react';
import { Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "../context/modal";
import Navigation from "../components/Navigation/Navigation.tsx";

interface Props {}

export const Layout = (_props: Props) => {
    return (
        <>
            <ModalProvider>
                <Navigation/>
                {<Outlet />}
                <Modal />
            </ModalProvider>
        </>
    );
}