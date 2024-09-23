export interface roleguard_user {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'member';
  }
  