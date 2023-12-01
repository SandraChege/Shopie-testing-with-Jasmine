import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { sqlConfig } from "../config/sqlConfig";
import { sendMail } from "../helpers/emailhelpers";

export const welcomeUser = async () => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const users = await (
      await pool.request().query("SELECT * FROM Users WHERE email = email")
    ).recordset;

    console.log(users);
    /**
     * the data is html
     */
    for (let individualuser of users) {
      ejs.renderFile(
        "template/resetpassword.ejs",
          { Name: individualuser.userName },
        // { id: individualuser.userID }
        async (error, data) => {
          let mailOptions = {
            from: process.env.EMAIL as string,
            to: individualuser.email,
            subject: "Reset Password",
            html: data,
          };

          try {
            await sendMail(mailOptions);

            /**
             * change state of receiving email
             */
            await pool
              .request()
              .query(
                "UPDATE Users SET resetPassword = 1 WHERE resetPassword = 0"
              );

            console.log("Emails send to reset password");
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  } catch (error) {
    console.log("error is ", error);
  }
};
