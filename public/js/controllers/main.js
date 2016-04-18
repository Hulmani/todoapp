angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		//$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		
                                   
//        Todos.get()
//			.success(function(data) {
//				//$scope.todos = data;
//				$scope.loading = false;
//			});
                                   



		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined && $scope.formData.user !=undefined ) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
                             //display data only belonging to the user
                             // assign our new list of todos
                        $scope.todos = data;
                             $scope.formData.text = ""; // clear the form so our user is ready to enter another
						
                             
                    
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id,userName,completed) {
			$scope.loading = true;
                                   console.log(userName+" "+id+" "+completed);
                if(!completed)
                                  {
                  $scope.msg="Please complete task before deleting";
               // alert("Please complete task before deleting");
                                   $scope.deleteBox=false;
                                   $scope.loading = false;

                    }
                                   else
                                   {
			Todos.delete(id,userName)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
                                   }
		};
	
            $scope.completeTodo = function(id,userName) {
              $scope.loading = true;
               Todos.completed(id,userName)
                  // if successful creation, call our get function to get all the new todos
                 .success(function(data) {
                    $scope.loading = false;
                       $scope.todos = data; // assign our new list of todos
                        });
                    };
                                   
                                   
         $scope.userTodoList = function(userName) {
               $scope.loading = true;
                                   
           Todos.userToDoList(id)
                // if successful creation, call our get function to get all the new todos
                     .success(function(data) {
                              $scope.loading = false;
                          $scope.todos = data; // assign our new list of todos
                    });
                };
                                   
    }]);