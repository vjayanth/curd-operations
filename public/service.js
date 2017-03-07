App.factory('AppService',function($http){

	return ({

			createRecord:createRecord,
			getRecords:getRecords,
			deleteRecord:deleteRecord
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
			function deleteRecord(postObj){
				return $http.post('/deleteRecord',postObj)
				.then(function(response){
					return response.data;
				},function(error){
					return response.error;
				})


			}
			function updateRecord(postObj){
				return $http.post('/deleteRecord',postObj)
				.then(function(response){
					return response.data;
				},function(error){
					return response.error;
				})


			}
	

});