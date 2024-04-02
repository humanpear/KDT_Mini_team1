export type LoginUser = {
  member_id: number;
  name: string;
  profile_image: string;
  type: string;
  username: string;
};

export type SignUpData = {
  name: string;
  username: string;
  profile_image: string;
  password: string;
};
