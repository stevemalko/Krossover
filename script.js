var videoSrc = "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4";
			var app = angular.module('videoSlicer', []);
			var _duration = 0;
			var video = document.createElement('video');

 
			
			app.directive('videoPlayer', function() {
			  return {
				restrict: 'E',
				//template : '<video id="video" controls  src="" type="video/mp4"/>'
				templateUrl: "videoplayer.html"
			  };
			});
			
			app.directive('videoPlayerList', function() {
			  return {
				restrict: 'E',
				templateUrl: "videoList.html"
			  };
			});
			
			
			
			app.filter('secondsToDateTime', [function() {
				return function(seconds) {
					//return new Date(1970, 0, 1).setSeconds($scope.startTime);
					return "test";
				};
			}])
			
			app.filter('millSecondsToTimeString', function() {
			      var sec_num = parseInt(this, 10); // don't forget the second param
				var hours   = Math.floor(sec_num / 3600);
				var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
				var seconds = sec_num - (hours * 3600) - (minutes * 60);

				if (hours   < 10) {hours   = "0"+hours;}
				if (minutes < 10) {minutes = "0"+minutes;}
				if (seconds < 10) {seconds = "0"+seconds;}
				var time    = hours+':'+minutes+':'+seconds;
				console.log(time);
				return time;
			});
			
			
 app.filter('capitalize', function() {
    return function(input, scope) {
        return input.toUpperCase();
    }
});

function capitalize(input){
	return input.toUpperCase();
}

		  
	 	 
		app.controller('MyControl', function($scope, $http){
			$scope.titleHeader;
			$scope.initialLoad = true;
			$scope.videoListIndex = 1;
			$scope.showSliceControls = false;
			$scope.instructions = true;
			
			//Create the base model
			$scope.scenes = [
 
			];
			
			
			
			
			
			
			
			// Add a scene to the list
			$scope.addScene = function () {
				//console.log($scope.endTime +' - '+ _duration);
				if($scope.startTime == null || $scope.endTime == null){ // checks to make sure the text fields are filled in
					alert("You need to have a start time and an end time for your scene");
				}
				/*else if($scope.endTime > _duration){ // checks to make sure you didnt input an end time greater than the video length
					
					alert("You need to have an end time that is less than the total length of the video.");
				}*/
				else if($scope.startTime < $scope.endTime){
					$scope.scenes.push({
						Name: $scope.sceneName,
						StartTime: Math.floor($scope.startTime),
						EndTime: Math.floor($scope.endTime),
						tags: $scope.tags
					});

					// Clear input fields after push
					$scope.sceneName = "";
					$scope.startTime = "";
					$scope.endTime = "";
					$scope.tags = "";
				}
				else{
					alert("The start time can not be equal to or greater than the end time");
				}

			};
			
			$scope.videoSelector = function(keyEvent) {
				switch (keyEvent.which) {
				case 37: //left
					if($scope.videoListIndex > 0){
						$scope.videoListIndex--;
						$scope.playScene($scope.videoListIndex);
					}
					break;
				case 39: //right
					if($scope.videoListIndex < $scope.scenes.length-1){
						$scope.videoListIndex++;
						$scope.playScene($scope.videoListIndex);
					}
					break;
 
				}
			}
			
			//Add the current time to the start time text box
			$scope.addStart = function () {
				$scope.startTime = Math.floor($('video').get(0).currentTime);
			};
			
			//Add the current time to the end time text box
			$scope.addEnd = function () {
				$scope.endTime = Math.floor($('video').get(0).currentTime);
			};
			
			//Removes a scene from the list
			$scope.remove = function (index) {
				
				var r = confirm("Are you sure you want to delete the scene?");
				if(r==true){
					$scope.scenes.splice(index, 1);
				}
			};
			
			//updates a scene's data
			$scope.update = function(index, scene){
				$scope.scenes[index].Name = scene.Name;
				$scope.scenes[index].StartTime = scene.StartTime;
				$scope.scenes[index].EndTime = scene.EndTime;
			};
			
			//Play the scene from the list
			$scope.playScene = function(index){
				var cutScene = videoSrc;
				$scope.instructions = false;
				
				if($scope.scenes[index].StartTime>0){
					cutScene = cutScene + "#t="+$scope.scenes[index].StartTime+","+$scope.scenes[index].EndTime;
				}
				$scope.titleHeader = $scope.scenes[index].Name;
				$scope.videoListIndex = index;
				$scope.showSliceControls = true;
 
				$('video').attr('src',cutScene);
				$('video').get(0).play();
				
				//Selected class shows you which scene you are currently watching byt
				//adding a red border around the item in the list
				$('li').removeClass('selected');
				$("li:nth-child("+(index+1)+")").addClass('selected');
				
			};
			
 
 
			
			//Play all the scenes - not implementated
			$scope.playAllScenes = function(){
				if(videoIndex == undefined){
					videoIndex = 0;
				}
				
				var cutScene = videoSrc + "#t="+$scope.scenes[videoIndex].startTime+","+$scope.scenes[videoIndex].endTime;
				$('video').attr('src',cutScene);
				$('video').get(0).play();
			 
				 
			};
			
			
			
			
			
			//Video player bindings
			$("video").bind("pause", function() {
				/*videoIndex++;
				if(videoIndex < $scope.scenes.length){
					$scope.playAllScenes();
				}*/
				//console.log('paused');
			});
			
			$("video").bind("loadeddata", function(){
				 //console.log('loaded');
				 
			});
			
			
			$("video").bind("progress", function(){
				 //console.log('progress');
				 
			});
			
			
	
			
			//Load some sample data
			//Add the full video as the first in the list
			$scope.scenes.push({
				Name: "Full Video",
				StartTime: 0,
				EndTime: $scope._duration,
				tags: "full movie"
			});
			
			$scope.scenes.push({
				Name: "Slice #1",
				StartTime: 5,
				EndTime: 15,
				tags: "slice 1, start, intro"
			});
			
			$scope.scenes.push({
				Name: "Slice #2",
				StartTime: 10,
				EndTime: 25,
				tags: "middle slice, slice 2, another tag"
			});
			
			$scope.scenes.push({
				Name: "Slice #3",
				StartTime: 20,
				EndTime: 35,
				tags: "middle slice, slice 2, another tag"
			});
			
			
			//Start the first Video
			//$scope.playScene(0);
			 
 
		});
		   
		   String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

 