"use client"

import { FC } from "react";
import { Provider } from 'react-redux'
import { store } from "./store";

interface ProvidersProps {
    
}
 
const Providers: FC<ProvidersProps> = ({children}: any) => {
    return ( 
        <Provider store={store}>
            {children}
        </Provider>
    );
}
 
export default Providers;