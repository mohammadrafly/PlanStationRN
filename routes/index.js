import { useAuthentication } from '../utils/hook/useAuthentication';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <AppStack /> : <AuthStack />;
}