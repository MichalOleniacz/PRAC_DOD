const getDetailedUsageInfo = require("./middleware/getDetailedUsageInfo");
const getGeneralUsageInfo = require("./middleware/getGeneralUsageInfo");
const validateBody = require("./middleware/validateBody");
const postNewData = require("./middleware/postNewData");

// class Pipeline {
//   constructor(...args) {
//     this.pipe = args;
//     this.iterator = 0;
//     this.next = (...args) => {
//       if (this.iterator + 1 < this.pipe.length) {
//         this.iterator = this.iterator + 1;
//         try {
//           let next = this.pipe[this.iterator];
//           console.log(typeof next);
//           next.call([...args], (...args) => this.next(...args));
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         this.iterator = 0;
//       }
//     };
//     this.start = () => {
//       this.iterator = 0;
//       this.pipe[0]((...args) => this.next(...args));
//     };
//   }
// }

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

const common = [validateBody];

const detailedList = new LinkedList();
detailedList.addNode(getDetailedUsageInfo);
detailedList.addNode(validateBody);
detailedList.addNode(postNewData);

const generalList = new LinkedList();
generalList.addNode(getGeneralUsageInfo);
generalList.addNode(validateBody);
generalList.addNode(postNewData);

detailedList.run();

module.exports = [detailedList, generalList];
