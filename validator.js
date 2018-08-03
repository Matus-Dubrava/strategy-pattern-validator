const data = {
  first_name: 'Super',
  last_name: 'Man',
  age: 'unknown',
  username: 'o_O'
};

const validator = {
  methods: {
    isAlphaNum: {
      test(data) { return /^[a-z0-9]$/i.test(data) },
      message(prop) { return `Incorrect value for ${prop}. Value should contain only numbers and letters` }
    },
    isNonEmpty: {
      test(data) { return data !== '' },
      message(prop) { return `Incorrect value for ${prop}. Value should be non-empty.` }
    },
    isNumber: {
      test(data) { return typeof data === 'number' },
      message(prop) { return `Incorrect value for ${prop}. Value should be a number.` }
    }
  },
  messages: [],
  config: {},
  validate(obj) {
    const props = Object.keys(obj);
    props.forEach((prop) => {
      if (prop in validator.config) {
        if (!validator.methods[validator.config[prop]].test(data[prop])) {
          validator.messages.push(validator.methods[validator.config[prop]].message(prop));
        }
      }
    });
  },
  hasErrors() { return validator.messages.length; },
  getErrors() { return validator.messages.join('\n'); }
}

const config = {
  first_name: 'isNonEmpty',
  username: 'isAlphaNum',
  age: 'isNumber'
};

validator.config = config;
validator.validate(data);
if (validator.hasErrors()) {
  console.log(validator.getErrors());
}
