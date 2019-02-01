var map;
var marker_events= [];
var infowindow_open = [];
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
	  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
	];
var chargement_donnee = false;
var om;
var metro = [];
var icon_displayed=[];
var icons = {

  Theatre: {
    name: 'Theatre',
    icon: 'https://img.icons8.com/color/48/000000/theatre-mask.png'
  },
  Cinema: {
    name: 'Cinema',
    icon: 'https://img.icons8.com/color/48/000000/documentary.png'
  },
  Concert: {
    name: 'Concert/Musique',
    icon: 'https://img.icons8.com/color/48/000000/saxophone.png'
  },
  Congres: {
    name: 'Congres/Conference',
    icon: 'https://img.icons8.com/color/48/000000/micro.png'
  },
  Famille: {
    name: 'Famille',
    icon: 'https://img.icons8.com/color/48/000000/family.png'
  },
  Atelier: {
    name: 'Atelier',
    icon: 'https://img.icons8.com/color/48/000000/drafting-compass2.png'
  },
  Culture: {
    name: 'Culture',
    icon: 'https://img.icons8.com/color/48/000000/books.png'
  },
  Formation: {
    name: 'Formation',
    icon: 'https://img.icons8.com/color/48/000000/classroom.png'
  },
  Religion: {
    name: 'Religion',
    icon: 'https://img.icons8.com/color/48/000000/cologne-cathedral.png'
  },
  Restau: {
    name: 'Restau/Bar',
    icon: 'https://img.icons8.com/color/48/000000/dining-room.png'
  },
  TV: {
    name: 'TV',
    icon: 'https://img.icons8.com/color/48/000000/retro-tv.png'
  },
  Sport: {
    name: 'Sport',
    icon: 'https://img.icons8.com/color/48/000000/rugby.png'
  },
  Sport: {
    name: 'Vente',
    icon: 'https://img.icons8.com/color/48/000000/cash-in-hand.png'
  },

};







//<script src="https://cdn.jsdelivr.net/gh/TheoJulienn/Geojson/events.js"></script>

/*Création de la carte définie par Google Maps*/
function initMap() 
{
    var paris = {lat:  48.866667, lng: 2.333333};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: paris,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }, {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "saturation": "-100"
            }, {
                "lightness": "30"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "gamma": "0.00"
            }, {
                "lightness": "74"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{
                "lightness": "3"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }]
    });



    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    oms = new OverlappingMarkerSpiderfier(map,{
		markersWontMove: true,
		markersWontHide: true,
		basicFormatEvents: true,
		legWeight :0,
	});
	window.map = map;  // for debugging/exploratory use in console
	window.oms = oms;
	var styles = {
        default: null,
        hide: [
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ]
      };
	 //map.setOptions({styles: styles['hide']});
}

function rgb2hex(r, g, b)
{

	return '#'+('0'+r.toString(16)).slice(-2)+('0'+g.toString(16)).slice(-2)+('0'+b.toString(16)).slice(-2);
}

function ajouter_legend(list_icons=icons)
{
	var legend = document.getElementById('legend_2');
	for (var key in icons) {
		var type = icons[key];
		var name = type.name;
		var icon = type.icon;
		var div = document.createElement('div');
		div.innerHTML = '<img src="' + icon + '"style="width :15%;height:15%;"> ' + name;
		legend.appendChild(div);
	}
}
/*Fonction qui prend en entrée les geoj insérer sur la carte et qui en fait des cluster si ce sont des stations et sinon des markers tout cours avec des icones de compet pour ma chérie*/
function ajouter_carte_point(map, e)
{
	var icon;

	icon = {
		url:"https://icons8.com/icon/13526/schedule",
		scaledSize: new google.maps.Size(20, 20), // scaled size
    	origin: new google.maps.Point(0,0), // origin
    	anchor: new google.maps.Point(0, 0)
	}; // anchor

	var marker = new google.maps.Marker({
		position: {lat: e.geometry.coordinates[1],
		lng: e.geometry.coordinates[0]}
	});	

	if(e.properties.TYPE_EVENT == "Theatre")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/theatre-mask.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Cinema")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/documentary.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Concert/Musique")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/saxophone.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Congres/Conference")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/micro.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Famille")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/family.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Atelier")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/drafting-compass2.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Culture")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/books.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
	if(e.properties.TYPE_EVENT == "Formation")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/classroom.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Religion")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/cologne-cathedral.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Restau/Bar")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/dining-room.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "TV")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/retro-tv.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}
		
	if(e.properties.TYPE_EVENT == "Sport")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/rugby.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	if(e.properties.TYPE_EVENT == "Vente")
	{
		icon = {url:"https://img.icons8.com/color/48/000000/cash-in-hand.png",
			scaledSize: new google.maps.Size(20, 20), // scaled size
    		origin: new google.maps.Point(0,0), // origin
    		anchor: new google.maps.Point(0, 0)} // anchor
	}

	marker.setIcon(icon);
	
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
	
    //google.maps.event.addListener(marker, 'click', iwClose);

	oms.addMarker(marker, function(e) {
	
		if(infowindow_open.length>0)
		{
			infowindow_open[0].close();
			infowindow_open = [];
		}
		infowindow.open(map, marker);
		
		infowindow_open.push(infowindow);
	});
	oms.addMarker(marker); 
	icon_displayed.push(marker); 					   				
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

