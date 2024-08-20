// document.addEventListener('DOMContentLoaded', () => {
//     const quantityInputs = document.querySelectorAll('.quantity');
//     const priceInputs = document.querySelectorAll('.price');
//     const subtotalCells = document.querySelectorAll('.index-rowSubtotal');
//     const totalCell = document.getElementById('index-total');
//     const resetButton = document.querySelector('button[type = "reset"]');
    
//     function calculateTotals() {
//         let total = 0;
        
//         priceInputs.forEach((priceInput, index) => {
//             const quantity = parseFloat(quantityInputs[index].value) || 0;
//             const price = parseFloat(priceInput.value) || 0;
//             const subtotal = quantity * price;
//             subtotalCells[index].textContent = `R$${subtotal.toFixed(2)}`;
//             total += subtotal;
//         });
        
//         totalCell.textContent = `R$${total.toFixed(2)}`;
//     };
    
//     priceInputs.forEach((priceInput) => {
//         priceInput.addEventListener('change', calculateTotals);
//     });

//     resetButton.addEventListener('click', () => {
//         setTimeout(calculateTotals, 0);
//     });
    
//     // ---------------------------------------------------------------------------------------------------------------------

//     document.getElementsByClassName('items').forEach((item, index) => {
//         item.addEventListener('click', () => {
//             const selectedItem = item[index].textContent;
//             const selectedValue = item[index].getAttribute('data-value');
//             itemSelectorClick(selectedItem, selectedValue, index);
//         });
//     });

//     function itemSelectorClick(selectedItem, selectedValue, index) {
        // let itemSelector = document.getElementsByClassName('index-itemSelector')[index];
        // itemSelector.textContent = selectedItem;

        // let itemIdCell = document.getElementsByClassName('index-itemId')[index];
        // itemIdCell.textContent = selectedValue;
        
        // let tableBody = document.getElementById('grocery-list');

        // let newRow = document.createElement('tr');
        // newRow.classList.add('grocery-row');

        // let idCell = document.createElement('td');
        // idCell.textContent = '--'
        // idCell.classList.add('index-itemId');

        // let newItemCell = document.createElement('td');
        // newItemCell.innerHTML = `
        //     <div class = "dropdown">
        //         <button aria-expanded = "false" class = "dropdown-toggle index-itemSelector" data-bs-toggle = "dropdown" id = "dropdown-toggle" role = "button" type = "button">
        //             <span>Select an item</span>
        //         </button>
        //         <ul class = "dropdown-menu">
        //             <li class = "dropdown-item"><a href = "/addItems"><i class = "fa-solid fa-plus"></i> Add item</a></li>
        //             <li class = "dropdown-divider"></li>
        //             {% for item in items %}
        //                 <li class = "dropdown-item items" data-value = "{{ item.id }}">{{ item.title }}</li>
        //             {% endfor %}
        //         </ul>
        //     </div>
        // `;

        // let quantityCell = document.createElement('td');
        // let quantityInput = document.createElement('input');
        // quantityInput.type = 'number';
        // quantityInput.name = 'quantity';
        // quantityInput.classList.add('index-input', 'quantity');
        // quantityInput.min = '0';
        // quantityCell.appendChild(quantityInput);

        // let priceCell = document.createElement('td');
        // let priceInput = document.createElement('input');
        // priceInput.type = 'number';
        // priceInput.name = 'price';
        // priceInput.classList.add('index-input', 'price');
        // priceInput.min = '0';
        // priceCell.appendChild(priceInput);

        // let subtotalCell = document.createElement('td');
        // subtotalCell.textContent = `R$0,00`;
        // subtotalCell.id = 'index-rowSubtotal';

        // let actionCell = document.createElement('td');
        // actionCell.classList.add('empty-col');
        // let deleteButton = document.createElement('button');
        // deleteButton.classList.add('btn', 'btn-danger');
        // deleteButton.type = 'button';
        // deleteButton.innerHTML = '<i class = "fa-solid fa-trash"></i> Delete';

        // deleteButton.onclick = function() {
        //     tableBody.removeChild(newRow);
        // };

        // actionCell.appendChild(deleteButton);

        // newRow.appendChild(idCell);
        // newRow.appendChild(newItemCell);
        // newRow.appendChild(quantityCell);
        // newRow.appendChild(priceCell);
        // newRow.appendChild(subtotalCell);
        // newRow.appendChild(actionCell);
        
        // tableBody.appendChild(newRow);
//     };
// });

