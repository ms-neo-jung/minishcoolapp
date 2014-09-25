SchoolObj = new Meteor.Collection('school');
if (Meteor.isClient) {

  Template.schoolList.list=function(){
	  return SchoolObj.find({ownerId:Meteor.userId()},{sort:{schoolName:-1}});
  };

  Template.schoolList.addClassBox=function(){
	return (Session.equals('addClasstoSchool',this._id));
  };

  Template.schoolList.viewClass=function(){
	  if(Session.equals('viewClasses',this._id)){		  
			var classNames=SchoolObj.findOne({_id:this._id});
			return classNames.classes;
	  }		  //console.lg(this._id);	
  };

  Template.schoolList.addTeacher=function(){
		return (Session.equals('addTeachers',this._id));
  };

  Template.schoolList.events({
	  'click #addClassButton':function(theEvent,theTemplate){
			Session.set('addClasstoSchool',this._id);
			//console.log(this._id);
	  },
	
	  'click #addClass':function(theEvent,theTemplate){
		  schoolName=theTemplate.find("#className").value;
		 SchoolObj.update({_id:this._id},{$addToSet:{classes:{name:schoolName}}});
		 Session.set('addClasstoSchool',false);
	  },
	
	  'focusout #className':function(theEvent,theTemplate){
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
