import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactElement;
};

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [previousSessionStatus, setPreviousSessionStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && previousSessionStatus !== (isAuthenticated ? 'authenticated' : 'unauthenticated')) {
      if (!isAuthenticated && window.location.pathname.startsWith('/')) {
        loginWithRedirect();
      } else if (isAuthenticated && window.location.pathname.startsWith('/')) {
        window.location.href = '/dashboard';
      }
      setPreviousSessionStatus(isAuthenticated ? 'authenticated' : 'unauthenticated');
    }
  }, [isAuthenticated, isLoading, previousSessionStatus, loginWithRedirect]);

  return isAuthenticated ? <>{children}</> : <>{children}</>;
};