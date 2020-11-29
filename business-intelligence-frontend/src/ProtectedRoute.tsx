import React from 'react'
import { Route, Redirect, RouteProps, useLocation, useRouteMatch } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
    redirectPathOnAuthentication: string;
    setRedirectPathOnAuthentication: (path: string) => void;
    queryParam?: string
}


export const ProtectedRoute: React.FC<ProtectedRouteProps> = props =>{

   
    const currentLocation = useLocation();

    const match = useRouteMatch(currentLocation.pathname);

    const { queryParam } = props; 

    console.log(match?.params);
    console.log(queryParam)
    
    let redirectpath = props.redirectPathOnAuthentication || props.path;

    console.log(props.path)
    if(!props.isAuthenticated){
        props.setRedirectPathOnAuthentication(currentLocation.pathname);
        redirectpath = props.authenticationPath;
    }




        if(redirectpath !== currentLocation.pathname){
            const renderComponent = () =>  <Redirect to={{pathname: redirectpath}} />
            return <Route {...props} component={renderComponent} render={undefined} />
        }else{
            return <Route {...props} />
        }
    }