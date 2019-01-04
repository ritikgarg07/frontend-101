function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;       
}   



var width_body = document.documentElement.clientWidth;
var height_body = document.documentElement.clientHeight; 

window.onload = function drawSVG() {
    center_x = width_body/2;
    center_y = height_body/2;
    var bg_circle = document.getElementById("bg-circle");
    var inner_circle = document.getElementById("inner-circle");
    var hrs_bar = document.getElementById("hrs_bar"); 
    var mins_bar = document.getElementById("mins_bar");
    var secs_bar = document.getElementById("secs_bar");
    var marks_circle = document.getElementById("marks");
    var marks = document.getElementsByTagName("line");
    
    var time = new Date();
    var secs = time.getSeconds() + time.getMilliseconds()/1000;
    var mins = time.getMinutes() + secs/60;
    var hrs = time.getHours() + mins/60;
    var day = time.getDay();
    var week =  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var en = hrs >= 12 ? 'PM' : 'AM';
    var date_first = time.getDate();
    if (date_first < 10) {
        date_first = "0" + date_first;
    }
    var month = time.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = `${date_first}/${month}/${time.getFullYear()}`;
    
    if(hrs > 12) {
        hrs = hrs - 12;
    }
    
    bg_circle.setAttribute("cx",center_x);
    bg_circle.setAttribute("cy", center_y);
    inner_circle.setAttribute("cx",center_x);
    inner_circle.setAttribute("cy", center_y);
    
    marks_circle.style.transform = `translate(${center_x}px, ${center_y}px)`;

    
    var inner_svg = document.getElementById("inner");
    if (width_body > 600) {
        bg_circle.setAttribute("r",200);
        inner_circle.setAttribute("r",170);

        hrs_bar.setAttribute("d", describeArc(center_x, center_y, 195, 0, hrs*30));
        mins_bar.setAttribute("d", describeArc(center_x, center_y, 185, 0, mins*6));
        secs_bar.setAttribute("d", describeArc(center_x,center_y, 175, secs*6 - 5, secs*6));

        for(mark of marks){
            mark.setAttribute("x1",192);
            mark.setAttribute("x2",199);
            mark.setAttribute("y1",0);
            mark.setAttribute("y2",0);
            
        }
        var secs = time.getSeconds();
        var mins = time.getMinutes();
        var hrs = time.getHours();
        if(hrs > 12) {
            hrs = hrs -12;
        }
        if(hrs < 10) {
            hrs = "0" + hrs;
        }
        if(mins < 10) {
            mins = "0" + mins;
        }
        if(secs < 10) {
            secs = "0" + secs;
        }
        var g = document.getElementById("time");
        g.innerHTML = `<text id = "time-text" textLength = "300" x = ${center_x - 150} y = ${center_y} fill="#FF9500"> ${hrs} : ${mins} : ${secs} </text>                             <text id = "am" textLength = "30" x = ${center_x - 18} y = ${center_y + 25} fill = #FF2D55> ${en} </text>          <text id = "day" textLength = "180" x = ${center_x - 90} y = ${center_y + 80} fill = #007AFF> ${week[day]}    </text>           <text id = "date" textLength = "220" x = ${center_x - 110} y = ${center_y - 80} fill = "#007AFF"> ${date} </text>`
    }
    else 
    {
        bg_circle.setAttribute("r",width_body/2 - 15);
        inner_circle.setAttribute("r",width_body/2 - 45);
        hrs_bar.setAttribute("d", describeArc(center_x, center_y, width_body/2 - 20, 0, hrs*30));
        mins_bar.setAttribute("d", describeArc(center_x, center_y, width_body/2 - 30, 0, mins*6));
        secs_bar.setAttribute("d", describeArc(center_x,center_y, width_body/2 - 40, secs*6 - 5, secs*6));

        for(mark of marks){
            mark.setAttribute("x1",`${width_body/2 - 24}`);
            mark.setAttribute("x2",`${width_body/2 - 15}`);
            mark.setAttribute("y1",0);
            mark.setAttribute("y2",0);
        }

        var secs = time.getSeconds();
        var mins = time.getMinutes();
        var hrs = time.getHours();
        if(hrs > 12) {
            hrs = hrs -12;
        }
        if(hrs < 10) {
            hrs = "0" + hrs;
        }
        if(mins < 10) {
            mins = "0" + mins;
        }
        if(secs < 10) {
            secs = "0" + secs;
        }
        var g = document.getElementById("time");
        g.innerHTML = `<text id = "time-text" textLength = ${width_body/2} x = ${center_x - (width_body/4)} y = ${center_y} fill="#FF9500"> ${hrs} : ${mins} : ${secs} </text>                                                  <text id = "am" textLength = "30" x = ${center_x - 18} y = ${center_y + 25} fill = #FF2D55> ${en} </text>          <text id = "day" textLength = ${width_body/2 - 15} x = ${center_x - ((width_body/2 - 15)/2)} y = ${center_y + 60} fill = #007AFF> ${week[day]}    </text>                                        <text id = "date" textLength = ${width_body/2 - 15} x = ${center_x - ((width_body/2 - 15)/2)} y = ${center_y - 50} fill = "#007AFF"> ${date} </text>`
        
    }
    var t = setTimeout(drawSVG,10);
    

}  
