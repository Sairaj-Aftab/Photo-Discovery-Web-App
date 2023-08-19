// Email validation
export const isEmail = (email) => {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    email
  );
};

// Mobile Number Validation
export const isPhoneNumber = (number) => {
  return /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(number);
};

// Validate User Name
export const validateUserName = (user) => {
  return /^[a-zA-Z0-9_]{3,20}$/.test(user);
};

export const generateUsername = (fullName, existingUsernames) => {
  // Process full name
  const processedName = fullName.replace(/\s+/g, "_").toLowerCase();

  // Check for uniqueness
  let username = processedName;
  let counter = 1;
  while (existingUsernames.includes(username)) {
    username = `${processedName}${counter}`;
    counter++;
  }

  return username;
};
