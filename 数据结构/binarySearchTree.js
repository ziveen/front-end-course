/**
 * 二叉搜索树(每一层数据左小右大)
 */


function BinarySearchTree() {
    let Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    
    let root = null;
    //
    const insertNode = function(node, newNode) {
        if(newNode.key < node.key) {
            if(node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left,newNode)
            }
        } else {
            if(node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    };

    const searchNode = function(node, key) {
        if(node === null) {
            return false;
        }

        if(node.key === key) {
            return node;
        } else if(key < node.key) {
            searchNode(node.left,key);
        } else {
            searchNode(node.right,key);
        };
    };

    const inOrderTraverseNode = function(node,cb) {
        if(node !== null) {
            inOrderTraverseNode(node.left,cb);
            cb(node.key);
            inOrderTraverseNode(node.right,cb);
        }
    };

    const prevOrderTraverseNode = function(node,cb) {
        if(node !== null) {
            cb(node.key);
            prevOrderTraverseNode(node.left,cb);
            prevOrderTraverseNode(node.right,cb);
        }
    };

    const postOrderTraverseNode = function(node, cb) {
        if(node !== null) {
            postOrderTraverseNode(node.left,cb);
            postOrderTraverseNode(node.right,cb);
            cb(node.key);
        }
    };

    const minNode = function(node) {
        if(node) {
            while(node.left !== null) {
                /**
                 * minNode(node.left); // {1}
                 */

                //使用while循环
                node = node.left; {2}
            }
            return node.key;
        }
        return null;
    };

    const maxNode = function(node) {
        if(node) {
            while(node.right !== null) {
                /**
                 * minNode(node.right); // {1}
                 */

                //使用while循环
                node = node.right; {2}
            }
            return node.key;
        }
        return null;
    };

    this.insert = function(key) {
        let node = new Node(key);
        if(root === null) {
            root = node;
        } else {
            insertNode(root,node);
        }
    };

    const removeNode = function(node,key) {
        if(node === null ) {
            return null;
        }
        if(key < node.key) {
            removeNode(node.left,key)
        } else if(key > node.key) {
            removeNode(node.right);
        } else {
            //叶子节点时
            if(node.left ===null && node.right === null) {
                node = null;
                return node;
                //只有一个子节点,子节点直接替换点节点
            } else if(node.right === null) {
                node = node.left;
                return node;
            } else {
                //有两个子节点,二叉搜索树 左节点<根节点<右节点
                const aux = MinNode(node.right);
                node.key = aux.key;
                removeNode(node.right,aux.key);
                return node;
            };
        };
    };


    //搜索节点
    this.search = function(key) {
        searchNode(root, key);
    };

    //中序遍历(左根右)
    this.inOrderTraverse = function(cb) {
        inOrderTraverseNode(root,cb);
    };

    //先序遍历(根左右)
    this.prevOrderTraverse = function(cb) {
        prevOrderTraverseNode(root, cb);
    };

    //后序遍历(左右根)
    this.postOrderTraverse = function(cb) {
        postOrderTraverseNode(root,cb);
    };

    this.min = function() {
        return minNode(root);
    };

    this.max = function() {
        return minNode(root);
    };

    //移除节点
    this.remove = function(key) {
        removeNode(root,key);
    };
}