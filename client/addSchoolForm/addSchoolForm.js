 Template.addSchool.events({
	  'submit form#addSchool':function(theEvent,theTemplate){
		theEvent.preventDefault();
		SchoolObj.insert({
			"ownerId":Meteor.userId(),
			"schoolName":theTemplate.find("#inputSchoolName").value
		});
		theTemplate.find("#inputSchoolName").value=null;
	  },
		 
  });