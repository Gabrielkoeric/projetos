/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/script.js":
/*!********************************!*\
  !*** ./resources/js/script.js ***!
  \********************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  var increaseButtons = document.querySelectorAll('.increase');
  var decreaseButtons = document.querySelectorAll('.decrease');
  var numberInputs = document.querySelectorAll('.number');
  var valorVendaElements = document.querySelectorAll('.valor-venda');
  var totalElement = document.getElementById('total');
  var totalValue = 0;
  var cart = [];
  increaseButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      var estoqueId = button.getAttribute('data-estoque-id'); // Obtenha o estoque ID

      updateValue(numberInputs[index], 1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')), estoqueId);
    });
  });
  decreaseButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      var estoqueId = button.getAttribute('data-estoque-id'); // Obtenha o estoque ID

      updateValue(numberInputs[index], -1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')), estoqueId);
    });
  });

  function updateValue(inputElement, multiplier, valorVenda, estoqueId) {
    var currentValue = Number(inputElement.value);
    var newValue = currentValue + multiplier;

    if (newValue >= 0) {
      // Certificar-se de que o valor não seja negativo
      inputElement.value = newValue; // Atualizar o valor total no footer

      updateTotalValue(multiplier, valorVenda); // Atualizar o carrinho de compras

      updateCart(estoqueId, newValue);
    }
  }

  function updateTotalValue(multiplier, valorVenda) {
    totalValue += multiplier * valorVenda;
    totalElement.innerText = "Total: R$ ".concat(totalValue.toFixed(2));
  }

  function updateCart(estoqueId, newValue) {
    // Verifique se o item já existe no carrinho
    var existingItem = cart.find(function (item) {
      return item.id_estoque === estoqueId;
    });

    if (existingItem) {
      // Atualize a quantidade do item no carrinho
      existingItem.quantidadeInicial = newValue;
    } else {
      // Adicione um novo item ao carrinho
      cart.push({
        _token: csrfToken,
        id_estoque: estoqueId,
        quantidadeInicial: newValue
      });
    }
  } // Lógica para enviar os dados do carrinho para a rota de compra.store


  var finalizarPedidoButton = document.querySelector('button.btn-primary');
  finalizarPedidoButton.addEventListener('click', function () {
    if (cart.length > 0) {
      var formData = new FormData(); // Adicione cada item do carrinho ao formData

      cart.forEach(function (item) {
        formData.append('_token', item._token);
        formData.append('id_estoque[]', item.id_estoque);
        formData.append('quantidadeInicial[]', item.quantidadeInicial);
      }); // Construa a URL de forma convencional

      var url = compraStoreRoute;
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        window.location.href = '/estoque';
      })["catch"](function (error) {//console.error('Erro ao enviar os dados do carrinho:', error);
        // window.location.href = '/checkout';
      });
    }
  });
});
/*document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const numberInputs = document.querySelectorAll('.number');
    const valorVendaElements = document.querySelectorAll('.valor-venda');
    const totalElement = document.getElementById('total');
    let totalValue = 0;
    let cart = [];

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], 1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')), index);
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], -1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')), index);
        });
    });

    function updateValue(inputElement, multiplier, valorVenda, index) {
        const currentValue = Number(inputElement.value);
        const newValue = currentValue + multiplier;

        if (newValue >= 0) {  // Certificar-se de que o valor não seja negativo
            inputElement.value = newValue;

            // Atualizar o valor total no footer
            updateTotalValue(multiplier, valorVenda);

            // Atualizar o carrinho de compras
            updateCart(index, newValue);
        }
    }

    function updateTotalValue(multiplier, valorVenda) {
        totalValue += multiplier * valorVenda;
        totalElement.innerText = `Total: R$ ${totalValue.toFixed(2)}`;
    }

    function updateCart(index, quantity) {
        const estoqueId = increaseButtons[index].getAttribute('data-estoque-id');
        const productIndex = cart.findIndex(item => item.estoqueId === estoqueId);

        if (productIndex > -1) {
            cart[productIndex].quantity = quantity;
        } else {
            cart.push({ estoqueId: estoqueId, quantity: quantity });
        }
    }

    // Lógica para enviar os dados do carrinho para a rota de compra.store
    const finalizarPedidoButton = document.querySelector('button.btn-primary');
    finalizarPedidoButton.addEventListener('click', function () {
        if (cart.length > 0) {
            const formData = new FormData();
            formData.append('_token', csrfToken);
            formData.append('cart', JSON.stringify(cart));

            // Construir a URL de forma convencional
            const url = compraStoreRoute;

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Lógica para lidar com a resposta do servidor, se necessário
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados do carrinho:', error);
                });
        }
    });
});*/
//====================================================================================
//======================funcionando========================================

