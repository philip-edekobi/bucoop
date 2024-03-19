import f from "form-data";
import Mailgun from "mailgun.js";

export async function sendRegistrationEmail(name, emailAddr, uname) {
  try {
    const mg_uname = process.env.MAILGUN_UNAME || "";
    const mg_key = process.env.MAILGUN_KEY || "";
    const fromEmail = process.env.FROM_MAIL || "";

    const mailgun = new Mailgun(f);

    const mg = mailgun.client({
      username: mg_uname,
      key: mg_key,
    });

    await mg.messages.create(mg_uname, {
      from: fromEmail,
      to: emailAddr,
      subject: `BUCOOP: Welcome ${name}`,
      text: `Your identification name for login is ${uname}`,
    });
  } catch (err) {
    throw err;
  }
}
