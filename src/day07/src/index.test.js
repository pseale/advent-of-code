// e.g.
//       dark orange bags contain 3 bright white bags, 4 muted yellow bags.
function parseOutChildren(line) {
  const parent = `${line.split(" ")[0]} ${line.split(" ")[1]}`;

  const allChildren = line.split("contain ")[1];
  const childrenStrings = allChildren
    .replace(".", "")
    .split(",")
    .map((x) => x.trim());
  return childrenStrings.map((childString) => {
    const words = childString.split(" ");
    return { quantity: parseInt(words[0]), bagName: `${words[1]} ${words[2]}`, parent };
  });
}

function parse(input) {
  const lines = input
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x);

  const graph = {};
  lines.forEach((line) => {
    const words = line.split(" ");
    const bagName = `${words[0]} ${words[1]}`;

    if (/contain no other bags\./.test(line)) {
      if (!(bagName in graph)) {
        graph[bagName] = {
          bagName,
          children: [],
          parents: [],
        };
      } else {
        throw `duplicate bag found: ${bagName}`;
      }
    } else if (/contain \d+/.test(line)) {
      graph[bagName] = {
        bagName,
        children: parseOutChildren(line),
        parents: [],
      };
    } else {
      throw `Invalid input: ${line}`;
    }
  });
  return recordParentsFor(graph);
}

function recordParentsFor(graph) {
  for (const bagName in graph) {
    for (let childNode of graph[bagName].children) {
      const node = graph[childNode.bagName];
      node.parents.push(bagName);
    }
  }
  return graph;
}

// count how many parents are here
function traverseNode(node, graph, alreadyVisited) {
  if (alreadyVisited.includes(node.bagName)) return;

  alreadyVisited.push(node.bagName);

  for (let parent of node.parents) {
    traverseNode(graph[parent], graph, alreadyVisited);
  }
}

function traverse(node, graph) {
  const alreadyVisited = [];

  traverseNode(node, graph, alreadyVisited);

  return alreadyVisited.length;
}

function solvePartA(graph) {
  const shinyGoldNode = graph["shiny gold"];

  return traverse(shinyGoldNode, graph, []) - 1;
}

describe("(Part A)", () => {
  test("sample data", () => {
    // Arrange
    const sampleData = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;
    let graph = parse(sampleData);

    // Act
    const result = solvePartA(graph);

    // Assert
    expect(result).toBe(4);
  });
  test("real data", () => {
    // Arrange
    let graph = parse(realData);

    // Act
    const result = solvePartA(graph);

    // Assert
    expect(result).toBe(274);
  });
});

function countChildren(node, graph) {
  let count = 0;

  for (let child of node.children) {
    const childNode = graph[child.bagName];
    count += child.quantity * (1 + countChildren(childNode, graph));
  }

  return count;
}

function solvePartB(graph) {
  const shinyGold = graph["shiny gold"];
  return countChildren(shinyGold, graph);
}

describe("Part B", () => {
  test("sample data", () => {
    // Arrange
    const input = `shiny gold bags contain 2 dark red bags.
    dark red bags contain 2 dark orange bags.
    dark orange bags contain 2 dark yellow bags.
    dark yellow bags contain 2 dark green bags.
    dark green bags contain 2 dark blue bags.
    dark blue bags contain 2 dark violet bags.
    dark violet bags contain no other bags.`;
    const graph = parse(input);

    // Act
    const result = solvePartB(graph);

    // Assert
    expect(result).toBe(126);
  });

  test("real data", () => {
    // Arrange
    const graph = parse(realData);

    // Act
    const result = solvePartB(graph);

    // Assert
    expect(result).toBe(158730);
  });
});

describe("parse", () => {
  test("parsing node with no children", () => {
    // Arrange
    const input = `faded blue bags contain no other bags.
      dotted black bags contain no other bags.`;

    // Act
    const graph = parse(input);

    // Assert
    expect(Object.keys(graph)).toStrictEqual(["faded blue", "dotted black"]);

    const fadedBlue = graph["faded blue"];
    expect(fadedBlue.children.length).toBe(0);
    expect(fadedBlue.parents.length).toBe(0);

    const dottedBlack = graph["dotted black"];
    expect(dottedBlack.children.length).toBe(0);
    expect(dottedBlack.parents.length).toBe(0);
  });

  test("parsing nodes with parents", () => {
    // Arrange
    const input = `dark orange bags contain 3 bright white bags, 4 muted yellow bags.
  bright white bags contain 1 shiny gold bag.
  shiny gold bags contain no other bags.
  muted yellow bags contain no other bags.`;

    // Act
    const graph = parse(input);

    // Assert
    const brightWhite = graph["bright white"];
    expect(brightWhite.parents).toStrictEqual(["dark orange"]);
  });
});

describe("traversing", () => {
  test("no parents", () => {
    // Arrange
    const graph = parse(`dotted black bags contain no other bags.`);
    const dottedBlack = graph["dotted black"];

    // Act
    const count = traverse(dottedBlack, graph);

    // Assert
    expect(count).toBe(1);
  });

  test("diamond dependencies", () => {
    // Arrange
    const graph = parse(`shiny gold bags contain no other bags.
ULTIMATE GRANDMA bags contain 3 PARENT ONE bags, 4 PARENT TWO bags.
PARENT ONE bags contain 3 shiny gold bags.
PARENT TWO bags contain 3 shiny gold bags.`);
    const shinyGold = graph["shiny gold"];

    // Act
    const count = traverse(shinyGold, graph);

    // Assert
    expect(count).toBe(4);
  });
});

let fs = require("fs");
let realData = fs.readFileSync("./src/input.txt", "utf8");
