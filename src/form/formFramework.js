export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  };
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (validation.email) {
    const regexp = /^([a-z0-9_-]+)@([a-z0-9_-]+)\.([a-z]{2,6})$/;
    isValid = regexp.test(String(value).toLowerCase()) && isValid;
  }

  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  const fC = { ...formControls };

  let isFormValid = true;

  Object.keys(fC).forEach((name) => {
    isFormValid = fC[name].valid && isFormValid;
  });

  return isFormValid;
}
