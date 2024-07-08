import { Session } from 'next-auth';

export interface UserSession extends Session {
  user: Session['user'] & {
    id: string;
  };
}
