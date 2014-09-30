Router.configure({
	layoutTemplate:'layout'
});
Router.map(function(){
	this.route('adminLogin',{path:"/"});
	this.route('loginTeacherForm',{path:"/loginTeacherForm"});
});