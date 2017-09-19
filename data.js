export var treeData =
{
  "name": "Top Level",
  "children": [
    {
      "name": "Level 2: A",
      "children": [
        { "name": "Son of A" },
        { "name": "Daughter of A" }
      ]
    },
    {
      "name": "Level 2: B", "children": [
        { "name": "Son of A" },
        { "name": "Daughter of A" },
        {
          "name": "Level 2: A",
          "children": [
            { "name": "Son of A" },
            {
              "name": "Level 2: A",
              "children": [
                { "name": "Son of A" },
                { "name": "Daughter of A" }
              ]
            }, {
              "name": "Level 2: A",
              "children": [
                { "name": "Son of A" },
                {
                  "name": "Level 2: A",
                  "children": [
                    { "name": "Son of A" },
                    { "name": "Daughter of A" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    { "name": "Level 2: C" },
    { "name": "Level 2: D" }
  ]
};
