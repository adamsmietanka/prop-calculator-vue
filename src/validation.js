/* eslint-disable camelcase, object-curly-newline */
import Vue from "vue";
import {
  required,
  between,
  min_value,
  max_value,
} from "vee-validate/dist/rules";
import { ValidationProvider, configure, extend } from "vee-validate";

const config = {
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
  },
  bails: true,
  skipOptional: true,
  mode: "aggressive",
  useConstraintAttrs: false,
};

// Sets the options.
configure(config);

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("between", {
  ...between,
  message: "{_field_} must be between {min} and {max}",
});

extend("min_value", {
  ...min_value,
  message: "{_field_} must be {min} or more",
});

extend("max_value", {
  ...max_value,
  message: "{_field_} must be {max} or less",
});

extend("tip_speed", {
  ...max_value,
  message: "Max Mach number of the tip for this type of propeller is {max}",
});

extend("prop_angle", {
  ...min_value,
  message: "This angle is not suitable for this engine and propeller",
});

Vue.component("ValidationProvider", ValidationProvider);
