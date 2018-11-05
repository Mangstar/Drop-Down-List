;(function(global, document)
{
	const dropDownList = (function()
	{
		class DropDown {
			constructor( dropDownListText = [], customLiClasses = [], customUlclasses = ["classs", "casda"] )
			{
				this.dropDownListText  = dropDownListText;
				this.customLiClasses   = customLiClasses;
				this.customUlclasses   = customUlclasses;

				this.DOMElements       = {
					dropDownBlock:  document.querySelector(".drop-down-block"),
					dropDownInput:  document.querySelector(".drop-down-block__input"),
					dropDownArrow:  document.querySelector(".drop-down-block__arrow"),
					dropDownList:   document.querySelector(".drop-down-list")
				};

				// Добавляем пользовательские классы элементу ul
				this._addCustomClasses( this.DOMElements.dropDownList, this.customUlclasses);

				this.createListElems();
				this.createDropDownHTMLStructure();

				// Начальное состояние. Список закрыт
				this.dropDownState = "CLOSED";

				// По нажатию на стрелочку он показывается, повторное нажатие скрывает список
				this.DOMElements.dropDownArrow.addEventListener("click", ( e ) =>
				{
					this.toggleDropdownList();
				});
			}

			createListElems()
			{
				let ll = this._listLiLength(),
					li,
					liArray = [],
					i;

				for (i = 0; i < ll; i++)
				{
					li = document.createElement("DIV");
					li.innerHTML = this.dropDownListText[ i ].trim();
					li.setAttribute("data-input-value", this.dropDownListText[ i ].trim());
					li.classList.add("drop-down-element");

					// Вешаем обработчики на элементы списка. По нажатию на элемент из списка, он вставляется в input
					this.fillInputValue( li );

					liArray.push( li );
				}

				return liArray;

			}

			createDropDownHTMLStructure()
			{
				let ll = this._listLiLength(),
					liArray,
					i;

				// Добавляем всем элементам списка пользовательские классы, если они есть. Если их нет - вернется ссылка на массив с созданными
				// элементами списка
				liArray = this.addCustomClasses();

				for (i = 0; i < ll; i++)
				{
					this.DOMElements.dropDownList.appendChild( liArray[ i ] );
				}
			}

			fillInputValue( li )
			{
				let self = this;

				li.addEventListener("click", (e) => {
					this.DOMElements.dropDownInput.value = li.dataset.inputValue;

					// Закрываем вырпадающий список после нажатия на элемент
					this._exeCallbacks( 
						function(){
							self.dropDownState = "CLOSED";
							self.DOMElements.dropDownList.style.display = "none";
						} 
					);
				});
			}

			_exeCallbacks(...args)
			{
				let i, len = args.length;

				for (i = 0; i < len; i++)
				{
					args[i]();
				}
			}

			_showDropDownList()
			{
				this.dropDownState = "OPEN";
				this.DOMElements.dropDownList.style.display = "block";
			}

			_hideDropDownList()
			{
				this.dropDownState = "CLOSED";
				this.DOMElements.dropDownList.style.display = "none";
			}

			toggleDropdownList()
			{
				switch( this.dropDownState )
				{
					case "OPEN":
						this._hideDropDownList();
						break;
					case "CLOSED":
						this._showDropDownList();
						break;
				}
			}

			_listLiLength()
			{
				return this.dropDownListText.length;
			}

			addCustomClasses()
			{
				let ll      = this._listLiLength(),
					ccl     = this.customLiClasses.length,
					liArray = this.createListElems(),
					i,
					j;

				if ( ccl !== 0 )
				{
					// Цикл по пользовательсим классам
					for (i = 0; i < ccl; i++)
					{
						// цикл по количеству элементов
						for (j = 0; j < ll; j++)
						{
							liArray[ j ].classList.add( this.customLiClasses[ i ] );
						}
					}
				}

				return liArray;
			}

			_getElemType( elem )
			{
				return Object.prototype.toString.call(elem).slice(8,-1);
			}

			_addCustomClasses( elem, classes )
			{
				let cls = this._getElemType( classes );

				if ( !(cls === "Array" || cls === "String") ) return;

				switch( cls )
				{
					case "Array":
						for (let i = 0, len = classes.length; i < len; i++)
						{
							elem.classList.add( classes[ i ] );
						}
						break;
					case "String":
						elem.classList.add( cls );
						break;
				}
			}

		}


		return DropDown;

	}());

	const dropDownListText = [
		"Element 1",
		"Element 2",
		"Element 3",
		"Element 4",
		"Element 5"
	];

	const customClasses = [
		"class-1",
		"class-2",
		"class-3",
		"class-4"
	];

	const dropList = new dropDownList(
		dropDownListText,
		customClasses
	);

}(this, window.document));