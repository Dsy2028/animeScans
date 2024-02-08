import notifications from "./models/email.model.js";

export const testEmail = async (req, res, next) => {
    try {
        const emails = await notifications.find();
        emails.map((email) =>(
            console.log(email.email)
        ))
        res.status(200).json({emails});
    } catch (error) {
        res.status(500).json({error})
    }

}

