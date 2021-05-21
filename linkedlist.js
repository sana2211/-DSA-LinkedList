class _Node {
  constructor(value, next) {
      this.value = value;
      this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
      if (this.head === null) {
          this.insertFirst(item)
      }
      else {
          let tempNode = this.head;
          while (tempNode.next !== null) {
              tempNode = tempNode.next;
          }
          tempNode.next = new _Node(item, null);
      }
  }

  insertCycle(item, next) {
      if (this.head === null) {
          this.insertFirst(item)
      }
      else {
          let tempNode = this.head;
          while (tempNode.next !== null) {
              tempNode = tempNode.next;
          }
          let nextNode = this.head;
          while (nextNode.next !== null && nextNode.value !== next) {
              nextNode = nextNode.next;
          }
          tempNode.next = new _Node(item, nextNode);
      }
  }
  
  insertBefore(item, value) {
      if (this.head === null) {
          this.insertFirst(item);
      }
      else {
          let currNode = this.head;
          let previousNode = this.head;
          while ((currNode !== null) && (currNode.value !== value)) {
              previousNode = currNode;
              currNode = currNode.next;
          }
          if (currNode === null) {
              this.insertLast(item)
              return;
          }
          previousNode.next = new _Node(item, currNode);
      }
  }

  insertAfter(item, value) {
      if (this.head === null) {
          this.insertFirst(item)
      }
      else {
          let currNode = this.head;

          while ((currNode !== null) && (currNode.value !== value)) {
              currNode = currNode.next;
          }
          if (currNode === null) {
              this.insertLast(item)
              return;
          }
          currNode.next = new _Node(item, currNode.next);
      }
  }

  insertAt(item, num) {
      if (this.head === null) {
          this.insertFirst(item)
      }
      if (num === 1) {
          this.insertFirst(item)
      }
      else {
          let currNode = this.head;

          for(let i=2; i < num; i++) {
              if (currNode === null) {
                  this.insertLast(item)
                  return;
              }
              currNode = currNode.next;
          }
          this.insertAfter(item, currNode.value)
      }
  }

  find(item) {
      let currNode = this.head;

      if (!this.head) {
          return null;
      }
      while (currNode.value !== item) {
          if (currNode.next === null) {
              return null;
          }
          else {
              currNode = currNode.next;
          }
      }
      return currNode;
  }

  remove(item) {
      if (!this.head) {
          return null;
      }
      if (this.head.value === item) {
          this.head = this.head.next
          return;
      }

      let currNode = this.head;
      let previousNode = this.head;

      while ((currNode !== null) && (currNode.value !== item)) {
          previousNode = currNode;
          currNode = currNode.next;
      }
      if (currNode === null) {
          console.log('Item not found');
          return;
      }
      previousNode.next = currNode.next;
  }
}

function main() {
  const SLL = new LinkedList();
  SLL.insertFirst('Starbuck')
  SLL.insertFirst('Husker')
  SLL.insertFirst('Helo')
  SLL.insertFirst('Boomer')
  SLL.insertFirst('Apollo')

  SLL.insertLast('Tauhida')
  SLL.remove('Husker')

  SLL.insertBefore('Athena', 'Boomer')
  SLL.insertAfter('Hotdog', 'Helo')
  SLL.insertAt('Kat', 3)
  
  SLL.remove('Tauhida')

  display(SLL.head)
  size(SLL)
  isEmpty(SLL)
  findPrevious('Starbuck', SLL)
  findLast(SLL)

  //reverse(SLL.head)
  //recursiveReverse(SLL.head)
  
  find3rdFromLast(SLL)
  middle(SLL.head)

  const cycleList = new LinkedList()
  cycleList.insertFirst('Starbuck')
  cycleList.insertFirst('Helo')
  cycleList.insertFirst('Boomer')
  cycleList.insertCycle('Apollo', 'Boomer')
  cycle(cycleList.head)
}

main()

function display(head) {
  let currNode = head;

  while(currNode.next !== null) {
      console.log(currNode.value);
      currNode = currNode.next;
  }
  return console.log(currNode.value);
}

function size(list) {
  let count = 0;
  let currNode = list.head;
  while(currNode.next !== null) {
      count ++;
      currNode = currNode.next;
  }
  count ++;
  return console.log(count);
}

function isEmpty(list) {
  if (list.head === null) {
      return console.log(true);
  }
  return console.log(false);
}

function findPrevious(item, list) {
  let currNode = list.head;

  while(currNode.next.value !== item) {
      currNode = currNode.next;
  }
  return console.log(currNode.value);
}

function findLast(list) {
  let currNode = list.head;

  while(currNode.next !== null) {
      currNode = currNode.next;
  }
  return console.log(currNode.value);
}

function reverse(head) {
  let currNode = head;
  let prevNode, nextNode;

  while(currNode) {
      nextNode = currNode.next
      currNode.next = prevNode
      prevNode = currNode
      currNode = nextNode
  }
  return prevNode;
}

function recursiveReverse(head) {
  if (!head || !head.next) {
      return head;
  }
  let nextNode = reverse(head.next);
  head.next.next = head;
  head.next = undefined;
  return nextNode;
}

function find3rdFromLast(list) {
  let currNode = list.head;
  let prevNode;

  while(currNode.next.next !== null) {
      prevNode = currNode;
      currNode = currNode.next;
  }
  return console.log(prevNode.value);
}

function middle(head) {
  let double = head;
  let single = head;

  while (double.next !== null && double.next.next !== null) {
      double = double.next.next;
      single = single.next;
  }
  return console.log(single.value);
}

function cycle(head) {
  let double = head;
  let single = head;

  while (double.next !== null) {
      double = double.next.next;
      single = single.next;
      if (single === double) return console.log(true);
  }
  return console.log(false);
}

function sortList(head) {
  if (head === null || head.next === null) {
      return head;
  }
  
  let prev = null;
  let slow = head;
  let fast = head;
  
  while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      prev = slow;
      slow = slow.next;
  }

  // close first half list
  prev.next = null;
  
  const l1 = sortList(head);
  const l2 = sortList(slow);
  return merge(l1, l2);
};

function merge(l1, l2) {
  const head = new LinkedList();
  let current = head;
 
  while (l1 !== null && l2 !== null) {
      if (l1.val < l2.val) {
          current.next = l1;
          l1 = l1.next;
      } else {
          current.next = l2;
          l2 = l2.next;
      }
      
      current = current.next;
  }

  current.next = (l1 === null) ? l2 : l1;
  
  return head.next;
}
