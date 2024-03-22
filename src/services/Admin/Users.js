import {
  getAllMembers,
  getMemberById,
  updateMemberByMemberId,
} from "../../database/repositories/MemberRepo.js";
import { sendRegistrationEmail } from "../../utils/email.js";

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

    await sendRegistrationEmail(
      details.firstname + " " + details.lastname,
      details.email,
      user.memberId,
    );

    return mem;
  } catch (err) {
    throw err;
  }
}
