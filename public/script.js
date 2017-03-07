var App =angular.module('MiniProj',['ngMaterial','ui.router']);


App.controller('MiniController',function($scope,$state,AppService,$stateParams){
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
	console.log($stateParams);
	$scope.getList=function(){
		AppService.getRecords()
		.then(function(response){
			$scope.records=response;
		})
	}
	$scope.deleteRecord=function(record){
		AppService.deleteRecord(record)
		.then(function(response){
			$scope.successMessage=response.message;
				
		},function(error){
			$scope.error=error;
		})
	}
	$scope.editRecord=function(record){
		var param={'id':record._id}
		$state.go('update',param);
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
.state('update',{
	path:'/update/:id',
	templateUrl:'public/html/update.html',
	controller:'MiniController'
})
.state("otherwise", { url : '/'});

});