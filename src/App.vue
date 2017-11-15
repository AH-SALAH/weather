<template v-cloak>
  <div id="app">
    <!--connection chk-->
    <my-toast v-show="enter" position="top-right" :warning="!connection.val" :success="connection.val">{{ connection.val ? connection.msg+' &#10004;' : connection.msg+' &#9888;' }}</my-toast>

    <!--entry-comp-->
    <transition name="entry-fade" mode="out-in">
      <entry v-show="enter" :enter="enter">
        <!--<h1 slot="entry-slot">Weather</h1>-->
      </entry>
    </transition>
      <!--loader-comp-->
      <transition>
        <my-loader v-if="searching.loading"></my-loader>
      </transition>
      <!--bg-->
      <div id="bg" ref="bg" :class="{'grayscale': searching.val}"></div>
      <!--comps-wrapper-->
    <div class="comps-wrapper" v-if="!enter" @mousemove="bgMouseMove">
      <!--header-comp-->
      <header-component></header-component>
      <!--search-comp-->
      <transition name="search-component" mode="out-in">
        <keep-alive>
          <search-component @searching="searched($event)" :searching="searching" :apiimgerr="imgerr">
          </search-component>
        </keep-alive>
      </transition>
      <!--footer-comp-->
      <footer-component></footer-component>
      <!--weather-comp-->
      <transition name="weather-component" mode="in-out">
        <weather-component ref="w_comp" :searching="searching" :wData="wData" v-show="searching.val" @closed="back($event)">
        </weather-component>
      </transition>

    </div> <!--/comps-wrapper-->
    <!--init-loader-->
    <transition>
      <div v-if="initLoader" class="init-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </transition>

  </div> <!--/app-->
</template>

<script>
import headerComponent from './components/header_component/headerComponent.vue';
import footerComponent from './components/footer_component/footerComponent.vue';
import searchComponent from './components/search_component/searchComponent.vue';
import weatherComponent from './components/weather_component/weatherComponent.vue';
import Myloader from './helperComponents/loader.vue';
import entry from './helperComponents/entry.vue';
import toast from './helperComponents/toast.vue';

import axios from 'axios';

