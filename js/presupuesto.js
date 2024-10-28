// Selección de elementos del DOM
const productsItems = document.querySelectorAll('.product'); // Selecciona todos los elementos de productos
const buttonSubmit = document.getElementById('buttonSubmit'); // Botón de envío del formulario
const condicionesCheckbox = document.getElementById('condiciones'); // Checkbox de condiciones aceptadas
const extrasItems = document.querySelectorAll('.input-extras'); // Selecciona los elementos de extras
const plazosInput = document.getElementById('plazos'); // Campo para los plazos

// Variables globales para almacenar datos seleccionados
let selectedProducts = []; // Lista de productos seleccionados
let selectedExtras = []; // Lista de extras seleccionados
let totalExtras = 0; // Total de extras seleccionados
let condicionesAceptadas = false; // Estado de aceptación de condiciones
let descuento = 0; // Valor del descuento aplicado





// Función para verificar el formulario antes de enviarlo
function chekeoFormulario() {

    let allProducts = false;
    // Verifica si hay al menos 3 productos seleccionados
    allProducts = selectedProducts.length > 2;

    if (!allProducts) {
        alert("Debes agregar como mínimo tres productos"); // Muestra alerta si no hay suficientes productos
        return;
    }

    // Verifica si se han aceptado las condiciones
    if (condicionesAceptadas === false) {
        alert("Debes aceptar las políticas"); // Muestra alerta si no se han aceptado las políticas
        return;
    }


    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    if (name === '' || surname === '' || phone === '' || email === '') {
        alert("Debes rellenar todos los datos del cliente"); // Muestra alerta si no se han rellenado todos los campos
    }

    alert("Información enviada salisfactoriamente");
}

// Función para calcular el total del presupuesto
function calcularTotal() {
    let total = 0;
    // Suma los precios de los productos seleccionados
    selectedProducts.forEach(product => total = total + parseFloat(product.price));
    total = total + totalExtras; // Añade el total de los extras
    const totalField = document.getElementById('total');
    // Aplica el descuento y muestra el total
    totalField.value = (total) - (total * descuento) / 100;
}


// Función para calcular el total de los extras seleccionados
function calcularExtras() {
    // Calcula el total de los extras seleccionados y lo multiplica por el número de productos
    totalExtras = selectedExtras.reduce((acc, extra) => acc + Number(extra), 0);
    totalExtras = totalExtras * selectedProducts.length;
}

// Event listener para cada producto seleccionado
productsItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        const productId = event.target.dataset.id; // ID del producto
        const productInfo = event.target.dataset.product; // Información del producto
        const productPrice = event.target.dataset.price; // Precio del producto
        const isChecked = event.target.checked; // Estado de selección del checkbox

        // Si el producto está seleccionado, lo agrega a la lista de productos seleccionados
        if (isChecked && productInfo !== undefined && productPrice !== undefined) {
            selectedProducts.push({
                id: productId,
                product: productInfo,
                price: productPrice
            });
        } else {
            // Si el producto se deselecciona, lo elimina de la lista
            selectedProducts = selectedProducts.filter(product => product.id !== productId);
        }

        // Si no hay productos seleccionados, desmarca todos los extras
        if (selectedProducts.length === 0) {
            extrasItems.forEach((item) => {
                item.checked = false;
                totalExtras = 0;
            });
        }

        // Calcula de nuevo los extras y el total
        calcularExtras();
        calcularTotal();
    });
});

// Event listener para el botón de envío
buttonSubmit.addEventListener('click', (event) => {
    chekeoFormulario(); // Verifica el formulario antes de enviarlo
});

// Event listener para el checkbox de condiciones
condicionesCheckbox.addEventListener('click', (event) => {
    const isChecked = event.target.checked; // Verifica si está marcado
    condicionesAceptadas = isChecked; // Actualiza el estado de las condiciones aceptadas
});

// Event listener para los extras seleccionados
extrasItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        // Si no hay productos seleccionados, alerta al usuario
        if (selectedProducts.length === 0) {
            alert("Debes agregar como mínimo un producto");
            event.target.checked = false;
            return;
        }

        const extra = event.target.dataset.extra; // Precio del extra
        const isChecked = event.target.checked; // Estado del extra

        // Si el extra está seleccionado, lo añade a la lista de extras seleccionados
        if (isChecked) {
            selectedExtras.push(extra);
        } else {
            // Si se deselecciona, lo elimina de la lista de extras seleccionados
            selectedExtras = selectedExtras.filter(item => item !== extra);
        }

        // Calcula de nuevo los extras y el total
        calcularExtras();
        calcularTotal();
    });
});

// Event listener para el campo de plazos
plazosInput.addEventListener('change', (event) => {
    // Aplica el descuento según los meses seleccionados
    descuento = 20; // Valor predeterminado

    if (parseInt(event.target.value) === 0) {
        descuento = 0; // Sin descuento
    }

    if (parseInt(event.target.value) === 1) {
        descuento = 5; // 5% de descuento por 1 mes
    }

    if (parseInt(event.target.value) >= 2 && parseInt(event.target.value) <= 6) {
        descuento = 10; // 10% de descuento por plazos de 2 a 6 meses
    }

    if (parseInt(event.target.value) < 0) {
        descuento = 0; // Valor no válido
        event.target.value = 0; // Restaura el valor del input a 0
    }

    // Calcula de nuevo los extras y el total
    calcularExtras();
    calcularTotal();
});
