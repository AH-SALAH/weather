export default {
   props: {
      lattLong: {
         type: String
      },
      mapping: {
         type: Boolean
      }
   },
   data() {
      return {
         
      }
   },
   mounted () {
       let self = this;
        const ggl_autoComplete = () => {
            let input = document.getElementById('search-input'),
                options = {
                    type: ['(cities)']
                },
                autocomplete = new google.maps.places.Autocomplete(input,options);

                autocomplete.addListener('place_changed', () => {
                    let place   = autocomplete.getPlace();

                    if (place.length == 0) {
                        return;
                    }
                    self.$emit('placeName',place.name);
                    input.value = place.name;
                });
            }
            ggl_autoComplete();
   },
   watch: {
      mapping(nv, ov) {
         if (nv == true) {
            var cord = this.lattLong.split(',');
            setTimeout(function(){
               initMap();
            },2000);
         }

         // ======================
         /**
         * The CenterControl adds a control to the map that recenters the map on
         * cords.
         * @constructor
         * @param {!Element} controlDiv
         * @param {!google.maps.Map} map
         * @param {?google.maps.LatLng} center
         */
         function CenterControl(controlDiv, map, center) {
            // We set up a variable for this since we're adding event listeners
            // later.
            var control = this;

            // Set the center property upon construction
            control.center_ = center;
            controlDiv.style.clear = 'both';

            // Set CSS for the control border
            var goCenterUI = document.createElement('div');
            goCenterUI.id = 'goCenterUI';
            goCenterUI.title = 'Click to recenter the map';
            goCenterUI.style = 'background-color: #fff; border: 2px solid #fff;border-radius: 3px;box-shadow: 0 2px 6px rgba(0,0,0,.3);cursor: pointer;float: left;margin-bottom: 22px;text-align: center;';
            controlDiv.appendChild(goCenterUI);

            // Set CSS for the control interior
            var goCenterText = document.createElement('div');
            goCenterText.id = 'goCenterText';
            goCenterText.innerHTML = 'Center Map';
            goCenterText.style = 'color: rgb(25,25,25);font-family: Roboto,Arial,sans-serif;font-size: 12px;line-height: 20px;padding-left: 4px;padding-right: 4px;';
            goCenterUI.appendChild(goCenterText);

            // Set CSS for the setCenter control border
            var setCenterUI = document.createElement('div');
            setCenterUI.id = 'setCenterUI';
            setCenterUI.title = 'Click to change the center of the map';
            setCenterUI.style = 'background-color: #fff; border: 2px solid #fff;border-radius: 3px;box-shadow: 0 2px 6px rgba(0,0,0,.3);cursor: pointer;float: left;margin-bottom: 22px;text-align: center;margin-left: 12px;';
            controlDiv.appendChild(setCenterUI);

            // Set CSS for the control interior
            var setCenterText = document.createElement('div');
            setCenterText.id = 'setCenterText';
            setCenterText.innerHTML = 'Set Center';
            setCenterText.style = 'color: rgb(25,25,25);font-family: Roboto,Arial,sans-serif;font-size: 12px;line-height: 20px;padding-left: 4px;padding-right: 4px;';
            setCenterUI.appendChild(setCenterText);

            // Set up the click event listener for 'Center Map': Set the center of
            // the map
            // to the current center of the control.
            goCenterUI.addEventListener('click', function () {
               var currentCenter = control.getCenter();
               map.setCenter(currentCenter);
            });

            // Set up the click event listener for 'Set Center': Set the center of
            // the control to the current center of the map.
            setCenterUI.addEventListener('click', function () {
               var newCenter = map.getCenter();
               control.setCenter(newCenter);
            });
         }

         /**
          * Define a property to hold the center state.
          * @private
          */
         CenterControl.prototype.center_ = null;

         /**
          * Gets the map center.
          * @return {?google.maps.LatLng}
          */
         CenterControl.prototype.getCenter = function () {
            return this.center_;
         };

         /**
          * Sets the map center.
          * @param {?google.maps.LatLng} center
          */
         CenterControl.prototype.setCenter = function (center) {
            this.center_ = center;
         };


         var map,
         self = this;
         function initMap() {
            // var cord = self.lattLong.split(',');
            map = new google.maps.Map(document.querySelector('.map-body'), {
               center: { lat: Number(cord[0]), lng: Number(cord[1]) },
               zoom: 10,
               // gestureHandling: 'cooperative',//mobile f-swipe
               mapTypeControl: true,
               // mapTypeControlOptions: {
               //    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
               //    // mapTypeIds: ['roadmap', 'terrain','satelite']
               // },
               styles: [
                  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                  {
                     featureType: 'administrative.locality',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#d59563' }]
                  },
                  {
                     featureType: 'poi',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#d59563' }]
                  },
                  {
                     featureType: 'poi.park',
                     elementType: 'geometry',
                     stylers: [{ color: '#263c3f' }]
                  },
                  {
                     featureType: 'poi.park',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#6b9a76' }]
                  },
                  {
                     featureType: 'road',
                     elementType: 'geometry',
                     stylers: [{ color: '#38414e' }]
                  },
                  {
                     featureType: 'road',
                     elementType: 'geometry.stroke',
                     stylers: [{ color: '#212a37' }]
                  },
                  {
                     featureType: 'road',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#9ca5b3' }]
                  },
                  {
                     featureType: 'road.highway',
                     elementType: 'geometry',
                     stylers: [{ color: '#746855' }]
                  },
                  {
                     featureType: 'road.highway',
                     elementType: 'geometry.stroke',
                     stylers: [{ color: '#1f2835' }]
                  },
                  {
                     featureType: 'road.highway',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#f3d19c' }]
                  },
                  {
                     featureType: 'transit',
                     elementType: 'geometry',
                     stylers: [{ color: '#2f3948' }]
                  },
                  {
                     featureType: 'transit.station',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#d59563' }]
                  },
                  {
                     featureType: 'water',
                     elementType: 'geometry',
                     stylers: [{ color: '#17263c' }]
                  },
                  {
                     featureType: 'water',
                     elementType: 'labels.text.fill',
                     stylers: [{ color: '#515c6d' }]
                  },
                  {
                     featureType: 'water',
                     elementType: 'labels.text.stroke',
                     stylers: [{ color: '#17263c' }]
                  }
               ]

            });

            // ======
            // var infowindow = new google.maps.InfoWindow;
            // infowindow.setContent('<b>القاهرة</b>');

            // marker
            // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            var marker = new google.maps.Marker({
               map: map,
               position: { lat: Number(cord[0]), lng: Number(cord[1]) },
               // icon: image,
               draggable: true,
               animation: google.maps.Animation.DROP,
            });
            marker.addListener('click', toggleBounce);

            // marker.addListener('click', function() {
            //    infowindow.open(map, marker);
            // });

            //  marker animation effect
            function toggleBounce() {
               if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
               } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
               }
            }

            // ===============================control center
            // Create the DIV to hold the control and call the CenterControl()
            // constructor
            // passing in this DIV.
            var centerControlDiv = document.createElement('div');
            var centerControl = new CenterControl(centerControlDiv, map, { lat: Number(cord[0]), lng: Number(cord[1]) });

            centerControlDiv.index = 1;
            centerControlDiv.style['padding-top'] = '10px';
            // centerControlDiv.style.left = 'auto';
            // centerControlDiv.style.right = '45px';
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

            window.onload = () => {
               google.maps.event.trigger(map, 'resize');
               google.maps.event.trigger(self.ggl_autoComplete, 'resize');
            }
            window.onresize = () => {
               google.maps.event.trigger(map, 'resize');
               google.maps.event.trigger(self.ggl_autoComplete, 'resize');
            }

         }

      } // mapping

   }

}
