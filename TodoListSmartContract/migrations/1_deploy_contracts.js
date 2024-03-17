var ToDoList = artifacts.require("./TaskToDo.sol");
module.exports = function (deployer) {
  deployer.deploy(ToDoList);
};
