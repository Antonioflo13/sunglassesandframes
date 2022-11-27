const createHandle = title => {
  return title.toLowerCase().replaceAll(" ", "-");
};

export default createHandle;
