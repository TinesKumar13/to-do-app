// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TaskToDo {

    enum TaskStatus {Pending, Finished}
    address owner;
    struct Task {
        string desc;
        TaskStatus status;
    }

    Task[] public tasks;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only Owner has right!");
        _;
    }

    function addTask(string memory _desc) public onlyOwner {
        tasks.push(Task(_desc, TaskStatus.Pending));
    }

    function markTaskAsFinished(uint256 id) public onlyOwner {
        require(id <= tasks.length, "There is no such task !");
        tasks[id].status = TaskStatus.Finished;
    }

    function getAllTasks() public view returns (Task[] memory){
        return tasks;
    }

    function getTaskById(uint256 id) public view returns (string memory, TaskStatus){
        require(id <= tasks.length, "There is no such task !");
        return (tasks[id].desc, tasks[id].status);
    }

    function deleteTask(uint256 id) public onlyOwner {
        require(id <= tasks.length, "There is no such task !");
        tasks[id] = tasks[tasks.length - 1];
        tasks.pop();
    }

    function updateTaskDescription(uint256 id, string memory _desc) public onlyOwner {
        require(id <= tasks.length, "There is no such task !");
        tasks[id].desc = _desc;
    }
}