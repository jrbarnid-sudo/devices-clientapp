import _ from "lodash";

export const friendlyTypeName = (type) => {
  return _.startCase(_.snakeCase(type));
};
