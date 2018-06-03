const moment = require('moment')
const notifier = require('node-notifier')
const path = require('path')


//Get current time And update by set a Timer 
let time = moment().format('HH:mm') ;
let trigger = "09:10";  // trigger time
let deadline = "10";
let noticeTimer;	//Timer


 


timer()

/** Now Time */
function timer() {
    time = moment().format('HH:mm');     

    /** Set Now */
    check(); 

    noticeTimer = setTimeout(() => {
        timer()
    }, 50000)
}

 


/** Check Time */
function check() { 
    const diff = moment(time, 'HH:mm').diff(moment(trigger, 'HH:mm'))
    if (diff === 0) {
        const msg = "=== trigger: " + trigger + " ===";
        console.log(msg); 
        notice();
    }
}

/**
 * System Notification
 * @param {string} msg
 */

var laterResp = 'Later';
var closeResp = 'Got it!';
function notice() {

	if(moment().format('HH') == deadline) { 
    	clearTimeout(noticeTimer);
    	return;
    }

    /** https://github.com/mikaelbr/node-notifier */
    notifier.notify(
    {
    	title: '=== Notifications ===',
	    message: 'Order Now - Choice Lunch',
	    sound: false,
	    wait:true,
	    timeout: 20, 
	    closeLabel: closeResp,
	    actions: laterResp, 
        icon: path.join(__dirname, '/assets/icon/myapp.ico')
    },
    function(err, response, metadata) {
	    if (err) throw err; 

	    //Got it
	    if(metadata.activationValue == closeResp){ 
	    	clearTimeout(noticeTimer);
	      	return; // No need to continue
	    }

	    if (metadata.activationValue == laterResp || metadata.activationType == 'timeout') {
	    	console.log("metadata.activationValue == laterResp / timeout");
	    	console.log("timestamp: " + time);
	    }


	    setTimeout(function(){ 
	    	notice(); 
	    	console.log("setTimeout notice()");
	    }, 900000);

	    
	  }
    )//ENd og notify
}