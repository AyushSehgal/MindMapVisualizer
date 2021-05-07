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
    // var json = {
    //     id: "node01",
    //     name: "Course",
    //     data: {},
    //     children: [{
    //             id: "node02",
    //             name: "Week 1",
    //             children: [{
    //                 id: "node03",
    //                 name: "Concept 1",
    //                 children: [{
    //                     id: "node04",
    //                     name: "subconcept"
    //                 }, {
    //                     id: "node05",
    //                     name: "subconcept"
    //                 },
    //             {
    //                 id:"node07",
    //                 name: "Week 2"
    //             }]
    //             }, {
    //                 id: "node06",
    //                 name: "Concept 2",
    //                 children: [{
    //                     id: "node13",
    //                     name: "subconcept"
    //                 },{
    //                     id: "node14",
    //                     name: "subconcept"
    //                 },{
    //                     id: "node15",
    //                     name: "subconcept"
    //                 }]
    //             }]
    //         }, {
    //             id: "node07",
    //             name: "Week 2",
    //             children: [{
    //                 id: "node08",
    //                 name: "Concept 3",
    //                 children: [{
    //                     id: "node16",
    //                     name: "subconcept"
    //                 }]
    //             },{
    //                 id: "node09",
    //                 name: "Concept 4",
    //                 children: [{
    //                     id: "node17",
    //                     name: "subconcept"
    //                 },{
    //                     id: "node18",
    //                     name: "subconcept"
    //                 }]
    //             },{
    //                 id: "node10",
    //                 name: "Concept 5",
    //                 children: [{
    //                     id: "node19",
    //                     name: "subconcept"
    //                 }]
    //             },]
    //         }, {
    //             id: "node11",
    //             name: "Week 3",
    //             children: [{
    //                 id: "node12",
    //                 name: "Concept 6",
    //                 children: [{
    //                     id: "node20",
    //                     name: "subconcept"
    //                 },{
    //                     id: "node21",
    //                     name: "subconcept"
    //                 },{
    //                     id: "node22",
    //                     name: "subconcept"
    //                 }]
    //             }]
    //         }
    // ]};
    // var json = {
    //     id:'node00', 
    //     name:'CS10', 
    //     data:{}, 
    //     children:[
    //         {
    //             id:'node0', 
    //             name:'week1', 
    //             children:[
    //                 {
    //                     id:'node3', 
    //                     name:'concept1', 
    //                     children:[
    //                         {
    //                             id:'node5', 
    //                             name:'subconcept1', 
    //                             children:[]},
    //                         {
    //                             id:'node6', 
    //                             name:'subconcept2', 
    //                             children:[]}
    //                         ]
    //                 },
    //                 {
    //                     id:'node4', 
    //                     name:'concept2', 
    //                     children:[
    //                         {
    //                             id:'node7', 
    //                             name:'subconcept3', 
    //                             children:[]},
    //                         {
    //                             id:'node8', 
    //                             name:'subconcept4', 
    //                             children:[]},
    //                         {
    //                             id:'node9', 
    //                             name:'subconcept5', 
    //                             children:[]}
    //                         ]
    //                 }
    //                 ]
    //         },
    //         {
    //             id:'node1', 
    //             name:'week2', 
    //             children:[
    //                 {
    //                     id:'node10', 
    //                     name:'concept3', 
    //                     children:[
    //                         {
    //                             id:'node13', 
    //                             name:'subconcept6', 
    //                             children:[]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     id:'node11', 
    //                     name:'concept4', 
    //                     children:[
    //                         {
    //                             id:'node14', 
    //                             name:'subconcept7', 
    //                             children:[]
    //                         },
    //                         {
    //                             id:'node15', 
    //                             name:'subconcept8', 
    //                             children:[]}
    //                         ]
    //                     },
    //                     {
    //                         id:'node12', 
    //                         name:'concept5', 
    //                         children:[
    //                             {
    //                                 id:'node16', 
    //                                 name:'subconcept9', 
    //                                 children:[]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 id:'node2', 
    //                 name:'week3', 
    //                 children:[
    //                     {
    //                         id:'node17', 
    //                         name:'concept6', 
    //                         children:[
    //                             {
    //                                 id:'node18', 
    //                                 name:'subconcept10', 
    //                                 children:[]},
    //                                 {
    //                                     id:'node19', 
    //                                     name:'subconcept11', 
    //                                     children:[]
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //             },
                
    //         ]
    //     };

    var json = {id:'node00', name:'CS10', data:{}, 
                children:[{id:'node0', name:'Abstraction', 
                children:[{id:'node10', name:'< <b>Quest Lecture Content</b> <br/> Exam: Quest Fa19Q1 >', 
                children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},
                {id:'node175', name:'< <b>Algorithm Evaluation/Tracing</b> <br/>Exam: Quest Sp15Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node1', name:'Testing and HW3', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node2', name:'Computing and the Environment', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node3', name:'Privacy', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node5', name:'AI', children:[{id:'node12', name:'< <b>Final Lecture Content</b> <br/> Exam: Final Fa19Q1-5 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node6', name:'HCI', children:[{id:'node12', name:'< <b>Final Lecture Content</b> <br/> Exam: Final Fa19Q1-5 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node7', name:'Saving the World with Computing', children:[{id:'node12', name:'< <b>Final Lecture Content</b> <br/> Exam: Final Fa19Q1-5 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node8', name:'Limits of Computing', children:[{id:'node12', name:'< <b>Final Lecture Content</b> <br/> Exam: Final Fa19Q1-5 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node9', name:'Alumni Panel', children:[{id:'node12', name:'< <b>Final Lecture Content</b> <br/> Exam: Final Fa19Q1-5 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node123', name:'Concurrency:\\n Deadlock', children:[{id:'node4', name:'< <b>Concurrency</b> <br/> Exam: Midterm Sp13Q12', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node124', name:'Concurrency:\\n Livelock', children:[{id:'node4', name:'< <b>Concurrency</b> <br/> Exam: Midterm Sp13Q12', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node125', name:'Race Conditions:\\n List all Outputs', children:[{id:'node122', name:'Concurrency:\\n Race Condition', children:[{id:'node4', name:'< <b>Concurrency</b> <br/> Exam: Midterm Sp13Q12', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]},{id:'node126', name:'Race Conditions:\\n How Many Different', children:[{id:'node122', name:'Concurrency:\\n Race Condition', children:[{id:'node4', name:'< <b>Concurrency</b> <br/> Exam: Midterm Sp13Q12', children:[{id:'node11', name:'< <b>Midterm Lecture Content</b> <br/> Exam: Midterm Fa19Q1-4 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]},{id:'node13', name:'Binary to Decimal', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node14', name:'Decimal to Binary', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node15', name:'Hex to Decimal', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node16', name:'Decimal to Hex', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node17', name:'Binary to Hex', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node18', name:'Hex to Binary', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node98', name:'N bits is 2^N Things', children:[{id:'node19', name:'< <b>Binary Decimal Hex</b> <br/> Exam: Quest Fa19Q2', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node20', name:'Trace Simple Loop', children:[{id:'node22', name:'< <b>Iteration</b> <br/> Exam: Quest Fa19Q3', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node21', name:'Loop Code to Get IO Behavior', children:[{id:'node22', name:'< <b>Iteration</b> <br/> Exam: Quest Fa19Q3', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node25', name:'Number Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node26', name:'Number Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node38', name:'Numeric Operators Functionality', children:[{id:'node40', name:'Operators Functionality', children:[{id:'node27', name:'Word Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node28', name:'Word Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node29', name:'Sentence Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node30', name:'Sentence Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node31', name:'Letter Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node32', name:'Letter Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node33', name:'Character Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node34', name:'Character Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]}]},{id:'node39', name:'Sentence Operators Functionality', children:[{id:'node40', name:'Operators Functionality', children:[{id:'node27', name:'Word Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node28', name:'Word Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node29', name:'Sentence Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node30', name:'Sentence Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node31', name:'Letter Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node32', name:'Letter Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node33', name:'Character Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node34', name:'Character Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]}]},{id:'node41', name:'List Syntax:\\n Snap!', children:[{id:'node35', name:'List Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node36', name:'List Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node174', name:'< <b>Recursion w/ HOFs </b> <br/>Exam: Final Sp13Q16 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node42', name:'Reports Leave Procedure', children:[{id:'node44', name:'Control ', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node50', name:'< <b>Control to Boolean </b> <br/> Exam: Quest Fa19Q6 >', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]}]},{id:'node43', name:'If Else Evaluation', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node44', name:'Control ', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node50', name:'< <b>Control to Boolean </b> <br/> Exam: Quest Fa19Q6 >', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]}]},{id:'node156', name:'And:\\n Is a False Finder', children:[{id:'node46', name:'And', children:[{id:'node49', name:'Boolean Operators', children:[{id:'node23', name:'Boolean Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node24', name:'Boolean Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node167', name:'< <b>Writing Boolean Operators</b> <br/>Exam: Final Fa09Q1 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node50', name:'< <b>Control to Boolean </b> <br/> Exam: Quest Fa19Q6 >', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]}]},{id:'node157', name:'Or:\\n Is a Truth Finder', children:[{id:'node47', name:'Or', children:[{id:'node49', name:'Boolean Operators', children:[{id:'node23', name:'Boolean Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node24', name:'Boolean Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node167', name:'< <b>Writing Boolean Operators</b> <br/>Exam: Final Fa09Q1 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node50', name:'< <b>Control to Boolean </b> <br/> Exam: Quest Fa19Q6 >', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]}]},{id:'node158', name:'Not:\\n Used for Negation', children:[{id:'node48', name:'Not', children:[{id:'node49', name:'Boolean Operators', children:[{id:'node23', name:'Boolean Domain', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node24', name:'Boolean Range', children:[{id:'node37', name:'< <b>Domain Range </b> <br/>Exam: Quest Fa19Q4', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node45', name:'< <b>Boolean Evaluation </b> <br/> Exam: Quest Fa19Q5', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node167', name:'< <b>Writing Boolean Operators</b> <br/>Exam: Final Fa09Q1 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node50', name:'< <b>Control to Boolean </b> <br/> Exam: Quest Fa19Q6 >', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]}]},{id:'node51', name:'Set Procedure', children:[{id:'node151', name:'< <b>Use a Table to Trace Assignments</b> <br/> Exam: Quest Sp20Q7 >', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node153', name:'Truth Table', children:[{id:'node152', name:'Usage of Tables', children:[{id:'node151', name:'< <b>Use a Table to Trace Assignments</b> <br/> Exam: Quest Sp20Q7 >', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]},{id:'node154', name:'Assignment Table', children:[{id:'node152', name:'Usage of Tables', children:[{id:'node151', name:'< <b>Use a Table to Trace Assignments</b> <br/> Exam: Quest Sp20Q7 >', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]},{id:'node179', name:'Script Variable:\\n Only the script it is defined in can access it', children:[{id:'node53', name:'Script Variable', children:[{id:'node55', name:'Scoping ', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]}]},{id:'node180', name:'Global Variable:\\n All scripts can access it', children:[{id:'node54', name:'Global Variable', children:[{id:'node55', name:'Scoping ', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]}]}]},{id:'node127', name:'Map Domain:\\n monadic function whose domain is the same\\n as the list elements and range is anything', children:[{id:'node56', name:'Map', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node128', name:'Map Range:\\n new list in which every element is run through that function\\n and the result is in the new list in the same order', children:[{id:'node56', name:'Map', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node129', name:'Map:\\n length of output list is same as input list', children:[{id:'node56', name:'Map', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node130', name:'Map:\\n contents of the output list is the range of the mapping function', children:[{id:'node56', name:'Map', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node131', name:'Keep Domain:\\n monadic predicate function whose domain is the same\\n as the list elements and range is a boolean', children:[{id:'node57', name:'Keep', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node132', name:'Keep Range:\\n new list in which every element is run through that function\\nannd the new list is populated only when the predicate returns true', children:[{id:'node57', name:'Keep', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node133', name:'Keep:\\n length of output list is equal to or less than input list', children:[{id:'node57', name:'Keep', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node134', name:'Keep:\\n contents of output list are identical to input list\\n (but some may be missing)', children:[{id:'node57', name:'Keep', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node135', name:'Combine Domain:\\n dyadic function that is associative whose domain\\n is both the elements of the list and its own range and whose range is anything', children:[{id:'node58', name:'Combine', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node136', name:'Combine Range:\\n single element that is the range of the dyadic function', children:[{id:'node58', name:'Combine', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node137', name:'Combine:\\n pairwise runs it in a tree structure in any order', children:[{id:'node58', name:'Combine', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node138', name:'Combine:\\n exact order is below the abstraction line', children:[{id:'node58', name:'Combine', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]}]}]},{id:'node63', name:'Lists:\\n procedure CAN change list in caller', children:[{id:'node62', name:'< <b>Call by Value</b> <br/>Exam: Final Fa18Q15b >', children:[{id:'node55', name:'Scoping ', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node66', name:'Functions:\\n What Would Snap!/Python Display', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]},{id:'node95', name:'< <b>Function Composition Ordering</b> <br/>Exam: Quest Sp20Q8', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node99', name:'< <b>Lambda Function Evaluation </b> <br/> Exam: Final Fa19Q14c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node164', name:'< <b>Dictionaries: WWPD</b> <br/> Exam: Final Fa18Q15 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node177', name:'< <b>Write a Function</b> <br/>Exam: Midterm Fa14Q15', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node64', name:'Value:\\n procedure CAN'T change value in caller', children:[{id:'node62', name:'< <b>Call by Value</b> <br/>Exam: Final Fa18Q15b >', children:[{id:'node55', name:'Scoping ', children:[{id:'node168', name:'< <b>List Tracing</b> <br/> Exam: Quest Fa10Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]},{id:'node52', name:'< <b>Set and Report Evaluation </b> <br/> Exam: Quest Fa19Q7', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node66', name:'Functions:\\n What Would Snap!/Python Display', children:[{id:'node59', name:'HOFs ', children:[{id:'node60', name:'< <b>Nested HOFs</b> <br/>Exam: Quest Fa13Q9', children:[{id:'node61', name:'< <b>Advanced HOFs </b> <br/>Exam: Quest Fa19Q9', children:[{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]}]},{id:'node95', name:'< <b>Function Composition Ordering</b> <br/>Exam: Quest Sp20Q8', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node99', name:'< <b>Lambda Function Evaluation </b> <br/> Exam: Final Fa19Q14c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node164', name:'< <b>Dictionaries: WWPD</b> <br/> Exam: Final Fa18Q15 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node177', name:'< <b>Write a Function</b> <br/>Exam: Midterm Fa14Q15', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node67', name:'Functions:\\n Basic Idea', children:[{id:'node95', name:'< <b>Function Composition Ordering</b> <br/>Exam: Quest Sp20Q8', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node99', name:'< <b>Lambda Function Evaluation </b> <br/> Exam: Final Fa19Q14c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node177', name:'< <b>Write a Function</b> <br/>Exam: Midterm Fa14Q15', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node91', name:'Declarative Programming', children:[{id:'node68', name:'< <b>Programming Paradigms </b> <br/>Exam: Midterm Fa19Q8', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node92', name:'Object-Oriented Programming', children:[{id:'node68', name:'< <b>Programming Paradigms </b> <br/>Exam: Midterm Fa19Q8', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node143', name:'< <b>OOP in Python</b> <br/>Exam: Final Sp20Q11d>', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node93', name:'Functional Programming', children:[{id:'node68', name:'< <b>Programming Paradigms </b> <br/>Exam: Midterm Fa19Q8', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node94', name:'Imperative Programming', children:[{id:'node68', name:'< <b>Programming Paradigms </b> <br/>Exam: Midterm Fa19Q8', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node165', name:'< <b>Dictionaries: Write a Function </b> <br/> Exam: Final Sp18Q9c <br/> Online Exam: Final Fa18Q2 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node107', name:'Pick Random Functionality:\\n Inclusive of Both Endpoints', children:[{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node160', name:'                 1\\n speedup = ---------------\\n                  (1-p) + p/N', children:[{id:'node159', name:'< <b>Amdahl's Law: Speeedup</b> <br/>Exam: Midterm Fa19Q5', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node176', name:'Abstract Procedure Evaluation', children:[{id:'node175', name:'< <b>Algorithm Evaluation/Tracing</b> <br/>Exam: Quest Sp15Q8', children:[{id:'node69', name:'< <B>Quest</B>>', children:[]},{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node109', name:'Repeat', children:[{id:'node22', name:'< <b>Iteration</b> <br/> Exam: Quest Fa19Q3', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node110', name:'Repeat Until', children:[{id:'node22', name:'< <b>Iteration</b> <br/> Exam: Quest Fa19Q3', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node111', name:'For i', children:[{id:'node22', name:'< <b>Iteration</b> <br/> Exam: Quest Fa19Q3', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node112', name:'For each', children:[{id:'node22', name:'< <b>Iteration</b> <br/> Exam: Quest Fa19Q3', children:[{id:'node140', name:'< <b>Boolean w/ Iteration</b> <br/>Exam: Final Sp20Q8', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node139', name:'< <b>Iteration to HOFs</b> <br/>Exam: Final Sp20Q7', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]},{id:'node69', name:'< <B>Quest</B>>', children:[]}]}]},{id:'node83', name:'Constant Runtime', children:[{id:'node82', name:'< <b>Algorithmic Complexity </b> <br/> Exam: Midterm Fa19Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node84', name:'Logorithmic Runtime', children:[{id:'node82', name:'< <b>Algorithmic Complexity </b> <br/> Exam: Midterm Fa19Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node85', name:'Linear Runtime', children:[{id:'node82', name:'< <b>Algorithmic Complexity </b> <br/> Exam: Midterm Fa19Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node86', name:'Quadratic Runtime', children:[{id:'node82', name:'< <b>Algorithmic Complexity </b> <br/> Exam: Midterm Fa19Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node87', name:'Cubic Runtime', children:[{id:'node82', name:'< <b>Algorithmic Complexity </b> <br/> Exam: Midterm Fa19Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node88', name:'Exponential Runtime', children:[{id:'node82', name:'< <b>Algorithmic Complexity </b> <br/> Exam: Midterm Fa19Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node90', name:'Motion Functionality', children:[{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node117', name:'Turning Functionality', children:[{id:'node89', name:'< <b>Roboto Tracing </b> <br/> Exam: Midterm Fa19Q11a-c', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node101', name:'< <b>Fractals: Single Recursive Call</b> <br/> Online Exam: Midterm Fa19 >', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node102', name:'Recursion:\\n Base Case Test', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node103', name:'Recursion:\\n Base Case Return Value', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node104', name:'Recursion:\\n Recursive Case - Divide', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node105', name:'Recursion:\\n Recursive Case - Invoke', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node106', name:'Recursion:\\n Recursive Case - Combine', children:[{id:'node173', name:'Recursion', children:[{id:'node100', name:'< <b>Recursive Reporters </b> <br/> Exam: Midterm Sp19Q12', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node172', name:'< <b>Recursion w/ Lists </b> <br/>Exam: Midterm Sp13Q14', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]},{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node113', name:'Fractals:\\n Start and Stop in Same Place', children:[{id:'node155', name:'< <b>Fractals: Double Recursive Call</b> <br/> Exam: Final Sp11Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node114', name:'Fractals:\\n Start and Stop in Different Place', children:[{id:'node155', name:'< <b>Fractals: Double Recursive Call</b> <br/> Exam: Final Sp11Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node115', name:'Fractals:\\n Pen Up vs. Pen Down', children:[{id:'node155', name:'< <b>Fractals: Double Recursive Call</b> <br/> Exam: Final Sp11Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node116', name:'Fractals:\\n Line Segment vs. Recursive Call', children:[{id:'node155', name:'< <b>Fractals: Double Recursive Call</b> <br/> Exam: Final Sp11Q10', children:[{id:'node70', name:'< <B>Midterm</B>>', children:[]}]}]},{id:'node161', name:'Python Indexing:\\n 0 indexed', children:[{id:'node77', name:'Python Indexing', children:[{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node97', name:'< <b>String Slicing </b> >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node171', name:'< <b>List Mutation</b> <br/>Exam: Final Sp19Q16d', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node178', name:'< <b>Python: Iterables</b> <br/>Exam: Final Sp15Q17 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node162', name:'Python Indexing:\\n inclusive of first index', children:[{id:'node77', name:'Python Indexing', children:[{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node97', name:'< <b>String Slicing </b> >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node171', name:'< <b>List Mutation</b> <br/>Exam: Final Sp19Q16d', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node178', name:'< <b>Python: Iterables</b> <br/>Exam: Final Sp15Q17 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node169', name:'Append:\\n adding an ITEM to the end of a list', children:[{id:'node76', name:'List Syntax:\\n Python', children:[{id:'node73', name:'List Comp:\\n w/ Map', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node74', name:'List Comp:\\n w/ Filter', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node75', name:'List Comp:\\n w/ Map and Filter', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node118', name:'< <b>List Concatination </b> <br/>Exam: Final Fa14Q12a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node171', name:'< <b>List Mutation</b> <br/>Exam: Final Sp19Q16d', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node178', name:'< <b>Python: Iterables</b> <br/>Exam: Final Sp15Q17 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node170', name:'Extend:\\n adding all elements of an iterable to the end of a list', children:[{id:'node76', name:'List Syntax:\\n Python', children:[{id:'node73', name:'List Comp:\\n w/ Map', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node74', name:'List Comp:\\n w/ Filter', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node75', name:'List Comp:\\n w/ Map and Filter', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node118', name:'< <b>List Concatination </b> <br/>Exam: Final Fa14Q12a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node171', name:'< <b>List Mutation</b> <br/>Exam: Final Sp19Q16d', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node178', name:'< <b>Python: Iterables</b> <br/>Exam: Final Sp15Q17 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node181', name:'Pop:\\n removing an item from a list by its INDEX', children:[{id:'node76', name:'List Syntax:\\n Python', children:[{id:'node73', name:'List Comp:\\n w/ Map', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node74', name:'List Comp:\\n w/ Filter', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node75', name:'List Comp:\\n w/ Map and Filter', children:[{id:'node72', name:'< <b>List Comprehension </b> <br/>Exam: Final Sp20Q11c >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node118', name:'< <b>List Concatination </b> <br/>Exam: Final Fa14Q12a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node78', name:'< <b>List Slicing </b> <br/> Exam: Final Fa19Q14a >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node171', name:'< <b>List Mutation</b> <br/>Exam: Final Sp19Q16d', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node178', name:'< <b>Python: Iterables</b> <br/>Exam: Final Sp15Q17 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node80', name:'String Syntax:\\n Python', children:[{id:'node81', name:'+ on Strings Means Concatination', children:[{id:'node79', name:'< <b>String Concatination </b> <br/> Exam: Final Fa19Q14b', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node141', name:'< <b>\"\".join() for String Concatination</b> <br/>Exam: Final Sp20Q11b>', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node97', name:'< <b>String Slicing </b> >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node178', name:'< <b>Python: Iterables</b> <br/>Exam: Final Sp15Q17 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node142', name:'.join() used to concatinate strings in list', children:[{id:'node141', name:'< <b>\"\".join() for String Concatination</b> <br/>Exam: Final Sp20Q11b>', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]},{id:'node163', name:'Dictionaries:\\n made of key', children:[{id:'node121', name:'Dictionaries', children:[{id:'node164', name:'< <b>Dictionaries: WWPD</b> <br/> Exam: Final Fa18Q15 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node165', name:'< <b>Dictionaries: Write a Function </b> <br/> Exam: Final Sp18Q9c <br/> Online Exam: Final Fa18Q2 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]},{id:'node166', name:'Dictionaries:\\n have no set order', children:[{id:'node121', name:'Dictionaries', children:[{id:'node164', name:'< <b>Dictionaries: WWPD</b> <br/> Exam: Final Fa18Q15 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]},{id:'node165', name:'< <b>Dictionaries: Write a Function </b> <br/> Exam: Final Sp18Q9c <br/> Online Exam: Final Fa18Q2 >', children:[{id:'node71', name:'< <B>Final</B>>', children:[]}]}]}]}]}
    
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
