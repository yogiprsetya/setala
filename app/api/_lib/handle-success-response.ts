import { NextResponse } from 'next/server';

export const handleSuccessResponse = (data: unknown) => {
  return NextResponse.json({ success: true, data });
};
