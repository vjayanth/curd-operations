var App =angular.module('MiniProj',['ngMaterial','ui.router']);


App.controller('MiniController',function($scope,$state,AppService){
	$scope.postObj={name:'',description:'',amount:''};	
	$scope.createRecord=function(){
		AppService.createRecord($scope.postObj)
		.then(function(response){
			$scope.successMessage="Successfully created";
			$scope.postObj={name:'',description:'',amount:''};	
		},function(error){
			$scope.error=error;
		})

	}
	$scope.getList=function(){
		AppService.getRecords()
		.then(function(response){
			$scope.records=response;
		})
	}
});


App.config(function($stateProvider){

$stateProvider

.state('create',{
	path:'/create',
	templateUrl:'public/html/create.html',
	controller:'MiniController'
})
.state('view',{
	path:'/view',
	templateUrl:'public/html/view.html',
	controller:'MiniController'
})
.state("otherwise", { url : '/'});

});