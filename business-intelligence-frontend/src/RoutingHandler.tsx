import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { About } from './components/About'
import { Dashboard } from './components/dashboard/Dashboard'
import { Help } from './components/Help'
import { Home } from './components/home/Home'
import { Insights } from './components/insights/Insights'
import { useSessionContext } from './context/SessionContext'
import { ProtectedRoute, ProtectedRouteProps } from './ProtectedRoute'
import { Navbar } from './ui/Navbar'
import { Storyboard } from './components/storyboard/Storyboard'

interface Props {
    
}

export const RoutingHandler: React.FC = (props: Props) => {
    
    const location = useLocation()
    
    const [sessionContext, updateSessionContext] = useSessionContext()
    console.log(sessionContext)

    const setRedirectPathOnAuthentication = (path: string) =>{
        console.log(path)
        updateSessionContext({...sessionContext, redirectPathOnAuthentication: path})
    }

    const defaultProtectedRouteProps: ProtectedRouteProps = {
        isAuthenticated: !!sessionContext.isAuthenticated,
        authenticationPath: '/home',
        redirectPathOnAuthentication: sessionContext.redirectPathOnAuthentication || '',
        setRedirectPathOnAuthentication
    }

    console.log(defaultProtectedRouteProps.isAuthenticated)
    return (
        <div>   
        {!defaultProtectedRouteProps.isAuthenticated &&
        <>
        <Navbar />
        <br />
        <br />
        </>
        }       
        <br />
        <Switch>
        <ProtectedRoute {...defaultProtectedRouteProps} path="/dashboard" component={Dashboard} />
        <ProtectedRoute {...defaultProtectedRouteProps} path="/insights" component={Insights} />
        <ProtectedRoute {...defaultProtectedRouteProps} path="/storyboard" component={Storyboard} />
        {!defaultProtectedRouteProps.isAuthenticated &&
        <>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Redirect from="/" to="/home" />
        </>
        }
        {defaultProtectedRouteProps.isAuthenticated &&
        <Redirect from="/" to="/dashboard" />
        }
        </Switch>
        </div>
    )
}
