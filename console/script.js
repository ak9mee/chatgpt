function generateError() {
  try {
    var undefinedVariable = someUndefinedFunction();
  } catch (error) {
    console.error(error);
  }
}
