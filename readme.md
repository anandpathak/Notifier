# Angular Notifier

Angular 1 module for creating notifications of various type.

### Feature
  - No dependencies.
  - Very Small size.
  - Support different Type of Notification
  - Customisable option

### Install

  - To install the Package download the Module from `dist` folder
  - Load the js in your html
  - `<script src="ui-1.6.5.min.js" >`

### Usages

To use the Module, it need to be injected into the angular application. Module config can also be extended

 ````
 var app=angular.module('demoApp', ['notifier']);
app.config(["NotifyProvider",function(NotifyProvider){
    NotifyProvider.configure({
        maxCount: 0,
        timeout: 5000,
        startTop: 10,
        startRight: 10,
        horizontal: 'right',
        vertical: 'bottom',
        max_message:5,
    })
}]);
````
  - maxCount is the count of notification, timeout shows the time duration notification should exist and startTop, startRight,horizontal, vertical are for positioning the notification. max_message is the number of notification allowed in a group
  - To trigger a Notification, Notify should be inject in controller/ service
  
```
app.controller('testCtrl', ['Notify', function(Notify){
    Notify({
        header: " simple header",
        "message":"this is a example",
        type:"error",
        "X":"right",
        "Y":"top"
    })
});
```

### Testing & Contribution

  - Install the dependencies and devDependencies.

```
$npm install
$bower install
```
  - build The Repo with
```
$grunt build //will generate js in dist folder also update docs
```
  - Test changes
```
$ karma start 
```