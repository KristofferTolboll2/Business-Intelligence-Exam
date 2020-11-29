import React, { createContext, useContext, useState } from "react";
interface Session {
    isAuthenticated?: boolean;
    redirectPathOnAuthentication?: string
    id?: string
}

export const initialSession: Session = {
    isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")),
    id: localStorage.getItem("id") || undefined
}

export const SessionContext = createContext<[Session, (session: Session)=> void]>([initialSession, () =>{}])
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = (props) => {
    const [sessionState, setSessionState] = useState(initialSession);
    const defaultSessionContext: [Session, typeof setSessionState]  = [sessionState, setSessionState];
  
    return (
      <SessionContext.Provider value={defaultSessionContext}>
        {props.children}
      </SessionContext.Provider>
    );
  }