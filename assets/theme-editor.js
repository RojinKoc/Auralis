function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());

document.addEventListener("DOMContentLoaded", function () {
  var variantSelect = document.getElementById("variant-select");
  var stockQuantity = document.getElementById("stock-quantity");

  variantSelect.addEventListener("change", function () {
    var selectedVariantId = this.value;

    fetch(`/products/${Shopify.handle}.js`)
      .then((response) => response.json())
      .then((data) => {
        var selectedVariant = data.variants.find(
          (variant) => variant.id == selectedVariantId
        );

        if (selectedVariant) {
          stockQuantity.innerText = selectedVariant.inventory_quantity;
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var accordions = document.getElementsByClassName("accordion");

  for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});

// // Accordion by WebSensePro.com
// $(function() {
// 	// (Optional) Active an item if it has the class "is-active"	
// 	$(".accordions > .accordions-item.is-active").children(".accordions-panel").slideDown();
	
// 	$(".accordions > .accordions-item").click(function() {
// 		// Cancel the siblings
// 		$(this).siblings(".accordions-item").removeClass("is-active").children(".accordions-panel").slideUp();
// 		// Toggle the item
// 		$(this).toggleClass("is-active").children(".accordions-panel").slideToggle("ease-out");
// 	});
// });

// Tüm toggle başlıklarını seçiyoruz
const toggleThumbs = document.querySelectorAll('.toggle-thumb');

// Her başlığa tıklama olayı ekliyoruz
toggleThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Tıklanan başlığın ait olduğu toggle item'ı seçiyoruz
        const item = thumb.parentElement;

        // Eğer item aktifse, kapat
        if (item.classList.contains('is-active')) {
            item.classList.remove('is-active');
            item.querySelector('.toggle-panel').style.display = 'none';
        } else {
            // Diğer tüm itemları kapatıyoruz
            document.querySelectorAll('.toggle-item').forEach(i => {
                i.classList.remove('is-active');
                i.querySelector('.toggle-panel').style.display = 'none';
            });

            // Tıklanan item'ı açıyoruz
            item.classList.add('is-active');
            item.querySelector('.toggle-panel').style.display = 'block';
        }
    });
});
