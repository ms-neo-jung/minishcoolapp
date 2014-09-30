

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