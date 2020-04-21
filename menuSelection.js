/*******************************************************
CALCULATION CONTROL
*******************************************************/
const calcControl = (function(){
  
    const Order = function(item, pr){
      this.item = item;
      this.pr = pr;
    };
    
    Order.prototype.displayOrder = function(){
      return `${this.item}: $${this.pr}`;
    };
    
    const Prices = {
      hamburgerPr: 3.99,
      friesPr: 1.99,
      sodaPr: 1.99,
      iceCreamPr: 0.99
    };
    
   let orders = [];
  
    
    return {
      getPrices: function(){
        return Prices;
      },
      
      getTotal: function(){
        let total = 0;
        return function(price){
          if(price !== 'reset'){
            total += price;
            return parseFloat(total.toFixed(2));
          }
          total = 0;
          return parseFloat(total.toFixed(2));
        };
      },
      
      addOrders: function(item, pr){
        orders.push(new Order(item, pr));
      },
      
      getOrders: function(){
        let list = '<li>' + orders[0].displayOrder() + '</li>';
        for(let x = 1; x < orders.length; x++){
          list += '<li>' + orders[x].displayOrder() + '</li>';
        }
        return list;
        //return orders[1].displayOrder();
       /*
        let list;
        for(let x = 0; x < orders.length; x++){
          list += '<li>' + orders[x].displayOrder() + '</li>';
        }
        return list;
        */
      },
      
      getOrderNum: function(){
        let orderNum = 0;
        return function(){
         orderNum += 1;
         return orderNum;
        };
      },
      
      resetOrders: function(){
        orders = [];
      }
      
    };
    
  })();
  
  
  
  
  /*******************************************************
  UI CONTROL
  *******************************************************/
  const UIControl = (function(){
    
    const DOMstrings = {
      hamburgerBtn: 'hamburger',
      friesBtn: 'fries',
      sodaBtn: 'soda',
      iceCreamBtn: 'iceCream',
      resetBtn: 'reset',
      completeBtn: 'complete',
      finishBtn: 'finish',
      totalText: 'totalText',
      dateText: 'date',
      orderNumText: 'orderNum',
      totalReceipt: 'totalReceipt',
      orderList: 'orderList'
    };
    
    const Elements = {
        hamburger: document.getElementById(DOMstrings.hamburgerBtn),
        fries: document.getElementById(DOMstrings.friesBtn),
        soda: document.getElementById(DOMstrings.sodaBtn),
        iceCream: document.getElementById(DOMstrings.iceCreamBtn),
        total: document.getElementById(DOMstrings.totalText),
        reset: document.getElementById(DOMstrings.resetBtn),
        complete: document.getElementById(DOMstrings.completeBtn),
        finish: document.getElementById(DOMstrings.finishBtn),
        date: document.getElementById(DOMstrings.dateText),
        orderNum: document.getElementById(DOMstrings.orderNumText),
        totalReceipt: document.getElementById(DOMstrings.totalReceipt),
        orderList: document.getElementById(DOMstrings.orderList)
      };
    
    const Images = {
      hamburgerFirst: 'https://drive.google.com/uc?export=view&id=1RdzzIZdYDKpCjyIYVVap7XglH9hNY_I2',
      friesFirst: 'https://drive.google.com/uc?export=view&id=1mqbEioDr_ZFpmL79KXx4hBP-W2w1LbRs',
      sodaFirst: 'https://drive.google.com/uc?export=view&id=1s2LviIB1UA3sG3ehQ67fiuydPsVgLtfR',
      iceCreamFirst: 'https://drive.google.com/uc?export=view&id=1HCiiPLu44_LXXK16PoUGQrS1t4hH2U2R'
    };
    
    const currentDate = function(){
      let dt = new Date();
    
      let DD = dt.getDate();
      let MM = dt.getMonth() + 1;
      let YY = dt.getFullYear().toString().substr(-2); 
      let hour =  dt.getHours();
      let min = ('0' + dt.getMinutes()).slice(-2);
      if(hour > 12){
        hour -= 12;
        min = min + '' + 'pm';
      } else {
        min = min + '' + 'am';
      }
      
      return MM + '/' + DD + '/' + YY + ' ' + hour + ':' + min;
    };
    
    
    return {
      getDOMStrings: function(){
        return DOMstrings;
      },
      
      getElements: function(){
        return Elements;
      },
      
      getImages: function(){
        return Images;
      },
      
      getDate: function(){
        return currentDate();
      }
      
    };
    
  })();
  
  
  
  
  /*******************************************************
  MAIN CONTROL
  *******************************************************/
  const mainControl = (function(calcCtrl, UICtrl){
    
    //const DOM = UICtrl.getDOMStrings();
    const El = UICtrl.getElements();
    const IMG = UICtrl.getImages();
    const PR = calcCtrl.getPrices();
    const keepTotal = calcCtrl.getTotal();
    const keepOrderNum = calcCtrl.getOrderNum();
    const orderID = document.getElementById('order');
    
    
    const hamburger = function(){
        yourOrder('Hamburger');
    };
    const fries = function(){
        yourOrder('Fries');
    };
    const soda = function(){
        yourOrder('Soda');
    };
    const iceCream = function(){
        yourOrder('Ice Cream');
    };
    const complete = function(){
        yourOrder('complete');
        El.finish.addEventListener('click', finish);
    };
    const finish = function(){
        yourOrder('finish');
    };
    const reset = function(){
        yourOrder('reset');
    };
    
    
    const imageCalculations = function(item, price){
        El.total.textContent = '$' + keepTotal(price);
        calcCtrl.addOrders(item, price);
    };
    
    const clear = function(){
        El.total.textContent = '$0.00';
        keepTotal('reset');
        calcCtrl.resetOrders();
    };
    
    
    /*******************************************************
    BUTTONS
    *******************************************************/
    const setupEventListeners = function(){
    
      El.hamburger.addEventListener('click', hamburger);
      El.fries.addEventListener('click', fries);
      El.soda.addEventListener('click', soda);
      El.iceCream.addEventListener('click', iceCream);
      El.complete.addEventListener('click', complete);
      El.reset.addEventListener('click', reset);
      
        // List the orders on the DOM
        // List the date and time complete order was clicked
        // List an order number
      
    };
    
    
    /*******************************************************
    EVENT CHANGES - IMAGES AND CALCULATIONS
    *******************************************************/
    
    const yourOrder = function(order){
       if(order === 'Hamburger'){
        orderID.src = IMG.hamburgerFirst;
        imageCalculations('Hamburger', PR.hamburgerPr);
       } else if(order === 'Fries'){
          orderID.src = IMG.friesFirst;
          imageCalculations('Fries', PR.friesPr);
       } else if(order === 'Soda'){
          orderID.src = IMG.sodaFirst;
          imageCalculations('Soda', PR.sodaPr);
       } else if(order === 'Ice Cream'){
          orderID.src = IMG.iceCreamFirst;
          imageCalculations('Ice Cream', PR.iceCreamPr);
       } else if(order === 'complete'){
          displayReceipt('complete');
          orderID.src = '';
          clear();
          clearButtonEvents();
       } else if(order === 'finish'){
          displayReceipt('finish');
          clear();
          setupEventListeners();
       } else {
          orderID.src = '';
          clear();
      }
    };
    
    
    
    /*******************************************************
    RECEIPT
    *******************************************************/
    
    let displayReceipt = function(btn){
      let x = document.getElementById('imageContainer');
      let y = document.getElementById('receipt');
      if(btn === 'complete'){
        x.style.display = 'none';
        y.style.display = 'block';
        receiptContent();
      } else if(btn === 'finish'){
          x.style.display = 'flex';
          y.style.display = 'none';
      }
    };
    
    const receiptContent = function(){
      El.date.textContent = UICtrl.getDate();
      El.orderNum.textContent = 'Order: ' + keepOrderNum();
      El.totalReceipt.textContent = 'Total: $' + keepTotal(0);
      
      
      El.orderList.innerHTML = calcCtrl.getOrders();
      //console.log(calcCtrl.getOrderArray());
    };
    
    
    /*******************************************************
    REMOVE BUTTON LISTENERS
    *******************************************************/
    
    const clearButtonEvents = function(){
      El.hamburger.removeEventListener('click', hamburger);
      El.fries.removeEventListener('click', fries);
      El.soda.removeEventListener('click', soda);
      El.iceCream.removeEventListener('click', iceCream);
      El.complete.removeEventListener('click', complete);
    };
   
    
    return {
      init: function(){
        console.log('Application Started');
        setupEventListeners();
        yourOrder();
      }
      
    };
  })(calcControl, UIControl);
  
  
  
  mainControl.init();
  
  
  