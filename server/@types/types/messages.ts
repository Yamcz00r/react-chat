interface User {
  temp_id: string;
  db_id: number;
  rooms: string[];
}

export interface UsersState {
  users: User[];
  setUsers: (users: User) => void;
}
