import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faFloppyDisk, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import '../Styles/GroceryList.css';

const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    // useEffect(() => {
    //     const drag_grip = document.getElementById('drag-grip');

    //     drag_grip.addEventListener('mousedown', (event) => {
    //         const tbody = document.getElementsByTagName('tbody')[0];
    //         const rows = tbody.rows;
        
    //         let i = 0;
        
    //         for (i = 0; i < rows.length; ++i) {
    //             const row = rows[i];
                
    //             // Enable dragging for the row when mousedown occurs on the drag_grip
    //             row.setAttribute('draggable', 'true');
        
    //             row.addEventListener('dragstart', (event) => {
    //                 // Check if the drag was initiated by the drag_grip
    //                 if (event.target.querySelector('#drag-grip') === drag_grip) {
    //                     event.dataTransfer.setData('text/plain', '');
    //                 }
                    
    //                 else {
    //                     // If not initiated by drag_grip, prevent drag
    //                     event.preventDefault();
    //                 }
    //             });
        
    //             row.addEventListener('dragover', (event) => {
    //                 event.preventDefault();
        
    //                 const targetRow = event.target.closest('tr');
    //                 const draggingRow = document.querySelector('tr[draggable="true"][style*="opacity: 0.5"]');
        
    //                 if (draggingRow && targetRow && draggingRow !== targetRow) {
    //                     const allRows = Array.from(rows);
        
    //                     if (allRows.indexOf(targetRow) > allRows.indexOf(draggingRow)) {
    //                         targetRow.after(draggingRow);
    //                     }
                        
    //                     else {
    //                         targetRow.before(draggingRow);
    //                     }
    //                 }
    //             });
        
    //         }
    //     });
        
    //     document.addEventListener('mouseup', () => {
    //         // Disable dragging after mouse is released
    //         const tbody = document.getElementsByTagName('tbody')[0];
    //         const rows = tbody.rows;
            
    //         for (let i = 0; i < rows.length; ++i) {
    //             rows[i].setAttribute('draggable', 'false');
    //         }
    //     });
        
    // });

    
        const addItem = () => {
        if (inputValue.trim() === '') return;
        const newItem = { name: inputValue, quantity: parseInt(quantity), unitPrice: parseFloat(unitPrice), subtotal: parseInt(quantity) * parseFloat(unitPrice) };
        setItems([...items, newItem]);
        setInputValue('');
        setQuantity('');
        setUnitPrice('');
    };

    // const editIcons = document.querySelectorAll('.edit-btn');
    // editIcons.forEach(icon => {
    //     icon.addEventListener('click', () => {
    //         const row = icon.parentNode.parentNode;
    //         const cells = row.querySelectorAll('td');
    //         cells.forEach((cell, index) => {
    //             setInputValue(cell.textContent);
    //         });
    //     });
    // });

    const editItem = (index) => {
        const item = items[index];
        setInputValue(item.name);
        setQuantity(item.quantity);
        setUnitPrice(item.unitPrice);
        setEditIndex(index);
    };

    const saveItem = () => {
        const updatedItems = [...items];
        updatedItems[editIndex] = { name: inputValue, quantity: parseInt(quantity), unitPrice: parseFloat(unitPrice), subtotal: parseInt(quantity) * parseFloat(unitPrice) };
        setItems(updatedItems);
        setInputValue('');
        setQuantity(1);
        setUnitPrice(0);
        setEditIndex(null);
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2);
    };

    const resetItems = () => {
        setItems([]);
        localStorage.removeItem('items');
    };

    return (
        <div>
            <table className = {`gl-table ${items.length} > 0 ? 'format' : ''`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <input
                                className = 'add-item-input'
                                type = 'text'
                                autoFocus = {true}
                                value = {inputValue}
                                onChange = {e => setInputValue(e.target.value)}
                                onKeyPress = {e => e.key === 'Enter' && (editIndex === null ? addItem() : saveItem())}
                            />
                        </th>
                        <th>
                            <input
                                className = 'add-item-input'
                                type = 'number'
                                value = {quantity}
                                onChange = {e => setQuantity(e.target.value)}
                                onKeyPress = {e => e.key === 'Enter' && (editIndex === null ? addItem() : saveItem())}
                            />
                        </th>
                        <th>
                            <input
                                className = 'add-item-input'
                                type = 'number'
                                value = {unitPrice}
                                onChange = {e => setUnitPrice(e.target.value)}
                                onKeyPress = {e => e.key === 'Enter' && (editIndex === null ? addItem() : saveItem())}
                            />
                        </th>
                        <th></th>
                        <th>
                            <button className = 'gl-btn add-btn' onClick = {editIndex === null ? addItem : saveItem}>
                                <FontAwesomeIcon icon = {editIndex === null ? faPlus : faFloppyDisk} />
                                <div className = 'btn-text'>{editIndex === null ? 'Add' : 'Save'}</div>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <tr key = {index}>
                                <td>
                                   <svg id = 'drag-grip' viewBox = '0 0 100 100' fill = 'none' xmlns = 'http://www.w3.org/2000/svg'>
                                        <rect id = 'icon-bg' width = '100' height = '100'/>
                                        <g id = 'Frame 1'>
                                            <rect width = '100' height = '100'/>

                                                <rect className = 'grip-dots' id = 'dot1' width = '80' height = '10' rx = '7.5'/>
                                                <rect className = 'grip-dots' id = 'dot2' width = '80' height = '10' rx = '7.5'/>
                                                <rect className = 'grip-dots' id = 'dot3' width = '80' height = '10' rx = '7.5'/>
                                            
                                                <rect className = 'grip-dots' id = 'dot4' width = '80' height = '10' rx = '7.5'/>
                                                <rect className = 'grip-dots' id = 'dot5' width = '80' height = '10' rx = '7.5'/>
                                                <rect className = 'grip-dots' id = 'dot6' width = '80' height = '10' rx = '7.5'/>

                                                <rect className = 'grip-dots' id = 'dot7' width = '80' height = '10' rx = '7.5'/>
                                                <rect className = 'grip-dots' id = 'dot8' width = '80' height = '10' rx = '7.5'/>
                                                <rect className = 'grip-dots' id = 'dot9' width = '80' height = '10' rx = '7.5'/>
                                                
                                        </g>
                                    </svg>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unitPrice.toFixed(2)}</td>
                                <td>{item.subtotal.toFixed(2)}</td>
                                <td>
                                    <button className = 'gl-btn edit-btn' onClick = {() => editItem(index)}>
                                        <FontAwesomeIcon icon = {faPenToSquare} />
                                    </button>
                                    <button className = 'gl-btn delete-btn' onClick = {() => deleteItem(index)}>
                                        <FontAwesomeIcon icon = {faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th colSpan = {6}>No items</th>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan = {3}></th>
                        <th>Total</th>
                        <th>{`${calculateTotal()}`}</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>

            <button className = 'gl-btn reset-btn' onClick = {resetItems} style = {{margin: '20px auto'}}>
                <FontAwesomeIcon icon = {faX} />
                <div className = 'btn-text'>Reset</div>
            </button>
        </div>
    );
}

export default GroceryList;