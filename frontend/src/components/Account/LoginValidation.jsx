export const Validation = (values) => {
    let issues = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (values.email === "") {
        issues.email = "Email or Username should not be empty.";
    } else if (!email_pattern.test(values.email) && values.email.includes("@")) {
        issues.email = "Please enter a valid email.";
    } else if (!email_pattern.test(values.email) && !values.email.includes("@")) {
        issues.email = "Invalid email or username.";
    } else {
        issues.email = "";
    }

    if (values.password === "") {
        issues.password = "Password should not be empty.";
    } else if (!password_pattern.test(values.password)) {
        issues.password = "Password didn't match, please try again.";
    } else {
        issues.password = "";
    }

    return issues;
}
