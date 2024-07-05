import { NextResponse } from 'next/server';

export const handleExpiredSession = () => {
  return NextResponse.json(
    { message: 'For any security reason, session has expired, please re-signin!' },
    { status: 440 },
  );
};
