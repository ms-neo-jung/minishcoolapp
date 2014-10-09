 Template.schoolList.list=function(){

	  return SchoolObj.find({},{sort:{schoolName:-1}});
  };

  Template.schoolList.addClassBox=function(){
	return (Session.equals('addClasstoSchool',this._id));
  };

  Template.schoolList.allocateTeachers=function(){
	 // console.log(Session.get('allocateTeachers')+"  "+this._id);
	  return (Session.equals('allocateTeachers',this._id));
  };

  Template.schoolList.addTeacher=function(){
		return (Session.equals('addTeachers',this._id));
  };

  Template.schoolList.addClass=function(){
	  return (Session.equals('addClass',this._id));
  };

  Template.schoolList.events({
	  'click #addClassLink':function(theEvent,theTemplate){
			Session.set('addClass',this._id);
			Meteor.flush();
			theTemplate.find("#inputClassName").focus();
	  },
	
	  'focusout #inputClassName':function(){
			Session.set('addClass',false);
	  },
	
	 'click #viewClasses':function(theEvent,theTemplate){
			Session.set('viewClasses',this._id);
			//Session.set('addTeachers',false);
			
	  },
	
	  'click #allocateTeachers':function(theEvent,theTemplate){
			theEvent.preventDefault();
			Session.set('allocateTeachers',this._id);
			Session.set('addTeachers',false);
			Meteor.flush();
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
		  if(!TeachersObj.findOne({"schoolId":schoolId,"teacherId":teacherId}) && teacherId!=null){
			  TeachersObj.insert({
				  "adminId":Meteor.userId(),
				  "schoolId":schoolId,
				  "classId":classId,
				  "teacherId":teacherId
				});
			}
	  },
	
	  'submit form#addClass':function(theEvent,theTemplate){
		  theEvent.preventDefault();
		  var uniqid = Date.now();
		  className=theTemplate.find("#inputClassName").value;
		 SchoolObj.update({_id:this._id},{$addToSet:{classes:{classId:uniqid,name:className}}});
		 Session.set('addClass',false);
		 
	  }
	  
  });

  