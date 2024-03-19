import { httpResp, errResp } from "../utils/http.js";
import { getAllContributions } from "../services/Contributions/index.js";

export async function allContribs(_, res) {
  try {
    const contributions = await getAllContributions();

    return httpResp(200, { contributions }, res);
  } catch (err) {
    return errResp(500, err, res);
  }
}
