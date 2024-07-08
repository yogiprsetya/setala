import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const handleInvalidRequest = (error: ZodError<unknown> | string) => {
  let errorResponse;

  if (typeof error === 'string') {
    errorResponse = error;
  } else {
    const { errors } = error;
    errorResponse = errors;
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Invalid request',
      errors: errorResponse,
    },
    {
      status: 400,
    },
  );
};

export const handleDataNotFound = () => {
  return NextResponse.json(
    {
      success: false,
      message: 'Data (related) not found, please make sure passed <path> is correct!',
    },
    { status: 404 },
  );
};

export const handleExpiredSession = () => {
  return NextResponse.json(
    {
      success: false,
      message: 'For any security reason, session has expired, please re-signin!',
    },
    { status: 440 },
  );
};
