var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var json = {
        id: "node01",
        name: "Course",
        data: {},
        children: [{
                id: "node02",
                name: "Week 1",
                children: [{
                    id: "node03",
                    name: "Concept 1",
                    children: [{
                        id: "node04",
                        name: "subconcept"
                    }, {
                        id: "node05",
                        name: "subconcept"
                    },
                {
                    id:"node07",
                    name: "Week 2"
                }]
                }, {
                    id: "node06",
                    name: "Concept 2",
                    children: [{
                        id: "node13",
                        name: "subconcept"
                    },{
                        id: "node14",
                        name: "subconcept"
                    },{
                        id: "node15",
                        name: "subconcept"
                    }]
                }]
            }, {
                id: "node07",
                name: "Week 2",
                children: [{
                    id: "node08",
                    name: "Concept 3",
                    children: [{
                        id: "node16",
                        name: "subconcept"
                    }]
                },{
                    id: "node09",
                    name: "Concept 4",
                    children: [{
                        id: "node17",
                        name: "subconcept"
                    },{
                        id: "node18",
                        name: "subconcept"
                    }]
                },{
                    id: "node10",
                    name: "Concept 5",
                    children: [{
                        id: "node19",
                        name: "subconcept"
                    }]
                },]
            }, {
                id: "node11",
                name: "Week 3",
                children: [{
                    id: "node12",
                    name: "Concept 6",
                    children: [{
                        id: "node20",
                        name: "subconcept"
                    },{
                        id: "node21",
                        name: "subconcept"
                    },{
                        id: "node22",
                        name: "subconcept"
                    }]
                }]
            }
    ]};
    // var json = { 
    //     id: "root", 
    //     name: "Course",
    //     children: [{"name": "\"Week 1\"", "id": "wk1"}, {"name": "\"Week 2\"", "id": "wk2"}, {"name": "\"Week 3\"", "id": "wk3"}, {"name": "\"Week 4\"", "id": "wk4"}, {"name": "\"Week 5\"", "id": "wk5"}, {"name": "\"Week 6\"", "id": "wk6"}, {"name": "\"Week 7\"", "id": "wk7"}, {"name": "\"Week 8\"", "id": "wk8"}, {"name": "\"Week 9\"", "id": "wk9"}, {"name": "\"Week 10\"", "id": "wk10"}, {"name": "\"Quest\"", "id": "quest"}, {"name": "\"Midterm\"", "id": "midterm"}, {"name": "\"<concept>\"", "id": "ex1"}, {"name": "\"Number Systems\"", "id": "numSystems"}, {"name": "\"<concept>\"", "id": "ex2"}, {"name": "\"HOFs\"", "id": "hofs"}, {"name": "\"<concept>\"", "id": "ex3"}, {"name": "\"<concept>\"", "id": "ex4"}, {"name": "\"Programming Paradigms\"", "id": "paradigms"}, {"name": "\"<concept>\"", "id": "ex5"}, {"name": "\"Python Lists\"", "id": "pyLists"}, {"name": "\"<concept>\"", "id": "ex6"}, {"name": "\"Binary\"", "id": "binary"}, {"name": "\"Decimal\"", "id": "decimal"}, {"name": "\"Hex\"", "id": "hex"}, {"name": "\"Conversions\"", "id": "conversions"}, {"name": "\"Keep\"", "id": "keep"}, {"name": "\"Combine\"", "id": "combine"}, {"name": "\"Map\"", "id": "map"}, {"name": "\"Declarative\"", "id": "declarative"}, {"name": "\"Imperative\"", "id": "imperative"}, {"name": "\"Functional\"", "id": "functional"}, {"name": "\"Object-Oriented\"", "id": "objOriented"}, {"name": "\"List Comprehension\"", "id": "listComprehension"}, {"name": "\"Slicing\"", "id": "slicing"}, {"name": "\"Composition\"", "id": "composition"}, {"name": "\"Iteration\"", "id": "iteration"}, {"name": "\"Iterables\"", "id": "iterables"}, {"name": "\"Mutation\"", "id": "mutation"}, {"id": ","}]
    // }
    //end
    //init Spacetree
    //Create a new ST instance
    var st = new $jit.ST({
        //id of viz container element
        injectInto: 'infovis',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 50,
        //enable panning
        Navigation: {
          enable:true,
          panning:true
        },
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            height: 20,
            width: 60,
            type: 'rectangle',
            color: '#aaa',
            overridable: true
        },
        
        Edge: {
            type: 'bezier',
            overridable: true
        },
        
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(){
            Log.write("done");
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            label.onclick = function(){
            	if(normal.checked) {
            	  st.onClick(node.id);
            	} else {
                st.setRoot(node.id, 'animate');
            	}
            };
            //set label styles
            var style = label.style;
            style.width = 60 + 'px';
            style.height = 17 + 'px';            
            style.cursor = 'pointer';
            style.color = '#333';
            style.fontSize = '0.8em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#ff7";
            }
            else {
                delete node.data.$color;
                //if the node belongs to the last plotted level
                if(!node.anySubnode("exist")) {
                    //count children number
                    var count = 0;
                    node.eachSubnode(function(n) { count++; });
                    //assign a node color based on
                    //how many children it has
                    node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];                    
                }
            }
        },
        
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#eed";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
    //Add event handlers to switch spacetree orientation.
    var top = $jit.id('r-top'), 
        left = $jit.id('r-left'), 
        bottom = $jit.id('r-bottom'), 
        right = $jit.id('r-right'),
        normal = $jit.id('s-normal');
        
    
    function changeHandler() {
        if(this.checked) {
            top.disabled = bottom.disabled = right.disabled = left.disabled = true;
            st.switchPosition(this.value, "animate", {
                onComplete: function(){
                    top.disabled = bottom.disabled = right.disabled = left.disabled = false;
                }
            });
        }
    };
    
    top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
    //end

}
