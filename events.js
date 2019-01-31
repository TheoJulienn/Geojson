var map;
var marker_events= [];
var infowindow_open = [];
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
	  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
	];


/*Création de la carte définie par Google Maps*/
function initMap() 
{
    var paris = {lat:  48.866667, lng: 2.333333};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: paris,
      mapTypeId : "terrain",
      disableDefaultUI: true
    });
};

function rgb2hex(r, g, b)
{

	return '#'+('0'+r.toString(16)).slice(-2)+('0'+g.toString(16)).slice(-2)+('0'+b.toString(16)).slice(-2);
}

/*Fonction qui prend en entrée les geoj insérer sur la carte et qui en fait des cluster si ce sont des stations et sinon des markers tout cours avec des icones de compet pour ma chérie*/
function ajouter_carte_point(map, e)
{
	var icon;
	icon = {url:"https://static.thenounproject.com/png/89454-200.png",
		scaledSize: new google.maps.Size(21, 20), // scaled size
    	origin: new google.maps.Point(0,0), // origin
    	anchor: new google.maps.Point(0, 0)} // anchor
	var marker = new google.maps.Marker({position: {lat: e.geometry.coordinates[1], lng: e.geometry.coordinates[0]},});	
	if(e.properties.TYPE_EVENT == "Theatre")
	{
		icon = {url:"https://cdn2.iconfinder.com/data/icons/leisure-entertainment-minimalist-icon-set/100/theater-masks-01-512.png",
			scaledSize: new google.maps.Size(21, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Cinema")
	{
		icon = {url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8AAADz8/MEBAT09PT+/v79/f319fX8/Pz29vb39/f6+vr7+/smJiYDAwHS0tKurq5nZ2fp6em7u7uEhISpqanIyMjt7e3g4OBWVlba2tqRkZG1tbVcXFwrKyt8fHweHh6dnZ1zc3NLS0sSEhJCQkI0NDQ7OzvExMRubm6MjIwZGRkzMzOYmJiBgYGioqKKskryAAAT4klEQVR4nN1di3riKhCGaDS3Nt61VqvVdds93bbv/3Yn4ZKEAQLk4mpzvrONOoT5w8DMMAMgRC/fl26Q7qZ/2m4fR64goR/9IChu6C+jpLgZ6WglEhUt0tByEhdaFzbpFUf0az+O6dejOGZ0UUJvkihoQBsbafnjECcpaANO26xq/lxyRSH92o9C+vUojOgjkpA9IuY3FVqf0yJIm3BaxhF/XMBpK48DtKM6Wrlqic0E0JKnRkP6tT8e0lqC4ZiWjD1WS+SxR4RDVnI4ZIx4IdLQjhntiNMmWtqi6hGvOlFU3YBNIrMcd8a0uaQHab2xFqDnAlBHG3FaueqhtuqClghvwCS3fI1epwD9kmkdra9/GTLAcVm1nk1WNZFin409/tCTAIag5LgEyEW0TQuGJUBQdSJVXb7bktZUtU9lkWmNaqv8OxGVAWpF1MxmUTUoaSHcd9IHOS2rxSyiHfdBhYha9EGZTW0fFAFaMX0DfbDBu2W1/DM1UaMza0XUms1R/seP+gHo2/RBBzVhBRCI6Cg3G/047KUPthVRCWCDPkjN1SA2jr8d98E6U83m3ZrYLKoOxvkvPvNDfqCaCCgJ0/h3Yqo5iSivmpfUM30DasLFVINs8k8/xFSr0IZVgP+gD3oNADZh0xdq+TmmWsEm0fij8Fpq4mqmWiGiST6h48fRT/HoZTaJdx/E7m1/PVPNxaOX2WQanzNSIye3oCb0PUmnJgpa7avpy1TrVE3IpppUtRngnfZBALBnNVGhvZKaMLWghXBfrQ82UhMFrU9r+XGmWkEb5D8UAYIrmmod9UGjiJIQziiKpZJ36tHLbBKNnySg5I159NZVK2JE4/xxXOP/QDVR0LYH+C+DL84Ab8KbaOPRO7TgLZtqUvClJk6rBfhT+qBPv/5xplpBS6KjRZj/JvpgG49epiW5GoXGv9fgSw3AiKSc8FSbGzPVOpl4GJPI06gXgP/SVINs8k93YqrZqwkR4A9UE+0B3lTwxQGgu4iOxhGgdVETRcZZx6ZaQTsSa2kgot5ms5nN1tm30M+sMdWCGAXr2WyT/edLVVuoCes+6JPwbxy6t/0o7yt++j09P+D8+njbL949HUAoorP5Yv/2ixR8OE+X2/wl99IHQV6bS8lxjNIT5bFynXd+tQ+qTbVkcoblPk4rxGg77YNZB8rDFkVem4Nwx97kJWftcTCgPA74zWKDIEBBRGeLEthg8Fjc/537rT16mZbkoSry2kwlUbQj+BQAs+uZ1KwWUe8/QgwA0i9+v6OwnzCmO8DNHmsAEqaP7zqdOf8FaXEFMZ7O9ACbDBWNAe5wLcDsOoQwRScHODqpaEuA2edVfdWNtJlzSfSfESDGlzWrpQJw/bsWIH3cZ1emWosW/GMGmH1xXCMgoptf9S3Ibr7QsNM+CPLaLABOrQBmCmAtqglLgBj/QRLAFnFantdmL6InS4CZKvfCqohaAnwc4IWBaRcR5Xlt9gBfrQFm6p8nC+QcvdXSPgo3E1QvovYAEzGvzQLgygHgAP9XAjzYtiC52XSkJlhMzbe3ZMZHB4DZTcoBvjsBxG/JsBuAQlaURcnRlxtA/DKitYRHJ4CZWYQ0TDuJqDPAaGsBUOT+G5Fanu37IPkFY4+1YBcTD7Yl/eHojwZgcUmt8rHOH+cpAcJCwnO/KMAu0nnIRwu3ejSMNhqAlz+Lr6cPpdjhV0SaUGH1ZObrfvHf6Y1/As9dd5VKENC8NhvhptYaBLh/9+gjtwepKTPd9pH/pPAm8IB7Wev5GTyXkHw6BV/0AHlemw3A4CgDPK4yp5xHQLZnhdil+UAqA2ReBPXodwrJePPazKyUk380yh2bShI5WckAz+MqLdV6oF8dcjtPAsjGSu55zI4Yij5O3d1WxeQfyGurfzULCeBFmlU7SQPHL+TxuY4SIDUFKmnKmyMAOGAvoZGpVpm+rYYQjSWPkih5cvDlgkWAGG9XEsB9AZDPyYxSAHCAz6AFGwGMXAAm1fGC3CzliV/ZrMO7bwgQ0zFGDL7IzjFq3QfdAKIUAvxI5Fm1YbAXAWbG6UEEOMAnSivOqq0lnbm5MsBswAODwQIpgi/EAq2KM95PAUBircpMT+GIO0ct+yCj9enX5rmATywCxPNINfG7xmBAersIAAdE/BQTv99wxF3GnbSgJq9NHn+TLwAQb9k0K6jlBQxIDy8A4G+kmrpPUiwCxJ9xGzXBaTV5bYpX458AQDZeSBO/F9BfP47A2N4rrcTxBgCUVEqzKB+Ncst5bYqSJwFg9mdGAcLgyxn01xyh4E3slcGXYCYC5P5zuz4YjXMSHuU2lAReOm1DOfiC/oL+enzAort0Qcrgy0YEOMjnFdvHaVnjqUsC4f4PDucrVfAl4BZMQfuXew9F4ZEy+LIDADN127YPhoJJY3w1S6ivvlTBl2gFAOKnvQiQaQuJ6QN0jndtRdQRIJpDfXWMQzn4ghYiwAE+nASAj7yDAaYTyftPu0rnUZeUXeWt5CEsY3lqiwpptb9OPoUWzG5+eQpGltL0RmLll5sB+vRrc8kAA4AY05+E4MsBAsTpCgAkHhVkJMRgxMUv6gHJFmDh9MC8Nn1J9CQCzBh5orQVgDsAMKON1/L0xg5BpvcQIP6KW6kJDpDo+hHfgKi+5DcESEIMwuzruwzwqeJRlUjnSGTkJAHEc6NfbgOQ7kHE89oM4+9MApg5+euAxTySYYJeZYD5DP0rl+pygorOUHFGvCcZ4EAbLHVK5xHy2oyvZi/PdWL87DGacPVbARAHKJxBgMQ6XeUzYHmN3qfUB7N3cGjRglI6j23JueJNZ/9PX1fbdHl4wSqAh8z7pwE5aeL35WuZblev+Y8yQLxtDlDKdrEuOS4NMnhTyiFQKZs8NLmVWhAUkmbB6SDWC8CaFaBhPNEA1E/znwLi401taKsAqd1zXRElVuybI0C8oQkLGyxNUNXHMaYdAGT+M89rs2v7rSPAz4C9RovkBuFx66YA5YwzmNdmGH+fNRypmb5wL30YvTkBnNQCdFpLLezeYmOmn7F9C7JZAOLRz1wAnpq2oJz1KeS1WdlAsxd7gCwZj3r0Kzn4ogN48duLKIdUzWuzK4lmMkcagDsGkBnQEyzFJtQAH6LO+qA6K8q08mVjCXBCyxSeB2Jz30aA65YevTzxYHo1sOT6t8XQz23rihOb2UQWInpu2oL6zGtTSSn4gtZTI8C/aQGwMieTPhhb8KCuupGIsqrJv257WYSZQ14P8LRmAMHKlyHPidNYMqTlWwL0AECa1xa6tv06n17SAXx5Z/6mnNKM5kcdwPzFqKY3WopoIOze4rLyJX3CaoB/J3wDX9VEko+WLyqA2TXdKqtuZKpVJv+qeW1OK1+i0XbxUeWR/p2+jxJD1n0w31dkld08sMSFjtWEmNfmvvIlSp8vuLyOh52XD0jMFg34SFb4MDw+Es8mQpr/+XnF/eh2Hr0HBI3ntSHNq7FY+YJif/O+m0wmy13KxixKu3ySrzNTkfQdBOl8uZxMdqsZQnzL6o77oJgV5bRIOYKMBDwaSaO2abVpq421RWUqV4Gr3HaM66OWphrcTNoeIK9lNL+8EiktX2N1uU5a4/D+SX2+h7kUwp4tLmkbgLAdQAva20CJ/5xznA0NbM67bJWso8WTN6wHmF2XHVfBIsAVsSO+VQDdTDUI0Ke1OAh3zBe9HJ9TUiFXNmi9/d4LuBTeRP7PfjmL+N7wKGvSwJsXKWPPXfdBY16bJKLxsjrQn0/Py3m63a52n4f9L4Crxur52B9ed6vtNp2/Lv78riqOXWwE6DP1ViuiPHpen9emUBPhBjAtXTYApbKVGbiZCeD2e/GdatiELajJa6tre7TXMe0wf1NHQmeh9ABnlIHLzGodp7B7i9X4G296BvhIJz90AGM+p5XP4+nZhAtVtQAVtSx6AAgGpIUe4O6hlPA3VMOmHUBlLfVrl9oCJDcP1fTnqprYXgQz+F0UUVuABuHedA9QJklD1btd/8FVgI9kbY3NWmqjiAol00at4gaQNg4AGLxKtKdaNQGj3JbeBMlQ7LMP5jdslq5SdYze/8qPO9Xv68MAJkJem3n8TXFvIlp2sIkIcIw2T6rHHZCFiIp5bRYKJpUyMuoA1s6q6d7BI0FYZujHM5jBwmgPI8mjlwCq89pqxt9ASmlu1Qc1L2NSncwdf//SPO6QyNkuAGCozGur28siXEkc6VuwKcAMYaEm0Pub7nE8EG6xaYq1iEZekEKOWgDULpuaFNnBMz6lozJtFyYRDZWJe4Ztx9JmreIEEE9iCjDiecnq97VwakGLPkg8+rT/FszTyUjVu4dagCQ/zhkg0u1lwacs0r77IEGY17c5Y0Ow6j89mxWALMpt0wcJSdqrmqA3VB/usel9PVvtjsZOJdN69PDVpHLuS8ciyjX+1BhufEYKUw22INu9pdjtzgQQrXDPIpr/whCaHvecmFuQ5bUVywqM247FpcZvAdC0unaS59pNTY/LEBoBiqeS2Ww7FqVXAJghTDzWhjUAaap7PUDx0C6bbcf8VKilhz5IEWZVT020LL/RHqC5D+Yl09YtaDHiLvPk2Wl9C2Y3344AjWY6KZleASBe5ixOTQAJwgYiatjbMG0pojY6k2r8qQlgTmax1boprw0qmLR/gKU+NNAubVqQ57XVm2qVkqmUs90WoOJxUONraCdIb6oVAMW8Ngs/hOvDftREJXGvovF1L2MZGVuQnUrGFKfN5o180U9/Iso0fpxMNSSVASnQsQnWR2vz2hQlmcbvF2CGMC41vlaceV5ZTQvyXAmtiEoAPaTR+A1FFDLNO5ifVT010bJJx5pBRjiVzHaH2LT/Fsw7WMQ1vnFAqmlBANBCRPOS6RUA4mWR/W4ckCxE1LcFSA1zlcbvepq/1Pj14jwxtKCQ12a9mb9C43fbB3FFHxpoJzYiqslr04+/qeOyAi1JHS1DaHoZO9/cgolwKpkFQJftzJpPMQKNrwGYDUjGPhiDvDZ9H+Seh6TxG/ZBHdMD3sHC0sfX0eKlrwEoLz6FAPVtH6eQo0azavUAM4RhqfG1tFzj2x7aZSGiedunLVrQ+mVMslfJNb7+ZTCEFvudG0W02ntTFUddqQmhg00NABnCBi2oURPMrEv7HUUZwry+qQkgQWjRB8W8NuOZL2lnM9t6WugB1w1I5haEu7fU9UGEFDsNdQ+QIVRt/yYPSMY+GAt5bRZnvqSWS3sAR26tTU3qiQFgPiAZW1DMa9P3wfLoWUWUu+MWfCTily+x8hf1tMvICBCeSmbog2TBtnULNgeYR7np5F++b7hhQKoHKCQNWR2oEUv7qnUuogRhsTva/K+WlulDm3M/dABVZ76k/bdgHuUuctViuuRNPyBV1UTJphKg0Q+JFVHuXgDipTD5NzyUhaQBqVsRLaLc/bZg0cEKvzw9YxXtxE5Exbw24/F8dXltXUWiiry2wseL53DbGzYgOZ9KZj6eb4u1U9EdtWD2xaoUUcQtys9KaUa7Q3pTTZvXZjyebyZt1dk9QJIGLU3+zbhLXBmQzC1oOpVMFu7gYmK6vd16VAHM7JLVRaSdR8Y+GKpPJas7no+tV+4PIM43EVPGiGKyHrwyILGdcWpElGdT60VUUXLYO8BMSLUxorhySM03qmGTXGMjQKUGXfQNcKpMaebebMpz+Q5GgDAz0fZ4vujDKmmouVEwQ3URBh/N83zMC18Nbz7wGQI0H8/nFkJ0nqDaIWMYM55xpmyOh2JRboe9s4OJA9POAF9rW5BnM/OF2hbbKrK8Npfj+QK6OUI/IvqN9AtDGp0iKJ5KZn083+Y3l9RuB5lj6gTQQkRD8VQy++P50OQFd359ZON/14fN6k4l078abhTEKH3ev708dHW9PS1WtStfWp3kCUraH8838mZrL7+G68rNMP/rzWZecSOR8JuSJKEcObSgWU2Y0r4sShaHVxbHwvBBObvhyyUYr+VBlyUtt4fHhfllDdDCVAMAOz5JuZtFyq36IBDRscmSaVmL03J/fUpzk8NmwalkHZ2k3GY/mY77ID+VzKUPWpsTfYmo02Gz8FQyHcBWx/O57WXRaR8MxFPJuj3Ftd1eFu1MtZJNQuKDsbqbPui0n4zFyhcXU02dFeWmJv5ZH2ykzcyvps3xfE4iatM7TGzKQwX95DD+3mof1LHpC7X0DrCtmnBnk2j8kf6g4W6O57PZdqxjNVFOs1bz2m7DVOtGTQi7t3CN37ma6NZUc/AmSlrLU8luQU04mWrqpKE7NtWMbGpK3q+pZtmCHZtqNbuj1S0OcPfoHUT0Pj16mU2f1nILplqNsa2r2uIkT82pZPfq0SvSvtSnkt2fqabVZrpTyTpVE7Kp1pdHL7NJd28JQMkrmmo9q4mCFpbs2aN3a8EuLEoD03fj0Vu34NVMtXZGlD2bbWq5QY9epvXp11cz1SzWcbbx6GVa9alk92+qFbTiqWR3ZqrZsAnz2n6KqVayCfLabspUM1Vtp80qMdL78ejdJ/86qOU2TTUI8KaCL3qA7mxKJe/MVDOKqDav7b6CLwo2WdU+PJXsp5hq4FSy6KbURKcxIvWpZPcWfKmj1eW1tQB4RTVh3w79ALxa8MUWIE8uC4r8M34TjbkVO2a1jEOJtiBJ+OOYiHLaxIoWaWlZ1aFctcwmqJqWjFgIsZhZTIqDfbjnwY9xqqUNOAmrhdMGJW0i0YLHBW2qRhGkpZ8SvldUzJ454iesBPwm4efDxJA2KGkZScIikjW0xeN41b5F1Y3YHJX/Vm78kS/dABIXWhWJ7/A4F1qJTf9/GCkjsulJD1MAAAAASUVORK5CYII=",
			scaledSize: new google.maps.Size(21, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Concert/Musique")
	{
		icon = {url:"https://cdn3.iconfinder.com/data/icons/music-notes-symbols/512/Icon_10-512.png",
			scaledSize: new google.maps.Size(21, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Congres/Conference")
	{
		icon = {url:"https://cdn1.iconfinder.com/data/icons/business-management-and-growth-20/64/1011-512.png",
			scaledSize: new google.maps.Size(21, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Famille")
	{
		icon = {url:"https://www.freeiconspng.com/uploads/family-icon-5.png",
			scaledSize: new google.maps.Size(21, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
		
	
	
 	var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+e.properties.TITLE+'</h1>'+
    '<div id="bodyContent">'+
    '<p>'+e.properties.DESCRIPTIO+ '</p>'+
    '<p>'+e.properties.SPACE_TIME+ '</p>'+
    '<p>'+e.properties.PLACENAME+ '</p>'+
    '<p>Lien vers évènement: <a href="'+ e.properties.LINK+'">'+
    e.properties.LINK+'</a> '+
    '</p>'+
    '</div>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

	marker.addListener('click', function() {
		if(infowindow_open.length>0)
		{
			infowindow_open[0].close();
			infowindow_open = [];
		}
		infowindow.open(map, marker);
		
		infowindow_open.push(infowindow);
		
    });

	marker.setIcon(icon);
	marker.setMap(map);	   					   				
}

function ajouter_carte_ligne(map,e)
{
	var ligne = [];
	for (var i = 0; i < e.geometry.coordinates.length; i++) {
		
		ligne.push({lat : e.geometry.coordinates[i][1],
					lng : e.geometry.coordinates[i][0]
				});
	}

		

	var ligne = new google.maps.Polyline({
          path: ligne,
          geodesic: true,
          strokeColor: rgb2hex(e.properties.Red,e.properties.Green,e.properties.Bue),
          strokeOpacity: 1.0,
          strokeWeight:1
        });

        ligne.setMap(map);
}

function load_geoj(geoj)
{	
	var departements = {};
	var event = {};
	var date = {mois:monthNames,valeurs:Array(12).fill(0)};
	var transports = {Bus: 0, Tram:0, RER:0, Metro:0};

	geoj.features.forEach(function(e)
		{
		if(e.geometry.type == "Point")
		{
			ajouter_carte_point(map,e);
			stats_departements(e,departements);
			stats_type_events(e,event);
			stats_mois(e,date);
			stats_transports(e,transports);
		}
		if(e.geometry.type == "LineString")
		{
			ajouter_carte_ligne(map,e);
		}			
	});

	/*
	liste_villes.sort(function(a, b){
		if(a < b) { return -1; }
		if(a > b) { return 1; }
		return 0;
	})
	*/
	console.log(departements)
	delete event.cin;
	console.log(event)

	console.log(date)
	console.log(transports)



	var ctx1 = document.getElementById('canvas1').getContext('2d');	
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	var ctx3 = document.getElementById('canvas3').getContext('2d');	
	var ctx4 = document.getElementById('canvas4').getContext('2d');				

	display_stat_bar(ctx1,Object.values(departements),Object.getOwnPropertyNames(departements),"Nombre d'events par département",'','green');
	display_stat_curve(ctx2,date.valeurs,date.mois,"Nombre d'events par mois");
	display_stat_bar(ctx3,Object.values(event),Object.getOwnPropertyNames(event),"Nombre d'events par type");
	display_stat_doughnut(ctx4,Object.values(transports),Object.getOwnPropertyNames(transports),"Nombre de stations par type de transport");

}

function dropHandler(ev)
{

	console.log('File(s) dropped');
	ev.preventDefault();	
	for (var i = 0; i < ev.dataTransfer.files.length; i++) {
		console.log('Nom du fichier = ' + ev.dataTransfer.files[i].name);
		var reader = new FileReader();
		var file =  ev.dataTransfer.files[i];
		var nom_fichier = file.name; 
		var reader = new FileReader();
		reader.addEventListener('load',function(){
			var str_result = reader.result;
			geoj = JSON.parse(reader.result);
			load_geoj(geoj);			
		});
		reader.readAsText(file)
	}
	removeDragData(ev)
}

function dragOverHandler(ev)
{
	console.log('Dans la zone de Drop'); 
	ev.preventDefault();
}

function removeDragData(ev)
{
	if (ev.dataTransfer.items) {
		ev.dataTransfer.items.clear();
	} else {
		ev.dataTransfer.clearData();
	}
}

function stats_departements(feature,departements)
{
	var dpt_actuelle = feature.properties.DEPARTMENT;
	if (dpt_actuelle == "") {return;}

	if((!(Object.getOwnPropertyNames(departements).indexOf(dpt_actuelle) > -1)))
	{
		departements[dpt_actuelle] = 1;
	}
	else
	{
		departements[dpt_actuelle] += 1;
	}
}

function stats_type_events(feature,event)
{
	var event_type_actuelle = feature.properties.TYPE_EVENT;
	if (event_type_actuelle == "") {return;}

	if((!(Object.getOwnPropertyNames(event).indexOf(event_type_actuelle) > -1)))
	{
		event[event_type_actuelle] = 1;
	}
	else
	{
		event[event_type_actuelle] += 1;
	}
}

function stats_transports(feature,transports)
{
	transports.Bus +=feature.properties.NBBUS;
	transports.Tram +=feature.properties.NB_TRAM;
	transports.RER +=feature.properties.NB_RER;
	transports.Metro +=feature.properties.NB_METRO;
}

function stats_mois(feature,mois)
{
	var debut = new Date(feature.properties.DATE_START);
	var fin = new Date(feature.properties.DATE_END);
	var m_d = debut.getMonth();
	var m_f = fin.getMonth();

	if(m_d!=m_f)
	{
		for (var i = m_d; i < m_f+1; i++) {
			mois.valeurs[i] +=1;
		}		
	}
	else
	{		
		mois.valeurs[m_d] +=1;
	}
}

function display_stat_bar(ctx,dataset,labels,nom_='',def_= '',couleur ='red')
{
	var clr;
	var color = Chart.helpers.color;
	if(couleur =='red')
	{
		clr =  color(window.chartColors.red);
	}
	if(couleur=='blue')
	{
		clr =  color(window.chartColors.blue);	
	}
	if(couleur=='green')
	{
		clr =  color(window.chartColors.green);	
	}

	console.log("display");
	
	var barChartData = {
		labels: labels,
		datasets: [{
			label: def_,
			backgroundColor: clr.alpha(0.5).rgbString(),
			borderColor: clr,
			borderWidth: 1,
			data: dataset
		}]
	};
	var config ={
				type: 'bar',
				data: barChartData,
				options: {

					responsive: true,
					legend: {
						position: 'top',
						display : false,
						labels:{
							fontColor: 'rgb(255, 99, 132)'
						},
					},
					title: {
						display: true,
						text: nom_
					}
				}
			}
	window.myLine = new Chart(ctx, config);
}

function display_stat_doughnut(ctx,dataset,labels,nom_='',def_= '')
{
	var colorNames = Object.keys(window.chartColors);
	
	var color = [];
	for (var i = 0; i <dataset.length; i++) {
		var colorName = colorNames[i*i % colorNames.length];
		color.push(window.chartColors[colorName])
	}
	console.log(color)
	var data = {
				datasets: [{
					data: dataset,
					backgroundColor:color,
					label: def_
				}],
				labels: labels
			}
	var config = {
			type: 'doughnut',
			data: data,
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: nom_
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		};

		window.myLine = new Chart(ctx, config);
}

function display_stat_curve(ctx,dataset,labels,nom_='',def_= '')
{
	var config = {
		type: 'line',
		data: {
			labels:labels,
			datasets: [{
				label: def_,
				fill: false,
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
				data: dataset
			}/*, {
				label: 'My Second dataset',
				fill: false,
				borderColor: window.chartColors.blue,
				backgroundColor: window.chartColors.blue,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}*/]
		},
		options: {
			legend:{
				display : false

			},
			responsive: true,
			title: {
				display: true,
				text: nom_
			},
			scales: {
				xAxes: [{
					display: true,
					
				}],
				yAxes: [{
					display: true,

					beginAtZero: false
				}]
			}
		}
	};
	window.myLine = new Chart(ctx, config);
}