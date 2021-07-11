/** this file handles memory saves and fetch for the cloud function */
let memory = [];
let lastUpdated = 0;

/** a getter to get the memory */
function getMemory() {
  return memory;
}

/** a setter to set a particular memory value */
function setMemory(key, value) {
  memory[key] = value;
}

/** a bulk setter to save an array of memory vallllues */
function setMemoryArray(memoryArray) {
  memory = memoryArray;
}

/** trigger to set lastUpdates to now */
function triggerLastUpdated() {
  lastUpdated = Date.now();
}

/** check if memory is empty */
function isMemoryEmpty() {
  return memory === undefined || memory.length === 0;
}

/** cllear the memory */
function clearMemory() {
  memory = new Array();
}

module.exports = {
  getMemory,
  setMemory,
  setMemoryArray,
  clearMemory,
  triggerLastUpdated,
  isMemoryEmpty,
};
