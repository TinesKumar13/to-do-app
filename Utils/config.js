export const API_URL = "https://goerli.infura.io/v3/50b8b30f1631419ca404e27ca9d74ef9";
export const PRIVATE_KEY = "db24919308a404a1fe911b9e7434231004528c7cb058e2024c957a9438c4f3e4";
export const contractAddress = "0x2c73e39f1770b127a1ffa5d43d2f6056b772a1ec";
export const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_desc",
				"type": "string"
			}
		],
		"name": "addTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "markTaskAsFinished",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getAllTasks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "desc",
						"type": "string"
					},
					{
						"internalType": "enum TaskToDo.TaskStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct TaskToDo.Task[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getTaskById",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "enum TaskToDo.TaskStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "enum TaskToDo.TaskStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];