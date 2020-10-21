import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import XLSX from "xlsx";
import _ from "lodash";

Vue.config.productionTip = false;

const load_award_data = (wb) => {
  let awards = [];

  let sheets = _.filter(wb.SheetNames, (value) => {
    return value.startsWith("Sheet") ? false : true;
  });

  _.each(sheets, (sheet) => {
    let title = ""

    _.each(wb.Sheets[sheet], (value, key) => {
      if (key == "!ref" || key == "!margins") return;

      if (key == "A1") {
        title = value.w;
        return;
      }
      let values = parse_row(value.w)

      values.title = title
      values.code = sheet
      awards.push(values);
    });
    
  });

  return awards;
};

// // TODO: refactor this
const parse_row = (string) => {
  let parsed = {
    values: {
      year: "",
      winners: "",
      make_model: "",
    },
  };

  parsed.orig = string;

  // fix '- -' typo
  string = string.replace("- -", "--");

  parsed.steps = string.split(" ");

  parsed.steps = _.map(parsed.steps, (step) => {
    return step.replace(/…/g, " ");
  });

  parsed.steps = _.map(parsed.steps, (step) => {
    return step.split(" ");
  });

  parsed.steps = _.flatten(parsed.steps);

  parsed.steps = _.map(parsed.steps, (step) => {
    return step
      .replace(step.substring(step.indexOf(".."), step.lastIndexOf("..")), "")
      .replace("..", " ") // remove any remaining ..
      .replace("--", "")
      .trim();
  });

  parsed.steps = _.map(parsed.steps, (step) => {
    return step.split(" ");
  });

  parsed.steps = _.flatten(parsed.steps);

  parsed.steps = parsed.steps.filter((el) => el != "");

  let division_check = _.indexOf(parsed.steps, "Division");

  switch (division_check) {
    case -1:
      // doesnt exist in string
      break;
    default:
      parsed.steps.splice(division_check - 1, division_check);
      break;
  }

  // The Foo–Dog Trophy has an extra location near the year. need to trim that out for now.
  let last_index = parsed.steps.length - 1;
  let royce_check = parsed.steps.indexOf("Rolls-Royce");

  if (royce_check != -1) {
    let diff = last_index - royce_check;

    if (diff >= 1) {
      parsed.steps.splice(royce_check + 1, diff - 1);
    }
  }

  parsed.cleaned = parsed.steps.join(" ");

  let year_positions = _.map(parsed.steps, (step) => {
    return step.length == 4 && !/\D/.test(step);
  });

  // case A is the year is at the begining,  B is at the end
  parsed.case = year_positions[0] ? "A" : "B";

  let parts = [];
  let buffer = [];

  if (parsed.case == "A") {
    _.each(parsed.steps, (value, idx) => {
      // since case A
      if (idx == 0) {
        buffer.push(value);
        parts.push(buffer.join(" "));
        buffer = [];
        return;
      }

      if (year_positions[idx]) {
        parts.push(buffer.join(" "));
        buffer = [];
      }

      buffer.push(value);

      if (idx == parsed.steps.length - 1) {
        parts.push(buffer.join(" "));
        buffer = [];
      }
    });
    parsed.values.year = parts[0];
    parsed.values.winners = parts[1];
    parsed.values.make_model = parts[2];
  } else {
    _.each(parsed.steps, (value, idx) => {
      if (year_positions[idx]) {
        parts.push(buffer.join(" "));
        buffer = [];
      }

      buffer.push(value);

      if (idx == parsed.steps.length - 1) {
        parts.push(buffer.join(" "));
        buffer = [];
      }
    });
    parsed.values.year = parts[2];
    parsed.values.winners = parts[0];
    parsed.values.make_model = parts[1];
  }

  return parsed.values;
};

fetch("National Awards.xlsx")
  .then((response) => {
    return response.arrayBuffer();
  })
  .then((buffer) => {
    var workbook = XLSX.read(buffer, { type: "array" });
    new Vue({
      router,
      data: {
        awards: load_award_data(workbook),
      },
      render: (h) => h(App),
    }).$mount("#app");
  });
