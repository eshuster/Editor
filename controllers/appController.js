angular.module('siteApp', ['ngContextMenu'])

.controller('appController', function ($scope){

  $scope.$on('keypress', function(data, keyCode){


    if (keyCode === 26) {
      // vm.txt = vm.textForIndex;
      console.log(vm.txt)
      console.log(vm.textForIndex)
      vm.txt = vm.textForIndex
      $scope.$apply()
      // debugger
    }



  })

  var vm = this;
  vm.showImageEditor = true;
  vm.showTextEditor = false;
  vm.showText = false

  vm.txt = ""
  vm.model = {}
  vm.textInput = false


  vm.functionList = [
  {
    name: 'Delete Thumbnail'
  },
  ]

  vm.textFunctionList = [
  {
    name: 'Edit Quote'
  },
  {
    name: 'Delete Quote',
  },
  ]

  vm.sampleParagraph = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

  var sampleParagraphArray = vm.sampleParagraph.split(" ")

  vm.textClickMenu = function(item) {
    if (item.name === "Edit Quote"){
      vm.textInput = true;
    } else if (item.name === "Delete Quote") {
      vm.txt = ""
      vm.showText = false;
    }
  }

  vm.changeText = function(text) {
    vm.textInput = false;
    vm.txt = text
    index = sampleParagraphArray.indexOf(vm.textForIndex);
    sampleParagraphArray[index] = text;
    vm.sampleParagraph = sampleParagraphArray.join(" ")
  }

  vm.dropZone = Dropzone.options.myAwesomeDropzone = {
      paramName: "file", // The name that will be used to transfer the file
      maxFilesize: 2, // MB
      previewsContainer: ".thumbnail",
      addRemoveLinks: true,
      thumbnailWidth: 250,
      thumbnailHeight: null,
      accept: function(file, done) {
        vm.file = file;
        done();
      },
    };

    vm.clickMenu = function (item) {
      if (item.name === "Delete Thumbnail") {
        Dropzone.forElement("#my-awesome-dropzone").removeAllFiles(true);
      }
    };


    vm.oldText = '';

    vm.showSelectedText = function() {
      var text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
        vm.textForIndex = text;
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
      }
      vm.txt = text
      vm.oldText = text

      if (vm.txt != "") {
        vm.showText = true;
      }
      return text;
    };

    interact('.resize-drag')
    .draggable({
      onmove: window.dragMoveListener
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true }
    })

    .on('resizemove', function (event) {
      var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
      });
  })

.directive('tooltip', function ($document, $compile) {
  return {
    link: function (scope, element, attrs) {

      $(element).on("mouseover", function () {
        $(this).append("<span>"+ attrs.tooltip +"</span>");
      // debugger
      });

      $(element).on("mouseout", function () {
        $(this).find("span").remove();
      });

      scope.$on("$destroy", function () {
        $(element).off("mouseover");
        $(element).off("mouseout");
      });
    }
  };
})

.directive('draggable', ['$document' , function($document) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var startX, startY, initialMouseX, initialMouseY;
      elm.css({position: 'absolute'});

      elm.bind('mousedown', function($event) {
        startX = elm.prop('offsetLeft');
        startY = elm.prop('offsetTop');
        initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
        return false;
      });


      function mousemove($event) {
        var dx = $event.clientX - initialMouseX;
        var dy = $event.clientY - initialMouseY;

        elm.css({
          top:  startY + dy + 'px',
          left: startX + dx + 'px'
        });
        return false;
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    }
  };
}])

.directive('keypressEvents', [
  '$document',
  '$rootScope',
  function($document, $rootScope) {
    return {
      restrict: 'AC',
      link: function() {
        $document.bind('keypress', function(e) {
          console.log('Got keypress:', e.which);
          $rootScope.$broadcast('keypress', e.which);
          $rootScope.$broadcast('keypress:' + e.which, e);
        });
      }
    };
  }
]);
