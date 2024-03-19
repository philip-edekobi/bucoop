import { models } from "../initDB.js";

const Member = models.Member;

export async function createMember(memberDetails) {
  try {
    const member = await Member.create({ ...memberDetails });

    return member;
  } catch (err) {
    throw err;
  }
}

export async function getAllMembers() {
  try {
    const members = await Member.findAll();

    return members;
  } catch (err) {
    throw err;
  }
}

export async function getMemberById(id) {
  try {
    const member = await Member.findOne({
      where: { id },
    });

    return member;
  } catch (err) {
    throw err;
  }
}

export async function getMemberByMemberId(mid) {
  try {
    const member = await Member.findOne({
      where: { memberId: mid },
    });

    return member;
  } catch (err) {
    throw err;
  }
}

export async function updateMemberByMemberId(mid, updateProps) {
  try {
    let members = await Member.update(
      { ...updateProps },
      {
        where: { memberId: mid },
        plain: true,
        returning: true,
      },
    );

    members = members.filter(
      (member) => member && member.dataValues.id !== mid,
    );

    return members[0];
  } catch (err) {
    throw err;
  }
}
