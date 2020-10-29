const path = require('path');
const nunjucks = require('nunjucks');
const MailService = require('./mail.service');
const UserService = require('./user.service');

const TEMPLATE_PATH = path.resolve(__dirname, "../templates"); 
nunjucks.configure(TEMPLATE_PATH, { autoescape: true });

exports.contactFormTemplate = async(userMail) => {
    try {
        const userFormData = await UserService.getUserForm({ email: userMail });
        console.log(userFormData);
        console.log(`Sending Email to ${userMail}`);
        const emailOptions = {
            from: process.env.SENDER_MAIL,
            to: userMail,
            subject: 'Test Email',
            html: TemplateForm(userFormData)
        }
        const sendMail = await MailService.sendMail(emailOptions);
        if(sendMail) {
            console.log(`Email Sent Successfully to ${userMail}`);
        } 
    } catch(err) {
        console.log('Error', err);
    }
}

const TemplateForm = (data) => {
    console.log('data', data);
    const profile_pic = `http://localhost:5000/uploads/${data.photo}`;
    const resumeLink = `http://localhost:5000/uploads/${data.resume}`;
    return nunjucks.render('form_template.html', {
        // form: {
        //     first_name: 'Minazuddin',
        //     last_name: data.last_name,
        //     email: data.email,
        //     contact_number: data.contact_number,
        //     dob: data.dob,
        //     interested_in: data.interested_in,
        //     qualification: data.qualification,
        //     company: data.company,
        //     designation: data.designation,
        //     from: data.from,
        //     to: data.to,
        //     last_month_sal: data.last_month_sal,
        //     expected_monthly_sal: data.expected_monthly_sal,
        //     possible_month_of_joining: data.possible_month_of_joining,
        //     additional_info: data.additional_info,
        //     resumeLink: resumeLink,
        //     profile_pic: profile_pic
        // }
        data,
        resumeLink,
        profile_pic
    });
}
