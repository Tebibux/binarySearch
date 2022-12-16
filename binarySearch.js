class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		this.arr = [...removeRepeatedValue(mergeSort(arr))];
		this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
		this.pOrder = [];
		this.iOrder = [];
		this.psOrder = [];
	}
	// takes an array and build Binary Search Tree
	// and return the tree after reccercivly build the tree to the end
	buildTree(array, start, end) {
		if (start > end) return null;
		let mid = parseInt((start + end) / 2);
		let root = new Node(array[mid])

		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);


		return root;
	}

	insert(value, root = this.root){
		if(root == null) return (root = new Node(value));
		if(root.value < value){
			root.right = this.insert(value, root.right);
		}else{
			root.left = this.insert(value, root.left);
		}
		return root;
	}

	traverse(root, array) {
		if (array !== undefined) array.push(root.value);
		if (root.left !== null) {
			this.traverse(root.left, array);
		}
		if (root.right !== null) {
			this.traverse(root.right, array);
		}
		return array;
	}

	find(value, root = this.root) {
		if (root == null) return false;
		if (root.value == value) return root;
		if (root.value > value) {
			return this.find(value, root.left);
		} else if (root.value < value) {
			return this.find(value, root.right);
		}
		return root;
	}

	delete(value, root = this.root) {
		if (root == null) return null;
		if (root.value > value) {
			root.left = this.delete(value, root.left);
		} else if (root.value < value) {
			root.right = this.delete(value, root.right);
		} else {
			if (root.left == null) return root.right;
			else if (root.right == null) return root.left;

			root.value = minValue(root);
			root.right = this.delete(root.right, root.value);
		}
		return root;
	}

	levelOrder(root) {
		const order = [];
		const result = [];

		if (root == null) return;

		order.push(root);

		while (order.length > 0) {
			let current = order.shift(root);
			result.push(current.value);

			if (current.left !== null) order.push(current.left);
			if (current.right !== null) order.push(current.right);
		}

		return result;
	}

	preOrder(root) {
		if (root == null) return;
		if (root.value !== undefined) {
			this.pOrder.push(root.value);
		}
		if (root.left !== null) {
			this.preOrder(root.left);
		}
		if (root.right !== null) {
			this.preOrder(root.right);
		}
	}

	inOder(root) {
		if (root == null) return;
		if (root.left !== null) {
			this.inOder(root.left);
		}
		if (root.value !== undefined) {
			this.iOrder.push(root.value);
		}
		if (root.right !== null) {
			_
			this.inOder(root.right);
		}
	}

	postOrder(root) {
		if (root == null) return;

		if (root.left !== null) {
			this.postOrder(root.left)
		}
		if (root.right !== null) {
			this.postOrder(root.right);
		}
		if (root.value !== undefined) this.psOrder.push(root.value);
	}


	height(root) {
		if (root == null) return -1;
		else {
			let left = this.height(root.left);
			let right = this.height(root.right)

			return Math.max(left, right) + 1;
		}
	}

	depth(node, root = this.root) {
		let depth = -1;

		if (node == null) return depth;
		if (
			root == node ||
			(depth = this.depth(node, root.left)) >= 0 ||
			(depth = this.depth(node, root.right)) >= 0
		) {
			return depth + 1;
		}
		return depth;
	}

	isBalanced(root) {
		if (root == null) return false;

		let leftHalf = root.left;
		let rightHalf = root.right;

		if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) return false;
		else return true;
	}

	reBalance() {
		if (this.isBalanced(this.root)) return this.root;

		let rebalancedNewTreeArray = [];
		rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);

		let balancedTree = new Tree(rebalancedNewTreeArray);
		return balancedTree.root;
	}

	minimumValue(root) {
		let min = root.value;
		while (root != null) {
			min = root.value;
			root = root.left;
		}
		return min;
	}


	mergeSort(unOrderedArray) {
		if (array.length === 1) return array;

		const orderedArray = [];

		const leftSide = this.mergeSort(unOrderedArray.slice(0, unOrderedArray.length / 2));
		const rightSide = this.mergeSort(unOrderedArray.slice(unOrderedArray.length / 2));

		while (leftSide.length && rightSide.length) {
			if (leftSide[0] < rightSide[0]) {
				orderedArray.push(leftSide.shift());
			} else {
				orderedArray.push(rightSide.shift());
			}
		}
		return [...orderedArray, ...leftSide, ...rightSide];
	}

	removeRepeatedValue(array) {
		return [...new Set(array)];
	}
}