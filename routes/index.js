import { useAuthentication } from '../utils/useAuthentication';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <AppStack /> : <AuthStack />;
}