/*document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const numberInputs = document.querySelectorAll('.number');
    const valorVendaElements = document.querySelectorAll('.valor-venda');
    const totalElement = document.getElementById('total');
    let totalValue = 0;

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], 1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')));
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], -1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')));
        });
    });

    function updateValue(inputElement, multiplier, valorVenda) {
        const currentValue = Number(inputElement.value);
        const newValue = currentValue + multiplier;

        if (newValue >= 0) {  // Certificar-se de que o valor não seja negativo
            inputElement.value = newValue;

            // Atualizar o valor total no footer
            updateTotalValue(multiplier, valorVenda);
        }
    }

    function updateTotalValue(multiplier, valorVenda) {
        totalValue += multiplier * valorVenda;
        totalElement.innerText = `Total: R$ ${totalValue.toFixed(2)}`;
    }

});
*/
//==================================================================================================================================================

/*document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const numberInputs = document.querySelectorAll('.number');
    const valorVendaElements = document.querySelectorAll('.valor-venda');
    const totalElement = document.getElementById('total');
    let totalValue = 0;

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], index, 1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')));
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], index, -1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')));
        });
    });

    function updateValue(inputElement, index, multiplier, valorVenda) {
        const newValue = Number(inputElement.value) + multiplier;
        inputElement.value = newValue;

        // Atualizar o valor total no footer
        updateTotalValue(index, newValue, valorVenda);
    }

    function updateTotalValue(index, newValue, valorVenda) {
        const oldValue = totalValue;
        const difference = newValue * valorVenda - (numberInputs[index].value - 1) * valorVenda;
        totalValue = oldValue + difference;
        totalElement.innerText = `Total: R$ ${totalValue.toFixed(2)}`;
    }
});*/

/*document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const numberInputs = document.querySelectorAll('.number');
    const valorVendaElements = document.querySelectorAll('.valor-venda');

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], index, 1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')));
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], index, -1, parseFloat(valorVendaElements[index].getAttribute('data-valorvenda')));
        });
    });

    function updateValue(inputElement, index, multiplier, valorVenda) {
        const newValue = Number(inputElement.value) + multiplier;
        inputElement.value = newValue;

        // Atualizar o valor total no footer
        updateTotalValue(index, newValue * valorVenda);
    }

    function updateTotalValue(index, value) {
        const totalElement = document.getElementById('total');
        const oldValue = totalElement.dataset.total || 0;

        const newTotal = parseFloat(oldValue) + value;
        totalElement.innerText = `Total: R$ ${newTotal.toFixed(2)}`;
        totalElement.dataset.total = newTotal;
    }
});*/

/*document.addEventListener("DOMContentLoaded", function () {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');
    const numberInputs = document.querySelectorAll('.number');

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], Number(numberInputs[index].value) + 1);
        });
    });

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            updateValue(numberInputs[index], Number(numberInputs[index].value) - 1);
        });
    });

    function updateValue(inputElement, newValue) {
        inputElement.value = newValue;
    }
});*/

/***/ }),

/***/ "./resources/css/app.scss":
/*!********************************!*\
  !*** ./resources/css/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/script": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/script.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/css/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;