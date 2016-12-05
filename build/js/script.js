  $("document").ready(function(){
      if(getCookie('upload_login')==1)
          {
              if($("#upload-button").attr("data-target")=="#MYupload")
                $("#MYupload").modal();
              setCookie("upload_login","0");
          }
          
//        	if($(".scroll-pane-a").length){
//		$(".scroll-pane-a").scrollable({
//			speed: 600,
//                        mousewheel: true,
//                        onBeforeSeek: function(event,index){
//                            var object=$(".scroll-pane-a .item")[index];
//                            if($(object).hasClass("empty"))
//                                {
//                                    $.post("/ajax/action/scrollableitem/"+hfgd,{
//                                        page: current_page,
//                                        "id": id,
//                                        index: index+scrollable_offset
//                                        
//                                    },function(data){
//                                        $(object).html(data);
//                                        $(object).removeClass("empty")
//                                        
//                                    })
//                                }
//                              
//                        }
//                            
//		});
//             $(".scroll-pane-a").scrollable().seekTo(Math.floor((current_page-1)/9)-scrollable_offset,1);
//	}
        if( $("input[name=keyword]").length)
            {
            $("input[name=keyword]").autocomplete({
                "source": "/ajax/action/search_autocomplete/",
                "minLength": 2,
                "html": true,
                select: function(event, ui) {
                    $(this).val(ui.item.dalue);
                    $("#search_form").submit();
                 
                }
            }).data("ui-autocomplete")._renderItem=function( ul, item ) {
               
            return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<a>"+ item.label + "</a>" ) 
                .appendTo( ul );
            };
            }
            if(document.location.hash=="#show_cp" && $(".download-manual").attr("href")=="") requestCaptcha.call($(".download-manual")[0],id);
           $("input[name=keyword]" ).on( "autocompleteselect", function( event, ui ) {
               
               $(this).val(ui.item.dalue);
                    $("#search_form").submit();
           } );
        $("#search_form").submit(function(){
            var keyword=$(this).find("input[name=keyword]").val();
            var first_letter=keyword[0].toLowerCase();
            keyword=keyword.replace(/[\%\$\#\@\\\/]/gi," ").replace(/\+/gi,encodeURIComponent("+")).replace(/\&/gi,encodeURIComponent("&")).replace(/(^\s+|\s+$|\#)/gi,"").replace(/\s{2,}/gi," ");
            if(keyword.length>0 && keyword.match(/[a-z0-9]/gi))
            {
                var asb="/"+encodeURI(encodeURI(first_letter))+"/"+encodeURI(keyword.replace(/\s/g,"+").toLowerCase())+".html";
                if(typeof w1!="undefined"){
                  asb=asb+"?weight1="+w1+"&weight2="+w2;  
                }
                $.post("/ajax/action/search_stat/",{},function(data){
                        document.location.href=asb;
                });
            } else {
                document.location.href="/";
            }
            return false;
        })
        
     
             $("#wrap").delegate(".bookmark-link","click",function(){
              var link=this;
              if($(link).text()!="Already added" &&  $(link).children("a").text()!="Go to your account?")
                  {
                        $.post("/ajax/action/bookmark",{id: id},function(data){
                            $("#bookmark_popup").html(data);
                         
                            if(!data.match(/logged in<\/a>/))
                             {
                                     $("#MYbookmark").modal();
                                if($(link).children("input").length)
                                    {
                                        $(".bookmark-link").parent().html("Document has been successfully added to your collection. <a href='/userview/' style='text-decoration: underline;color:#468ADD'>Go to your account?</a>");
                                       
                                         
                                    }
                                else
                                    $(".bookmark-link").text("Already added");
                             }
                            else 
                                {
                                       $.post("/auth/?login_form=1&bookmark="+id,{},function(data){
                                             $("#MYenter").html(data);
                                                 $("#MYenter").modal()
                                       });
                                }
                        }) 
                  }
                  return false;
          });
          
     
       if($(".captcha_block").length){
		$(".captcha_block").delegate("form","submit",function(){
                    $.post("/download/",{"captcha": $(this).find("[name=captcha]").val(),
                                           "id":$(this).find("[name=id]").val()},function(data){
                                                $(".captcha_block").html(data);
                                           });
                    return false;                   
                })
		
		
	
	}
        if($("#searchtree").length){
            $("#searchtree>li>a").click(function()
        {
            $(this).parent().find("ul").toggle();
            if($(this).parent().hasClass("active"))
                {
                 $(this).parent().removeClass("active")
                    $.post("/ajax/action/search_lc_folding/",{"value": $(this).attr("id")*1});
                }
           else 
               {
                    $(this).parent().addClass("active");
                    $.post("/ajax/action/search_lc_folding/",{"value": $(this).attr("id")*-1});
               }
               return false;
        })
        
        } 
        
        
          $(".searchinmanual").delegate("#fulltext-search","click",function(){
            $(this).parent().submit();
        })
        
         $(".searchinmanual").delegate("form","submit",function(){
             if($("input#term").val()=="Search in this document" || $("input#term").val()=="")
                return false;
            if($(".searchinmanualblock").css("display")=="none")
                $(".searchinmanualblock").slideToggle(200);
         
            $(".searchinmanualblock").html('<img src="/images/ajax-preloader.gif">');
            $.post("/fulltext/",{"term":$("input#term").val(),"page":current_page,"id":id},function(data){
               $(".searchinmanualblock").html(data);
            });
            return false;
        });
   if($(".add-more-button").length){
        $(".add-more-button:not(#add-file)").click(function(){
            var num=$('.upload-line').length;
            if(num<10){
                var tmplUploadLine = '<div class="row urow">  <div class="col-sm-3"> <input type="text" name="pdf_links['+num+'][manufacturer]" id="manufacturer" placeholder="Brand" class="form-control" > </div> <div class="col-sm-3"><input type="text" name="pdf_links['+num+'][name]" id="name"  placeholder="Product name" class="form-control" > </div> <div class="col-sm-3"> <input type="text" name="pdf_links['+num+'][description]" id="description" placeholder="Short description" class="form-control" > </div> <div class="col-sm-3"> <input type="text" name="pdf_links['+num+'][link]" id="link" placeholder="Url" class="form-control" ></div></div>';
                $(tmplUploadLine).insertAfter(".upload-line:last");
               if(num==10)
                    $(this).remove();
            } else $(this).remove();
            return false;
        });
        
        $("#add-file").click(function(){
            var num=$('.upload-line').length;
            if(num<3){
                var tmplUploadLine = '<div class="row urow upload-line"> <div class="col-sm-3"><input type="text" name="upload_pdf['+num+'][manufacturer]" id="manufacturer" value="" placeholder="Brand" class="form-control" ></div><div class="col-sm-3"><input type="text" name="upload_pdf['+num+'][name]" id="name" value="" placeholder="Product name" class="form-control" ></div><div class="col-sm-3"><input type="text" name="upload_pdf['+num+'][description]" id="description" value="" placeholder="Short description" class="form-control" ></div><div class="col-sm-3"><input type="file" name="upload_pdf['+num+'][link]" id="link" value="" class="file-load" ></div></div>';
                $(tmplUploadLine).insertAfter(".upload-line:last");
                if(num==2)
                    $(this).remove();
            } else $(this).remove();
            return false;
        })
    }
    
    
        if($("#upload-file").length){
       $('#wrap').delegate("#upload-file","submit",function(){
           $(this).find("div.error").remove();
           var full=true;
           $(this).find("#manufacturer,#name").each(function(){
               if($(this).val()=='')
                   {
                       full=false;
                       $('<div class="error">Fill in '+$(this).attr("placeholder")+' field</div>').insertAfter($(this));
                   }
           })
           if(!full)
               return false;
           $('.pagecenter').children().css("display","none");
           $('.pagecenter').append($('<h2>Upload manuals from computer:</h2><div class="progress progress-striped active" style="margin:50px 0;"><div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'));
           return true;
   })
   }
    $('#wrap').delegate("#upload-links","submit",function(){
          
            $.post($(this).attr("action"),$(this).serialize(),function(data){
                setTimeout(function()
                 {
                      var asds=$("header").next("div");
                    $(data).insertAfter("header");
                    asds.remove();
                   
                 },2000);
            })
            $('.pagecenter').children().css("display","none");
             $('.pagecenter').append($('<h2>Upload manuals from web:</h2><div class="progress progress-striped active" style="margin:50px 0;"><div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'));
            return false;
        });
   
    
  
       $("#MYenter").delegate("#singin_link","click",function()
        {
           $.post($(this).attr("href"),{},function(data){
               $("#MYenter").html(data);
           });
           return false;
        });
     $("#MYenter").delegate(".restore","click",function()
        {
           $.post($(this).attr("href"),{},function(data){
               $("#MYenter").html(data);
           });
           return false;
        });
     
        $("#start_zoom").click(function(){
            $('.page-doc').elevateZoom({ zoomType : "lens", lensShape : "square", lensSize : 400,"loadingIcon": "http://www.manualslib.com/images/loading.gif",
            "onZoomedImageLoaded": function(){
                $('#spin-baby-spin').remove();
                $(".zoomLens").css("display","block")}}); 
            $(".page-doc .pdf").append("<div id='spin-baby-spin' style='width:400px; background-position: 160px 160px; background-color:white;  height:400px;border: 4px solid rgb(136, 136, 136);background-repeat: no-repeat; position: absolute; left: 0px; top: px; background-image: url(/images/loading.gif)'></div>")
            
        })
      var changed_field={};
       $("#MYenter").delegate("#reg_form input","change",function(){
           changed_field[$(this).attr("id")]=1;
           $("#reg_form div.error").remove();
           $("#reg_form input.error").removeClass("error");
           $.post("/ajax/action/validateregistration/",$(this).parents("form").serialize(),function(data){
               
               if(!(typeof data.length=="number" && data.length==0)){
                   for(var field in data){
                       if(typeof changed_field[field]!="undefined" && changed_field[field]==1){
                            $("#"+field).addClass('error');
                            $('<div class="error">'+data[field]+'</div>').insertAfter($("#"+field));
                       }
                   }
                       
               }
           },"json");
       })
        $("#MYenter").delegate("#reg_form","submit",function(){
           if($("#reg_form .error").length){
               return false;
           } else 
               return true;
       })
       $("#MYenter").delegate("form","submit",function(){
          $.post($(this).attr("action"),$(this).serialize(),function(data)
            {
                if(data.match(/^%redirect%/))
                    document.location.href=data.replace(/^%redirect%/,"");
                else
                    $("#MYenter").html(data);
            })
            return false;
       });
       
       
       
       
       $(".comments").delegate("#comment_form","submit",function(){
        var data={text: $("#comment_form [name=text]").val(), id: id};
        if($("#comment_form [name=author_name]").length)
            {
                data['author_name']=$("#comment_form [name=author_name]").val();
                data['captcha']=$("#comment_form [name=captcha]").val();
            }
        $.post("/ajax/action/comment/",data,function(data)
        {
            $("section.comments .container").html(data);
        })
        return false;
    })
    
    $(".comments").delegate("#comment_form #text","keypress",function(){
        var num=$(this).val().length;
        $("#num_symbols").text(num);
        if(num>1000 || num<30)
            $("#comm_length").addClass("error");
        else
            $("#comm_length").removeClass("error");
    })
        })
        
function toogleDouble()
{
    if($(this).text()=="Show all")
        {
            $("div#double_hidden").css('display','block');
            $(this).text("Hide");
        } else {
              $("div#double_hidden").css('display','none');
            $(this).text("Show all");
        }
}

function  scroll2Found()
{
    var pos=$(".found-string").offset().top;
    pos-=$(window).height()/2;
    var threshold=$("a[name=manual]").offset().top;
    if(pos>threshold)
        $(window).scrollTop(pos);
    else
        $(window).scrollTop(threshold);
}

function delBookmark(id,user)
{
    var window=$("#MYconfirm");
    window.find("form input[name=id_bookmark]").val(id);
    window.find("form input[name=user]").val(user);
    window.modal();
    return false;
    
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
  	options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) { 
      updatedCookie += "=" + propValue;
     }
  }

  document.cookie = updatedCookie;
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
