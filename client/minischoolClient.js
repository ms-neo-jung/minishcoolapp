 Meteor.subscribe('theSchoolList');
 
  Template.schoolList.list=function(){
	  
	  return SchoolObj.find({},{sort:{schoolName:-1}});
  };

  Template.schoolList.addClassBox=function(){
	return (Session.equals('addClasstoSchool',this._id));
  };

  Template.schoolList.viewClass=function(){
	  if(Session.equals('viewClasses',this._id)){		  
		  	  console.log(this._id);
			//var classNames=SchoolObj.findOne({_id:this._id});
			var classNames=SchoolObj.findOne({_id:this._id});
			return classNames;
	  }		  
  };

  Template.schoolList.addTeacher=function(){
		return (Session.equals('addTeachers',this._id));
  };

  Template.schoolList.events({
	  'click #addClassButton':function(theEvent,theTemplate){
			Session.set('addClasstoSchool',this._id);
			Meteor.flush();
			theTemplate.find("#className").focus();
			//console.log(this._id);
	  },
	
	  'keyup #className':function(theEvent,theTemplate){
		 if(theEvent.which==13){
		  var uniqid = Date.now();
		  schoolName=theEvent.target.value;
		 SchoolObj.update({_id:this._id},{$addToSet:{classes:{classId:uniqid,name:schoolName}}});
		 Session.set('addClasstoSchool',false);
		 }
	  },

	  'focusout #className':function(){
			Session.set('addClasstoSchool',false);
	  },
	
	 'click #viewClasses':function(theEvent,theTemplate){
			//console.log(this._id);
			theEvent.preventDefault();
			Meteor.flush();
			Session.set('viewClasses',this._id);
			Session.set('addTeachers',false);
	  },
	  'click #addTeachers':function(theEvent,theTemplate){
		  theEvent.preventDefault();
		  Meteor.flush();
		  Session.set('addTeachers',this._id);
		  Session.set('viewClasses',false);
	  },
	  'change #teacherslist':function(theEvent,theTemplate){
		  var arr = (theEvent.target.value).split(".");
		  var schoolId=arr[0],classId=arr[1],teacherId=arr[2];
		  var obj=SchoolObj.findOne({_id:schoolId});
		  
		  for(var i=0;i<obj.classes.length;i++){
			  if(obj.classes[i].classId == classId){
				  console.log(obj.classes[i].classId+"   "+classId);
				  obj.classes[i].teachers=teacherId;
			  }
		  }
		  console.log(obj.classes);
		  SchoolObj.update({"_id":schoolId},{$set:{"classes":obj.classes}});
	  }
  });

  Template.addSchool.events({
	  'submit form#schoolForm':function(theEvent,theTemplate){
		theEvent.preventDefault();
		SchoolObj.insert({
			"ownerId":Meteor.userId(),
			"schoolName":theTemplate.find("#schoolName").value
		});
		theTemplate.find("#schoolName").value=null;
	  },
		 
  });

  Template.addTeachers.events({
	  'submit form#addTeacherForm':function(theEvent,theTemplate){
		  theEvent.preventDefault();
		  Meteor.flush();
		  var username=theTemplate.find("#username").value;
		  var password=theTemplate.find("#pwd").value;
		  SchoolObj.update(
			{_id:this._id},
			{$addToSet:{teachers:{uId:Date.now(),username:username,password:password}}}
		  );
		Session.set('addTeachers',false);
	  }
  });