import { isAdminRoute, isAuthRoute, isRoute, redirect } from './utils/router/routing';
import Auth from './components/auth/Auth.svelte';
import Home from './components/home/Home.svelte';
import { isAdmin, isLoggedIn } from './stores/auth';
import UserList from './components/admin/UserList.svelte';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/admin/users',
    name: 'UserList',
    component: UserList,
    isAdmin: true,
  },
];

const beforeRoute = () => {
  if (!isRoute()) {
    return redirect('Home');
  }

  if (isLoggedIn() && isAuthRoute()) {
    return redirect('Home');
  }

  if (isAdminRoute() && !isAdmin()) {
    return redirect('Home');
  }
};

export default routes;
export { beforeRoute };
