(function() {
  angular.module('$feedback.directives', []).directive('feedbackWidget', [
    '$http', function($http) {
      return {
        restrict: 'E',
        scope: {
          url: '@',
          thanksText: '@'
        },
        link: function(scope, element, attrs, controller) {
          scope.feedback = {};
          scope.viewMode = 'sm';
          element.find('button.btn-feedback-submit').bind('click', function() {
            $http.post(scope.url, {
              feedback: scope.feedback
            });
            return scope.$apply(function() {
              scope.feedback.comment = '';
              if (scope.thanksText === void 0 || scope.thanksText.length === 0) {
                scope.thanksText = 'Thanks for your feedback!';
              }
              scope.thanksMsg = true;
              return scope.viewMode = 'sm';
            });
          });
          return scope.$watch('viewMode', function(newValue, oldValue) {
            if (newValue === 'lg') {
              return element.find('textarea.txt-feedback-comment').focus();
            }
          });
        },
        template: "    <div ng-show='viewMode==\"lg\"' class='form-group'>      <label class='lbl-feedback-comment' for='feedbackComment'>Comment:</label>      <textarea class='form-control txt-feedback-comment' ng-model='feedback.comment' id='feedbackComment'/>      <button class='btn-feedback-submit btn btn-sm btn-primary' ng-disabled='!feedback.comment.length>0'>Submit</button>      <button class='btn-feedback-cancel btn btn-sm' ng-click='viewMode=\"sm\"'>Cancel</button>    </div>    <div class='div-feedback-toggle-off text-right'>      <div class='div-feedback-thanks-text' ng-show='thanksMsg==true'>{{thanksText}}</div>      <button ng-click='viewMode=\"lg\";thanksMsg=false' ng-show='viewMode==\"sm\"' class='btn btn-sm btn-feedback-toggle'>Feedback</button>    </div>"
      };
    }
  ]);

}).call(this);
