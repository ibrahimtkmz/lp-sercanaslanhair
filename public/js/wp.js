const createWpLog = async (btn_id, text, isSticky) =>
   await fetch(
      `https://hotelistan-services.freeddns.org/api/service/whatsapp?btn_id=${btn_id}&btn_text=${text}&is_sticky=${isSticky}&website=${
         window.location.href.split('?')[0]
      }`,
      {
         credentials: 'include',
      }
   )

window.addEventListener('load', () => {
   setTimeout(() => {
      const btns = document.querySelectorAll('.wp-link')
      btns.forEach((btn, index) => {
         btn.addEventListener('click', (e) => {
            if (btn.getAttribute('id') === 'whatsapp-fab') {
               return createWpLog(index, btn.innerText, true)
            } else {
               return createWpLog(index, btn.innerText, false)
            }
         })
      })
   }, 1000)
})
