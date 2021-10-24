const validationRules = {
  alphanumeric (value) {
    if (/[^a-zA-Z0-9_]/.test(value))
      return 'Only alphabets, numbers, and underscores are allowed.';
    return '';
  },
  email (value) {
    if (
      value.length > 320 ||
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    )
      return 'Invalid email.';

    return '';
  },
  url (value) {
    if (/^http:\/\//.test(value)) return 'Always use HTTPS.';
    if (value.length > 255) return 'Use shorter url';

    if (
      // eslint-disable-next-line
      !/(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,10})\b(?:\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gim.test(
        value
      )
    )
      return 'invalid url';

    return '';
  },
  contactOther (value) {
    if (!this.email(value) || !this.url(value))
      return 'That seems to be inappropriate for the selected type.';

    return '';
  },
  required (value) {
    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ''
    )
      return 'Required.';

    return '';
  },
  minLength (value, [min]) {
    const what = value.constructor === Array ? '' : ' characters';

    if (value.length < min)
      return `Should be more than ${min}${what}.`;
    return '';
  },
  maxLength (value, [max]) {
    const what = value.constructor === Array ? '' : ' characters';

    if (value.length > max)
      return `Should be less than ${max}${what}.`;
    return '';
  },
  password (value) {
    const minLength = 8;
    const maxLength = 30;
    const len = value.length;

    if (len < minLength || len > maxLength)
      return `Password should be ${minLength} to ${maxLength} characters.`;

    return '';
  },
  options (value, options) {
    if (value.constructor === Array) {
      if (value.find(val => !options.includes(val)))
        return 'Please select from the options.';
    } else if (!options.includes(value)) {
      return 'Please select from the options.';
    }

    return '';
  },
  matches (value, [payload, fieldName]) {
    if (value !== payload) return `${fieldName} must match.`;
    return '';
  },
  bool (value) {
    if (value !== true && value !== false) return 'Invalid.';
    return '';
  },
  integer (value) {
    if (/[^0-9]/gim.test(value)) return 'Must be an integer.';
    return '';
  },
  number (value) {
    if (isNaN(value)) return 'Must be a number.';
    return '';
  }
};

function validate (value, rules) {
  const isOptional = !rules.includes('required');
  if (validationRules.required(value) && isOptional) return;

  const numRules = rules.length;

  for (let a = 0; a < numRules; a++) {
    let rule = rules[a];
    let payload = [];

    const hasParameters = rule.includes(':');
    if (hasParameters) {
      const [_rule, _payload] = rule.split(':');
      rule = _rule;
      payload = _payload.split(',');
    }

    const error = validationRules[rule](value, payload);
    if (error) return error;
  }

  return null;
}

export default validate;
