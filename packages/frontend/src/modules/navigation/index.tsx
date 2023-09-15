import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import HomePage from '../home';
import Todo from '../todos/todo-page';
import { NotFound } from '../not-found';
import RequireAuth from './require-auth';
import Login from '../auth/login';
import Register from '../auth/register';
import Verify from '../auth/verify-email';
import Todos from '../todos/todos-page';
import ChangePassword from '../auth/change-password';
import ResetPassword from '../auth/reset-password';
import AuthErrorBoundary from '../auth/error-boundary';

export const MainRouter = () => (
  <Router>
    <Routes>
      <Route element={<HomePage />} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route
        element={
          <AuthErrorBoundary>
            <Todos />
          </AuthErrorBoundary>
        }
        path={APP_KEYS.ROUTER_KEYS.TODOS}
      />
      <Route
        element={
          <AuthErrorBoundary>
            <Todo />
          </AuthErrorBoundary>
        }
        path={APP_KEYS.ROUTER_KEYS.TODO(':id')}
      />
      <Route element={<RequireAuth reverse />}>
        <Route element={<Register />} path={APP_KEYS.ROUTER_KEYS.REGISTER} />
        <Route element={<Login />} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
        <Route element={<Verify />} path={APP_KEYS.ROUTER_KEYS.VERIFY_EMAIL} />
        <Route element={<ResetPassword />} path={APP_KEYS.ROUTER_KEYS.RESET_PASSWORD} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          element={
            <AuthErrorBoundary>
              <ChangePassword />
            </AuthErrorBoundary>
          }
          path={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD}
        />
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  </Router>
);
