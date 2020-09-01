$(document).ready(function(){
    const currentPosition = navigator.geolocation.getCurrentPosition(function (position){
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
     
        $.ajax({
            url:`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=056eaec81e314e348175d4ef37c3fbaf`,
            success:function(data){
                $('#place').text(`${data.results[0].formatted}`)

                $.ajax(
                    { 
                        url: `https://api.unsplash.com/search/photos/?client_id=1PxLhagaDb8qlR8vyKKTBy7modcHos4-l5-GXvJV_Lk&query=${data.results[0].formatted}`,

                        success:function(result){
                            for (let i in result.results){

                                $('#image-box').append(
                                    `<div class="col-lg-3 col-md-4 col-sm-6 col-12">
                                        <img src="${result.results[i].urls.full}" alt="" class="img-fluid mb-4" style="width:100%;height:200px; background-size:cover">
                                    </div>`
                                )
                            }
                            
                        }
                    }
                )
                

            },
            error:function(data){
                $('body').html(data)
                console.log("error")
            }
        })
    
    })
})


