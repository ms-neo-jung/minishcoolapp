Meteor.startup(function () {
    // code to run on server at startup
	Meteor.publish('theSchoolList',function(){
		return SchoolObj.find({ownerId:this.userId});
	});
  
	Meteor.publish('teachersData',function(){
		return TeachersObj.find({adminId:this.userId});
	});
  });