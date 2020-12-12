const getDetailedUsageInfo = require("./middleware/getDetailedUsageInfo");
const getGeneralUsageInfo = require("./middleware/getGeneralUsageInfo");
const validateBody = require("./middleware/validateBody");
const postNewData = require("./middleware/postNewData");

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  addNode = (newNode) => {
    const node = new Node(newNode);
    let temp = this.head;
    node.next = this.head;

    if (this.head) {
      while (temp.next && temp.next != this.head) {
        temp = temp.next;
      }
      temp.next = node;
    } else this.head = node;
  };

  run = (...args) => {
    this.head.cb(...args, this.head.next);
  };
}

class Node {
  constructor(cb, next = null) {
    this.cb = cb;
    this.next = next;
  }
}

const detailedList = new LinkedList();
detailedList.addNode(getDetailedUsageInfo);
detailedList.addNode(validateBody);
detailedList.addNode(postNewData);

const generalList = new LinkedList();
generalList.addNode(getGeneralUsageInfo);
generalList.addNode(validateBody);
generalList.addNode(postNewData);

module.exports = [detailedList, generalList];
