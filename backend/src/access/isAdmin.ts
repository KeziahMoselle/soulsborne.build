export const isAdmin = ({ req: { user } }) => {
  if (user.role === 'admin') {
    return true
  }

  return false;
}