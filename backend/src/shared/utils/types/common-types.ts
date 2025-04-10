export type QueryRuleProps = {
  key: string;
  type: 'string' | 'boolean' | 'array' | 'regex' | 'search' | 'limit' | 'page';
  field?: string;
};

export interface UserProps {
  _id: any;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar_url: string;
  is_admin: boolean;
  date_registered: Date;
}

