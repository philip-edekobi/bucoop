import {
  adminCreate,
  loginAdmin as verifyAdmin,
} from "../services/User/Access.js";
import { CreateAdminSchema, LoginSchema } from "../validations/index.js";
import { httpResp, errResp } from "../utils/http.js";
import { generateToken } from "../utils/token.js";
import { getAllAdmin } from "../services/Admin/index.js";

export async function newAdmin(req, res) {
  try {
    const { error } = CreateAdminSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    let admin = await adminCreate(req.body);
    admin = { ...admin.dataValues, passwordHash: undefined };

    return httpResp(201, { admin }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}

export async function loginAdmin(req, res) {
  try {
    const { error } = LoginSchema.validate(req.body);
    if (error) {
      return errResp(400, error, res);
    }

    const adminValid = await verifyAdmin(req.body);

    if (!adminValid) {
      return errResp(404, { message: "user not found" }, res);
    }

    const token = generateToken({
      adminId: req.body.adminId,
      type: "admin",
    });

    return httpResp(200, { token }, res);
  } catch (err) {
    console.log(err);
    return errResp(500, err, res);
  }
}

export async function allAdmin(_, res) {
  try {
    let admins = await getAllAdmin();

    admins = admins.filter((admin) => admin.role !== "SuperAdmin");

    return httpResp(200, { admins }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}
