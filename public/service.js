App.factory('AppService',function($http){

	return ({

			createRecord:createRecord,
			getRecords:getRecords
			})
			function createRecord(postObj){
				return $http.post('/create',postObj)
				.then(function(response){
					return response.data;
				},function(error){
					return response.data;
				})


			}
			function getRecords(){
				return $http.get('/getList')
				.then(function(response){
					return response.data;
				},function(error){
					return response.error;
				})


			}
	

});