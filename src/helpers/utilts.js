export const IsEmptyObject = (object) => {
  return Object.keys(object).length === 0;
};

export const seprateNameAndExtension = (name) => {
  const extension = name.split(".");
  const ex = extension.length >= 2 ? extension.pop() : "";
  console.log("name extenison", ex);
  return {
    extension: ex,
    name: extension.join(""),
  };
};
