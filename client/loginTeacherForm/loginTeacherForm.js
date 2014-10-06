Template.loginTeacherForm.events({	
		'submit #teacherLogin':function(event,template){
			event.preventDefault();
			Meteor.loginWithPassword(
				template.find("#username").value,
				template.find("#pwd").value,															
				function(err){
					if(err){			
						console.log("Invalid login");
						//return false;
					}
					else{
						Router.go("/");
					}
				}
			);
		}
  });