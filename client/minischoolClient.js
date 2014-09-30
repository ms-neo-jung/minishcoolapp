 Meteor.subscribe('theSchoolList');
 Meteor.subscribe('teachersData');
 
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

  Template.loginTeacherForm.events({	
		'submit #teacherLogin':function(theEvent,theTemplate){
			theEvent.preventDefault();
			var username = theTemplate.find("#username").value;
			var pwd = theTemplate.find("#pwd").value;

		}
  });