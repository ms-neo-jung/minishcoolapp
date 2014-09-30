 Template.schoolList.list=function(){
	  return SchoolObj.find({},{sort:{schoolName:-1}});
  };

  Template.schoolList.addClassBox=function(){
	return (Session.equals('addClasstoSchool',this._id));
  };

  Template.schoolList.viewClass=function(){
	  if(Session.equals('viewClasses',this._id)){		  
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
		  if(!TeachersObj.findOne({"schoolId":schoolId,"teacherId":teacherId}) && teacherId!=null){
			  TeachersObj.insert({
				  "adminId":Meteor.userId(),
				  "schoolId":schoolId,
				  "classId":classId,
				  "teacherId":teacherId
				});
			}
	  }
  });