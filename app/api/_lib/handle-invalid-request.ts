import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const handleInvalidRequest = (error: ZodError<unknown>) => {
  const { errors } = error;

  return NextResponse.json(
    {
      message: 'Invalid request',
      errors,
    },
    {
      status: 400,
    },
  );
};
