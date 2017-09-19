define(["jquery"],function($){
	var idstr=0;
	return{
		retid:function(id){
			idstr=id;
		},
		idst:idstr
	} 
});