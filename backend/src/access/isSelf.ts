import { User } from "payload/generated-types"
import { FieldAccess } from "payload/types"

export const isSelf = ({ req: { user }, id }) => user.id === id

export const isSelfFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
  req: { user },
  id,
}) => {
  if (user?.id === id) return true
  return false
}