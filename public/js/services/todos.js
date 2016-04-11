angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
                   
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id,userName) {
                      
				return $http.delete('/api/todos/' +userName+'/'+id);
			},
                       
            userTodoList : function(userName) {
                       
                return $http.get('/api/todos/' + userName);
                
                },
                       completed : function(id,userName) {
                       
                       return $http.put('/api/todos/' + userName+'/'+id);
                       
                       }

                       
		}
	}]);