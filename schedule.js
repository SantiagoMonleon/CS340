$(document).ready(function() {

	function Room(color, cssClass, id) {
		//initialize schedule with empty strings
		let s = [[], [], [], [], []];
		for (let i = 0; i< 5; i++){
			for(let j = 0; j<15; j++ ){
				s[i][j] = "";
			};
		}
		this.roomName = cssClass;
		this.roomId = id;
		this.roomSchedule = s;
		this.cssClass = cssClass;
		this.color = color;
		this.visible = true;
		//day: string; time: int from 8-21 (military time); class_name=string
		this.addClass = function(day, time, className){
			this.roomSchedule[day][time-8] = className;
			//perhaps use classObj later
		};
  };

	function ClassObj(title){
		this.title = title;
	};

  function MasterSchedule(){
		this.data = [ [],[],[],[],[] ];
		this.Rooms =[];
		this.numRooms =0;
		this.init = function(){
			for(let d = 0; d<5; d++){
				for(let t = 8; t < 21; t ++ ){
					this.data[d].push([]);//add array to each timeslot--"" means array is empty
				};
			};
		};
		this.colIds = [	"monday-col",
		 								"tuesday-col",
										"wednesday-col",
										"thursday-col",
										"friday-col"
									];
		this.addRoom = function(room){
			this.Rooms.push(room);
			this.numRooms += 1;
			for(let d=0; d<5; d++){
			  for(t = 0; t< 13; t++){
				  this.data[d][t].push(room.roomSchedule[d][t]);
				};
			};
		};
		this.listRooms = function(){
			let room, roomName, roomId;
			let roomList = $("#room-legend");
			for (let i = 0; i<this.numRooms; i++){
				console.log("listRooms");
				roomName = this.Rooms[i].roomName;
				roomId = this.Rooms[i].roomName;
				roomList.append("<p id=\"" + roomId + "\">" + roomName + "</p>");
				room = $("#" + roomId);
				room.css({"background-color":this.Rooms[i].color});
				room.addClass("timeslot");
			}
		}
		this.draw = function(){
			//to do: clear the schedule display first
			this.listRooms();
			let color, classname, col, colID, slotId, roomIndex, classId;
			for (let i=0; i<this.data.length; i++){//i = day
				colId = this.colIds[i];
				col = $("#" + colId);
				for(let j=0; j< this.data[i].length; j++){//j = timeslot
					//slot will hold all the classes in that timeslot
					slotId = colId+"slot-"+j;
					col.append("<div id=\"" + slotId + "\"></div>");
					slot = $("#" + slotId);
					slot.addClass("timeslot");

					let z =1;
					//to do: loop through all rooms
					for(r = 0; r< this.numRooms; r++){
					//z += 1; //this class will cover whichever class is currently showing
						roomIndex = r;
						room = this.Rooms[roomIndex];
						classname = this.data[i][j][roomIndex];
						if(classname === ""){
							color = "lightGray";
						}
						else if (room.visible === true) {
							z += 1; //this room will cover whichever room is currently showing
							color = room.color;
							slot.css({"background-color":color});
						}
						classId = slotId+"room-"+room.roomId;
						slot.append("<p id=\"" + classId + "\">" + classname + "</p>");
						thisClass = $("#" + classId);
						thisClass.css({"height":"100%","position":"absolute", "z-index":z});

					}
			  };
			};
		};
	};


	let room106 = new Room("yellow", "r106", 0);
	room106.addClass(0, 9, "MUS 171");
	room106.addClass(2, 9, "MUS 171");
	room106.addClass(0, 10, "MUS 172");
	room106.addClass(2, 10, "MUS 172");

	let room202 = new Room("lightBlue", "r202", 1);
	room202.addClass(0, 12, "Chamber");
	room202.addClass(2, 12, "Chamber");
	room202.addClass(4, 12, "Chamber");
	room202.addClass(0, 17, "Orchestra");

	let room305A = new Room("pink", "r305A", 2);
	room305A.addClass(0, 8, "MUS 134");
	room305A.addClass(1, 8, "MUS 134");
	room305A.addClass(2, 8, "MUS 134");
	room305A.addClass(3, 8, "MUS 134");




	let masterSchedule = new MasterSchedule;
	masterSchedule.init();
	masterSchedule.addRoom(room106);
	masterSchedule.addRoom(room202);
	masterSchedule.addRoom(room305A);

	masterSchedule.draw();



});
