'use client';

import { Suspense } from 'react';
import { LoginForm } from '../_components/_SiginForm';

const SigninPage = () => (
  <Suspense>
    <LoginForm />
  </Suspense>
);

export default SigninPage;
