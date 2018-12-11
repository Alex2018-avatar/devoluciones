
      document.addEventListener("DOMContentLoaded", function(event) {
  // BDGET CONTROLLER
	var budgetController = (function(){
    return {
        priceFormat: function(amount, decimals) {
        amount += '';
      amount = parseFloat(amount.replace(/[^0-9\.]/g, ''));
      decimals = decimals || 0;
      if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);
      amount = '' + amount.toFixed(decimals);
      var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;
      while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
      return amount_parts.join('.');
    },
    itemReduce: function(catalogEntryView){
      return catalogEntryView.reduce(function (total, element) {
        return {
        'productId': element.uniqueID,
          'imagen':element.fullImage,
          'name':element.name,
          'attributes':element.attributes,
          'price': element.price,
          'partNumber': element.partNumber,
          'parentCatalogEntryID': element.parentCatalogEntryID,
          'parentGroupIDs': element.parentCatalogGroupID,
        }
      }, {})
    },

    buildAttribute: function(attributes){
      var htmlDOM = '';
      attributes.forEach(function(attribute, index){
        htmlDOM += '<div class="attribute-item" data-identifier=' + attribute.identifier + ' id=' + attribute.identifier + '><span class="label">' + attribute.name + ' :</span>';
      attribute.values.forEach(function(value){
        htmlDOM += '<span class="value" data-id=' + value.uniqueID + '>' + value.value + '</span>';
      });
        htmlDOM += '</div>';
      });
return htmlDOM;
    },
buildPrice: function(price) {
  var htmlDOM = '';
  price.forEach(function (element, index) {
    if (element.usage === 'Offer') {
      htmlDOM += '<div class="price-item"><span class="price">$' + element.value + '</span>';
      htmlDOM += '</div>';
    }
  });
  return htmlDOM;
},
filterSKUs: function(sKUs, attrUniqueId) {
  const IDs = {
    uniqueID: [attrUniqueId]
  };
  return sKUs.filter(item => item.attributes.find(attr => attr.values.find(f => IDs.uniqueID.includes(f.uniqueID))));
},
reduceSKUs: function(sKUs) {
  return sKUs.reduce((total, element) => {
    element.attributes.forEach(size => {
      if (size.identifier === 'swatchSize') {
        total.push(
          {
            'uniqueID': element.uniqueID,
            'name': element.name,
            'thumbnail': element.thumbnail,
            'SizeUniqueID': size.values[0].uniqueID,
            'value': size.values[0].value,
            'image1path': size.values[0].image1path
          }
        );
      }

    })
    return total;
  }, []);
},
/**
 * Function to setHeaders
 * - Set header for request type GET
 * @param {string} url: url for request and fetch
 */
setHeaders: function(url) {
  return request = new Request(url, {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  });
},
/**
 * Function requestAPI
 * - fetch api for GET method
 * @param {*object} request: header configurations for request
 */
requestAPI: (request) => {
  const response = fetch(request).then(res => res.json());
  return response;
}
    }
  }) ();


/*  UI CONTROLLER 
 * - Controller that contains review interface configurations
 */
var UIController = (function () {
  var DOMstrings = {
    // Container Main Account
    navLeftMyAccount: '#myAccountNavigationWidget #facet_nav_collapsible_my_account .content',
    itemSolCambio: '#WC_MyAccountSidebarDisplayf_sol_cambio',
    mainContainer: '#container_MyAccountDisplayB2B .margin-true',
    // DOM
    fieldsetDOM: '<legend class="spanacce" aria-hidden="true">Cambios y Devoluciones</legend><div class="vertical"><h4 class="spanacce">Cambios y Devoluciones</h4><div id="section_button_DEV-DEVOLUCIONES" class="optionContainer"><div role="button" tabindex="0" aria-label="DEV-DEVOLUCIONES" aria-describedby="facet_widget_acce_desc" onkeydown="if(event.keyCode === KeyCodes.SPACE || event.keyCode === KeyCodes.RETURN) {toggleExpandNav(&quot;DEV-DEVOLUCIONES&quot;); return false;}" onclick="toggleExpandNav(&quot;DEV-DEVOLUCIONES&quot;); return false;" class="title"><div id="icon_DEV-DEVOLUCIONES" class="arrow"></div>	Cambios y Devoluciones	</div><div id="section_list_DEV-DEVOLUCIONES" class="facetSelectContainer" role="group" aria-expanded="true" aria-labelledby="section_button_DEV-DEVOLUCIONES">	<ul class="facetSelect"><li><a  id="WC_MyAccountSidebarDisplayf_sol_cambio">Solicitar Cambio y devolucion</a>	</li><li><a id="WC_MyAccountSidebarDisplayf_mis_cambios">Mis Cambios y/o devoluciones</a></li>	</ul>	</div></div></div>',
    orderListDOM: '<div id="OrderListPageHeading"><h1>Mis Pedidos</h1></div><div wctype="RefreshArea" id="Processed_OrderListTable_Widget"><div class="listTable"><div class="row tableHeader fullView " role="row" style="display: block;"><div role="columnheader" class="col2 order"><div class="cell" row-expand="OrderList_ORDER_Arrow"><span>Numero de Pedido</span></div></div><div role="columnheader" class="col2 date"><div class="cell" row-expand="OrderList_DATE_Arrow"><span>Fecha de Pedido</span></div></div><div role="columnheader" class="col2 status"></div><div role="columnheader" class="col2 total_price"><div class="cell" row-expand="OrderList_TOTAL_PRICE_Arrow">	<span>Monto</span></div></div><div role="columnheader" class="col1 actions" title="Action">				<div class="cell"><span>Action</span></div></div></div><div id="tbTable-orders" class="fullView" tyle="display: block;"></div></div></div>',
    orderDetailDOM: '<div class="my_account detail-box" id="detail-box-container"><div class="box"><span class="close-detail close" id="close-w-oder-detail">&times;</span></div><div class="row header-detail"><h2>Detalles del Pedido</h2></div> </div>',
    orderChangeWDOM: '<div class="my_account detail-box change-info-dev" id="changeWindow-box-container"><div class="box"><span class="close-detail close" id="close-w-oder-detail">&times;</span></div><div class="row header-detail"><h2>Productos disponibles para Cambio</h2></div> </div>',
  };
  return {
    getDOMStrings: function () {
      return DOMstrings
    },
    setOrdersList: function (data) {

    }
  }
})();


// GLOBAL APP CONTROLLER
var MAINController = (function (budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMStrings();
  // Function build and set item to nav account left
  var buildNavLeftOption = function () {
    var parent = document.querySelector(DOM.navLeftMyAccount);
    var fieldset = document.createElement('fieldset');
    fieldset.id = 'DEV-DEVOLUCIONES';
    fieldset.innerHTML = DOM.fieldsetDOM;
    parent.appendChild(fieldset);
  };
  /**
   * Function  setupEventListener();
   * - setup events for reviews for product detail
   **/
  let setupEventListener = function () {
    document.querySelector(DOM.itemSolCambio).addEventListener('click', showDOMwindowDev, false);
  };

  // Function show rigth new module content
  var showDOMwindowDev = function () {
    var divRigth = document.querySelectorAll('.right');
    divRigth.forEach(function (element, index) {
      element.style.display = 'none';
    });
    setOrdersList();

  };
  function setUp() {
    var url = '//localhost/wcs/resources/store/10151/order/@history';
    var data = budgetCtrl.requestAPI(budgetCtrl.setHeaders(url));
    return data;
  }
  /**
   * Function setOrdersList
   * @param{*object} data: data orders of current user
   **/
  var setOrdersList = function () {
    // 1. Create 1 Slot: Orders list
    var slotDevAndChange = document.createElement('div');
    slotDevAndChange.className = 'col8 acol12 ccol9 right slotDevAndChange';
    slotDevAndChange.id = 'slotGoBackAndChange'
    slotDevAndChange.innerHTML = DOM.orderListDOM;
    document.querySelector(DOM.mainContainer).appendChild(slotDevAndChange);

    var url = '//localhost/wcs/resources/store/10151/order/@history';
    var data = budgetCtrl.requestAPI(budgetCtrl.setHeaders(url));
    console.log('set up 1');
    data.then(res => {
      var orders = res.Order;
      var tbody = document.querySelector('#tbTable-orders');
      var html = '';
      orders.forEach(function (element, index) {
        html += '<div role="row" class="row entry"><div class="col2 order" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_order_1"><a href="#" id="WC_OrderList_Link_2_1">' + element.orderId + '</a></div></div><div class="col2 date" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_date_1">' + element.placedDate + '</div></div><div class="col2 total_price" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_total_price_1">$' + parseFloat(element.grandTotal).toFixed(3) + '</div></div><div class="col1 actions"><div class="cell" id="WC_OrderList_TableContent_Action_1" role="menu" aria-label="Press enter to display the actions drop down menu"><a class="btn-showDetailOrder" id=' + element.orderId + '>Ver Detalle</a></div></div></div>';
        tbody.innerHTML = html;
      });

      setTimeout(function () {
        var btnDetail = document.querySelectorAll('.btn-showDetailOrder');
        btnDetail.forEach(function (element, index) {
          element.addEventListener('click', upOrderDetail, false);
        })
      }, 920);
    })
      .catch(function (error) {
        console.log('Request failure: ', error);
      });
  };

  /**
   * Function upOrderDetail
   * -Function get order detail by id and build DOM
   * @param{*object} current item for show detail
   **/
  var upOrderDetail = function (event) {
    document.querySelector('#slotGoBackAndChange').style.display = 'none';
    console.log(event.target.id);
    var url = '//localhost/wcs/resources/store/10151/order/' + event.target.id;
    var data = budgetCtrl.requestAPI(budgetCtrl.setHeaders(url));
    setTimeout(function () {
      buildOrderDetail(data, event.target.id);
    }, 700);

  };
  /**
   * Function buildOrderDetail
   * - Build Order detail DOM 
   * @param{*object} data: data of current order to see details
   **/
  var buildOrderDetail = function (data, IDOrder) {
    data.then(function (response) {
      console.log(response)
      // Create 2 Slot: order detail
      var containerDetail = document.createElement('div');
      var top_info_dev = document.createElement('div');
      var direccion__dev = document.createElement('div');
      var ped_detail__sec = document.createElement('div');
      var ped_twobuttons__sec = document.createElement('div');
      containerDetail.className = 'col8 acol12 ccol9 right detail';
      containerDetail.id = 'slotOrderDetail';
      containerDetail.innerHTML = DOM.orderDetailDOM;

      top_info_dev.className = 'top-info-dev';
      direccion__dev.className = 'direccion-dev';
      ped_detail__sec.className = 'ped-detail-devolucion';
      ped_twobuttons__sec.className = 'two-Buttons orderActions';

      document.querySelector(DOM.mainContainer).appendChild(containerDetail);
      document.querySelector('#detail-box-container').appendChild(top_info_dev);
      document.querySelector('#detail-box-container').appendChild(direccion__dev);
      document.querySelector('#detail-box-container').appendChild(ped_detail__sec);
      document.querySelector('#detail-box-container').appendChild(ped_twobuttons__sec);

      // Main title section
      var infoSecDetail = document.querySelector('.top-info-dev');
      infoSecDetail.innerHTML = '<ul class="main-detail"><li><p class="label">Numero de pedido</p><p class="label">Fecha del Pedido</p></li><li><p class="content">' + response.orderId + '</p><p class="content">' + response.placedDate + '</p></li></ul>';

      // Buyer address information
      var addressSecDetail = document.querySelector('.direccion-dev');
      response.paymentInstruction.forEach(function (item, index) {
        if (index === 0) {
          addressSecDetail.innerHTML = '<div class="title-dev"><h1>Direccion del envio</h1></div><div class="content-address-dev"><p class="">' + item.billing_address_id + '</p><p class="">' + (item.firstName + ' ' + item.lastName) + '</p><p class="">' + item.addressLine[0] + '</p><p class="city">' + item.city + '</p><p class="country">' + item.city + '</p><p class="phone">' + item.phone1 + '</p><p class="">' + item.email1 + '</p> </div></div>';
        }
      });

      // Head Table order Detail items
      var addressSecDetail = document.querySelector('.ped-detail-devolucion');
      var tableDIV = document.createElement('div');
      tableDIV.classList.add('listTable');
      tableDIV.classList.add('table-container-detail-items');
      tableDIV.innerHTML = '<div class="ped-detail-sec-title"><div class="header-title"><h3>Detalle del</h3><h3>- Pedido</h3></div>  <div class="row tableHeader fullView  items-oder-detail" role="row" style="display: block;"><div role="columnheader" class="col2 imagen-dev"><div class="cell" ><span>&nbsp;</span></div></div><div role="columnheader" class="col2 product-detail-dev"><div class="cell"><span>Producto</span></div></div><div role="columnheader" class="status"></div><div role="columnheader" class="col2 total_price"><div class="cell">	<span>Precio</span></div></div><div role="columnheader" class="select-item-dev actions" title="Action"><div class="cell"><span>Seleccionar</span></div></div></div><div id="tbTable-orders-items" class="fullView" tyle="display: block;"></div>';
      addressSecDetail.appendChild(tableDIV);

      // DETAIL Item table tbody
      var json = response.orderItem;
      var tbodyItemsTable = document.querySelector('#tbTable-orders-items');
      var htmlDOM = '';
      json.forEach(function (element) {
        var urlSearch = '//localhost/search/resources/store/10151/productview/byId/' + element.productId;
        var product = budgetCtrl.requestAPI(budgetCtrl.setHeaders(urlSearch));
        product.then(function (res) {
          htmlDOM += '<div role="row" class="row entry" data-order=' + element.orderItemId + ' data-product=' + element.productId + '>';
          var itemBean = budgetCtrl.itemReduce(res.catalogEntryView);
          htmlDOM += '<div class="col2 imagen-item" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_imagen_1"><img class="imagen-prod-ord" src=' + itemBean.imagen + ' alt="Tommy-chile"></div></div>';

          htmlDOM += '<div class="col2 description_prod" role="gridcell"><div class="cell"><div class="partNumber-prod-order"><span>' + itemBean.partNumber + '</span></div><div class="product-name-order"><span>' + itemBean.name + '</span></div>';
          htmlDOM += budgetCtrl.buildAttribute(itemBean.attributes);
          htmlDOM += '</div></div>';

          htmlDOM += '<div class="col2 tprod-price" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_tprod_price_1">';
          htmlDOM += budgetCtrl.buildPrice(itemBean.price);
          htmlDOM += '</div></div>';

          htmlDOM += '<div class="col1 actions"><div class="cell" id="WC_OrderList_TableContent_Action_1" role="menu"><input type="checkbox" name="select-item-dev-f[]" class="select-item-dev-f" data-partnumber=' + itemBean.partNumber + ' data-productId=' + itemBean.productId + ' data-parentId=' + itemBean.parentCatalogEntryID + ' data-parentGroupId=' + itemBean.parentGroupIDs + ' data-oderId=' + IDOrder + '></div></div>';

          htmlDOM += '</div>';
          tbodyItemsTable.innerHTML = htmlDOM;

        })
          .catch(function (error) {
            throw Error('Request failure: ' + error);
          });
      });

      // TWO Buttons section
      var twoButtonsSec = document.querySelector('.two-Buttons.orderActions');
      twoButtonsSec.innerHTML = '<div class="error error-detail" id="box-error-select-item" style="display:none"><p>Por favor seleccione un producto para poder continuar</p></div><div class="two-buttons-container"><a class="btnPrimary" id="cambio-tg">Cambio</a><a class="btnPrimary" id="devolucion-tg">Devolucion</a></div>';
      closeWindowDetailOrder();


      document.querySelector('#cambio-tg').addEventListener('click', launchWindowChange, false)
    })
      .catch(function (error) {
        console.log('Request failure: ', error);
      });

  }

  // Close Modals
  var closeWindowDetailOrder = function () {
    var btn = document.querySelector('#close-w-oder-detail');
    btn.addEventListener('click', function (event) {
      var p = event.target.parentNode.parentNode.parentNode;
      p.removeChild(p.querySelector('#detail-box-container'))
      document.querySelector('#slotGoBackAndChange').style.display = 'block';
    }, false)
  };

  /** BEGIN: Cambio Section*/
  var launchWindowChange = function () {
    console.log('Binevenido a la ventana d elos cambios');


    // Select Item
    setTimeout(function () {
      // CREATE SLOT 
      var container__sec = document.createElement('div');
      var containerDetail = document.createElement('div');
      containerDetail.className = 'col8 acol12 ccol9 right change-dev-w';
      containerDetail.id = 'slotChangeWindow';
      containerDetail.innerHTML = DOM.orderChangeWDOM;

      container__sec.className = 'my_account detail-box change-info-dev list-table';
      container__sec.id = 'listview-chage-dev';
      containerDetail.appendChild(container__sec);
      document.querySelector(DOM.mainContainer).appendChild(containerDetail);

      //var checkItems =  document.querySelectorAll('.select-item-dev-f');
      var checkItems = document.getElementsByName('select-item-dev-f[]');
      console.log(getCheks(checkItems));
      var jsonchecks = getCheks(checkItems);
      var checkboxItems = [];


      for (var i = 0, j = jsonchecks.length; i < j; i++) {
        var html = '';
        var tableDIV = document.createElement('div');
        tableDIV.classList.add('listTable');
        tableDIV.classList.add('table-container-detail-items');
        var mainContainerDIV = document.querySelector('#listview-chage-dev');
        html += '<div class="ped-detail-sec-title">  <div class="row tableHeader fullView  items-oder-detail" role="row" style="display: block;"><div role="columnheader" class="col2 imagen-dev"><div class="cell"><span>&nbsp;</span></div></div><div role="columnheader" class="col2 product-detail-dev"><div class="cell"><span>Producto</span></div></div><div role="columnheader" class="status"></div><div role="columnheader" class="col2 total_price"><div class="cell">	<span>Precio</span></div></div></div>';
        html += '<div id="tbTable-changeDEV-items" class="fullView" tyle="display: block;">';

        var parentRow = jsonchecks[i].parentNode.parentNode.parentNode;
        var attrItem = parentRow.querySelector('#swatchcolor');
        var attrUniqueId = attrItem.querySelector('span.value');
        var imagenCurrent = parentRow.querySelector('.imagen-prod-ord');
        var partNumberCurrent = parentRow.querySelector('.partNumber-prod-order');
        var nameCurrent = parentRow.querySelector('.product-name-order');
        var sizeCurrent = parentRow.querySelector('#swatchSize .value');
        var colorCurrent = parentRow.querySelector('#swatchcolor .value');
        var priceCurrent = parentRow.querySelector('.price-item');
        var orderIdCurrent = checkItems[i].dataset.oderid;
        console.log(attrItem)

        var parentUniqueId = checkItems[i].dataset.parentid;
        var url = '//localhost/search/resources/store/10151/productview/byId/' + parentUniqueId;
        var data = budgetCtrl.requestAPI(budgetCtrl.setHeaders(url));
        console.log(attrUniqueId.dataset.id);


        var tbodyItemsTable = document.querySelector('#tbTable-changeDEV-items');
        html += '<div role="row" class="row entry" data-order= data-product=' + partNumberCurrent.textContent + '>';
        html += '<div class="col2 imagen-item" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_imagen_1"><img class="imagen-prod-ord" src=' + imagenCurrent.src + ' alt="Tommy-chile"></div></div>';

        html += '<div class="col2 description_prod" role="gridcell"><div class="cell"><div class="order-id">' + orderIdCurrent + '</div><div class="partNumber-prod-order"><span>' + partNumberCurrent.textContent + '</span></div><div class="product-name-order"><span>' + nameCurrent.textContent + '</span></div>';
        html += '<ul><li class="attribute-item"><span class="label">Color: </span><span class="value">' + colorCurrent.textContent + '</span></li> <li class="attribute-item"><span class="label">Size: </span><span class="value">' + sizeCurrent.textContent + '</span></li></ul>';
        html += '</div></div>';

        html += '<div class="col2 tprod-price" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_tprod_price_1">';
        html += '<div class="price-item"><span class="price">' + priceCurrent.textContent + '</span></div>';
        html += '</div></div>';

        html += '</div>';
        html += '<div class="change-reazon"><div class="title">Razon de Cambio</div><select><option value="1">No me gusta</option><option class="2">Muy pequenio</option></select></div>';
        html += '<div class="tallas-disponible" id=Attr_' + parentUniqueId + '><div class="title">Tallas Disponibles</div>';
        data.then(res => {
          setTimeout(function () {

            console.log(res.catalogEntryView[0].uniqueID)
            var filterJSON = budgetCtrl.filterSKUs(res.catalogEntryView[0].sKUs, attrUniqueId.dataset.id);
            console.log(filterJSON)
            var reduceJSON = budgetCtrl.reduceSKUs(filterJSON);
            console.log(reduceJSON);
            var itemss = document.querySelector('#Attr_' + res.catalogEntryView[0].uniqueID);
            var news = document.createElement('div');
            var htmlAttr = '';
            htmlAttr += '<div class="available-size"><ul>';
            reduceJSON.forEach(function (i, index) {
              htmlAttr += '<li><button class="available-size-btn" role="button" data-skuid=' + i.uniqueID + '>' + i.value + '</button></li>';
            });
            htmlAttr += '</ul></div>';
            news.innerHTML = htmlAttr;
            itemss.appendChild(news);
          }, 300)
        })
          .catch(function (error) {
            throw new Error('Higjher-level error: ' + error.message)
          })
        html += '</div>';

        html += '</div>';
        html += '</div>';
        tableDIV.innerHTML = html;
        mainContainerDIV.appendChild(tableDIV);

      }
      // Validation
      //checkItems.forEach(function(checkbox, i){
      /* if (verificar(checkItems2) == true) {
           document.querySelector('#box-error-select-item').style.display = 'none';
         if(checkbox.checked){
           
         }
       } else {
         document.querySelector('.ped-detail-devolucion').classList.add('intermitente');
         var refreshIntervalId = setInterval(timerId, 3000);
         var timer = 1;
         function timerId() {
           if (timer >= 500) {
             clearInterval(refreshIntervalId);
           }else{
             timer++;
             document.querySelector('.ped-detail-devolucion').classList.remove('intermitente');
           }
         };
         document.querySelector('#box-error-select-item').style.display = 'block';
       }*/
      //})
      //console.log(checkboxItems)
    }, 900);
  };

  /**
   * Function verify checkbos is checked
   * @param{*object} checkArrar: checkbox for evaluate
   **/
  function verificar(checkArray) {
    var suma = 0;
    for (var i = 0, j = checkArray.length; i < j; i++) {
      if (checkArray[i].checked == true) {
        suma++;
      }
    }
    return suma == 0 ? false : true;
  };
  function getCheks(checkArray) {
    var suma = 0;
    var items = [];
    for (var i = 0, j = checkArray.length; i < j; i++) {
      if (checkArray[i].checked == true) {
        suma++;
        items.push(checkArray[i]);
      }
    }
    if (suma == 0) {
      return false;
    } else {
      return items;
    }
  }
  /*var buildWindowChangeContainer = function(data, attrUniqueId, itemBean){
    // Slot 3: change window
    
  itemBean.forEach(function(element, index){
      console.log(element.nameCurrent)
      // Head Table order Detail items
        

      data.then(res => {
        // ITEMS PRODUCT Section
        var filterJSON = budgetCtrl.filterSKUs(res.catalogEntryView[0].sKUs, attrUniqueId);
        var reduceJSON = budgetCtrl.reduceSKUs(filterJSON);
        console.log(reduceJSON)
        var tbodyItemsTable = document.querySelector('#tbTable-changeDEV-items');
        var htmlDOM = '';

          htmlDOM += '<div role="row" class="row entry" data-order= data-product='+element.partNumberCurrent+'>';
          htmlDOM += '<div class="col2 imagen-item" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_imagen_1"><img class="imagen-prod-ord" src='+element.imagenCurrent+' alt="Tommy-chile"></div></div>';

          htmlDOM += '<div class="col2 description_prod" role="gridcell"><div class="cell"><div class="order-id">'+element.orderIdCurrent+'</div><div class="partNumber-prod-order"><span>'+element.partNumberCurrent+'</span></div><div class="product-name-order"><span>'+element.nameCurrent+'</span></div>';
          htmlDOM += '<ul><li class="attribute-item"><span class="label">Color: </span><span class="value">'+element.colorCurrent+'</span></li> <li class="attribute-item"><span class="label">Size: </span><span class="value">'+element.sizeCurrent+'</span></li></ul>';
          htmlDOM += '</div></div>';

          htmlDOM += '<div class="col2 tprod-price" role="gridcell"><div class="cell" id="WC_OrderList_TableContent_tprod_price_1">';
          htmlDOM += '<div class="price-item"><span class="price">'+element.priceCurrent+'</span></div>';
          htmlDOM += '</div></div>';
          
          htmlDOM += '</div>';
          htmlDOM += '<div class="change-reazon"><div class="title">Razon de Cambio</div><select><option value="1">No me gusta</option><option class="2">Muy pequenio</option></select></div>';

          htmlDOM += '<div class="tallas-disponible"><div class="title">Tallas Disponibles</div>';
          htmlDOM += '<div class="available-size"><ul>';
          reduceJSON.forEach(function(i, index){
            htmlDOM += '<li><button class="available-size-btn" role="button" data-skuid='+i.uniqueID+'>'+i.value+'</button></pli>';
          });
          htmlDOM +='</div></ul></div>';
          
         // tbodyItemsTable.innerHTML = htmlDOM;
          tbodyItemsTable.innerHTML = '<p>'+element.nameCurrent+'<p>';
        setTimeout(function(){
        }, 580)

        
      })
      .catch(function(error){
        throw new Error('Higjher-level error: ' + error.message)
      })
    });
  }*/
  /** END: Cambio Section*/
  return {
    init: function () {
      buildNavLeftOption();
      setupEventListener();
      console.log('server up')
    }
  };
})(budgetController, UIController);
MAINController.init();
});


