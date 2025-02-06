export const SignupValidation = (values) => {
    let issues = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (values.email === "") {
        issues.email = "Email should not be empty.";
    } else if (!email_pattern.test(values.email) && values.email.includes("@")) {
        issues.email = "Please enter a valid email.";
    } else {
        issues.email = "";
    }

    if (values.name === "") {
        issues.name = "Username should not be empty.";
    } else {
        issues.name = "";
    }

    if (values.password === "") {
        issues.password = "Password should not be empty.";
    } else if (!password_pattern.test(values.password)) {
        issues.password = "Password is not good.";
    } else {
        issues.password = "";
    }

    return issues;
};

