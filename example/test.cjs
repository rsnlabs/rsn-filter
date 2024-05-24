const { RsnFilter } = require("../build/cjs/index.cjs");

const rsnfilter = new RsnFilter("rsnai_××××××××××××××××××××××");

(async () => {
  const imageUrl = "";
  
  try {
    const response = await rsnfilter.filter(imageUrl);
        
    if (response.result === true) {
      console.log(response.message);
    }
        
    if (response.result === false) {
      console.log(response.message);
    }
  } catch (error) {
    console.error("RsnFilter Error:", error);
  }
})();