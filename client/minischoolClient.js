 Meteor.subscribe('theSchoolList');
 Meteor.subscribe('teachersData');

 //Autosubscribe when the Session 'allocateTeachers gets set' and refreshes the template
 Meteor.autosubscribe(function(){
	 Meteor.subscribe('directory',Session.get("allocateTeachers"));
 });

Meteor.startup(function () {
  Deps.autorun(function () {
    if(!Meteor.userId()){
      //no user is logged in.  ensure they are not on a protected route
      Deps.nonreactive(function () {	  
        var protected_paths = ['addTeacherForm', 'addSchoolForm'];
        var context = Router.current();
        if(context){
          Router.go('adminLogin');
        }
      });
    }
  });
});