export default {
  components: {
    'header-component': headerComponent,
    'footer-component': footerComponent,
    'search-component': searchComponent,
    'weather-component': weatherComponent,
    'my-loader': Myloader,
    'entry': entry,
    'my-toast': toast,
  },
  name: 'app',
  data() {
    return {
      initLoader: false,
      enter: false,
      searching: { "val": false, "query": "", "loading": false },
      imgerr: { 'msg': '', 'val': false },
      connection: { 'msg': '', 'val': false },
      wData: { //init data
        "latt_long": "30.049950,31.248600",
        "city": "Tokyo",
        "code": "JP",
        "woeid": "435678",
        "today": {
          "date": new Date().toLocaleDateString(),
          "created": new Date(new Date().getDay() - 1).toLocaleDateString(),
          "max_temp": 25,
          "min_temp": 15,
          "wStateName": "Light Rain",
          "wStateAbbr": "https://www.metaweather.com/static/img/weather/lr.svg",
          "wind_speed": 4 + " mph",
          "humidity": 70
        },
        "tomorrow": {
          "date": new Date(new Date().getDay() + 1).toLocaleDateString(),
          "created": new Date(new Date().getDay() - 1).toLocaleDateString(),
          "max_temp": 29,
          "min_temp": 24,
          "wStateName": "Light Rain",
          "wStateAbbr": "https://www.metaweather.com/static/img/weather/lr.svg",
          "wind_speed": 5 + " mph",
          "humidity": 35 + " %"
        }
      },
    }
  },
  methods: {
    // when searching
    searched: function(data) {
      if (data.query != '') {
        this.searching.query = data.query;
        this.searching.loading = data.loading;
        this.grabAPI(data.query);
      }
    },
    // when w-comp close btn emits
    back: function(data) {
      this.searching.val = data.val;
    },
    // do APIs
    grabAPI: function(qwery) {
      // =================================
      let self = this;
      // get query matched img file name from wikipedia
      function getImageFileName(q) {
        // 4 CORS resolve
        let cors_api_url  = "https://cors-anywhere.herokuapp.com/",
            req_url       = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=" + q + "&callback=%3F&utf8=1";

        axios({
          method: 'GET',
          url: cors_api_url + req_url,
          transformResponse: (response) => {
            response    = response.replace(/^\/\*\*\/\(/i, ''),
              response  = response.replace(/\)$/mi, '');
            if (typeof(response) == String) {
              response = JSON.parse(response);
            }
            return response;
          }
        }).then((response) => {
          let n0    = response.data.substring(response.data.indexOf('"images"')),
              fn    = new RegExp('' + q + '', 'gi'),
              nuarr = [],
              res,
              n     = JSON.parse(JSON.stringify(n0)).split('},'),
              pat   = /\.(jpg|jpeg|png|gif|svg)\b/gi,
              cked  = n.filter(function(d) { return d.match(pat); });

          cked.forEach(function(v) {
            let patt  = v.match(/\.(jpg|jpeg|png|gif|svg)\b/gi),
                l0    = v.replace(/[\"\\{}\[\]]/gi, ''),
                l     = v.substring(v.indexOf("File:"), v.indexOf(patt[0]) + patt[0].length);

            nuarr.push(l);
          });

          let f = nuarr.filter(function(val) { return val.match(fn); });
          if (nuarr.length <= 2 && nuarr.length != 0) {
            res = nuarr[0].search(/arrow/gi) > -1 ? '' : nuarr[0];
          }
          else if ((f == undefined || f == null || f.length == 0) && (nuarr[0] == undefined || n0 == undefined)) {
            res = '';
          }
          else if (f.length == 0 && nuarr.length > 2) {
            res = nuarr[Math.floor(Math.random() * 2)];
          }
          else {
            res = f[Math.floor(Math.random() * 2)];
          }
          // do get img link here with the returned img file name
          getImageLink(res);
          self.imgerr.msg = "";
          self.imgerr.val = false;

        }).catch(error => {
          console.log("get img fileName err: ", error.message, error.headers);
          self.imgerr.msg = "Sorry,Something went wrong or your search is not correct..!";
          self.imgerr.val         = true;
          self.searching.loading  = false;
          self.initLoader         = false;
        });

      } getImageFileName(qwery);

      // =============================
      // get matched query img file link from wikipedia
      function getImageLink(getImageFileName) {

        let cors_api_url  = "https://cors-anywhere.herokuapp.com/",
            req_url       = "https://en.wikipedia.org/w/api.php?action=query&format=json&titles=" + getImageFileName + "&prop=imageinfo&origin=*&iilimit=50&iiprop=timestamp|user|url";

        axios({
          method: 'GET',
          url: cors_api_url + req_url,
          transformResponse: (response) => {
            response = response.replace(/^\/\*\*\/\(/i, ''),
            response = response.replace(/\)$/mi, '');
            if (typeof(response) == String) {
              response = JSON.parse(response);
            }
            return response;
          }
        }).then((response) => {

          // get img url
          let url0 = response.data.substring(response.data.indexOf('"url"')),
              url1 = url0.substring(url0.indexOf(':') + 1, url0.indexOf(',')).replace(/["}\]]/ig, ''),
              url;
          // get the thumb
          if (url1.indexOf("commons") > -1) {
            let u = url1.split('/'),
                r = u.splice(u.indexOf("commons") + 1, 0, "thumb"),
                l = u.push("550px-" + u[u.length - 1]);
              url = u.join('/');
          } else {
            url = '';
          }

          //  get img title
          let ttl0 = response.data.substring(response.data.indexOf('"title"')),
              ttl1 = ttl0.substring(ttl0.indexOf(':') + 1, ttl0.indexOf(',')).replace(/["}\]]/ig, '');

          if (url != '') {
            self.$refs.w_comp.$refs.c_pic.src = url;
            self.$refs.w_comp.$refs.c_pic.alt = ttl1;
            self.$refs.w_comp.$refs.c_pic.onload = function() {
              // get the woeid here if img file link success
              getWOEID(qwery);

            }

          } else {
            self.$refs.w_comp.$refs.c_pic.src = '';
            self.$refs.w_comp.$refs.c_pic.alt = '';
            // get the woeid here also even if img file link not success
            getWOEID(qwery);
          }

        }).catch(error => {
          console.log("get img link err: ", error.message, error.headers);
          // self.$refs.w_comp.$refs.c_pic.src = '';
          self.searching.loading  = false;
          self.initLoader         = false;
        });
      }

      // ================================================
      // get Weather Info

      // get woeid from yahoo api
      function getWOEID(q) {
        let cors_api_url  = "https://cors-anywhere.herokuapp.com/",
            req_url       = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + encodeURIComponent(q) + "%22&format=json";

        axios.get(cors_api_url + req_url, { datatype: 'json' })
          .then((response) => {

            let woe   = response.data.query.results.place[0].woeid,
                ccode = response.data.query.results.place[0].country.code,
              createdd = response.data.query.created,
              created  = createdd.slice(0, createdd.lastIndexOf("-") + 3),
              storage = JSON.parse(localStorage.getItem('wData'));

              // set country code
              self.wData.code = ccode;

            // check if the queried data already stored in the locale storage. if so grab it instead of another quota
            if (storage && storage.woeid == woe && storage.today.created == created) {
              self.wData              = storage;
              self.searching.val      = true; //\\ show weather
              self.searching.loading  = false; // remove loading
              self.initLoader         = false; // remove initloader
              history.pushState({ data: self.searching.val }, '', 'showweather'); //handle piece of router
              console.log("storage-parsed: ");
              return false;
            } else {
              // delete the stroage to avoid any err caused by any new modification in the source of truth data
              if (storage) {
                localStorage.removeItem('wData');
              }
              // if no locale storage data do get weather new details
              getWeatherDetails(woe);
            }

          })
          .catch(error => {
            console.log("get woeid err: ", error.message, error.headers);
            self.searching.val      = false;
            self.imgerr.msg         = "Sorry,Something went wrong or WOEID didn't respond correctly..!";
            self.imgerr.val         = true;
            self.searching.loading  = false;
            self.initLoader         = false;
          });
      }

      // ==============================

      // get weather details from metaweather.com
      function getWeatherDetails(id) {
        let cors_api_url  = "https://cors-anywhere.herokuapp.com/",
            req_url       = "https://www.metaweather.com/api/location/" + id + "/";

        axios.get(cors_api_url + req_url)
          .then((response) => {

            let today     = response.data.consolidated_weather[0],
                tomorrow  = response.data.consolidated_weather[1],
                latt_long = response.data.latt_long;

            // city data
            self.wData.latt_long        = latt_long;
            self.wData.city             = response.data.title.toLocaleLowerCase();
            self.wData.woeid            = response.data.woeid;

            // today
            self.wData.today.date       = today.applicable_date;
            self.wData.today.created    = today.created.slice(0, today.created.lastIndexOf("-") + 3);
            self.wData.today.max_temp   = Math.floor(today.max_temp);
            self.wData.today.min_temp   = Math.floor(today.min_temp);
            self.wData.today.wStateName = today.weather_state_name;
            self.wData.today.wStateAbbr = "https://www.metaweather.com/static/img/weather/" + today.weather_state_abbr + ".svg";
            self.wData.today.wind_speed = Math.floor(today.wind_speed) + " mph";
            self.wData.today.humidity   = today.humidity;

            // tomorrow
            self.wData.tomorrow.date        = tomorrow.applicable_date;
            self.wData.tomorrow.created     = tomorrow.created.slice(0, tomorrow.created.lastIndexOf("-") + 3);
            self.wData.tomorrow.max_temp    = Math.floor(tomorrow.max_temp);
            self.wData.tomorrow.min_temp    = Math.floor(tomorrow.min_temp);
            self.wData.tomorrow.wStateName  = tomorrow.weather_state_name;
            self.wData.tomorrow.wStateAbbr  = "https://www.metaweather.com/static/img/weather/" + tomorrow.weather_state_abbr + ".svg";
            self.wData.tomorrow.wind_speed  = Math.floor(tomorrow.wind_speed) + " mph";
            self.wData.tomorrow.humidity    = tomorrow.humidity;

            // save data into locale storage 
            localStorage.setItem('wData', JSON.stringify(self.wData)/*JSON.stringify(wData)*/);

            self.searching.val = true; //\\ open weather
            history.pushState({ data: self.searching.val }, '', 'showweather'); // handle piece of router 
            self.searching.loading  = false; //remove loading
            self.initLoader         = false; //remove initloader

            console.log("w-details: success");
          })
          .catch(error => {
            console.log("get weather details err: ", error.message, error.headers);
            self.searching.val      = false;
            self.imgerr.msg         = "Sorry,Something went wrong or API didn't respond correctly..!";
            self.imgerr.val         = true;
            self.searching.loading  = false;
            self.initLoader         = false;
          });
      }

    }, // /grabAPI //
    bgMouseMove: function(e) { // bg mouse move effect
      let el  = this.$refs.bg,
          x   = (e.pageX - el.offsetLeft) / el.offsetWidth * 100,
          y   = (e.pageY - el.offsetTop) / el.offsetHeight * 100;
       el.style.transformOrigin = '' + x + '% ' + y + '%';
    }

  },
  created () {
    this.enter = !this.enter; // = true
    // =========================================
    // chk for connection..
    this.connection.msg = navigator.onLine ? 'Connection is Online..good! \n オンラインです。かっこいい。(^_-)' : 'Connection is Offline..! please,reconnect.. \n オフラインです。。また連絡してみて下さい。。(#-#)';
    this.connection.val = navigator.onLine ? true : false;

    if (navigator.onLine == false) {
      this.enter = true; 
      return;
    }
    //================================
    // initially get geo ip & upon it get weather detailes
    let self = this;

    function getGeo() {
      let cors_api_url  = "https://cors-anywhere.herokuapp.com/",
          req_url       = "http://freegeoip.net/json/";

      axios.get(cors_api_url + req_url)
        .then((response) => {
          self.grabAPI(response.data.city);
          self.enter = !self.enter; // = false
          // self.initLoader = !self.initLoader;
        })
        .catch(error => {
          console.log("get geo ip err: ", error.message, error.headers);
          self.searching.val  = false;
          self.imgerr.msg     = "Sorry,Something went wrong or GEOAPI didn't respond correctly..!";
          self.imgerr.val     = true;
          self.enter          = false;
          self.initLoader     = false;
          console.log("frst-err-loading: ", self.enter);
        });
    }

    // ============================================
    // get bg imgs
    function getImgs() {

      // fade img carousel v1.0
      const miniCarousel = {
              coll: Array || HTMLCollection || NodeList,
              dur: Number || null ? 10000 : Number,
              init: (coll = miniCarousel.coll,dur = miniCarousel.dur) => {
                let i   = 0,
                  loop  = setInterval(function() {
                    // if last child reached return to 0
                      if (i >= coll.length) {
                          i = 0;
                          coll[i].parentNode.lastChild.classList.remove('bg-enter-active');
                          coll[i].parentNode.lastChild.classList.add('bg-leave-active');
                        }

                          // after 1st img re-hide previous
                        if(i > 0) {
                          coll[i].previousSibling.classList.remove('bg-enter-active');
                          coll[i].previousSibling.classList.add('bg-leave-active');
                        }
                        // show img
                        coll[i].classList.remove('bg-leave-active');
                        coll[i].classList.add('bg-enter-active');

                          i++ //inc
                      }, dur);
              } //init.xxx
            }
            // ----------------------------//

      axios.get('https://picjumbo.com/api/v1/')
        .then(function(response) {
            let data    = response.data,
                body    = document.getElementsByTagName("body")[0],
                bg      = document.getElementById("bg"),
                cat_url = [],
                new_arr = [],
                pics;
                // handle & filter the data
              data.forEach(function(el, i) {
                let cat = el.category,
                    url = el.thumb_url;

                if (cat.slug == "nature" && url.indexOf('1080x720') > -1) {
                  cat_url.push({ "i": i, "url": el.thumb_url });
                  return new_arr = cat_url.slice(0, cat_url.length >= 11 ? 11 : cat_url.length);
                }
              });

            if (new_arr.length > 0) {
                //  4 1st time chk if imgs already there under any circumstances & del'm 1st to avoid conflicts
                  if (document.getElementsByClassName('bgimgs').length > 0) {
                    let coll = document.getElementsByClassName('bgimgs').parentNode.innerHTML = '';
                  }
                  
                  // forEach url in new_arr create img & setAttrs
                  // then append to targeted tag
                new_arr.forEach(function(obj, i) {
                  let imgs  = document.createElement('img'),
                      // css   = imgs.style.display = 'none',
                      cls   = imgs.setAttribute('class', 'bgimgs img_'+ i +''),
                      d_src = imgs.setAttribute('src', obj.url);

                      bg.appendChild(imgs);
                      self.initLoader = !self.initLoader; // = true
                  });
                  
                // get those elms by class after create
                pics = bg.getElementsByClassName('bgimgs');
                // chk if those imgs there
                if (pics.length > 0 && pics != undefined) {
                  // do carousel effect
                  miniCarousel.init(pics);

                  // getGeo after imgs loaded
                  for(let j = 0; j < pics.length; j++){
                    pics[j].onload = () => {
                      if(j == pics.length-1) getGeo();
                    }
                  }

                }

            } else {
              // console.log("No images with this criteria");
              // do the job even if there r no API imgs grapped
              getGeo();
              // self.initLoader = false;
            }


        }).catch(error => {
          console.log("get bg imgs err: ", error.message);
          // if there are any err getting bg do getGeo any way..
          getGeo();
          self.initLoader = false;
          // if bg err set a static bg instead as a fallback..
          document.getElementById("bg").style.background = 'rgba(0,0,0,0.7) url("dist/src/assets/imgs/umbrella.jpg") no-repeat fixed center center/cover';
        });

    } getImgs(); //getImgs()\\

  },
  updated() {
    // handle router event
    const pop_state = () => {
      window.onpopstate = () => {
        let chk = location.pathname.toString().trim().toLowerCase().replace(/[^a-zA-Z0-9/]/gi, '').lastIndexOf('showweather') > -1;
        if (history.state && history.state.data == true && chk == 1) {
          this.searching.val = true;
        } else {
          this.searching.val = false;
        }
      }
    }
    pop_state();
// =================================
// get a dyn title
    const dyn_ttl = () => {
        let qw  = this.wData.city.toString().charAt(0).toLocaleUpperCase() + this.wData.city.slice(1),
            wiz = this.wData.today.wStateAbbr ?  this.wData.today.wStateAbbr : this.wData.tomorrow.wStateAbbr;

          // dynamic doc title
          if (this.searching.val == true) {
              if(qw != ''){
                document.title = ' Weather | ' + qw;
                // document.head.querySelector('meta[name=description]').content = 'New Description';
                document.head.querySelector('link[rel=icon]').href = wiz;
              }
          }else{
            document.title = 'Weather';          
          }
      }
      dyn_ttl();
  },

};
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
