import { requestAnimFrame } from '../../utils/utils';
import { ScrollHelper } from './ScrollHelper';
import { updateRows } from '../../utils/style'
import { TranslateXY } from '../../utils/translate';

export function ScrollerDirective($timeout){
  return {
    restrict: 'E',
    require:'^dtBody',
    transclude: true,
    replace: true,
    template: `<div ng-style="scrollerStyles()" ng-transclude></div>`,
    link: function($scope, $elm, $attrs, ctrl){
      var ticking = false,
          lastScrollY = 0,
          lastScrollX = 0;

      ctrl.options.internal.scrollHelper = 
        new ScrollHelper($elm.parent());

      var inner = $elm[0].getElementsByClassName('inner');

      function update(){
        //$timeout(() => {
          ctrl.options.internal.offsetY = lastScrollY;
          ctrl.options.internal.offsetX = lastScrollX;
          ctrl.updatePage();

        ctrl.getRows();
        TranslateXY(inner[0].style, 0, lastScrollY);
        
        //updateRows();
        $scope.$apply();

        ticking = false;
        //});
      };

      function requestTick() {
        if(!ticking) {
          requestAnimFrame(update);
          ticking = true;
        }
      };

      $elm.parent().on('scroll', function(ev) {
        lastScrollY = this.scrollTop;
        lastScrollX = this.scrollLeft;
        requestTick();
      });

      //updateRows();

      $scope.scrollerStyles = function(scope){
        return {
          height: ctrl.count * ctrl.options.rowHeight + 'px'
        }
      };

    }
  };
};
