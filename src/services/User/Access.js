import {
  createMember,
  getMemberByMemberId,
  updateMemberByMemberId,
} from "../../database/repositories/MemberRepo.js";
import {
  createAdmin,
  getAdminByAdminId,
} from "../../database/repositories/AdminRepo.js";
import { hashPassword, comparePasswordWithHash } from "../../utils/password.js";
import { generateMemberId } from "../../utils/uname.js";

export async function memberCreate(details) {
  try {
    const pHash = await hashPassword(details.password);
    details.passwordHash = pHash;
    details.password = undefined;

    const memId = generateMemberId(details.firstname, details.lastname);
    details.memberId = memId;

    const user = await createMember(details);

    await sendRegistrationEmail(
      details.firstname + " " + details.lastname,
      details.email,
      memId,
    );

    return user;
  } catch (err) {
    throw err;
  }
}

export async function loginMember(details) {
  try {
    const member = await getMemberByMemberId(details.memberId);

    return comparePasswordWithHash(details.password, member.passwordHash);
  } catch (err) {
    throw err;
  }
}

export async function adminCreate(details) {
  try {
    const pHash = await hashPassword(details.password);
    details.passwordHash = pHash;
    details.password = undefined;

    const memId = generateMemberId(details.firstname, details.lastname);
    details.adminId = memId;

    const admin = await createAdmin(details);

    return admin;
  } catch (err) {
    throw err;
  }
}

export async function loginAdmin(details) {
  try {
    const admin = await getAdminByAdminId(details.memberId);

    return comparePasswordWithHash(details.password, admin.passwordHash);
  } catch (err) {
    throw err;
  }
}

export async function modifyUser(mid, details) {
  try {
    const user = await updateMemberByMemberId(mid, { ...details });

    return user;
  } catch (err) {
    throw err;
  }
}

export async function changeUserPassword(mid, details) {
  try {
    const mem = await getMemberByMemberId(mid);
    if (await comparePasswordWithHash(details.oldPassword, mem.passwordHash)) {
      const pHash = await hashPassword(details.newPassword);

      mem.passwordHash = pHash;
      await mem.save();

      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
}