document.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = Array.from(document.getElementsByClassName('quantity'));
    const priceInputs = Array.from(document.getElementsByClassName('price'));
    const subtotalCells = Array.from(document.getElementsByClassName('index-rowSubtotal'));
    const totalCell = document.getElementById('index-total');
    const resetButton = document.querySelector('button[type = "reset"]');
    const dropdownButtons = Array.from(document.getElementsByClassName('index-itemSelector'));
    const idCells = Array.from(document.getElementsByClassName('index-itemId'));
    const newRows = Array.from(document.getElementsByClassName('new-row'));

    function calculateTotals() {
        let total = 0;
        
        priceInputs.forEach((priceInput, index) => {
            const quantity = parseFloat(quantityInputs[index].value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            const subtotal = quantity * price;
            subtotalCells[index].textContent = `R$${subtotal.toFixed(2)}`;
            total += subtotal;
        });
        
        totalCell.textContent = `R$${total.toFixed(2)}`;
    };

    priceInputs.forEach((priceInput) => {
        priceInput.addEventListener('change', calculateTotals);
    });

    quantityInputs.forEach((quantityInput) => {
        quantityInput.addEventListener('change', calculateTotals);
    });

    resetButton.addEventListener('click', () => {
        setTimeout(() => {
            dropdownButtons.forEach((button) => {
                button.textContent = 'Select an item';
            });

            idCells.forEach((idCell) => {
                idCell.textContent = '--';
            });

            if (newRows.length > 0) {
                newRows.forEach((row) => {
                    row.remove();
                });
            };
            calculateTotals();
        }, 0);
    });

    const items = Array.from(document.getElementsByClassName('items'));
    items.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            const selectedItem = item.textContent;
            const selectedValue = item.getAttribute('data-value');

            let itemSelector = event.target.closest('tr').querySelector('span');
            itemSelector.textContent = selectedItem;

            let itemIdCell = event.target.closest('tr').querySelector('.index-itemId');
            itemIdCell.textContent = selectedValue; 

            createNewRow();
            calculateTotals();
        });
    });

    Array.from(document.getElementsByClassName('add-row-btn')).forEach((btn, index) => {
        btn.addEventListener('click', () => {
            createNewRow();
        });
    });

    function createNewRow() {
        let tableBody = document.getElementById('grocery-list');

        let newRow = document.createElement('tr');
        newRow.classList.add('grocery-row', 'new-row');

        let addBtnCell = document.createElement('td');
        addBtnCell.classList.add('empty-col');
        
        let addBtn = document.createElement('button');
        addBtn.classList.add('btn', 'btn-success', 'add-row-btn');
        addBtn.type = 'button';
        addBtn.innerHTML = '<i class = "fa-solid fa-plus"></i>';
        
        addBtnCell.appendChild(addBtn);

        let idCell = document.createElement('td');
        idCell.textContent = '--'
        idCell.classList.add('index-itemId');

        let newItemCell = document.createElement('td');
        // ${[...items].map(item => `<li class = "dropdown-item item" data-value = "${item.getAttribute('data-value')}">${item.textContent}</li>`).join('')}
        newItemCell.innerHTML = `
            <div class = "dropdown">
                <button aria-expanded = "false" class = "dropdown-toggle index-itemSelector" data-bs-toggle = "dropdown" id = "dropdown-toggle" role = "button" type = "button">
                    <span>Select an item</span>
                </button>
                <ul class = "dropdown-menu">
                    <li class = "dropdown-item"><a href = "/addItems"><i class = "fa-solid fa-plus"></i> Add item</a></li>
                    <li class = "dropdown-divider"></li>
                    {% for item in items %}
                        <li class = "dropdown-item items" data-value = "{{ item.id }}">{{ item.title }}</li>
                    {% endfor %}
                </ul>
            </div>
        `;

        let quantityCell = document.createElement('td');
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.name = 'quantity';
        quantityInput.classList.add('index-input', 'quantity');
        quantityInput.min = '0';
        quantityCell.appendChild(quantityInput);

        let priceCell = document.createElement('td');
        let priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.name = 'price';
        priceInput.classList.add('index-input', 'price');
        priceInput.min = '0';
        priceCell.appendChild(priceInput);

        let subtotalCell = document.createElement('td');
        subtotalCell.textContent = `R$0,00`;
        subtotalCell.id = 'index-rowSubtotal';

        let actionCell = document.createElement('td');
        actionCell.classList.add('empty-col');
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.type = 'button';
        deleteButton.innerHTML = '<i class = "fa-solid fa-trash"></i> Delete';

        deleteButton.onclick = function() {
            tableBody.removeChild(newRow);
        };

        actionCell.appendChild(deleteButton);

        newRow.appendChild(addBtnCell);
        newRow.appendChild(idCell);
        newRow.appendChild(newItemCell);
        newRow.appendChild(quantityCell);
        newRow.appendChild(priceCell);
        newRow.appendChild(subtotalCell);
        newRow.appendChild(actionCell);
        
        tableBody.appendChild(newRow);

        calculateTotals();
    };
});
