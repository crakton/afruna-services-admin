"use client"

import { FC } from "react";
import { Provider } from 'react-redux'
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
    
}
 
const Providers: FC<ProvidersProps> = ({children}: any) => {
    return ( 
        <Provider store={store}>
            <ToastContainer />
            {children}
        </Provider>
    );
}
 
export default Providers;