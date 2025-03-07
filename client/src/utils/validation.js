const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    return password.length >= 6; // Minimum length of 6 characters
};

const validateMobileNumber = (mobile) => {
    const re = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return re.test(String(mobile));
};

const validateCSVFile = (file) => {
    const validExtensions = ['csv', 'xlsx', 'xls'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
};

const validateAgentData = (agent) => {
    const { name, email, mobile, password } = agent;
    if (!name || !validateEmail(email) || !validateMobileNumber(mobile) || !validatePassword(password)) {
        return false;
    }
    return true;
};

export { validateEmail, validatePassword, validateMobileNumber, validateCSVFile, validateAgentData };