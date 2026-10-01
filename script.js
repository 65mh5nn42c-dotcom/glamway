/* =====================================
   PRODUCTS DATA
===================================== */

const products = [

    {
        id: 1,
        name: "جاكيت زهر منقط بني",
        price: 3020 ,
        image:"pink&brown.jpg"
    },

    {
        id: 2,
        name: "جاكيت ابيض منقط احمر",
        price: 3060,
        image:"white&red.jpg"
    },

    {
        id: 3,
        name: "بلوزة كحلية خريفية ",
        price: 2220,
        image:"black.jpg"
    },

    {
        id: 4,
        name: "بلوزة خريفية باللون الابيض",
        price: 2260,
        image:"white.jpg"
    },

    {
        id: 5,
        name: "كارديجان بني مع ازرار",
        price: 2830,
        image:"brown.jpg"
    },

    {
        id: 6,
        name: " بلوزة بيج مزينة بالدانتيل",
        price: 2150,
        image:"beig.jpg"
    },

    {
        id: 7,
        name: " كارديجان باللون الزهر مع حواف مكشكشة",
        price: 1900,
        image:"pink.jpg"
    },

    {
        id: 8,
        name: " كنزة كاجول مطرزة",
        price: 2220,
        image:"pink blouse.jpg"
    },

    {
        id: 9,
        name: " كنزة صوف محبوكة و ناعمة",
        price: 2380,
        image:"bige.jpg"
    },

    {
        id: 10,
        name: " كنزة بنقشة قلب ",
        price: 2450,
        image:"bieg&red.jpg"
    },

    {
        id: 11,
        name: " سترة كاجول مزينة بفيونكة و ازرار معدنية",
        price: 1650,
        image:"blue.jpg"
    },

    {
        id: 12,
        name: " كارديجان مطرزة على شكل كرز و لؤلؤ صناعي",
        price: 2400,
        image:"cherry.jpg"
    }

];


/* =====================================
   WHATSAPP NUMBER
===================================== */

/*
اكتبي رقم الواتساب هون

مثال سوريا:

963981782882

بدون +
*/

const whatsappNumber = "963981792882";


/* =====================================
   CART
===================================== */

let cart =
    JSON.parse(
        localStorage.getItem("glamwayCart")
    ) || [];


/* =====================================
   ADD TO CART
===================================== */

function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: id,

            quantity: 1,

            selected: true

        });

    }


    saveCart();

    updateCart();


   
}


/* =====================================
   SAVE
===================================== */

function saveCart() {

    localStorage.setItem(
        "glamwayCart",
        JSON.stringify(cart)
    );

}


/* =====================================
   UPDATE CART
===================================== */

function updateCart() {

    let count = 0;

    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        if (!product)
            return;


        count += item.quantity;

        total +=
            product.price *
            item.quantity;

    });


    document.getElementById(
        "cartCount"
    ).textContent = count;


    document.getElementById(
        "cartTotal"
    ).textContent =
        total.toLocaleString();


    renderCart();

}


/* =====================================
   RENDER CART
===================================== */

function renderCart() {

    const container =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty">

                السلة فارغة 🛍️

            </div>

        `;


        document.getElementById(
            "modalTotal"
        ).textContent = "0";


        return;

    }


    container.innerHTML = "";


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        container.innerHTML += `

            <div class="cart-item">

                <input
                    type="checkbox"

                    ${item.selected
                        ? "checked"
                        : ""}

                    onchange="
                        selectItem(
                            ${item.id},
                            this.checked
                        )
                    "
                >


                <img src="${product.image}" alt="${product.name}">


                <div class="cart-item-info">

                    <div class="cart-item-name">

                        ${product.name}

                    </div>


                    <div class="cart-item-price">

                       ${product.price.toLocaleString("en-US")}
                        ل.س

                    </div>


                    <div class="quantity">

                        <button
                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    -1
                                )
                            ">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    1
                                )
                            ">

                            +

                        </button>

                    </div>

                </div>


                <button
                    class="remove"
                    onclick="
                        removeItem(
                            ${item.id}
                        )
                    ">

                    حذف

                </button>

            </div>

        `;

    });


    updateSelectedTotal();

}


/* =====================================
   SELECT ITEM
===================================== */

function selectItem(id, checked) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (item) {

        item.selected = checked;

    }


    saveCart();

    updateSelectedTotal();

}


/* =====================================
   SELECT ALL
===================================== */

function toggleAll() {

    const checked =
        document.getElementById(
            "selectAll"
        ).checked;


    cart.forEach(item => {

        item.selected = checked;

    });


    saveCart();

    renderCart();

}


/* =====================================
   SELECTED TOTAL
===================================== */

function updateSelectedTotal() {

    let total = 0;


    cart.forEach(item => {

        if (!item.selected)
            return;


        const product =
            products.find(
                p => p.id === item.id
            );


        total +=
            product.price *
            item.quantity;

    });


    document.getElementById(
        "modalTotal"
    ).textContent =
        total.toLocaleString("en-US");

}


/* =====================================
   CHANGE QUANTITY
===================================== */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item)
        return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    updateCart();

}


/* =====================================
   REMOVE
===================================== */

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}


/* =====================================
   OPEN CART
===================================== */

function openCart() {

    document
        .getElementById("overlay")
        .classList
        .add("active");


    renderCart();

}


/* =====================================
   CLOSE CART
===================================== */

function closeCart() {

    document
        .getElementById("overlay")
        .classList
        .remove("active");

}


/* =====================================
   SELECTED ITEMS
===================================== */

function getSelectedItems() {

    return cart.filter(
        item => item.selected
    );

}


/* =====================================
   COPY LINK
===================================== */

async function copySelectedLink() {

    const selected =
        getSelectedItems();


    if (selected.length === 0) {

        alert(
            "اختاري قطعة واحدة على الأقل"
        );

        return;

    }


    const ids =
        selected
            .map(item => item.id)
            .join(",");


    const url =
        window.location.origin +
        window.location.pathname +
        "?items=" +
        ids;


    try {

        await navigator.clipboard.writeText(url);

        alert(
            "تم نسخ الرابط 🔗"
        );

    } catch {

        alert(
            "ما قدرنا ننسخ الرابط"
        );

    }

}


/* =====================================
   LOAD FROM LINK
===================================== */

function loadFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const items =
        params.get("items");


    if (!items)
        return;


    const ids =
        items
            .split(",")
            .map(Number);


    cart = ids

        .filter(id =>
            products.some(
                product =>
                    product.id === id
            )
        )

        .map(id => ({

            id: id,

            quantity: 1,

            selected: true

        }));


    saveCart();

    updateCart();

    openCart();

}


/* =====================================
   WHATSAPP
===================================== */

function orderWhatsApp() {

    const selected =
        getSelectedItems();


    if (selected.length === 0) {

        alert(
            "اختاري القطع اللي بدك تطلبيها"
        );

        return;

    }


    let message =
        "مرحبا GlamWay 🌸\n\n";


    message +=
        "بدي اطلب:\n\n";


    let total = 0;


    selected.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;


        message +=
            "• " +
            product.name +
            " × " +
            item.quantity +
            " — " +
            itemTotal.toLocaleString("en-US") +
            " ل.س\n";

    });


    message +=
        "\nالمجموع: " +
        total.toLocaleString("en-US") +
        " ل.س";


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================
   START
===================================== */

updateCart();

loadFromURL();
