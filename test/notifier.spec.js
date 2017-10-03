describe('notifier', function() {
	var notifier_config,timeout;

	//Load Modules
	beforeEach(function(){
		module('notifier_template.html');
		module('notifier');
		notifier_config = providerGetter('notifier', 'NotifyProvider')();
	});
	beforeEach(inject(function(_$timeout_){
		timeout=_$timeout_;
	}))
	//Get the provider 
	 function providerGetter(moduleName, providerName) {
            var provider;
            module(moduleName, 
                         [providerName, function(Provider) { provider = Provider; }]);
            return function() { inject(); return provider; }; // inject calls the above
        }
  	it('Define Provider',function () {
  		console.log(notifier_config.options);
  		expect(notifier_config).not.toBeUndefined();
	});
  	it('set Notification configuration',function(){
  		var conf={
  			maxCount: 0,
            timeout: 10000,
            startTop: 15,
            startRight: 20,
            horizontal: 'right',
            vertical: 'bottom',
            max_message:10,
  		};
  		notifier_config.configure(conf);
  		expect(notifier_config.options).toEqual(conf);
  	});
  	it('Trigger notification', inject(function(Notify){
  		Notify({
  			header: "A example Header",
  			message : "A test Message"
  		});
  		expect(document.getElementsByClassName("Message").length).not.toEqual(0);
  	}))
  	it('notification details test', inject(function(Notify){
  		var data= {
  			header: "header",
  			message: "message",
  			type: "error",
  			X: "right",
  			Y:"bottom",
  		}
  		Notify(data);

  		var actual_data= {};
  		dom = document.getElementsByClassName("Message")[1]
  		actual_data.header= document.getElementsByClassName("Message-body")[1].childNodes[1].innerText;
  		actual_data.message=document.getElementsByClassName("Message-body")[1].childNodes[3].innerText;
  		dom.attributes["class"].value.indexOf("right") !=-1 ? (actual_data.X='right') : (actual_data.X='left');
  		dom.attributes["style"].value.indexOf("bottom") !=-1 ? (actual_data.Y='bottom') : (actual_data.Y='top');
  		actual_data.type="error";
  		expect(actual_data).toEqual(data);
  	}));
  	it('Notification auto disable', inject(function(Notify){
  		Notify({
  			header: "header",
  			message: "message",
  			type: "warning",
  			X: "right",
  			Y:"top",
  		});
  		var before=document.getElementsByClassName("Message").length;
  		
  			var after =document.getElementsByClassName("Message").length;
  			console.log(before+ " , " + after);
  		timeout.flush();
  		
  	}))
});

