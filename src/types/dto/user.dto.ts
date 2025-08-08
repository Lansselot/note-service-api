export type UpdateUserDTO = {
  name?: string;
  email?: string;
};

export type ChangeEmailDTO = {
  newEmail: string;
  password: string;
};

export type ChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};