function ajouter_carte_multi_ligne(map,e,color = "false")
{
	var ligne = {}

	for (var i = 0; i < e.geometry.coordinates.length; i++) {
		var une_ligne = e.geometry.coordinates[i];
		var lignes = [];
		for (var j = 0; j <une_ligne.length; j++) {
			
			lignes.push({lat : une_ligne[j][1],
						lng : une_ligne[j][0]
			});
			
		}
		if(typeof e.properties.Red === 'undefined')
		{
			ligne = new google.maps.Polyline({
				path: lignes,
				geodesic: true,
				strokeColor: "brown",
				strokeOpacity: 0.50,
				strokeWeight:3
			});
			metro.push(ligne)
		}
		else{
			ligne = new google.maps.Polyline({
				path: lignes,
				geodesic: true,
				strokeColor: rgb2hex(e.properties.Red,e.properties.Green,e.properties.Bue),
				strokeOpacity: 0.5,
				strokeWeight:4,
				nom : e.properties.NOMLIG
			});
			ligne.setMap(map)
		}
		
	}
}

function load_geoj(geoj)
{

	var point = false;
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
			if(!chargement_donnee)
			{
				ajouter_legend()
				chargement_donnee = true;
			}
			point=true;			
		}
		if(e.geometry.type == "LineString")
		{
			ajouter_carte_ligne(map,e);
		}	
		if(e.geometry.type == "MultiLineString")
		{
			ajouter_carte_multi_ligne(map,e);
		}			
	});
	if(metro.length>1)
	{
		for (var i = 0; i < metro.length; i++) {
			metro[i].setMap(map);
			metro[i].setVisible(false);
		}
		map.addListener('zoom_changed', function() {
			if(map.zoom<14)
			{
				for (var i = 0; i < metro.length; i++) {
					metro[i].setVisible(false);
				}	
			}
			else{
				for (var i = 0; i < metro.length; i++) {
					metro[i].setVisible(true);
				}	
			}		
		});
	}


	

	delete event.cin;

	if(point)
	{
		var ctx1 = document.getElementById('canvas1').getContext('2d');	
		var ctx2 = document.getElementById('canvas2').getContext('2d');
		var ctx3 = document.getElementById('canvas3').getContext('2d');	
		var ctx4 = document.getElementById('canvas4').getContext('2d');				

		display_stat_bar(ctx1,Object.values(departements),Object.getOwnPropertyNames(departements),"Nombre d'events par département",'','green');
		display_stat_curve(ctx2,date.valeurs,date.mois,"Nombre d'events par mois");
		display_stat_horizontal_bar(ctx3,Object.values(event),Object.getOwnPropertyNames(event),"Nombre d'events par type",'','purple');
		display_stat_doughnut(ctx4,Object.values(transports),Object.getOwnPropertyNames(transports),"Nombre de stations par type de transport");
	}	
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
						position: "right",
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

function display_stat_horizontal_bar(ctx,dataset,labels,nom_='',def_= '',couleur ='red')
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
	if(couleur=='yellow')
	{
		clr =  color(window.chartColors.yellow);	
	}
	if(couleur=='purple')
	{
		clr =  color(window.chartColors.purple);	
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
				type: 'horizontalBar',
				data: barChartData,
				options: {
					// Elements options apply to all of the options unless overridden in a dataset
					// In this case, we are setting the border of each horizontal bar to be 2px wide
					elements: {
						rectangle: {
							borderWidth: 2,
						}
					},
					responsive: true,
					legend: {
						position: 'right',
						display: false
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
					position: "right",
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

function display_stat_polar(ctx,dataset,labels,nom_='',def_= '')
{
	var colorNames = Object.keys(window.chartColors);
	
	var color = [];
	for (var i = 0; i <dataset.length; i++) {
		var colorName = colorNames[i % colorNames.length];
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
			data: data,
			options: {
				responsive: true,
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: 'nom_',
				},
				scale: {
					ticks: {
						beginAtZero: true
					},
					reverse: false
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}
		};

		window.myLine = Chart.PolarArea(ctx, config);
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
			}]
		},
		options: {
			legend:{
				display : false,
				position: "right",

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

function request_geojson()
{

	var URL1 = "https://cdn.rawgit.com/TheoJulienn/Geojson/master/events.geojson"
	var URL2 = "https://cdn.rawgit.com/TheoJulienn/Geojson/master/metro.geojson"
	var URL3 = "https://cdn.rawgit.com/TheoJulienn/Geojson/master/rer_lines.geojson"
	makeAjaxCall(URL1, "GET").then(function(resp){

		load_geoj(resp);
	}, errorHandler);
	makeAjaxCall(URL2, "GET").then(function(resp){

		load_geoj(resp);
	}, errorHandler);
	makeAjaxCall(URL3, "GET").then(function(resp){

		load_geoj(resp);
	}, errorHandler);
}

function makeAjaxCall(url, methodType = "GET")
{
   var promiseObj = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
         xhr.open(methodType, url, true);
         xhr.send();
         xhr.onreadystatechange = function(){
           if (xhr.readyState === 4){
              if (xhr.status === 200){
                 console.log("xhr done successfully");
                 var resp = xhr.responseText;
                 var respJson = JSON.parse(resp);
                 resolve(respJson);
              } else {
                reject(xhr.status);
                console.log("xhr failed");
              }
           } else {
              console.log("xhr processing going on");
           }
        }
        console.log("request sent succesfully");
   });
   
   return promiseObj;
}

function processTerminusResponse(Route)
{
  console.log("render user details", Route);
}

function errorHandler(statusCode)
{
  console.log("echec", status);
}

function CenterControl(controlDiv, map)
{
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Chargement des données des évènements';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Charger les données';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
		if(!chargement_donnee)
			{
				request_geojson();
				
			}
    });
}

