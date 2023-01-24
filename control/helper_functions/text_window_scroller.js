let scrollerCounter= 0;
async function textWindowScroller()  {  //this scrolls textwindow when it is run
    if (scrollerCounter<40)  {
        let twl= $("#textwindow p").length;
        let twh= $("#textwindow p").height();
        let twlh= twl*twh+twh
        // $("#textwindow").scrollTop(twlh);
        // $("#textwindow").scrollTop(twlh);
        let tw= document.getElementById('textwindow');
        console.log('text window element: '+tw.scrollHeight);
        $('#textwindow').append('</br>');
        tw.scrollTo(0,tw.scrollHeight);
        scrollerCounter++;
    } else if (scrollerCounter>=40)  {
        $('#textwindow').find('p').first().remove();
        let twl= $("#textwindow p").length;
        let twh= $("#textwindow p").height();
        let twlh= twl*twh+twh
        // $("#textwindow").scrollTop(twlh);
        // $("#textwindow").scrollTop(twlh);
        let tw= document.getElementById('textwindow');
        console.log('text window element: '+tw.scrollHeight);
        $('#textwindow').append('</br>');
        tw.scrollTo(0,tw.scrollHeight);
        //scrollerCounter++;
    }
}

export {textWindowScroller};