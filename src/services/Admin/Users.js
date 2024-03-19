import {
  getAllMembers,
  getMemberById,
  updateMemberByMemberId,
} from "../../database/repositories/MemberRepo.js";

export async function getAllUsers() {
  try {
    const users = await getAllMembers();

    return users;
  } catch (err) {
    throw err;
  }
}

export async function approveUser(id) {
  try {
    const user = await getMemberById(id);

    const mem = await updateMemberByMemberId(user.memberId, {
      registrationStatus: true,
    });

    return mem;
  } catch (err) {
    throw err;
  }
}
