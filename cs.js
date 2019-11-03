chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "iconClicked" ) {
 	}  
  }
);


window.onload = setTimeout(function(){
	document.body.innerHTML += '<div class="modal fade" id="myModal" role="dialog"> <div class="modal-dialog"> <div class="modal-content" id="question"> <div class="modal-header"> <h4 class="modal-title">Ad2Charity</h4> </div> <div class="modal-body"><p>Watch a short video to get a DISCOUNT and help the needy</p> </div> <div class="modal-footer"><button type="button" class="btn btn-primary" id="Yes">Yes</button><button type="button" class="btn btn-danger" data-dismiss="modal">No</button> </div> </div> </div> </div>';
		
		$('#myModal').modal({backdrop: "static"});
		$("#Yes").click(function(){
			//Replace current modal content by video
			$( "#question" ).replaceWith( '<div class="modal-content" id="videobox"> <div class="modal-header"><h4 class="modal-title">Ad2Charity</h4> </div> <div class="modal-body"><video width="480" height="240" autoplay> <source src="ads/ad1.mp4" type="video/mp4"></video></div> </div>' );

			//check for video end
			$('video').on('ended',function(){
				console.log("Advertisement has ended");
				//Compute Discount
				var price = parseFloat($("#price").text());
				var tax = parseFloat($("#tax").text());
				
				var discount = parseFloat("1.0");

				total = price + tax - discount;
				
				$("#discount").html("Discount: $" + discount);
				$("#total").html("New Total: $" + total.toFixed(2));

				
				//Sends a post request to ngrok link of A2C
				$.post( "https://1c8af89d.ngrok.io/update",{ video_end: true, vid_id: 2 }).done(function(data ) {
    				console.log( "Data Updated: " + data );
  				});

				$('#videobox').replaceWith('<div class="modal-content" id="thanks"> <div class="modal-header"><h4 class="modal-title">Congratulations</h4> </div> <div class="modal-body"><p>You have earned yourself a discount while donating for a good cause!</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">I feel awesome!!</button> </div> </div>');
				// sendResponse({message: "AdvertisementDone"});
			});
		});
	},2000);